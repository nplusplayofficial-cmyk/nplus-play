'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', icon: '🏠', path: '/' },
  { name: 'Activity', icon: '📊', path: '/activity' },
  { name: 'Bonus', icon: '🎁', path: '/bonus' },
  { name: 'Promotion', icon: '🔥', path: '/promotion' },
  { name: 'Account', icon: '👤', path: '/account' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 px-2">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            className={`flex flex-col items-center text-xs transition ${
              isActive ? 'text-gold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="mt-0.5">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
