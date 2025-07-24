import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      id: 'MANGO123',
      name: 'Test Mango',
      image: '/vercel.svg',
      price: 150,
      type: 'simple',
      unit: 'kg',
      variants: [],
      groupProgress: { current: 2, target: 5 },
    },
    {
      id: 'TSHIRT',
      name: 'Cool Tee',
      image: '/vercel.svg',
      price: 150,
      type: 'variant',
      unit: 'pcs',
      variants: [
        { name: 'Size', options: ['S', 'M', 'L'] },
        { name: 'Color', options: ['Red', 'Blue'] },
      ],
      groupProgress: { current: 1, target: 3 },
    },
  ];
  return NextResponse.json(products);
}
