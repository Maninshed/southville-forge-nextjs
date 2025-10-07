import type { Message } from "ai";

export type QAPair = { question: string; answer: string };

export function extractQAPairs(messages: Message[]): QAPair[] {
  const pairs: QAPair[] = [];
  if (!Array.isArray(messages)) return pairs;
  for (let i = 0; i < messages.length - 1; i++) {
    const curr = messages[i];
    const next = messages[i + 1];
    if (!curr || !next) continue;
    if (curr.role === "system") continue;
    if (curr.role === "assistant" && next.role === "user") {
      const question = typeof curr.content === "string" ? curr.content : String(curr.content ?? "");
      const answer = typeof next.content === "string" ? next.content : String(next.content ?? "");
      pairs.push({ question, answer });
    }
  }
  return pairs;
}
