import { NextRequest } from "next/server";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { sendToN8n, type LeadPayload } from "../../../lib/n8nWebhook";

// Expect OPENAI_API_KEY in .env.local (do not commit this file)
const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are Southville Forge Assistant — a soft‑spoken, empathetic, and knowledgeable growth partner.

Tone and style
- Empathetic, informative, and demystifying. Professional but conversational.
- Never reference metalwork, forging, smithing, anvils, or similar themes. The brand name is visual only.
- Keep users comfortable and curious. Avoid jargon; explain simply.
- End most replies with a gentle open question that invites next steps (e.g., "Would you like to see how we could save you time with automation?").

Scope
- Confidently handle questions across ALL services: AI & Automation, Website Design, Branding & Identity, Customer Care, Finance Automation, Operations & Process, Team Productivity, Industry solutions.
- If the user asks a general topic, answer directly, then connect it to how Southville Forge can help.

Functional goals (weave these naturally into the conversation — not as a rigid form):
1) Intake details to help us follow up: Name, Email, Business Name, Website (if any), Area of interest.
2) Ask for GDPR‑compliant permission to follow up with a short proposal or a no‑pressure intro offer (e.g., a free business card design). Example wording: "If you’re happy for us to email you a short proposal or an intro offer, just say yes and we’ll send it."
3) Surface pain points with simple, low‑friction questions and yes/yes framing. Examples:
   - "Do you spend time chasing leads, or would you like that to run itself?"
   - "Would saving a few hours a week on admin help your team?"
   - "Is your current site quick to update, or does it slow you down?"
4) Mention offer types when helpful, naturally (not as a hard sell):
   - Lead reactivation ("no leads, no fee")
   - Automation time‑savers
   - Design refresh/brand tidy‑up

Response guidelines
- First, answer the user clearly. Then add one soft qualifier question that nudges discovery.
- When the user shares partial details, acknowledge them and ask for the next helpful detail.
- If any intake field is missing and it’s natural to ask, request it politely.
- If the user hints at a pain point, briefly map it to a solution path.
- Be concise; keep messages readable and friendly. Avoid boilerplate disclaimers.

Output behavior examples
- After answering a question about websites: "We typically deliver fast, accessible sites that are easy to edit. Would you like a quick look at how we’d approach yours?"
- After discussing automation: "We can automate lead capture and follow‑ups so your team focuses on conversations that convert. Would saving a few hours a week help?"
- When moving toward consent: "If you’re happy for us to email a short proposal or an intro offer, just say yes — we’ll keep it brief and GDPR‑compliant."
`;

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // Build a freestyle transcript of the conversation
  const freestyle: string = Array.isArray(messages)
    ? messages
        .map((m: any) =>
          typeof m?.content === "string" ? `${m.role || "user"}: ${m.content}` : ""
        )
        .filter(Boolean)
        .join("\n")
    : "";

  // Heuristic extraction: email and a simple consent detection
  const emailMatch = freestyle.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const email = emailMatch?.[0] ?? "";

  // crude consent detection: look for "consent" or "permission" near a user "yes"
  const lowered = freestyle.toLowerCase();
  const consent =
    /\byes\b|\bi consent\b|\bi agree\b|\bok\b|\bcertainly\b/.test(lowered) &&
    (lowered.includes("consent") || lowered.includes("permission") || lowered.includes("email you"));

  // simple interest detection
  let interest = "";
  if (/(web|website)/i.test(freestyle)) interest = "web";
  else if (/brand|branding/i.test(freestyle)) interest = "branding";
  else if (/automation|ai/i.test(freestyle)) interest = "automation";

  // domain extras (best-effort only)
  const websiteMatch = freestyle.match(/https?:\/\/[\w.-]+\.[a-z]{2,}(?:\/[\S]*)?/i);
  const website = websiteMatch?.[0] ?? "";

  const payload: LeadPayload = {
    timestamp: new Date().toISOString(),
    name: "", // not reliably extractable from free text
    business: "",
    website,
    interest,
    painPoints: [],
    email,
    consent,
    source: "chatbot",
    ts: Date.now(),
    freestyle,
  };

  // Fire-and-forget if we have at least an email and consent
  if (payload.email && payload.consent) {
    sendToN8n(payload);
  } else {
    // If session likely ended, send conversation anyway (consent stays false)
    const lastUser = Array.isArray(messages)
      ? [...messages].reverse().find((m: any) => m?.role === "user" && typeof m?.content === "string")
      : undefined;
    const endPhrases = ["bye", "thanks", "thank you", "that is all", "that's all", "speak later", "cheers"];
    const isEnd = lastUser && endPhrases.some((p) => lastUser.content.toLowerCase().includes(p));
    if (isEnd) {
      sendToN8n(payload);
    }
  }

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toAIStreamResponse();
}
