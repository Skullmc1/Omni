"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, AlertCircle } from "lucide-react";
import { geminiAPI } from "@/app/utils/gemini";
import LoadingDots from "./LoadingDots";
import ReactMarkdown from "react-markdown";

interface Message {
  content: string;
  isUser: boolean;
  error?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        // Headers
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold mb-2">{children}</h3>
        ),

        // Text styling
        em: ({ children }) => <em className="italic">{children}</em>,
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        del: ({ children }) => <del className="line-through">{children}</del>,

        // Lists
        ul: ({ children }) => (
          <ul className="list-disc ml-4 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal ml-4 space-y-1">{children}</ol>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-red-600 pl-4 my-2 italic text-gray-300">
            {children}
          </blockquote>
        ),

        // Code blocks
        code: ({ children }) => (
          <code className="bg-black/30 rounded px-1 py-0.5 font-mono text-sm">
            {children}
          </code>
        ),

        // Links
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 underline"
          >
            {children}
          </a>
        ),

        // Paragraphs
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { content: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      console.log("Sending message:", userMessage);
      const response = await geminiAPI.sendMessage(userMessage);
      console.log("Received response:", response);
      setMessages((prev) => [...prev, { content: response, isUser: false }]);
    } catch (error) {
      console.error("Error in chat:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          content:
            "I encountered an error. Please try again or rephrase your question.",
          isUser: false,
          error: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-gray-900
                     shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-red-900/20 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">OMNI</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-white
                         hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-900/20 border-b border-red-900/20"
                >
                  <div className="p-3 text-sm text-red-400 flex items-center space-x-2">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-red-600 text-white"
                        : message.error
                          ? "bg-red-900/20 text-red-400"
                          : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {message.isUser ? (
                      message.content
                    ) : (
                      <MarkdownMessage content={message.content} />
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg">
                    <LoadingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-red-900/20"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the almighty OMNI..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="p-2 bg-red-600 text-white rounded-lg
                           hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
