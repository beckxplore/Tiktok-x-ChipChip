import { useState, useCallback } from 'react';

type Language = 'en' | 'am';

interface Translations {
  [key: string]: {
    en: string;
    am: string;
  };
}

const translations: Translations = {
  loading: {
    en: 'Loading...',
    am: 'በመጫን ላይ...'
  },
  'error.loading_products': {
    en: 'Failed to load products',
    am: 'ምርቶችን መጫን አልተሳካምም'
  },
  'error.order_failed': {
    en: 'Failed to place order',
    am: 'ትዕዛዝ ማስቀመጥ አልተሳካምም'
  },
  'product.add_to_cart': {
    en: 'Add to Cart',
    am: 'ወደ ካርት ጨምር'
  },
  'product.quantity': {
    en: 'Quantity',
    am: 'ብዛት'
  },
  'product.select_size': {
    en: 'Select Size',
    am: 'መጠን ይምረጡ'
  },
  'product.select_color': {
    en: 'Select Color',
    am: 'ቀለም ይምረጡ'
  },
  'form.full_name': {
    en: 'Full Name',
    am: 'ሙሉ ስም'
  },
  'form.phone': {
    en: 'Phone Number',
    am: 'ስልክ ቁጥር'
  },
  'form.address': {
    en: 'Delivery Address',
    am: 'የማድረሻ አድራሻ'
  },
  'form.place_order': {
    en: 'Place Order',
    am: 'ትዕዛዝ አስቀምጥ'
  },
  'order.success': {
    en: 'Order Placed Successfully!',
    am: 'ትዕዛዝ በተሳካም ሁኔታ ተሰትሟል!'
  },
  'order.order_number': {
    en: 'Order #',
    am: 'ትዕዛዝ #'
  },
  'order.total': {
    en: 'Total',
    am: 'ጠቅላላ'
  },
  'cart.empty': {
    en: 'No items in cart',
    am: 'በካርት ውስጥ ምንም ነገር የለም'
  },
  'language.english': {
    en: 'English',
    am: 'እንግሊዘኛ'
  },
  'language.amharic': {
    en: 'Amharic',
    am: 'አማርኛ'
  }
};

export function useLocalization() {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  }, [language]);

  const isRTL = language === 'am';

  return {
    t,
    language,
    setLanguage,
    isRTL
  };
} 