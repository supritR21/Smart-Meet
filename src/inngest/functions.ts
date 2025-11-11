import JSONL from "jsonl-parse-stringify";
import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import { inArray, eq } from "drizzle-orm";

// Using OpenAI directly without agent-kit
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");

async function summarizeTranscript(transcriptWithSpeakers: any[]) {
  const prompt = `
You are an expert summarizer. You write readable, concise, simple content.
You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Transcript: ${JSON.stringify(transcriptWithSpeakers)}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  // OpenAI returns choices[0].message.content
  return data.choices?.[0]?.message?.content ?? "";
}

export const meetingsProcessing = inngest.createFunction(
  { id: "meetings/processing" },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    // Step 1: Parse transcript
    const transcript = await step.run("parse-transcript", async () => {
      const res = await fetch(event.data.transcriptUrl);
      const text = await res.text();
      return JSONL.parse<StreamTranscriptItem>(text);
    });

    // Step 2: Add speakers
    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      const speakerIds = [...new Set(transcript.map((item) => item.speaker_id))];

      const userSpeaker = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds));

      const agentSpeaker = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds));

      const speakers = [...userSpeaker, ...agentSpeaker];

      return transcript.map((item) => {
        const speaker = speakers.find((s) => s.id === item.speaker_id);
        if (!speaker) {
          return { ...item, user: "Unknown" };
        }
        return { ...item, user: { name: speaker.name } };
      });
    });

    // Step 3: Summarize transcript via OpenAI
    const summary = await step.run("summarize", async () => {
      return await summarizeTranscript(transcriptWithSpeakers);
    });

    // Step 4: Save summary to DB
    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary,
          status: "completed",
        })
        .where(eq(meetings.id, event.data.meetingId));
    });
  }
);
