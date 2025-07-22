"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/products', label: 'Products', icon: '➕' },
  { href: '/checkout/MANGO123', label: 'Checkout', icon: '🛒' },
];

export default function ClientNavBar({ bottom }: { bottom?: boolean }) {
  const pathname = usePathname();
  if (bottom) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex justify-around p-2 z-50 md:hidden">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center text-xs font-medium px-2 py-1 rounded transition-colors min-w-[64px] ${
              pathname === link.href
                ? 'text-primary'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </footer>
    );
  }
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40 h-16 flex items-center px-4">
      <h1 className="text-2xl font-bold text-primary flex-1">ChipChip Live</h1>
      <div className="flex gap-4">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-medium px-2 py-1 rounded transition-colors ${
              pathname === link.href
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary hover:text-primary'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
} 