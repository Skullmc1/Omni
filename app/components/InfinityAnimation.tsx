"use client";
import { motion } from "framer-motion";

interface InfinityAnimationProps {
  squareSize?: number;
  pathWidth?: number;
  pathHeight?: number;
  numberOfSquares?: number;
  duration?: number;
  color?: string;
}

export default function InfinityAnimation({
  squareSize = 3,
  pathWidth = 200,
  pathHeight = 80,
  numberOfSquares = 16,
  duration = 6,
  color = "#dc2626", // default red-600
}: InfinityAnimationProps = {}) {
  const squares = Array.from({ length: numberOfSquares }).map((_, i) => i);

  // Custom path for figure 8
  const infinityPath = (i: number) => {
    const delay = i * (duration / numberOfSquares);
    const halfWidth = pathWidth / 2;
    const points = 100; // number of points in the path for smoother animation

    return {
      initial: { scale: 0 },
      animate: {
        scale: 1,
        x: Array.from({ length: points }).map((_, p) => {
          const t = (p / (points - 1)) * Math.PI * 2;
          // Parametric equations for figure 8
          return (halfWidth * Math.sin(t)) / (1 + Math.cos(t) * Math.cos(t));
        }),
        y: Array.from({ length: points }).map((_, p) => {
          const t = (p / (points - 1)) * Math.PI * 2;
          // Parametric equations for figure 8
          return (
            (pathHeight * Math.sin(t) * Math.cos(t)) /
            (1 + Math.cos(t) * Math.cos(t))
          );
        }),
        transition: {
          duration,
          repeat: Infinity,
          delay,
          ease: "linear",
          times: Array.from({ length: points }).map((_, p) => p / (points - 1)),
        },
      },
    };
  };

  return (
    <div
      className="relative"
      style={{
        width: `${pathWidth}px`,
        height: `${pathHeight * 2}px`,
      }}
    >
      {squares.map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            width: `${squareSize}px`,
            height: `${squareSize}px`,
            backgroundColor: color,
            borderRadius: "2px",
            marginLeft: `-${squareSize / 2}px`,
            marginTop: `-${squareSize / 2}px`,
          }}
          {...infinityPath(i)}
        />
      ))}
    </div>
  );
}
