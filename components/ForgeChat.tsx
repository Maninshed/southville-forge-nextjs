"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function ForgeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  useEffect(() => {
    // Smooth scroll to bottom when messages change
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    const userText = input.trim();
    setInput("");
    setError(null);

    // push user message
    setMessages((prev) => [...prev, { role: "user", content: userText }]);

    // create a placeholder assistant message we will fill in
    const assistantIndex = messages.length + 1; // after adding user
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    setLoading(true);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!res.ok || !res.body) {
        const txt = await res.text();
        throw new Error(txt || "ForgeAgent is offline.");
      }

      // Newline-delimited JSON parsing with live updates
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (typeof data?.response === "string") {
              fullResponse += data.response;
              // Incrementally update last assistant message
              setMessages((prev) => {
                const updated = [...prev];
                for (let i = updated.length - 1; i >= 0; i--) {
                  if (updated[i].role === "assistant") {
                    updated[i] = { ...updated[i], content: fullResponse };
                    break;
                  }
                }
                return updated;
              });
            }
            if (data?.done) break;
          } catch (e) {
            console.warn("Stream parse error:", e, line);
          }
        }
      }

      // Finalize assistant message: update existing placeholder if present; otherwise create one
      setMessages((prev) => {
        const updated = [...prev];
        let finalized = false;
        for (let i = updated.length - 1; i >= 0; i--) {
          if (updated[i].role === "assistant") {
            updated[i] = { ...updated[i], content: (fullResponse || updated[i].content || "...").trim() };
            finalized = true;
            break;
          }
        }
        if (!finalized) {
          updated.push({ role: "assistant", content: fullResponse.trim() || "..." });
        }
        return updated;
      });
    } catch (err: any) {
      console.error("ForgeChat error:", err);
      setError("⚠️ ForgeAgent is offline.");
      setMessages((prev) => {
        const copy = [...prev];
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].role === "assistant") {
            copy[i] = { ...copy[i], content: "" };
            break;
          }
        }
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full max-w-[600px] rounded-lg shadow-lg overflow-hidden animate-[fadeIn_0.3s_ease-out]"
      style={{ background: "#122738", color: "#eadbc0" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#863e11" }}>
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#eadbc0" aria-hidden>
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 14.59L9.7 13.3a1 1 0 1 1 1.41-1.41L12 12.77l3.89-3.89a1 1 0 0 1 1.41 1.41Z"/>
          </svg>
          <span className="font-bold">ForgeAgent</span>
        </div>
        {loading && (
          <div className="flex items-center gap-1 text-cream/80">
            <span className="inline-block h-2 w-2 rounded-full bg-cream animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="inline-block h-2 w-2 rounded-full bg-cream animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="inline-block h-2 w-2 rounded-full bg-cream animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-[420px] overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm opacity-70">Ask ForgeAgent anything…</div>
        )}
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow`}
              style={{
                background: m.role === "user" ? "#eadbc0" : "#863e11",
                color: m.role === "user" ? "#122738" : "#eadbc0",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {error && <div className="text-sm text-red-400">{error}</div>}
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="border-t px-3 py-2" style={{ borderColor: "#863e11" }}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ForgeAgent anything…"
            className="flex-1 rounded-md px-3 py-2 text-sm outline-none"
            style={{ background: "#eadbc0", color: "#122738" }}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!canSend}
            className="rounded-md px-3 py-2 text-sm font-semibold shadow disabled:opacity-50"
            style={{ background: "#863e11", color: "#eadbc0" }}
          >
            {loading ? "Thinking…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
