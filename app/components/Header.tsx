"use client";

import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("header");

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
          {t("features")}
        </Link>
        <Link href="/how-it-works" className="text-gray-700 hover:text-yellow-600 transition-colors">
          {t("howItWorks")}
        </Link>
        <Link href="/benefits" className="text-gray-700 hover:text-yellow-600 transition-colors">
          {t("prediction")}
        </Link>
      </nav>
      
      <div className="hidden md:flex items-center gap-4">
        <LanguageSwitcher />
        <Link href="/signin" className="text-gray-700 hover:text-yellow-600 transition-colors">
          {t("signIn")}
        </Link>
        <Link 
          href="/get-started" 
          className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors"
        >
          {t("getStarted")}
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
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
          <nav className="flex flex-col p-4 space-y-4">
            <Link 
              href="/features" 
              className="text-gray-700 hover:text-yellow-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("features")}
            </Link>
          
            <Link 
              href="/how-it-works" 
              className="text-gray-700 hover:text-yellow-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("howItWorks")}
            </Link>
            <Link 
              href="/benefits" 
              className="text-gray-700 hover:text-yellow-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("prediction")}
            </Link>
          
            <div className="border-t pt-4 flex flex-col gap-2">
              <div className="flex justify-center pb-2">
                <LanguageSwitcher />
              </div>
              <Link 
                href="/signin" 
                className="text-gray-700 hover:text-yellow-600 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("signIn")}
              </Link>
              <Link 
                href="/get-started" 
                className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("getStarted")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
