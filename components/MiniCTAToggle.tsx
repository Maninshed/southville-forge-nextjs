"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useChatContext } from "./ChatProvider";
import EnquiryForm from "./EnquiryForm";

// Mini toggle with independent state: show form or open chatbot
export default function MiniCTAToggle() {
  const [active, setActive] = useState<"form" | "assistant">("form");
  const { openChat } = useChatContext();

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <div className="group relative flex items-center justify-between rounded-lg overflow-hidden border border-[#863e11]" style={{ background: "#b84d0b" }}>
        <motion.div
          className="absolute inset-y-0 bg-[#122738]"
          animate={{ x: active === "assistant" ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{ width: "50%" }}
        />
        <button
          type="button"
          onClick={() => {
            setActive("form");
          }}
          className={`relative z-10 flex-1 px-4 py-2 text-sm md:text-base text-[#eadbc0] transition-opacity ${active === "form" ? "" : "opacity-90"}`}
          aria-pressed={active === "form"}
        >
          Start Here
        </button>
        <button
          type="button"
          onClick={() => {
            setActive("assistant");
            openChat();
          }}
          className={`relative z-10 flex-1 px-4 py-2 text-sm md:text-base text-[#eadbc0] transition-opacity ${active === "assistant" ? "" : "opacity-90"}`}
          aria-pressed={active === "assistant"}
        >
          Ask Our AI Assistant
        </button>
      </div>

      {active === "form" && (
        <div className="mt-4 text-left">
          <EnquiryForm />
        </div>
      )}
    </div>
  );
}
