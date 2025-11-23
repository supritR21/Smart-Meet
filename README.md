# Smart-Meet 🚀
**Revolutionizing Meeting Management with AI & Real-Time Collaboration**

Smart-Meet is a comprehensive platform that streamlines the entire meeting lifecycle — from scheduling and collaboration to post-meeting analysis and actionable insights. It addresses common challenges like disorganized meetings, low engagement, and difficulty extracting key information.

[GitHub Repository](https://github.com/supritR21/Smart-Meet)

---

## 🌟 Core Features

| Feature | Description |
|---------|-------------|
| **Automated Meeting Scheduling** | Suggests intelligent time slots and sends automated invitations. |
| **Real-Time Collaboration** | Live chat, screen sharing, and collaborative document editing. |
| **AI-Powered Transcription & Summarization** | Automatically transcribes meetings and generates summaries. |
| **Action Item Extraction** | Tracks action items to ensure accountability. |
| **Agent Performance Analytics** | Provides insights for coaching and improvement. |
| **Seamless Integrations** | Integrates with calendars and communication tools. |

---

## 🏗️ Architecture & Dependencies

### High-Level Architecture (HLD)
``` mermaid
 flowchart TD
    User --> Frontend("React / Next.js UI")
    Frontend --> Backend("tRPC API / Business Logic")
    Backend --> Database("PostgreSQL")
    Backend --> Inngest("Background Jobs / Task Orchestration")
    Backend --> OpenAI("AI Summarization (GPT-4o)")
    Backend --> StreamChat("Real-Time Messaging")

```

## LLD
``` mermaid
    flowchart TD
    MeetingModule --> UIComponents
    MeetingModule --> Hooks
    MeetingModule --> ServerProcedures
    MeetingModule --> Schemas

    CallModule --> CallUI
    CallModule --> CallComponents
    CallModule --> CallLogic

    AgentModule --> Analytics
    AgentModule --> AgentUI
    AgentModule --> AgentTypes
```
---

## 📦 Getting Started / Setup Instructions

### Prerequisites
*   Node.js (version >= 18)
*   npm or yarn
*   PostgreSQL database
*   OpenAI API key
*   Stream Chat API key
*   Inngest account

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2.  Install dependencies:

    ```bash
    npm install # or yarn install
    ```

3.  Set up environment variables:

    *   Create a `.env` file in the root directory.
    *   Add the following environment variables, replacing the placeholders with your actual values:

        ```
        DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
        OPENAI_API_KEY="<your_openai_api_key>"
        STREAM_CHAT_API_KEY="<your_stream_chat_api_key>"
        STREAM_CHAT_API_SECRET="<your_stream_chat_api_secret>"
        INNGEST_EVENT_KEY="<your_inngest_event_key>"
        ```

4.  Run database migrations:

    ```bash
    npx drizzle-kit generate:pg
    npx drizzle-kit push:pg
    ```

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev # or yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

``` 
smart-meet/
├── src/
│   ├── components/
│   ├── modules/       # meetings, calls, agents
│   ├── db/
│   ├── trpc/
│   ├── utils/
│   ├── hooks/
│   └── inngest/
├── pages/
├── styles/
├── .env
├── package.json
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
└── drizzle.config.ts

```

## 📸 Screenshots

<img width="2513" height="1232" alt="image" src="https://github.com/user-attachments/assets/5bbf4328-4502-479d-b2b8-2327f1addbd0" />


## 🤝 Contributing

We welcome contributions to Smart-Meet! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, please feel free to contact us at [your_email@example.com](mailto:smartmeet@gmail.com).

 
