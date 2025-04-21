"use client";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import TrollLabel from "./TrollLabel";

interface DropdownProps {
  variant: "initial" | "sticky";
}

export default function HeaderDropdown({ variant }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showTroll, setShowTroll] = useState(false);

  const baseButtonClass = "flex items-center space-x-2 cursor-pointer relative";
  const baseDropdownClass =
    "absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden";

  const buttonClasses = {
    initial: `${baseButtonClass} text-white hover:text-red-500 transition-colors`,
    sticky: `${baseButtonClass} text-white/90 hover:text-red-500 transition-colors`,
  };

  const dropdownClasses = {
    initial: `${baseDropdownClass} bg-black border border-red-950`,
    sticky: `${baseDropdownClass} backdrop-blur-md bg-black/80 border border-red-950/50`,
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(
        () => {
          setIsOpen(false);
          setAttempts((prev) => prev + 1);
        },
        Math.random() * 400 + 200,
      );

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (attempts >= 3 && !isLocked) {
      setIsLocked(true);
      setShowTroll(true);
    }
  }, [attempts]);

  return (
    <>
      <div className="relative" onMouseLeave={() => setIsOpen(false)}>
        <div className="relative px-4 py-2">
          <div
            className={`${buttonClasses[variant]} ${isLocked ? "opacity-50" : ""}`}
            onMouseEnter={() => !isLocked && setIsOpen(true)}
          >
            <span className="relative z-10">Stuff</span>
            <ChevronDown
              size={20}
              className={`transform transition-transform duration-300 relative z-10 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {!isLocked && (
          <div
            className={`
              ${dropdownClasses[variant]}
              transform transition-all duration-300 origin-top
              ${
                isOpen
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-0 -translate-y-4 pointer-events-none"
              }
            `}
          >
            <div className="py-2">
              {[
                { href: "/components", label: "Components" },
                { href: "/docs", label: "Documentation" },
                { href: "/experiments", label: "Experiments" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block px-4 py-2 text-sm
                    ${variant === "initial" ? "text-white/90" : "text-white/80"}
                    hover:bg-red-950/30 hover:text-red-500
                    transition-colors duration-200
                    ${index !== 0 && "border-t border-red-950/30"}
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Troll Label */}
      {showTroll && <TrollLabel onComplete={() => setShowTroll(false)} />}
    </>
  );
}
