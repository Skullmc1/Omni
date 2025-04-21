"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SubtlePopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

export default function SubtlePopup({
  isOpen,
  onClose,
  children,
  width = "max-w-md",
}: SubtlePopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Subtle Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Helper Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 left-1/2 -translate
                     text-white/30 text-sm pointer-events-none
                     transform -translate-x-1/2"
          >
            click outside to close
          </motion.div>

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative w-full mx-4 ${width}`}
          >
            {/* Content Container */}
            <div className="relative bg-gray-900/90 rounded-lg shadow-xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-2 -right-2 p-1 rounded-full
                         bg-gray-900/90 text-white/50 hover:text-white
                         hover:bg-gray-900 transition-all z-10
                         shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Main Content */}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
