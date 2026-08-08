'use client';

import Link from 'next/link';

export default function PLPage() {
  // Mock data — will connect to Firestore later
  const stats = {
    totalBets: 8901,
    totalRevenue: 12450,
    houseEdge: 4.2,
    topGame: 'WINGO',
  };

  return (
    <div className="text-white">
      <Link href="/admin" className="text-gold hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      
      <h1 className="text-3xl gold-text font-bold mb-6">💰 Profit & Loss</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="glass-card-3d p-4">
          <p className="text-gray-400 text-sm">Total Bets</p>
          <p className="text-2xl font-bold">{stats.totalBets}</p>
        </div>
        <div className="glass-card-3d p-4">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <p className="text-2xl gold-text font-bold">₱{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="glass-card-3d p-4">
          <p className="text-gray-400 text-sm">House Edge</p>
          <p className="text-2xl font-bold text-green-400">{stats.houseEdge}%</p>
        </div>
        <div className="glass-card-3d p-4">
          <p className="text-gray-400 text-sm">Top Game</p>
          <p className="text-2xl font-bold">{stats.topGame}</p>
        </div>
      </div>

      <div className="glass-card-3d p-4">
        <h3 className="font-semibold mb-3">Recent Transactions</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm border-b border-gray-800 pb-2">
            <span>Mem***JVN</span>
            <span className="text-green-400">+₱933,520</span>
          </div>
          <div className="flex justify-between text-sm border-b border-gray-800 pb-2">
            <span>Su***aj</span>
            <span className="text-green-400">+₱748,205</span>
          </div>
          <div className="flex justify-between text-sm border-b border-gray-800 pb-2">
            <span>Mem***H3M</span>
            <span className="text-red-400">-₱476,479</span>
          </div>
        </div>
      </div>
    </div>
  );
}
