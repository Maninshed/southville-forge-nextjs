"use client";

import { useState } from "react";
import AssistantModal from "./AssistantModal";
import { motion, AnimatePresence } from "framer-motion";

export default function CallToActionToggle({ variant = "hero" }: { variant?: "block" | "inline" | "hero" }) {
  const [activeTab, setActiveTab] = useState<"start" | "ai">("start");
  const [showAssistant, setShowAssistant] = useState(false);

  const wrapperClass =
    variant === "inline"
      ? "inline-flex items-center"
      : "flex justify-center mt-8"; // hero and block center by default

  return (
    <div className={`relative ${wrapperClass}`}>
      <div className="relative flex rounded-lg overflow-hidden border-2 border-[#122738] shadow-md">
        {/* Sliding highlight */}
        <motion.div
          className="absolute inset-y-0 bg-[#122738]"
          animate={{ x: activeTab === "ai" ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ width: "50%" }}
        />

        {/* Buttons */}
        <button
          onClick={() => {
            setActiveTab("start");
            setShowAssistant(false);
          }}
          className={`relative z-10 px-8 py-4 text-lg font-semibold transition-colors duration-300 ${
            activeTab === "start" ? "text-[#eadbc0]" : "text-[#eadbc0] bg-[#b84d0b]"
          }`}
          type="button"
        >
          Start Here
        </button>

        <button
          onClick={() => {
            setActiveTab("ai");
            setShowAssistant(true);
          }}
          className={`relative z-10 px-8 py-4 text-lg font-semibold transition-colors duration-300 ${
            activeTab === "ai" ? "text-[#eadbc0]" : "text-[#eadbc0] bg-[#b84d0b]"
          }`}
          type="button"
        >
          Ask Our AI Assistant
        </button>
      </div>

      {/* Assistant modal (fades in below) */}
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
    </div>
  );
}
