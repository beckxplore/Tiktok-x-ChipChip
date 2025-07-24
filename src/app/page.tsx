'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-background p-4 space-y-6">
      <h2 className="text-4xl font-bold text-primary">ChipChip Live</h2>
      <div className="w-full max-w-sm space-y-4">
        <Link href="/dashboard">
          <div className="bg-primary text-white py-3 rounded-lg shadow-md text-center text-lg font-semibold">
            Dashboard
          </div>
        </Link>
        <Link href="/dashboard/products">
          <div className="bg-secondary text-white py-3 rounded-lg shadow-md text-center text-lg font-semibold">
            Manage Products
          </div>
        </Link>
        <Link href="/checkout/MANGO123">
          <div className="bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg shadow-md text-center text-lg font-semibold">
            Test Checkout
          </div>
        </Link>
      </div>
    </div>
  );
}
