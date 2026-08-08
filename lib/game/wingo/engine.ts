import { db } from '@/lib/firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const SEED = 'NPLUS_WINGO_2024';

export const generateWingoResult = async (): Promise<{ 
  color: 'red' | 'green' | 'violet'; 
  number: number;
  overridden: boolean;
}> => {
  // Step 1: Check for admin override
  try {
    const overrideRef = doc(db, 'gameOverrides', 'wingo');
    const overrideSnap = await getDoc(overrideRef);
    
    if (overrideSnap.exists() && overrideSnap.data().active === true) {
      const data = overrideSnap.data();
      // Deactivate after using
      await updateDoc(overrideRef, { active: false });
      
      // Use admin's prediction
      return {
        color: data.color || 'red',
        number: data.number ?? Math.floor(Math.random() * 10),
        overridden: true
      };
    }
  } catch (error) {
    console.error('Error checking override:', error);
  }

  // Step 2: No override — generate random result
  const hash = (str: string) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  };

  const nonce = Date.now() + Math.random() * 1000;
  const combined = `${SEED}_${nonce}`;
  const randomNum = hash(combined) % 100;

  let color: 'red' | 'green' | 'violet';
  let number: number;

  if (randomNum === 0) {
    color = 'violet';
    number = 0;
  } else {
    const roll = randomNum % 10;
    if (roll <= 4) {
      color = 'red';
      number = Math.floor(randomNum / 10) + 1;
    } else if (roll <= 8) {
      color = 'green';
      number = Math.floor(randomNum / 10) + 1;
    } else {
      color = 'red';
      number = roll;
    }
  }

  return { color, number, overridden: false };
};

export const WINGO_PAYOUTS = {
  red: 2,
  green: 2,
  violet: 14,
  number: 9,
} as const;

export type WingoBet = {
  type: 'color' | 'number';
  value: string | number;
  amount: number;
};
