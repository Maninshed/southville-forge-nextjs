"use client";

import { useEffect, useState } from "react";
import ChatWidget from "./ChatWidget";

/**
 * FloatingChat renders a bottom-right anchored chat window.
 * It listens for the custom browser event `open-chat` to open programmatically.
 * Dispatch with: window.dispatchEvent(new CustomEvent("open-chat"))
 */
export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler as EventListener);
    return () => window.removeEventListener("open-chat", handler as EventListener);
  }, []);

  return (
    <div aria-live="polite" aria-relevant="additions removals">
      {/* Toggle button when closed */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-[200] rounded-full px-6 py-3 text-base font-bold uppercase tracking-wide shadow-lg transition transform-gpu duration-200 ease-out cursor-pointer"
          style={{ background: "#b84d0b", color: "#eadbc0", border: "1px solid #122738" }}
          aria-label="Open chat"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#863e11";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#b84d0b";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
            (e.currentTarget as HTMLButtonElement).style.transform = "";
          }}
        >
          Chat
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-4 right-4 z-[200] w-[92vw] max-w-[420px]"
          role="dialog"
          aria-modal="false"
          aria-label="Southville Forge Chat"
        >
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide"
              style={{ background: "#122738", color: "#eadbc0", border: "1px solid #863e11" }}
              aria-label="Close chat"
            >
              Close
            </button>
          </div>
          <ChatWidget />
        </div>
      )}
    </div>
  );
}
