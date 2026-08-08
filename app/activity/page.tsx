'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebase/AuthContext';
import { db } from '@/lib/firebase/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

interface Bet {
  id: string;
  game: string;
  amount: number;
  payout: number;
  status: string;
  placedAt: string;
  betData: any;
}

export default function ActivityPage() {
  const { user } = useAuth();
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBets = async () => {
      try {
        const betsRef = collection(db, 'bets');
        const q = query(
          betsRef,
          where('userId', '==', user.uid),
          orderBy('placedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const betsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Bet[];
        setBets(betsData);
      } catch (error) {
        console.error('Error fetching bets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center text-white py-12">
        <p>Please login to view your activity.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center text-white py-12">Loading history...</div>;
  }

  return (
    <div className="text-white">
      <h1 className="text-2xl gold-text font-bold mb-6">📊 My Activity</h1>

      {bets.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <p className="text-gray-400">No bets placed yet.</p>
          <p className="text-gray-500 text-sm mt-2">Play WINGO to start!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bets.map((bet) => (
            <div key={bet.id} className="glass-card p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{bet.game.toUpperCase()}</p>
                <p className="text-xs text-gray-400">
                  {new Date(bet.placedAt).toLocaleString()}
                </p>
                {bet.betData && (
                  <p className="text-xs text-gray-500">
                    Bet: {bet.betData.type} → {bet.betData.value}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Stake: -{bet.amount}</p>
                {bet.status === 'won' ? (
                  <p className="text-green-400 font-bold">+{bet.payout}</p>
                ) : bet.status === 'lost' ? (
                  <p className="text-red-400">Lost</p>
                ) : (
                  <p className="text-yellow-400">Pending</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
