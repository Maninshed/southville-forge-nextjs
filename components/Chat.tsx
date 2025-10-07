"use client";

import { useEffect, useMemo, useRef } from "react";
import { useChat } from "ai/react";
import type { Message } from "ai";
import { extractQAPairs } from "../lib/extractQAPairs";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ api: "/api/chat" });
  const bottomRef = useRef<HTMLDivElement>(null);
  const postedRef = useRef(false);

  const freestyle = useMemo(() =>
    Array.isArray(messages)
      ? messages
          .map((m: any) => (typeof m?.content === "string" ? `${m.role || "user"}: ${m.content}` : ""))
          .filter(Boolean)
          .join("\n")
      : "",
  [messages]);

  // Simple heuristic detection for email + consent or end-of-session
  const shouldSend = useMemo(() => {
    const lowered = freestyle.toLowerCase();
    const emailMatch = freestyle.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const hasEmail = !!emailMatch?.[0];
    const consent =
      /\byes\b|\bi consent\b|\bi agree\b|\bok\b|\bcertainly\b/.test(lowered) &&
      (lowered.includes("consent") || lowered.includes("permission") || lowered.includes("email you"));
    const lastUser = Array.isArray(messages)
      ? [...messages].reverse().find((m: any) => m?.role === "user" && typeof m?.content === "string")
      : undefined;
    const endPhrases = ["bye", "thanks", "thank you", "that is all", "that's all", "speak later", "cheers"];
    const isEnd = lastUser && endPhrases.some((p) => lastUser.content.toLowerCase().includes(p));
    return (hasEmail && consent) || isEnd;
  }, [freestyle, messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fire-and-forget send to local proxy when condition met
  useEffect(() => {
    if (postedRef.current || !shouldSend) return;
    postedRef.current = true;

    // Extract minimal lead fields heuristically; leave blanks otherwise
    const emailMatch = freestyle.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const email = emailMatch?.[0] ?? "";
    const lowered = freestyle.toLowerCase();
    const consent =
      /\byes\b|\bi consent\b|\bi agree\b|\bok\b|\bcertainly\b/.test(lowered) &&
      (lowered.includes("consent") || lowered.includes("permission") || lowered.includes("email you"));

    let interest = "";
    if (/(web|website)/i.test(freestyle)) interest = "web";
    else if (/brand|branding/i.test(freestyle)) interest = "branding";
    else if (/automation|ai/i.test(freestyle)) interest = "automation";

    const websiteMatch = freestyle.match(/https?:\/\/[\w.-]+\.[a-z]{2,}(?:\/[\S]*)?/i);
    const website = websiteMatch?.[0] ?? "";

    const qa = extractQAPairs(messages as Message[]);
    const payload = {
      name: "",
      business: "",
      website,
      interest,
      painPoints: [] as string[],
      email,
      consent: !!consent,
      source: "chatbot",
      ts: Date.now(),
      freestyle: JSON.stringify(qa, null, 2),
    };

    console.log("Lead payload:", payload);
    // Fire-and-forget, no await
    void fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }, [shouldSend, freestyle, messages]);

  return (
    <div className="mx-auto w-full max-w-3xl rounded-md border bg-[#122738] text-[#eadbc0] shadow-xl" style={{ borderColor: "#863e11" }}>
      {/* Header */}
      <div className="px-4 py-3 border-b" style={{ borderColor: "#863e11" }}>
        <h2 className="text-xl font-extrabold tracking-wide">Southville Forge Assistant</h2>
      </div>

      {/* Messages */}
      <div className="h-[60vh] overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-sm opacity-90">
            Ask us anything about AI & Automation, Website Design, Branding, Customer Care, Finance Automation, Operations,
            Team Productivity, or how we help your industry.
          </div>
        )}
        {messages.map((m: Message) => (
          <div key={m.id}>
            <div className="mb-1 text-[11px] uppercase tracking-wider" style={{ color: "#eadbc0" }}>
              {m.role === "user" ? "User" : "Assistant"}
            </div>
            <div
              className={
                "inline-block max-w-[95%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm " +
                (m.role === "user"
                  ? "bg-[#863e11] text-[#eadbc0]"
                  : "bg-[#eadbc0] text-[#122738]")
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 px-4 py-3 border-t" style={{ borderColor: "#863e11" }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your question..."
          className="flex-1 rounded-md border bg-[#eadbc0] px-3 py-2 text-[#122738] placeholder-[#122738]/70 focus:outline-none focus:ring-2"
          style={{ borderColor: "#863e11" }}
        />
        <button
          type="submit"
          disabled={isLoading || input.trim().length === 0}
          className="rounded-md bg-[#863e11] px-4 py-2 font-bold uppercase tracking-wide text-[#f4f1e6] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:text-[#122738] hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
