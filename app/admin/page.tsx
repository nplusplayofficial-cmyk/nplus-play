'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'admin@nplus.com';
const ADMIN_PASSWORD = 'Nplus2024!';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="glass-card-3d p-8 max-w-md w-full">
          <h1 className="text-3xl gold-text font-bold text-center mb-6">🔐 Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full btn-gold py-3 rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h1 className="text-3xl gold-text font-bold mb-6">📊 Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card-3d p-4 text-center">
          <p className="text-gray-400 text-sm">Today's Revenue</p>
          <p className="text-2xl gold-text font-bold">₱12,450</p>
        </div>
        <div className="glass-card-3d p-4 text-center">
          <p className="text-gray-400 text-sm">Active Users</p>
          <p className="text-2xl gold-text font-bold">1,234</p>
        </div>
        <div className="glass-card-3d p-4 text-center">
          <p className="text-gray-400 text-sm">Total Bets</p>
          <p className="text-2xl gold-text font-bold">8,901</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => router.push('/admin/pl')}
          className="glass-card-3d p-6 text-center hover:border-gold transition"
        >
          <span className="text-3xl">💰</span>
          <p className="mt-2 font-semibold">Profit & Loss</p>
        </button>
        <button
          onClick={() => router.push('/admin/users')}
          className="glass-card-3d p-6 text-center hover:border-gold transition"
        >
          <span className="text-3xl">👥</span>
          <p className="mt-2 font-semibold">User Management</p>
        </button>
        <button
          onClick={() => router.push('/admin/games')}
          className="glass-card-3d p-6 text-center hover:border-gold transition"
        >
          <span className="text-3xl">🎮</span>
          <p className="mt-2 font-semibold">Game Control</p>
        </button>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="glass-card-3d p-6 text-center hover:border-red-500 transition"
        >
          <span className="text-3xl">🚪</span>
          <p className="mt-2 font-semibold text-red-400">Logout</p>
        </button>
      </div>
    </div>
  );
}
