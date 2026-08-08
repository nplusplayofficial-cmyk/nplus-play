'use client';

import { useAuth } from '@/lib/firebase/AuthContext';
import { useState } from 'react';

export default function BonusPage() {
  const { user } = useAuth();
  const [claimed, setClaimed] = useState(false);

  const handleClaimDaily = async () => {
    // For now, just simulate claiming
    setClaimed(true);
    alert('🎁 Daily bonus claimed! Check your balance.');
  };

  if (!user) {
    return (
      <div className="text-center text-white py-12">
        <p>Please login to claim bonuses.</p>
      </div>
    );
  }

  return (
    <div className="text-white max-w-md mx-auto">
      <h1 className="text-2xl gold-text font-bold mb-6">🎁 Bonuses</h1>

      {/* Daily Bonus */}
      <div className="glass-card p-6 mb-4">
        <h3 className="text-lg font-semibold">Daily Reward</h3>
        <p className="text-sm text-gray-400 mt-1">Claim free coins every day</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl gold-text font-bold">+50 coins</span>
          <button
            onClick={handleClaimDaily}
            disabled={claimed}
            className={`px-4 py-2 rounded-lg transition ${
              claimed
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-gold text-black font-bold hover:scale-105'
            }`}
          >
            {claimed ? 'Claimed ✅' : 'Claim Now'}
          </button>
        </div>
      </div>

      {/* Welcome Bonus */}
      <div className="glass-card p-6 mb-4">
        <h3 className="text-lg font-semibold">🎊 Welcome Bonus</h3>
        <p className="text-sm text-gray-400 mt-1">First time players get extra coins</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl gold-text font-bold">+500 coins</span>
          <button className="px-4 py-2 bg-gold text-black font-bold rounded-lg hover:scale-105 transition">
            Claim
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">*Only for new accounts</p>
      </div>

      {/* Referral Bonus */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold">👥 Refer a Friend</h3>
        <p className="text-sm text-gray-400 mt-1">Earn 100 coins per referral</p>
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value="NPLUS-123ABC"
            readOnly
            className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 text-sm"
          />
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
