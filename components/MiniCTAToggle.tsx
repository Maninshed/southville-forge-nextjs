"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MiniCTAToggle({ onForm, onChat }: { onForm: () => void; onChat: () => void }) {
  const [active, setActive] = useState<"form" | "chat">("form");

  const handleForm = () => {
    setActive("form");
    onForm();
  };

  const handleChat = () => {
    setActive("chat");
    onChat();
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <div className="relative flex items-center justify-between rounded-lg overflow-hidden border border-[#863e11]" style={{ background: "#b84d0b" }}>
        <motion.div
          className="absolute inset-y-0 bg-[#122738]"
          animate={{ x: active === "chat" ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{ width: "50%" }}
        />
        <button
          type="button"
          onClick={handleForm}
          className={`relative z-10 flex-1 px-4 py-2 text-sm md:text-base text-[#eadbc0] transition-opacity ${active === "form" ? "" : "opacity-90"}`}
          aria-pressed={active === "form"}
        >
          Quick Form
        </button>
        <button
          type="button"
          onClick={handleChat}
          className={`relative z-10 flex-1 px-4 py-2 text-sm md:text-base text-[#eadbc0] transition-opacity ${active === "chat" ? "" : "opacity-90"}`}
          aria-pressed={active === "chat"}
        >
          Chat with us
        </button>
      </div>
    </div>
  );
}
