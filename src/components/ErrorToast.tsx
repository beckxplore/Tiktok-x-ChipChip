import React, { useEffect, useState } from 'react';

interface ErrorToastProps {
  message: string;
  onDismiss: () => void;
  onRetry?: () => void;
}

export default function ErrorToast({ message, onDismiss, onRetry }: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for animation to complete
    }, 5000); // Auto dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="bg-error text-white rounded-lg shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-body">{message}</span>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="min-h-touch px-3 py-1 bg-white bg-opacity-20 rounded text-small font-medium hover:bg-opacity-30 transition-colors"
            >
              Retry
            </button>
          )}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onDismiss, 300);
            }}
            className="min-h-touch w-6 h-6 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 