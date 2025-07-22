import React, { useEffect, useState } from 'react';
import { Order } from '../types';
import { useLocalization } from '../hooks/useLocalization';

interface ConfirmationModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmationModal({ order, isOpen, onClose }: ConfirmationModalProps) {
  const { t } = useLocalization();
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowCheckmark(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowCheckmark(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-surface rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        {/* Success Animation */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {showCheckmark ? (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <h2 className="text-h2 font-semibold text-text-primary mb-2">
            {t('order.success')}
          </h2>
          <p className="text-text-secondary">
            Your order has been placed successfully!
          </p>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h3 className="text-body font-medium text-text-primary mb-3">
            Order Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">{t('order.order_number')}</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Quantity</span>
              <span className="font-medium">{order.quantity}</span>
            </div>
            {order.selectedVariants && Object.keys(order.selectedVariants).length > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Options</span>
                <span className="font-medium text-right">
                  {Object.entries(order.selectedVariants).map(([key, value]) => (
                    <div key={key}>{key}: {value}</div>
                  ))}
                </span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-body font-medium text-text-primary">
                  {t('order.total')}
                </span>
                <span className="text-xl font-bold text-primary-500">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h3 className="text-body font-medium text-text-primary mb-3">
            Delivery Information
          </h3>
          <div className="space-y-1 text-small text-text-secondary">
            <div>{order.name}</div>
            <div>{order.phone}</div>
            <div>{order.address}</div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full min-h-touch bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
} 