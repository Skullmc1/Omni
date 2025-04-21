"use client";
import { motion } from "framer-motion";

export default function CircuitSpinner() {
  // Define the circuit path
  const path = [
    { x: 0, y: 0 },
    { x: 64, y: 0 },
    { x: 64, y: 32 },
    { x: 32, y: 32 },
    { x: 32, y: 64 },
    { x: 64, y: 64 },
    { x: 0, y: 64 },
    { x: 0, y: 0 },
  ];

  return (
    <div className="relative w-16 h-16">
      {/* Background frame */}
      <div className="absolute inset-0 border-2 border-red-600/20 rounded-lg" />

      {/* Circuit paths - Outer */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600/20" />
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600/20" />
        <div className="absolute top-0 left-0 w-0.5 h-full bg-red-600/20" />
        <div className="absolute top-0 right-0 w-0.5 h-full bg-red-600/20" />
      </div>

      {/* Circuit paths - Inner */}
      <div className="absolute inset-4">
        {/* Horizontal lines */}
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-red-600/20" />
        <div className="absolute top-2/4 left-0 w-full h-0.5 bg-red-600/20" />
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-red-600/20" />

        {/* Vertical lines */}
        <div className="absolute top-0 left-1/4 w-0.5 h-full bg-red-600/20" />
        <div className="absolute top-0 left-2/4 w-0.5 h-full bg-red-600/20" />
        <div className="absolute top-0 left-3/4 w-0.5 h-full bg-red-600/20" />

        {/* Connection nodes */}
        {[...Array(16)].map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-600/30 rounded-full"
              style={{
                top: `${row * 33.33}%`,
                left: `${col * 33.33}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>

      {/* Moving dot */}
      <motion.div
        className="absolute w-2 h-2"
        animate={{
          x: path.map((p) => p.x - 4), // Adjust for dot size
          y: path.map((p) => p.y - 4), // Adjust for dot size
        }}
        transition={{
          duration: 4,
          ease: "linear",
          repeat: Infinity,
          times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
        }}
      >
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-red-600 rounded-full blur-sm opacity-50 scale-150" />
        <div className="absolute inset-0 bg-red-600 rounded-full" />
      </motion.div>

      {/* Optional: Render the path for debugging */}
      {/* <svg className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        <path
          d={`M ${path.map(p => `${p.x} ${p.y}`).join(' L ')}`}
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.1"
        />
      </svg> */}
    </div>
  );
}
