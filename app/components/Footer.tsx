"use client";
import { motion } from "framer-motion";
import { Github, Code2, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/80">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent" />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-red-600">OMNI</h2>
              <p className="text-gray-400 mt-2">
                A playground for testing and showcasing components.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {["Components", "Documentation", "Experiments"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Code2 size={16} />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold">Connect</h3>
            <Link
              href="https://github.com/Skullmc1"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 w-fit"
            >
              <div className="relative p-2">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Github className="w-6 h-6 text-gray-400 group-hover:text-white relative z-10 transition-colors duration-300" />
              </div>
              <span className="text-gray-400 group-hover:text-red-500 transition-colors duration-300">
                @Skullmc1
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-x-0 -top-4 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} OMNI. All rights reserved.
            </p>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-600 animate-pulse" />
              <span>by Skullmc1</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
