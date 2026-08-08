'use client';

import { useAuth } from '@/lib/firebase/AuthContext';
import { signOut } from '@/lib/firebase/auth';
import Link from 'next/link';

export default function Header() {
  const { user, profile } = useAuth();

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">N+ PLAY</Link>
        <div className="flex items-center gap-4">
          {user && profile ? (
            <>
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">💰 {profile.balance} coins</span>
              <span>{user.displayName || user.email}</span>
              <button onClick={() => signOut()} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
