"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ChatWidget from "./ChatWidget";

export default function AssistantModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    setMounted(true);
    // trigger fade-in after mount
    setTimeout(() => setVisible(true), 0);
    return () => setMounted(false);
  }, []);

  if (!isOpen) return null;

  const modal = (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-[9998] p-4 transition-opacity duration-300 ease-in-out ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div
        className={`relative z-[9999] mx-auto max-w-3xl w-full mt-24 p-6 transition-opacity duration-300 ease-in-out ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#b84d0b]/95 shadow-2xl rounded-xl border border-[#122738] text-[#eadbc0] max-h-[80vh] overflow-auto relative">
          <button
            className="absolute top-3 right-3 text-[#122738] font-bold text-lg hover:text-[#eadbc0]"
            onClick={onClose}
            aria-label="Close assistant"
          >
            ✕
          </button>
          {/* Inner content wrapper enforcing palette */}
          <div className="p-2 md:p-3 bg-[#b84d0b] text-[#eadbc0] [&_h1]:text-[#122738] [&_h2]:text-[#122738] [&_h3]:text-[#122738] [&_label]:text-[#122738] [&_input]:bg-[#eadbc0] [&_textarea]:bg-[#eadbc0] [&_button]:bg-[#eadbc0] [&_input]:text-[#122738] [&_textarea]:text-[#122738] [&_button]:text-[#122738]">
            <ChatWidget />
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen || !mounted) return null;
  return createPortal(modal, document.body);
}
