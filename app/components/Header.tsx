"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
          <span className="text-black font-bold text-xl">K</span>
        </div>
        <span className="text-2xl font-bold text-black">KRISHIFY</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/features" className="text-gray-700 hover:text-yellow-600 transition-colors">
          Features
        </Link>
        <Link href="/how-it-works" className="text-gray-700 hover:text-yellow-600 transition-colors">
          How It Works
        </Link>
        <Link href="/benefits" className="text-gray-700 hover:text-yellow-600 transition-colors">
           Prediction
        </Link>
      </nav>
      
      <div className="hidden md:flex items-center gap-4">
        <Link href="/signin" className="text-gray-700 hover:text-yellow-600 transition-colors">
          Sign In
        </Link>
        <Link 
          href="/get-started" 
          className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
        >
          Get Started
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              href="/features" 
              className="text-gray-700 hover:text-yellow-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
          
            <Link 
              href="/how-it-works" 
              className="text-gray-700 hover:text-yellow-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/benefits" 
              className="text-gray-700 hover:text-yellow-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
                 Prediction
            </Link>
          
            <div className="border-t pt-4 flex flex-col gap-2">
              <Link 
                href="/signin" 
                className="text-gray-700 hover:text-yellow-600 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/get-started" 
                className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

