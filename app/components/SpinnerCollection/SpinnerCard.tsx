"use client";
import { motion } from "framer-motion";

interface SpinnerCardProps {
  name: string;
  children: React.ReactNode;
}

export default function SpinnerCard({ name, children }: SpinnerCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-900/10 rounded-lg blur-xl group-hover:opacity-75 transition-opacity" />
      <div className="relative bg-gray-900/50 backdrop-blur-md border border-red-950/50 rounded-lg p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 flex items-center justify-center">
            {children}
          </div>
          <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
            {name}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
