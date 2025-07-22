import { Product, Order, OrderData } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const exponentialBackoff = (attempt: number) => BASE_DELAY * Math.pow(2, attempt);

async function fetchWithRetry<T>(
  url: string, 
  options: RequestInit = {}, 
  retries = MAX_RETRIES
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      const delayMs = exponentialBackoff(MAX_RETRIES - retries);
      console.log(`Retrying request in ${delayMs}ms... (${retries} retries left)`);
      await delay(delayMs);
      return fetchWithRetry<T>(url, options, retries - 1);
    }
    throw error;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const products = await fetchWithRetry<Product[]>(`${API_BASE_URL}/products`);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to load products. Please try again.');
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const product = await fetchWithRetry<Product>(`${API_BASE_URL}/products/${id}`);
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to load product details. Please try again.');
  }
}

export async function createOrder(orderData: OrderData): Promise<Order> {
  try {
    const order = await fetchWithRetry<Order>(`${API_BASE_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return order;
  } catch (error) {
    console.error('Failed to create order:', error);
    throw new Error('Failed to place order. Please try again.');
  }
} 