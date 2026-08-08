'use client';

import { useAuth } from '@/lib/firebase/AuthContext';

export default function PromotionPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center text-white py-12">
        <p>Please login to view promotions.</p>
      </div>
    );
  }

  return (
    <div className="text-white max-w-md mx-auto">
      <h1 className="text-2xl gold-text font-bold mb-6">🔥 Promotions</h1>

      {/* Active Promotion 1 */}
      <div className="glass-card p-6 mb-4 border border-gold/30">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <div>
            <h3 className="text-lg font-semibold">Weekend Tournament</h3>
            <p className="text-sm text-gray-400">Win big this weekend!</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-400">Ends in 2 days</span>
          <span className="text-sm font-bold gold-text">Prize: ₱50,000</span>
        </div>
      </div>

      {/* Active Promotion 2 */}
      <div className="glass-card p-6 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h3 className="text-lg font-semibold">WINGO Special</h3>
            <p className="text-sm text-gray-400">2x bonus on WINGO bets</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-400">Limited time</span>
          <span className="text-sm font-bold gold-text">Active now</span>
        </div>
      </div>

      {/* Active Promotion 3 */}
      <div className="glass-card p-6 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">👑</span>
          <div>
            <h3 className="text-lg font-semibold">VIP Cashback</h3>
            <p className="text-sm text-gray-400">Get 10% cashback on losses</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-gray-400">VIP only</span>
          <span className="text-sm font-bold gold-text">Up to ₱10,000</span>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="glass-card p-6 border-dashed border-gray-600">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎁</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-400">More Coming Soon</h3>
            <p className="text-sm text-gray-500">Stay tuned for new promotions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
