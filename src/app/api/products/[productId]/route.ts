import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;
  // return a simple or variant example for testing
  return NextResponse.json({
    id: productId,
    name: productId === 'TSHIRT' ? 'Cool Tee' : 'Test Mango',
    image: '/vercel.svg',
    price: 150,
    type: productId === 'TSHIRT' ? 'variant' : 'simple',
    unit: 'kg',
    variants:
      productId === 'TSHIRT'
        ? [
            { name: 'Size', options: ['S', 'M', 'L'] },
            { name: 'Color', options: ['Red', 'Blue'] }
          ]
        : [],
    groupProgress: { current: 2, target: 5 }
  });
}
