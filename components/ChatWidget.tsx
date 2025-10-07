"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "ai/react";
import type { Message } from "ai";

export default function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ api: "/api/chat" });
  const bottomRef = useRef<HTMLDivElement>(null);
  const [lead, setLead] = useState<{
    name: string;
    business: string;
    website: string;
    interest: "web" | "branding" | "automation" | "";
    painPoints: string[];
    email: string;
    // consent removed from UI; keep internal for payload compatibility if needed
    consent?: boolean;
  }>({ name: "", business: "", website: "", interest: "", painPoints: [], email: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const storageKey = "sf_lead_draft";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load draft from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setLead((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  // Persist draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(lead));
    } catch {}
  }, [lead]);

  const timeGreeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const updateLead = (patch: Partial<typeof lead>) => setLead((l) => ({ ...l, ...patch }));

  const submitLead = async () => {
    if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      alert("Please enter a valid email so we can send your proposal.");
      return;
    }
    setSending(true);
    try {
      const payload = {
        name: lead.name,
        business: lead.business,
        website: lead.website,
        interest: lead.interest,
        painPoints: lead.painPoints,
        email: lead.email,
        // keep consent true server-side without displaying checkbox in UI
        consent: true,
        source: "chat",
        ts: Date.now(),
      };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setSent(true);
      // simple analytics hook point
      (window as any).analytics?.track?.("lead_submitted", { source: "chat", interest: lead.interest });
      // subtle confirmation
      setTimeout(() => {
        // keep details but mark sent
      }, 0);
    } catch (e) {
      alert("Sorry, something went wrong sending your details. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-md border border-[#122738] bg-[#863e11] text-[#eadbc0] shadow-xl flex flex-col max-h-[75vh]">
      {/* Header */}
      <div className="border-b border-[#122738] px-4 py-2">
        <h2 className="text-xl font-extrabold tracking-wide" style={{ color: "#eadbc0" }}>
          Southville Forge Assistant — Ask Us Anything
        </h2>
      </div>

      {/* Intro and lead capture */}
      <div className="px-4 py-2 border-b border-[#122738] grid gap-3">
        {/* Intro text converted to h6, reduced spacing */}
        <h6 style={{ fontWeight: 500, fontSize: "1rem", lineHeight: 1.4, color: "#eadbc0", marginBottom: "1rem" }}>
          {timeGreeting} — We help brands automate, design, and grow efficiently.
          <br />
          Would you like to tell me a bit about your business or see what services could help you most?
        </h6>

        {/* New optional leading questions as toggle buttons */}
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          {[
            "We’re wasting time on admin",
            "Our website doesn’t reflect who we are",
            "We’re not generating enough leads",
          ].map((q) => {
            const active = lead.painPoints.includes(q);
            return (
              <button
                key={q}
                type="button"
                onClick={() =>
                  updateLead({ painPoints: active ? lead.painPoints.filter((x) => x !== q) : [...lead.painPoints, q] })
                }
                className="rounded-md px-3 py-1 text-xs font-semibold transition-colors duration-300"
                style={{
                  background: active ? "#73340f" : "#863e11",
                  color: "#eadbc0",
                  border: "1px solid #122738",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#73340f")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = active ? "#73340f" : "#863e11")}
              >
                {q}
              </button>
            );
          })}
        </div>

      {/* Basic info section removed per request: keep chat-only experience */}
      </div>

      {/* Messages - scrollable area; keep input visible */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-sm opacity-90">
            {timeGreeting} — I’m your Southville Forge assistant. I can help with automation, websites, branding, customer care,
            finance automation, operations and team productivity. Ask anything — I’ll keep things clear and practical.
            <br />
            <br />
            Would you like to explore quick wins first (e.g., saving time with automation) or talk through your website/brand?
          </div>
        )}
        {messages.map((m: Message) => (
          <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
            <div
              className={
                "inline-block max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 text-sm " +
                (m.role === "user"
                  ? "bg-[#b84d0b] text-[#eadbc0]"
                  : "bg-[#eadbc0] text-[#122738]")
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input - always visible at bottom */}
      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-[#122738] px-4 py-3">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your question..."
          className="flex-1 rounded-md border border-[#122738] bg-[#eadbc0] px-3 py-2 text-[#122738] placeholder-[#122738]/70 focus:outline-none focus:ring-2 focus:ring-[#122738]"
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
