'use client';

import { useAuth } from '@/lib/firebase/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to N+ PLAY</h1>
      <p className="text-xl mb-8">The future of high‑frequency gaming.</p>

      {user ? (
        <div>
          <p className="text-lg">You are logged in as {user.displayName || user.email}.</p>
          <Link
            href="/game/wingo"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Play WINGO (coming soon)
          </Link>
        </div>
      ) : (
        <div className="space-x-4">
          <Link href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Log In
          </Link>
          <Link href="/register" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Register
          </Link>
          <button
            onClick={async () => {
              const { signInAnonymously } = await import('@/lib/firebase/auth');
              await signInAnonymously();
            }}
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Play as Guest
          </button>
        </div>
      )}
    </div>
  );
}
