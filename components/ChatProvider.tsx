"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import AssistantModal from "./AssistantModal";

export type ChatContextValue = {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openChat, closeChat }), [isOpen, openChat, closeChat]);

  return (
    <ChatContext.Provider value={value}>
      {children}
      {/* Single global chatbot instance */}
      <AssistantModal isOpen={isOpen} onClose={closeChat} />
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within a ChatProvider");
  return ctx;
}
