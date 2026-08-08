'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/AuthContext';
import { getBalance } from '@/lib/wallet/engine';
import { signOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (user) {
      getBalance(user.uid).then(setBalance);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return <div className="text-center text-white py-12">Loading...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="text-white max-w-md mx-auto">
      <h1 className="text-2xl gold-text font-bold mb-6">👤 My Account</h1>

      <div className="glass-card p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-400">Name</p>
          <p className="text-lg font-semibold">{user.displayName || 'Anonymous'}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Email</p>
          <p className="text-lg font-semibold">{user.email || 'Guest'}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Balance</p>
          <p className="text-3xl font-bold gold-text">💰 {balance} coins</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">User ID</p>
          <p className="text-xs text-gray-500 break-all">{user.uid}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
}
