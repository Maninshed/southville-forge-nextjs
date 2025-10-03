import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

// Expect OPENAI_API_KEY in .env.local (do not commit this file)
const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are Southville Forge Assistant, a friendly and knowledgeable guide for potential clients.
Be eloquent, conversational, and clear — professional but not overly corporate. Use metaphors from forging,
craftsmanship, and building systems. Explain Southville Forge’s services in detail — AI & Automation, Website Design,
Branding, Customer Care, Finance Automation, Operations & Process, Team Productivity, and Industry solutions.
If asked about general topics, answer normally but look for a way to connect the answer back to how Southville Forge can help.
Avoid generic chatbot disclaimers.`;

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toAIStreamResponse();
}
