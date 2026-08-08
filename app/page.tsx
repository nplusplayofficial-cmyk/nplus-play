'use client';

import { useAuth } from '@/lib/firebase/AuthContext';
import Link from 'next/link';
import GameCard3D from '@/components/ui/GameCard3D';

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
    <div className="min-h-screen text-white pb-8 perspective-3d">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-6xl md:text-7xl gold-text font-black mb-4 tracking-wider">
          N+ PLAY
        </h1>
        <p className="text-lg text-gray-300 font-light tracking-widest">
          The future of high‑frequency gaming.
        </p>
        {user && (
          <p className="mt-2 text-sm text-gray-400">
            Welcome back, <span className="text-gold">{user.displayName || user.email}</span>!
          </p>
        )}
      </section>

      {/* Categories */}
      <div className="flex gap-8 justify-center mb-10 text-sm font-medium tracking-wider">
        <span className="gold-text border-b-2 border-gold pb-1">Popular</span>
        <span className="text-gray-400 hover:text-white cursor-pointer transition">Lottery</span>
        <span className="text-gray-400 hover:text-white cursor-pointer transition">Casino</span>
        <span className="text-gray-400 hover:text-white cursor-pointer transition">Slots</span>
        <span className="text-gray-400 hover:text-white cursor-pointer transition">Rummy</span>
      </div>

      {/* Game Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {games.map((game) => (
            <GameCard3D
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

      {/* Top Winners */}
      <div className="container mx-auto px-4 mt-14">
        <h3 className="text-2xl gold-text font-bold mb-4 tracking-wider">🏆 Today's Top Winners</h3>
        <div className="glass-card-3d p-5 space-y-3 border border-gold/10">
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-300">1. Mem***JVN</span>
            <span className="gold-text font-bold">+₱933,520</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-300">2. Su***aj</span>
            <span className="gold-text font-bold">+₱748,205</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-300">3. Kap***oor</span>
            <span className="gold-text font-bold">+₱490,980</span>
          </div>
        </div>
      </div>
    </div>
  );
}
