import { NextResponse } from 'next/server';

let products: any[] = [];

export async function POST(req: Request) {
  const data = await req.json();
  const id = Math.random().toString(36).slice(2, 10);
  const product = { ...data, id };
  products.push(product);
  return NextResponse.json(product);
}

export async function GET() {
  // Optionally return all products for testing
  return NextResponse.json(products);
} 