import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  context: { params: { productId: string } }
) {
  const { productId } = context.params;
  // …fetch or build your single‐product payload…
  return NextResponse.json({ id: productId });
}
