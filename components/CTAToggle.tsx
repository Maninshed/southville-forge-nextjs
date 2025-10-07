"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useChatContext } from "./ChatProvider";
import EnquiryForm from "./EnquiryForm";

export default function CTAToggle() {
  const [active, setActive] = useState<"form" | "assistant">("form");
  const { openChat } = useChatContext();

  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div className="group relative flex items-center justify-between rounded-xl shadow-md overflow-hidden border border-[#122738] transition-all duration-500 ease-in-out">
        {/* Sliding highlight */}
        <motion.div
          className="absolute inset-y-0 bg-[#122738]"
          animate={{ x: active === "assistant" ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{ width: "50%" }}
        />

        {/* Start Here */}
        <button
          type="button"
          onClick={() => {
            setActive("form");
          }}
          className={`relative z-10 flex-1 px-8 py-4 text-center text-[#eadbc0] transition-all duration-500 ease-in-out hover:opacity-90 ${
            active === "form" ? "" : "bg-[#b84d0b]"
          }`}
        >
          Start Here
        </button>

        {/* Assistant */}
        <button
          type="button"
          onClick={() => {
            setActive("assistant");
            openChat();
          }}
          className={`relative z-10 flex-1 px-8 py-4 text-center text-[#eadbc0] transition-all duration-500 ease-in-out hover:opacity-90 ${
            active === "assistant" ? "" : "bg-[#b84d0b]"
          }`}
        >
          Ask Our AI Assistant
        </button>
      </div>
      {/* Keep form logic mounted but hidden to preserve handlers */}
      {active === "form" && (
        <div className="mt-6 mx-auto max-w-[600px] text-left" style={{ display: "none" }}>
          <EnquiryForm />
        </div>
      )}
    </div>
  );
}
