"use client";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen relative"
      >
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-b from-black via-black to-red-950/20 pointer-events-none" />

        {/* Content */}
        <div className="relative">
          <HeroSection />
          <FeaturesSection />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
