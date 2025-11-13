"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoIcon, BotIcon, StarIcon, CircleCheckIcon } from "lucide-react";

export const HomeView = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Smart Meet — Meet smarter, capture insights</h1>
          <p className="mt-4 text-muted-foreground max-w-xl">Smart Meet records, transcribes, and summarizes your meetings. Use AI agents to triage action items, generate highlights, and instantly get meeting intelligence — all in one beautiful workspace.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/sign-up">Get started — it's free</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/upgrade">View plans</Link>
            </Button>
            <Badge className="ml-2">No credit card required</Badge>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-primary/10 p-2">
                  <VideoIcon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Record & Transcribe</h3>
                  <p className="text-sm text-muted-foreground">Secure, accurate transcripts and searchable meeting history.</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-secondary/10 p-2">
                  <BotIcon className="size-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Agents</h3>
                  <p className="text-sm text-muted-foreground">Automate notes, categorize action items and surface follow-ups.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Everything you need to run better meetings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <ul className="grid grid-cols-1 gap-3">
                  <li className="flex items-center gap-3">
                    <CircleCheckIcon className="size-5 text-green-600" />
                    <span className="font-medium">Unlimited recordings</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CircleCheckIcon className="size-5 text-green-600" />
                    <span className="font-medium">AI-generated summaries</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CircleCheckIcon className="size-5 text-green-600" />
                    <span className="font-medium">Shareable highlights</span>
                  </li>
                </ul>

                <div className="mt-4">
                  <Image src="/screenshot-hero.png" alt="Smart Meet sample" width={720} height={360} className="rounded-md border" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Why teams love Smart Meet</h2>
        <p className="mt-2 text-muted-foreground">Designed for product teams, customer success, and operations — scale your meeting workflows with AI.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <StarIcon className="size-5 text-yellow-500" />
              <div>
                <p className="font-medium">Delightful experience</p>
                <p className="text-sm text-muted-foreground">Fast, polished UI that keeps your team in flow.</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <VideoIcon className="size-5 text-primary" />
              <div>
                <p className="font-medium">Reliable recordings</p>
                <p className="text-sm text-muted-foreground">End-to-end encrypted meeting capture and storage.</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <BotIcon className="size-5 text-secondary" />
              <div>
                <p className="font-medium">Actionable AI</p>
                <p className="text-sm text-muted-foreground">Automate follow-ups and keep work moving forward.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};