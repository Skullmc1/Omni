"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Trash2,
  Share,
  Edit3,
  MoreHorizontal,
  Sparkles,
  Download,
  Link,
} from "lucide-react";

interface Position {
  x: number;
  y: number;
}

interface ContextMenuProps {
  children: React.ReactNode;
}

export default function ContextMenu({ children }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;

    // Adjust position if too close to window edges
    const menuWidth = 220; // Approximate menu width
    const menuHeight = 300; // Approximate menu height

    const adjustedX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
    const adjustedY = y + menuHeight > window.innerHeight ? y - menuHeight : y;

    setPosition({ x: adjustedX, y: adjustedY });
    setIsOpen(true);
  }, []);

  const handleClick = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);

  const MenuItem = ({
    icon: Icon,
    label,
    onClick,
    hasSubmenu,
    submenuItems,
  }: {
    icon: any;
    label: string;
    onClick?: () => void;
    hasSubmenu?: boolean;
    submenuItems?: { icon: any; label: string; onClick: () => void }[];
  }) => {
    const isSubmenuOpen = activeSubmenu === label;

    return (
      <div
        className="relative"
        onMouseEnter={() => hasSubmenu && setActiveSubmenu(label)}
        onMouseLeave={() => hasSubmenu && setActiveSubmenu(null)}
      >
        <motion.div
          className="px-4 py-2 flex items-center space-x-3 hover:bg-white/10
                     transition-colors cursor-pointer group"
          onClick={onClick}
          whileHover={{ x: 5 }}
        >
          <Icon className="w-4 h-4 text-red-400 group-hover:text-red-300" />
          <span className="text-gray-200 group-hover:text-white">{label}</span>
          {hasSubmenu && (
            <MoreHorizontal className="w-4 h-4 ml-auto text-gray-400" />
          )}
        </motion.div>

        {/* Submenu */}
        {hasSubmenu && submenuItems && (
          <AnimatePresence>
            {isSubmenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute left-full top-0 ml-2 w-48
                         bg-gray-900/90 backdrop-blur-md border border-red-950/50
                         rounded-lg overflow-hidden shadow-xl"
              >
                {submenuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    onClick={item.onClick}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <div onContextMenu={handleContextMenu}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ left: position.x, top: position.y }}
            className="fixed z-50 w-56 bg-gray-900/90 backdrop-blur-md
                     border border-red-950/50 rounded-lg overflow-hidden shadow-xl"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-red-900/5" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

            {/* Menu items */}
            <div className="relative py-2 space-y-1">
              <MenuItem
                icon={Copy}
                label="Copy"
                onClick={() => console.log("Copy")}
              />
              <MenuItem
                icon={Edit3}
                label="Edit"
                onClick={() => console.log("Edit")}
              />
              <MenuItem
                icon={Share}
                label="Share"
                hasSubmenu
                submenuItems={[
                  {
                    icon: Link,
                    label: "Copy Link",
                    onClick: () => console.log("Copy Link"),
                  },
                  {
                    icon: Download,
                    label: "Download",
                    onClick: () => console.log("Download"),
                  },
                ]}
              />

              <div className="my-2 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

              <MenuItem
                icon={Sparkles}
                label="Actions"
                hasSubmenu
                submenuItems={[
                  {
                    icon: Edit3,
                    label: "Customize",
                    onClick: () => console.log("Customize"),
                  },
                  {
                    icon: Download,
                    label: "Export",
                    onClick: () => console.log("Export"),
                  },
                ]}
              />

              <MenuItem
                icon={Trash2}
                label="Delete"
                onClick={() => console.log("Delete")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
