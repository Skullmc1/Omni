"use client";
import { useState } from "react";
import SubtlePopup from "./demos/SubtlePopup";
import ChatBot from "./ChatBot";
import SpinnerCollection from "./SpinnerCollection";
export default function ComponentsPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <div className="container mx-auto flex items-center justify-center">
        {" "}
        {/* Demo Trigger */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-4 py-2 bg-red-600/20 text-red-500 rounded-lg
                   hover:bg-red-600/30 transition-colors"
        >
          Open Popup
        </button>
        <SubtlePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          width="max-w-xl"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Demo Popup</h2>
            <p className="text-gray-300">This is a popup.</p>
            <div className="bg-white/5 rounded-lg p-4">
              <code className="text-sm text-gray-400">
                some more content here....
              </code>
            </div>
          </div>
        </SubtlePopup>
        <ChatBot />
      </div>
      <SpinnerCollection />
    </div>
  );
}
