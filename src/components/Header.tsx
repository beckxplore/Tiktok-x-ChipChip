import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface HeaderProps {
  onLanguageToggle: () => void;
  language: string;
}

export default function Header({ onLanguageToggle, language }: HeaderProps) {
  const { t } = useLocalization();

  return (
    <header className="bg-surface shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <h1 className="text-h2 font-semibold text-text-primary">
            ChipChip
          </h1>
        </div>

        {/* Right side - Language toggle and cart */}
        <div className="flex items-center space-x-3">
          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            className="min-h-touch px-3 py-2 bg-gray-100 rounded-md text-small font-medium text-text-secondary hover:bg-gray-200 transition-colors"
          >
            {language === 'en' ? 'አማ' : 'EN'}
          </button>

          {/* Cart Icon */}
          <button className="min-h-touch w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 