import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import HeaderDropdown from "./HeaderDropdown";

export default function HeaderSticky() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-red-950/50 shadow-lg shadow-red-950/20">
      <div className="container mx-auto px-4">
        <div className="py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors"
            >
              OMNI
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <HeaderDropdown variant="sticky" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pt-4">
              <div className="flex flex-col space-y-4 text-white/90">
                <Link
                  href="/components"
                  className="hover:text-red-500 transition-colors"
                >
                  Components
                </Link>
                <Link
                  href="/docs"
                  className="hover:text-red-500 transition-colors"
                >
                  Documentation
                </Link>
                <Link
                  href="/experiments"
                  className="hover:text-red-500 transition-colors"
                >
                  Experiments
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
