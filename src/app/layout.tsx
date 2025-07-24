import './globals.css';
import Link from 'next/link';
import { Home, BarChart2, Package, ShoppingCart } from 'lucide-react';

export const metadata = {
  title: 'ChipChip Live',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-text-primary flex flex-col">
        {/* HEADER */}
        <nav className="sticky top-0 bg-surface shadow-md z-10 h-16 flex items-center px-6">
          <h1 className="text-2xl font-bold text-primary flex-1">ChipChip Live</h1>
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="/" className="hover:text-primary text-text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-primary text-text-secondary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/products" className="hover:text-primary text-text-secondary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/checkout/MANGO123" className="hover:text-primary text-text-secondary">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>

        {/* MAIN */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* FOOTER TABS (mobile) */}
        <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t flex justify-around p-2 md:hidden">
          <Link href="/" className="flex flex-col items-center text-text-secondary hover:text-primary">
            <Home size={20} /><span className="text-xs">Home</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center text-text-secondary hover:text-primary">
            <BarChart2 size={20} /><span className="text-xs">Dashboard</span>
          </Link>
          <Link href="/dashboard/products" className="flex flex-col items-center text-text-secondary hover:text-primary">
            <Package size={20} /><span className="text-xs">Products</span>
          </Link>
          <Link href="/checkout/MANGO123" className="flex flex-col items-center text-text-secondary hover:text-primary">
            <ShoppingCart size={20} /><span className="text-xs">Checkout</span>
          </Link>
        </footer>
      </body>
    </html>
  );
}
