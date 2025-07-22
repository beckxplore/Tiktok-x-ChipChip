import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // …your existing logic…
  const products = [/* … */];
  return NextResponse.json(products);
}
