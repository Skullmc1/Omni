"use client";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function FloatingButton({
  onClick,
  isOpen,
}: FloatingButtonProps) {
  return (
    <motion.button
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-red-600
                 shadow-lg shadow-red-900/20 flex items-center justify-center
                 hover:bg-red-700 transition-colors z-40"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Bot className="w-6 h-6 text-white" />
    </motion.button>
  );
}
