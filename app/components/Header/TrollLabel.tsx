import { useEffect, useState } from "react";

interface TrollLabelProps {
  onComplete: () => void;
}

export default function TrollLabel({ onComplete }: TrollLabelProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3500); // Start exit animation after 3.5s

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000); // Remove component after 4s

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`
        fixed bottom-8 right-8 z-50
        transform transition-all duration-500
        ${
          isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }
      `}
    >
      <div className="relative">
        {/* Striped background */}
        <div
          className="absolute inset-0 bg-stripes animate-move-stripes rounded-lg"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              #dc2626,
              #dc2626 10px,
              #991b1b 10px,
              #991b1b 20px
            )`,
          }}
        />

        {/* Content */}
        <div className="relative bg-red-600 border-2 border-white/20 m-[2px] py-3 px-6 rounded-lg">
          <span className="text-white font-bold tracking-wider animate-pulse text-lg">
            HAHA LMAO!
          </span>
        </div>
      </div>
    </div>
  );
}
