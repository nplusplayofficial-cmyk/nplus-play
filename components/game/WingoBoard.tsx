'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/firebase/AuthContext';
import { placeBet, settleBet, getBalance } from '@/lib/wallet/engine';
import { generateWingoResult, WINGO_PAYOUTS, WingoBet } from '@/lib/game/wingo/engine';

const COLORS = ['red', 'green', 'violet'] as const;
const NUMBERS = Array.from({ length: 10 }, (_, i) => i);

export default function WingoBoard() {
  const { user, loading } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [stake, setStake] = useState<number>(10);
  const [selectedBet, setSelectedBet] = useState<WingoBet | null>(null);
  const [result, setResult] = useState<{ color: string; number: number } | null>(null);
  const [history, setHistory] = useState<Array<{ color: string; number: number }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      getBalance(user.uid).then(setBalance);
    }
  }, [user]);

  const handlePlaceBet = async () => {
    if (!user) {
      setMessage('Please login to play');
      return;
    }
    if (!selectedBet) {
      setMessage('Select a color or number first');
      return;
    }
    if (stake > balance) {
      setMessage('Insufficient balance');
      return;
    }
    if (stake <= 0) {
      setMessage('Stake must be positive');
      return;
    }

    setIsProcessing(true);
    setMessage('');

    try {
      const { betId, newBalance } = await placeBet(
        user.uid,
        'wingo',
        stake,
        selectedBet
      );
      setBalance(newBalance);

      const resultData = generateWingoResult();
      setResult(resultData);

      let payoutMultiplier = 0;
      if (selectedBet.type === 'color' && selectedBet.value === resultData.color) {
        payoutMultiplier = WINGO_PAYOUTS[resultData.color as keyof typeof WINGO_PAYOUTS];
      } else if (selectedBet.type === 'number' && selectedBet.value === resultData.number) {
        payoutMultiplier = WINGO_PAYOUTS.number;
      }

      const payoutAmount = payoutMultiplier > 0 ? stake * payoutMultiplier : 0;

      const { newBalance: finalBalance, status } = await settleBet(
        betId,
        resultData,
        payoutAmount
      );
      setBalance(finalBalance);

      if (status === 'won') {
        setMessage(`🎉 You won ${payoutAmount} coins!`);
      } else {
        setMessage(`😞 Lost. Result: ${resultData.color} ${resultData.number}`);
      }

      setHistory((prev) => [resultData, ...prev].slice(0, 20));

    } catch (err: any) {
      setMessage('Error: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🎰 WINGO</h1>

      <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
        <p className="text-xl">💰 Balance: <span className="font-bold">{balance}</span> coins</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Pick a Color:</p>
        <div className="flex gap-4 justify-center">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedBet({ type: 'color', value: color, amount: stake })}
              className={`w-20 h-20 rounded-full border-4 transition ${
                selectedBet?.value === color && selectedBet.type === 'color'
                  ? 'border-yellow-400 scale-110'
                  : 'border-transparent'
              }`}
              style={{
                backgroundColor: color === 'red' ? '#ef4444' : color === 'green' ? '#22c55e' : '#8b5cf6',
              }}
              disabled={isProcessing}
            >
              <span className="text-white font-bold drop-shadow-lg">
                {color.toUpperCase()}
                <br />
                <span className="text-xs">x{WINGO_PAYOUTS[color]}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Or Pick a Number (0-9):</p>
        <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
          {NUMBERS.map((num) => (
            <button
              key={num}
              onClick={() => setSelectedBet({ type: 'number', value: num, amount: stake })}
              className={`p-3 rounded-lg text-lg font-bold transition ${
                selectedBet?.value === num && selectedBet.type === 'number'
                  ? 'bg-yellow-400 scale-105'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              disabled={isProcessing}
            >
              {num}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center mt-1">Payout: x{WINGO_PAYOUTS.number}</p>
      </div>

      <div className="mb-4 flex gap-2 items-center justify-center">
        <label className="font-semibold">Stake:</label>
        <input
          type="number"
          min="1"
          max={balance}
          value={stake}
          onChange={(e) => setStake(Math.max(1, parseInt(e.target.value) || 0))}
          className="border rounded px-3 py-1 w-24 text-center"
          disabled={isProcessing}
        />
        <button
          onClick={() => setStake(Math.min(balance, stake * 2))}
          className="bg-gray-200 px-2 py-1 rounded text-sm"
          disabled={isProcessing}
        >
          2x
        </button>
        <button
          onClick={() => setStake(Math.max(1, Math.floor(stake / 2)))}
          className="bg-gray-200 px-2 py-1 rounded text-sm"
          disabled={isProcessing}
        >
          ½
        </button>
        <button
          onClick={() => setStake(balance)}
          className="bg-gray-200 px-2 py-1 rounded text-sm"
          disabled={isProcessing}
        >
          Max
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={handlePlaceBet}
          className={`px-8 py-3 text-white text-xl rounded-lg transition ${
            isProcessing || !selectedBet || stake > balance
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={isProcessing || !selectedBet || stake > balance}
        >
          {isProcessing ? 'Processing...' : '🚀 BET NOW'}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-2xl font-bold">
            Result: <span style={{ color: result.color === 'red' ? '#ef4444' : result.color === 'green' ? '#22c55e' : '#8b5cf6' }}>
              {result.color.toUpperCase()}
            </span> — Number: <span className="font-bold">{result.number}</span>
          </p>
        </div>
      )}

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center font-semibold ${
          message.includes('won') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="mt-8">
        <h3 className="font-bold mb-2">Last 20 Results:</h3>
        <div className="flex flex-wrap gap-2">
          {history.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-sm font-bold text-white"
              style={{
                backgroundColor: item.color === 'red' ? '#ef4444' : item.color === 'green' ? '#22c55e' : '#8b5cf6',
              }}
            >
              {item.color[0].toUpperCase()}-{item.number}
            </span>
          ))}
        </div>
        {history.length === 0 && <p className="text-gray-400 text-sm">No games played yet.</p>}
      </div>
    </div>
  );
}
