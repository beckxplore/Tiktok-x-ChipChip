// src/app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // → use const
  const products: Array<{ id: string; name: string; price: number }> = [
    { id: 'MANGO123', name: 'Test Mango', price: 150 },
    // …
  ];

  return NextResponse.json(products);
}
