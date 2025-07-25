"use client";

import React, { useState } from 'react';

interface KeywordManagerProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

export const KeywordManager: React.FC<KeywordManagerProps> = ({ keywords, setKeywords }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const newKeyword = input.trim().toUpperCase();
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
    }
    setInput('');
  };

  const handleRemove = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Add keyword"
          className="border px-2 py-1 rounded"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map(kw => (
          <span key={kw} className="inline-flex items-center bg-gray-200 px-2 py-1 rounded">
            {kw}
            <button
              type="button"
              onClick={() => handleRemove(kw)}
              className="ml-2 text-red-500 hover:text-red-700"
              aria-label={`Remove ${kw}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}; 