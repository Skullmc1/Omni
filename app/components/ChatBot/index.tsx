"use client";
import { useState } from "react";
import FloatingButton from "./FloatingButton";
import Sidebar from "./Sidebar";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
