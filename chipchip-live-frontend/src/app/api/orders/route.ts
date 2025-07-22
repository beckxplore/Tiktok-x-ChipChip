import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  // You can log or process the order here if needed
  return NextResponse.json({ success: true, order: data });
} 