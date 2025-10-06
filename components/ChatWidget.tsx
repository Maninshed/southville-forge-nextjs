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
    consent: boolean;
  }>({ name: "", business: "", website: "", interest: "", painPoints: [], email: "", consent: false });
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
    if (!lead.consent) {
      alert("Please confirm you're happy for us to email your proposal (GDPR consent).");
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
    <div className="mx-auto w-full max-w-3xl rounded-md border border-[#122738] bg-[#863e11] text-[#eadbc0] shadow-xl">
      {/* Header */}
      <div className="border-b border-[#122738] px-4 py-3">
        <h2 className="text-xl font-extrabold tracking-wide" style={{ color: "#eadbc0" }}>
          Southville Forge Assistant — Ask Us Anything
        </h2>
      </div>

      {/* Intake assistant strip */}
      <div className="px-4 py-3 border-b border-[#122738] grid gap-3">
        <div className="text-sm">
          <span className="font-semibold">{timeGreeting}</span> — We help brands automate, design, and grow efficiently.
        </div>
        <div className="text-sm">
          Would you like to tell me a bit about your business or see what services could help you most?
        </div>
        {/* Quick replies */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: "web", label: "Web Design" },
            { key: "branding", label: "Branding" },
            { key: "automation", label: "Automation" },
          ].map((btn) => (
            <button
              key={btn.key}
              type="button"
              onClick={() => updateLead({ interest: btn.key as any })}
              className={`rounded-md px-3 py-1 text-xs font-semibold border ${
                lead.interest === btn.key ? "opacity-100" : "opacity-90"
              }`}
              style={{ borderColor: "#122738", background: lead.interest === btn.key ? "#122738" : "#b84d0b", color: "#eadbc0" }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Basic info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs opacity-90">Name</label>
            <input
              value={lead.name}
              onChange={(e) => updateLead({ name: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-[#122738]"
              style={{ borderColor: "#122738", background: "#eadbc0" }}
            />
          </div>
          <div>
            <label className="block text-xs opacity-90">Business name</label>
            <input
              value={lead.business}
              onChange={(e) => updateLead({ business: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-[#122738]"
              style={{ borderColor: "#122738", background: "#eadbc0" }}
            />
          </div>
          <div>
            <label className="block text-xs opacity-90">Website (optional)</label>
            <input
              value={lead.website}
              onChange={(e) => updateLead({ website: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-[#122738]"
              placeholder="https://..."
              style={{ borderColor: "#122738", background: "#eadbc0" }}
            />
          </div>
          <div>
            <label className="block text-xs opacity-90">Email</label>
            <input
              type="email"
              value={lead.email}
              onChange={(e) => updateLead({ email: e.target.value })}
              className="mt-1 w-full rounded-md border px-3 py-2 text-[#122738]"
              style={{ borderColor: "#122738", background: "#eadbc0" }}
            />
          </div>
        </div>

        {/* Pain points quick prompts */}
        <div className="grid gap-2">
          <div className="text-xs opacity-90">What’s getting in the way?</div>
          <div className="flex flex-wrap gap-2">
            {[
              "I chase leads manually",
              "Repetitive admin slows us down",
              "Website is hard to update",
              "Brand feels inconsistent",
            ].map((p) => {
              const active = lead.painPoints.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    updateLead({
                      painPoints: active
                        ? lead.painPoints.filter((x) => x !== p)
                        : [...lead.painPoints, p],
                    })
                  }
                  className={`rounded-md px-3 py-1 text-xs font-semibold border ${active ? "opacity-100" : "opacity-90"}`}
                  style={{ borderColor: "#122738", background: active ? "#122738" : "#b84d0b", color: "#eadbc0" }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Consent */}
        <div className="flex items-center gap-2 text-xs">
          <input
            id="consent"
            type="checkbox"
            checked={lead.consent}
            onChange={(e) => updateLead({ consent: e.target.checked })}
          />
          <label htmlFor="consent" className="opacity-90">
            If you’re happy for us to email a short proposal or an intro offer (e.g., a free mini design concept), tick here.
            We’ll only use your email for this — never spam or sharing data.
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={submitLead}
            disabled={sending || sent}
            className="rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide disabled:opacity-50"
            style={{ background: "#122738", color: "#eadbc0", border: "1px solid #122738" }}
          >
            {sent ? "Sent" : sending ? "Sending..." : "Send details"}
          </button>
          {sent && <span className="text-xs opacity-90">✅ Details secured</span>}
        </div>
        {sent && (
          <div className="text-sm mt-2">
            We’ll send your proposal shortly. While you’re here, would you like to preview some of our recent work?
            <div className="mt-2 flex gap-3">
              <a href="#ai-and-automation" className="underline" style={{ color: "#eadbc0" }}>Services</a>
              {/* Add a portfolio anchor when available */}
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="h-[60vh] overflow-y-auto px-4 py-4 space-y-4">
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

      {/* Input */}
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
