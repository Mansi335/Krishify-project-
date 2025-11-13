"use client";

import { useLocale } from 'next-intl';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // Set cookie for locale preference
    // next-intl middleware will read this cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Reload page to apply new locale
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
        aria-label="Change language"
      >
        <span className="text-sm font-medium">
          {locale === 'hi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-20">
            <button
              onClick={() => switchLocale('en')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                locale === 'en' ? 'bg-yellow-50 text-yellow-700' : 'text-gray-700'
              }`}
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => switchLocale('hi')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                locale === 'hi' ? 'bg-yellow-50 text-yellow-700' : 'text-gray-700'
              }`}
            >
              🇮🇳 हिंदी
            </button>
          </div>
        </>
      )}
    </div>
  );
}

