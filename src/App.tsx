import React, { useEffect, useState } from 'react';
import { TikTokJumpSDK } from './utils/tiktok-sdk';
import { Product, Order } from './types';
import { fetchProducts, createOrder } from './api/services';
import Header from './components/Header';
import ProductCarousel from './components/ProductCarousel';
import ProductDetailModal from './components/ProductDetailModal';
import BuyerInfoForm from './components/BuyerInfoForm';
import ConfirmationModal from './components/ConfirmationModal';
import ErrorToast from './components/ErrorToast';
import { useLocalization } from './hooks/useLocalization';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language, setLanguage } = useLocalization();

  // TikTok Jump SDK Integration
  useEffect(() => {
    const initTikTokSDK = async () => {
      try {
        await TikTokJumpSDK.init();
        TikTokJumpSDK.onPageReady(() => {
          console.log('TikTok Jump page ready');
          loadProducts();
        });
        TikTokJumpSDK.onClose(() => {
          console.log('TikTok Jump closing');
          // Cleanup timers and state
        });
        TikTokJumpSDK.onShare(() => {
          console.log('TikTok Jump share event');
          // Analytics hook
        });
      } catch (err) {
        console.error('Failed to initialize TikTok SDK:', err);
        setError('Failed to initialize app');
      }
    };

    initTikTokSDK();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(t('error.loading_products'));
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const handleOrderSubmit = async (orderData: any) => {
    try {
      const order = await createOrder(orderData);
      setCurrentOrder(order);
      setIsDetailModalOpen(false);
      setIsConfirmationOpen(true);
      
      // Analytics: purchase event
      TikTokJumpSDK.trackEvent('purchase', {
        product_id: orderData.productId,
        value: orderData.total
      });
    } catch (err) {
      setError(t('error.order_failed'));
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    setCurrentOrder(null);
  };

  const handleDismissError = () => {
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-text-secondary">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header 
        onLanguageToggle={() => setLanguage(language === 'en' ? 'am' : 'en')}
        language={language}
      />
      
      <main className="pb-20">
        <ProductCarousel 
          products={products}
          onProductSelect={handleProductSelect}
        />
      </main>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          onSubmit={handleOrderSubmit}
        />
      )}

      {currentOrder && (
        <ConfirmationModal
          order={currentOrder}
          isOpen={isConfirmationOpen}
          onClose={handleCloseConfirmation}
        />
      )}

      {error && (
        <ErrorToast
          message={error}
          onDismiss={handleDismissError}
        />
      )}
    </div>
  );
} 