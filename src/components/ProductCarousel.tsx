import React from 'react';
import { Product } from '../types';
import { useLocalization } from '../hooks/useLocalization';

interface ProductCarouselProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export default function ProductCarousel({ products, onProductSelect }: ProductCarouselProps) {
  const { t } = useLocalization();

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-text-secondary">{t('cart.empty')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductSelect(product)}
            className="bg-surface rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow min-h-touch"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {product.groupProgress && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-black bg-opacity-50 rounded-full p-1">
                    <div className="flex justify-between text-xs text-white mb-1 px-2">
                      <span>Group</span>
                      <span>{product.groupProgress.current}/{product.groupProgress.target}</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-30 rounded-full h-1">
                      <div
                        className="bg-accent-500 h-1 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (product.groupProgress.current / product.groupProgress.target) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-3">
              <h3 className="font-medium text-text-primary text-body mb-1 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-primary-500">
                  ${product.price.toFixed(2)}
                </span>
                {product.type === 'variant' && (
                  <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded">
                    {product.variants?.length || 0} options
                  </span>
                )}
              </div>
              {product.unit && (
                <p className="text-xs text-text-secondary mt-1">
                  per {product.unit}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 