import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCarousel from '../ProductCarousel';
import { Product } from '../../types';

// Mock the localization hook
jest.mock('../../hooks/useLocalization', () => ({
  useLocalization: () => ({
    t: (key: string) => key,
    language: 'en',
    setLanguage: jest.fn(),
    isRTL: false,
  }),
}));

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Test Product',
    type: 'simple',
    price: 29.99,
    unit: 'kg',
    image: '/test-image.jpg',
  },
  {
    id: '2',
    name: 'Variant Product',
    type: 'variant',
    price: 49.99,
    image: '/test-image-2.jpg',
    variants: [
      {
        name: 'Size',
        options: [
          { value: 'S', price: 49.99 },
          { value: 'M', price: 54.99 },
        ],
      },
    ],
  },
];

describe('ProductCarousel', () => {
  it('renders empty state when no products', () => {
    const mockOnProductSelect = jest.fn();
    render(<ProductCarousel products={[]} onProductSelect={mockOnProductSelect} />);
    
    expect(screen.getByText('cart.empty')).toBeInTheDocument();
  });

  it('renders products correctly', () => {
    const mockOnProductSelect = jest.fn();
    render(<ProductCarousel products={mockProducts} onProductSelect={mockOnProductSelect} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Variant Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('calls onProductSelect when product is clicked', () => {
    const mockOnProductSelect = jest.fn();
    render(<ProductCarousel products={mockProducts} onProductSelect={mockOnProductSelect} />);
    
    const firstProduct = screen.getByText('Test Product').closest('div');
    fireEvent.click(firstProduct!);
    
    expect(mockOnProductSelect).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('shows variant options count for variant products', () => {
    const mockOnProductSelect = jest.fn();
    render(<ProductCarousel products={mockProducts} onProductSelect={mockOnProductSelect} />);
    
    expect(screen.getByText('1 options')).toBeInTheDocument();
  });
}); 