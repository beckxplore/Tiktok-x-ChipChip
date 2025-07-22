export interface Product {
  id: string;
  name: string;
  type: 'simple' | 'variant';
  unit?: string;
  variants?: Variant[];
  price: number;
  image: string;
  description?: string;
  groupProgress?: {
    current: number;
    target: number;
  };
}

export interface Variant {
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  value: string;
  price: number;
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
  name: string;
  phone: string;
  address: string;
  total: number;
  timestamp: number;
}

export interface BuyerInfo {
  name: string;
  phone: string;
  address: string;
}

export interface OrderData {
  productId: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
  buyerInfo: BuyerInfo;
  total: number;
} 