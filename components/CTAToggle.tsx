"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AssistantModal from "./AssistantModal";
import StartHereFormModal from "./StartHereFormModal";

export default function CTAToggle() {
  const [active, setActive] = useState<"form" | "assistant">("form");
  const [showAssistant, setShowAssistant] = useState(false);
  const [showStartForm, setShowStartForm] = useState(false);

  const onForm = () => {
    setActive("form");
    setShowAssistant(false);
    setShowStartForm(true);
  };
  const onAssistant = () => {
    setActive("assistant");
    setShowStartForm(false);
    setShowAssistant(true);
  };

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
          onClick={onForm}
          className={`relative z-10 flex-1 px-8 py-4 text-center text-[#eadbc0] transition-all duration-500 ease-in-out hover:opacity-90 ${
            active === "form" ? "" : "bg-[#b84d0b]"
          }`}
        >
          Start Here
        </button>

        {/* Assistant */}
        <button
          type="button"
          onClick={onAssistant}
          className={`relative z-10 flex-1 px-8 py-4 text-center text-[#eadbc0] transition-all duration-500 ease-in-out hover:opacity-90 ${
            active === "assistant" ? "" : "bg-[#b84d0b]"
          }`}
        >
          Ask Our AI Assistant
        </button>
      </div>

      {/* Assistant modal */}
      <AnimatePresence>
        {showAssistant && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 right-0 top-full mt-6 flex justify-center"
          >
            <AssistantModal isOpen={showAssistant} onClose={() => setShowAssistant(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Here intake form modal */}
      <AnimatePresence>
        {showStartForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 right-0 top-full mt-6 flex justify-center"
          >
            <StartHereFormModal isOpen={showStartForm} onClose={() => setShowStartForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
