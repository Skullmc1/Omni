"use client";
import { Layout, Sparkles } from "lucide-react";
import PhysicsSimulation from "./PhysicsSimulation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black" />
        <motion.div
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 relative"
          >
            {/* Decorative line */}
            <div className="absolute -left-4 top-0 w-1 h-32 bg-gradient-to-b from-red-600 to-transparent" />

            <h1 className="text-8xl font-bold text-white leading-tight relative">
              <span className="relative inline-block">
                <span className="relative z-10">OMNI</span>
                <motion.span
                  className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 blur-xl opacity-50"
                  animate={{
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </span>
              <span className="block text-2xl text-gray-400 mt-4 font-normal">
                Component Testing Ground
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-xl max-w-md mt-6 relative"
            >
              Explore, test, and perfect your components in this interactive
              playground.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex space-x-4 mt-8"
            >
              <button className="group relative px-6 py-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg" />
                <div className="absolute inset-0 bg-black rounded-lg transform group-hover:scale-95 transition-transform duration-300" />
                <span className="relative flex items-center space-x-2 text-red-500 group-hover:text-white transition-colors duration-300">
                  <Layout size={20} />
                  <Link href="/components">
                    <span>View Components</span>
                  </Link>
                </span>
              </button>

              <button className="group relative px-6 py-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-lg" />
                <span className="relative flex items-center space-x-2 text-white group-hover:text-red-500 transition-colors duration-300">
                  <Sparkles size={20} />
                  <span>Get Started</span>
                </span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Physics Simulation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-2xl blur-xl" />
            <div className="relative">
              <PhysicsSimulation />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
