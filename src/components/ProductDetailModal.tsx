import React, { useState } from 'react';
import { Product, OrderData } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import BuyerInfoForm from './BuyerInfoForm';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: OrderData) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onSubmit
}: ProductDetailModalProps) {
  const { t } = useLocalization();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [buyerInfo, setBuyerInfo] = useState({ name: '', phone: '', address: '' });
  const [currentStep, setCurrentStep] = useState<'product' | 'buyer'>('product');

  if (!isOpen) return null;

  const calculateTotal = () => {
    let basePrice = product.price;
    
    if (product.type === 'variant') {
      // Calculate price based on selected variants
      product.variants?.forEach(variant => {
        const selectedValue = selectedVariants[variant.name];
        if (selectedValue) {
          const option = variant.options.find(opt => opt.value === selectedValue);
          if (option) {
            basePrice = option.price;
          }
        }
      });
    }
    
    return basePrice * quantity;
  };

  const handleProductSubmit = () => {
    if (product.type === 'variant') {
      // Validate all variants are selected
      const allSelected = product.variants?.every(variant => 
        selectedVariants[variant.name]
      );
      if (!allSelected) {
        return; // Show error or prevent submission
      }
    }
    setCurrentStep('buyer');
  };

  const handleBuyerSubmit = (info: any) => {
    const orderData: OrderData = {
      productId: product.id,
      quantity,
      selectedVariants: product.type === 'variant' ? selectedVariants : undefined,
      buyerInfo: info,
      total: calculateTotal()
    };
    onSubmit(orderData);
  };

  const handleBack = () => {
    setCurrentStep('product');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-surface rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-h2 font-semibold text-text-primary">
            {currentStep === 'product' ? product.name : t('form.delivery_info')}
          </h2>
          <button
            onClick={onClose}
            className="min-h-touch w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {currentStep === 'product' ? (
            <div className="p-4">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="mb-6">
                <h3 className="text-h2 font-semibold text-text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-text-secondary mb-4">
                  {product.description || 'No description available'}
                </p>
                <div className="text-2xl font-bold text-primary-500 mb-4">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Product Options */}
              {product.type === 'simple' ? (
                <div className="mb-6">
                  <label className="block text-body font-medium text-text-primary mb-2">
                    {t('product.quantity')} ({product.unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full min-h-touch px-4 py-3 border border-gray-300 rounded-md text-body"
                  />
                </div>
              ) : (
                <div className="mb-6 space-y-4">
                  {product.variants?.map((variant) => (
                    <div key={variant.name}>
                      <label className="block text-body font-medium text-text-primary mb-2">
                        {variant.name}
                      </label>
                      <select
                        value={selectedVariants[variant.name] || ''}
                        onChange={(e) => setSelectedVariants({
                          ...selectedVariants,
                          [variant.name]: e.target.value
                        })}
                        className="w-full min-h-touch px-4 py-3 border border-gray-300 rounded-md text-body"
                      >
                        <option value="">{t(`product.select_${variant.name.toLowerCase()}`)}</option>
                        {variant.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.value} - ${option.price.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-body font-medium text-text-primary">
                    {t('order.total')}
                  </span>
                  <span className="text-xl font-bold text-primary-500">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={handleProductSubmit}
                className="w-full min-h-touch bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors"
              >
                {t('product.add_to_cart')}
              </button>
            </div>
          ) : (
            <BuyerInfoForm
              onSubmit={handleBuyerSubmit}
              onBack={handleBack}
              total={calculateTotal()}
            />
          )}
        </div>
      </div>
    </div>
  );
} 