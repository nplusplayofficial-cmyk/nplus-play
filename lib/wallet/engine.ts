import { db } from '@/lib/firebase/firebase';
import {
  doc,
  runTransaction,
  increment,
  getDoc,
} from 'firebase/firestore';

export interface Bet {
  id: string;
  userId: string;        // ✅ ADD THIS LINE
  game: 'wingo' | 'k3' | '5d' | 'trx';
  amount: number;
  betData: any;
  result?: any;
  payout?: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  placedAt: string;
  settledAt?: string;
}

export const placeBet = async (
  userId: string,
  game: Bet['game'],
  amount: number,
  betData: any
): Promise<{ betId: string; newBalance: number }> => {
  if (amount <= 0) throw new Error('Bet amount must be positive');

  const userRef = doc(db, 'users', userId);
  const betId = `${game}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  let newBalance = 0;

  await runTransaction(db, async (transaction) => {
    const userSnap = await transaction.get(userRef);
    if (!userSnap.exists()) throw new Error('User not found');

    const currentBalance = userSnap.data().balance || 0;
    if (currentBalance < amount) throw new Error('Insufficient balance');

    transaction.update(userRef, {
      balance: increment(-amount),
    });

    const betRef = doc(db, 'bets', betId);
    transaction.set(betRef, {
      id: betId,
      userId,              // ✅ store userId
      game,
      amount,
      betData,
      status: 'pending',
      placedAt: new Date().toISOString(),
    });

    newBalance = currentBalance - amount;
  });

  return { betId, newBalance };
};

export const settleBet = async (
  betId: string,
  result: any,
  payout: number
): Promise<{ newBalance: number; status: 'won' | 'lost' }> => {
  const betRef = doc(db, 'bets', betId);
  const betSnap = await getDoc(betRef);

  if (!betSnap.exists()) throw new Error('Bet not found');
  const betData = betSnap.data() as Bet;
  if (betData.status !== 'pending') throw new Error('Bet already settled');

  const userId = betData.userId;   // ✅ now this works
  const userRef = doc(db, 'users', userId);

  let newBalance = 0;
  const status = payout > 0 ? 'won' : 'lost';

  await runTransaction(db, async (transaction) => {
    const userSnap = await transaction.get(userRef);
    if (!userSnap.exists()) throw new Error('User not found');

    const currentBalance = userSnap.data().balance || 0;

    if (payout > 0) {
      transaction.update(userRef, {
        balance: increment(payout),
      });
      newBalance = currentBalance + payout;
    } else {
      newBalance = currentBalance;
    }

    transaction.update(betRef, {
      result,
      payout,
      status,
      settledAt: new Date().toISOString(),
    });
  });

  return { newBalance, status };
};

export const getBalance = async (userId: string): Promise<number> => {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  if (!snap.exists()) return 0;
  return snap.data().balance || 0;
};
