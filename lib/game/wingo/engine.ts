const SEED = 'NPLUS_WINGO_2024';

export const generateWingoResult = (): { color: 'red' | 'green' | 'violet'; number: number } => {
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

  return { color, number };
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
