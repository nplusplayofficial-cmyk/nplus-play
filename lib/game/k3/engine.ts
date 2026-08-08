import { db } from '@/lib/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const SEED = 'NPLUS_K3_2024';

export interface K3Result {
  dice1: number;
  dice2: number;
  dice3: number;
  total: number;
  pattern: 'big' | 'small' | 'threeOfAKind' | 'mixed';
  value: string; // e.g., "4-2-6" or "Three 5s"
}

export const generateK3Result = async (): Promise<K3Result> => {
  // Step 1: Check for admin override (same system as WINGO)
  try {
    const overrideRef = doc(db, 'gameOverrides', 'k3');
    const overrideSnap = await getDoc(overrideRef);
    
    if (overrideSnap.exists() && overrideSnap.data().active === true) {
      const data = overrideSnap.data();
      await updateDoc(overrideRef, { active: false });
      
      // Use admin's override (they can set the pattern)
      if (data.pattern === 'big') {
        const d1 = Math.floor(Math.random() * 3) + 4; // 4-6
        const d2 = Math.floor(Math.random() * 3) + 4;
        const d3 = Math.floor(Math.random() * 3) + 4;
        const total = d1 + d2 + d3;
        return { dice1: d1, dice2: d2, dice3: d3, total, pattern: 'big', value: `${d1}-${d2}-${d3}` };
      } else if (data.pattern === 'small') {
        const d1 = Math.floor(Math.random() * 3) + 1; // 1-3
        const d2 = Math.floor(Math.random() * 3) + 1;
        const d3 = Math.floor(Math.random() * 3) + 1;
        const total = d1 + d2 + d3;
        return { dice1: d1, dice2: d2, dice3: d3, total, pattern: 'small', value: `${d1}-${d2}-${d3}` };
      } else if (data.pattern === 'threeOfAKind') {
        const num = data.number || Math.floor(Math.random() * 6) + 1;
        const d1 = num; const d2 = num; const d3 = num;
        const total = d1 + d2 + d3;
        return { dice1: d1, dice2: d2, dice3: d3, total, pattern: 'threeOfAKind', value: `Three ${num}s` };
      } else if (data.pattern === 'specific') {
        const num = data.number || Math.floor(Math.random() * 6) + 1;
        // At least one die matches the specific number
        const d1 = num;
        const d2 = Math.floor(Math.random() * 6) + 1;
        const d3 = Math.floor(Math.random() * 6) + 1;
        const total = d1 + d2 + d3;
        const pattern = (d1 === d2 && d2 === d3) ? 'threeOfAKind' : 'mixed';
        return { dice1: d1, dice2: d2, dice3: d3, total, pattern, value: `${d1}-${d2}-${d3}` };
      }
    }
  } catch (error) {
    console.error('Error checking override:', error);
  }

  // Step 2: Random generation (no override)
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const dice3 = Math.floor(Math.random() * 6) + 1;
  const total = dice1 + dice2 + dice3;

  let pattern: K3Result['pattern'];
  let value: string;

  if (dice1 === dice2 && dice2 === dice3) {
    pattern = 'threeOfAKind';
    value = `Three ${dice1}s`;
  } else if (total >= 11) {
    pattern = 'big';
    value = `${dice1}-${dice2}-${dice3}`;
  } else {
    pattern = 'small';
    value = `${dice1}-${dice2}-${dice3}`;
  }

  return { dice1, dice2, dice3, total, pattern, value };
};

export const K3_PAYOUTS = {
  big: 2,
  small: 2,
  threeOfAKind: 24,
  specificNumber: 6,
} as const;

export type K3Bet = {
  type: 'big' | 'small' | 'threeOfAKind' | 'specific';
  value?: number; // only for specific number
  amount: number;
};
