"use client";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import InfinityAnimation from "./components/InfinityAnimation";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black" />
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* Infinity Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-12"
          >
            <InfinityAnimation
              squareSize={4}
              pathWidth={300}
              pathHeight={100}
              numberOfSquares={20}
              duration={8}
              color="#dc2626"
            />
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-9xl font-bold text-red-600 mb-4 relative">
              <span className="relative inline-block">
                404
                <motion.span
                  className="absolute -inset-2 bg-gradient-to-r from-red-600 to-red-900 blur-xl opacity-50"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
            </h1>
            <div className="flex items-center justify-center space-x-2 text-xl text-white mb-4">
              <AlertTriangle className="text-red-500" />
              <span>Page Not Found</span>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 max-w-md mx-auto"
            >
              Oops! This page seems to have wandered off into infinity.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
