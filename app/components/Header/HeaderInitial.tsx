import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import HeaderDropdown from "./HeaderDropdown";

export default function HeaderInitial() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-6">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="text-3xl font-bold text-red-600 hover:text-red-500 transition-colors"
            >
              OMNI
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <HeaderDropdown variant="initial" />
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
              <div className="flex flex-col space-y-4 text-white">
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
