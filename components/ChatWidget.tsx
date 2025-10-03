"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import type { Message } from "ai";

export default function ChatWidget() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ api: "/api/chat" });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mx-auto w-full max-w-3xl rounded-md border border-[#122738] bg-[#863e11] text-[#eadbc0] shadow-xl">
      {/* Header */}
      <div className="border-b border-[#122738] px-4 py-3">
        <h2 className="text-xl font-extrabold tracking-wide" style={{ color: "#eadbc0" }}>
          Southville Forge Assistant — Ask Us Anything
        </h2>
      </div>

      {/* Messages */}
      <div className="h-[60vh] overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-sm opacity-90">
            Hi — I’m your Southville Forge digital assistant. Ask me about AI & Automation, Website Design, Branding,
            Customer Care, Finance Automation, Operations, Team Productivity, or how we help your industry.
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
