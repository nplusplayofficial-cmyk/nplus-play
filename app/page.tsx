'use client';

import { useAuth } from '@/lib/firebase/AuthContext';
import Link from 'next/link';
import GameCard from '@/components/ui/GameCard';

const games = [
  { name: 'WINGO', icon: '🎰', rtp: '96.64%', link: '/game/wingo', popular: true },
  { name: 'K3', icon: '🎲', rtp: '96.20%', link: '#', popular: false },
  { name: '5D', icon: '🎯', rtp: '96.50%', link: '#', popular: false },
  { name: 'TRX WIN GO', icon: '🔗', rtp: '97.10%', link: '#', popular: false },
  { name: 'AVIATOR', icon: '✈️', rtp: '97.06%', link: '#', popular: true },
  { name: 'VORTEX', icon: '🌀', rtp: '97.65%', link: '#', popular: false },
  { name: 'CHICKEN ROAD 2', icon: '🐔', rtp: '96.46%', link: '#', popular: false },
  { name: 'CRAZY TIME', icon: '🎡', rtp: '96.00%', link: '#', popular: false },
];

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold gold-text mb-4">
          N+ PLAY
        </h1>
        <p className="text-lg text-gray-400">The future of high‑frequency gaming.</p>
        {user && (
          <p className="mt-2 text-sm text-gray-300">
            Welcome back, {user.displayName || user.email}!
          </p>
        )}
      </section>

      {/* Categories (Daman-style tabs) */}
      <div className="flex gap-6 justify-center mb-8 text-sm font-medium">
        <span className="text-gold border-b-2 border-gold pb-1">Popular</span>
        <span className="text-gray-400 hover:text-white cursor-pointer">Lottery</span>
        <span className="text-gray-400 hover:text-white cursor-pointer">Casino</span>
        <span className="text-gray-400 hover:text-white cursor-pointer">Slots</span>
        <span className="text-gray-400 hover:text-white cursor-pointer">Rummy</span>
      </div>

      {/* Game Cards Grid */}
      <div className="container mx-auto px-4">
        <div className="game-grid">
          {games.map((game) => (
            <GameCard
              key={game.name}
              name={game.name}
              icon={game.icon}
              rtp={game.rtp}
              link={game.link}
              popular={game.popular}
            />
          ))}
        </div>
      </div>

      {/* Top Winners (like Daman) */}
      <div className="container mx-auto px-4 mt-12">
        <h3 className="text-xl gold-text mb-4">🏆 Today's Top Winners</h3>
        <div className="glass-card p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">1. Mem***JVN</span>
            <span className="text-gold">+₱933,520</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">2. Su***aj</span>
            <span className="text-gold">+₱748,205</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">3. Kap***oor</span>
            <span className="text-gold">+₱490,980</span>
          </div>
        </div>
      </div>
    </div>
  );
}
