'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState('WINGO');
  const [predictedColor, setPredictedColor] = useState('');
  const [predictedNumber, setPredictedNumber] = useState('');
  const [crashPoint, setCrashPoint] = useState('');

  const handlePredict = () => {
    alert(`🎯 Prediction set for ${selectedGame}:
Color: ${predictedColor || 'Random'}
Number: ${predictedNumber || 'Random'}
Crash: ${crashPoint || 'Default'}`);
  };

  return (
    <div className="text-white">
      <Link href="/admin" className="text-gold hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      
      <h1 className="text-3xl gold-text font-bold mb-6">🎮 Game Control</h1>

      <div className="glass-card-3d p-6 space-y-6">
        {/* Game Selector */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Select Game</label>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            <option>WINGO</option>
            <option>K3</option>
            <option>5D</option>
            <option>TRX WIN GO</option>
            <option>AVIATOR</option>
            <option>VORTEX</option>
          </select>
        </div>

        {/* Prediction Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Predict Color</label>
            <div className="flex gap-2">
              <button
                onClick={() => setPredictedColor('red')}
                className={`px-4 py-2 rounded-lg ${
                  predictedColor === 'red' ? 'bg-red-600' : 'bg-gray-700'
                } hover:bg-red-500 transition`}
              >
                🔴 Red
              </button>
              <button
                onClick={() => setPredictedColor('green')}
                className={`px-4 py-2 rounded-lg ${
                  predictedColor === 'green' ? 'bg-green-600' : 'bg-gray-700'
                } hover:bg-green-500 transition`}
              >
                🟢 Green
              </button>
              <button
                onClick={() => setPredictedColor('violet')}
                className={`px-4 py-2 rounded-lg ${
                  predictedColor === 'violet' ? 'bg-purple-600' : 'bg-gray-700'
                } hover:bg-purple-500 transition`}
              >
                🟣 Violet
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Predict Number (0-9)</label>
            <input
              type="number"
              min="0"
              max="9"
              value={predictedNumber}
              onChange={(e) => setPredictedNumber(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              placeholder="Leave empty for random"
            />
          </div>
        </div>

        {/* Crash Point (For Aviator/Vortex) */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Crash Point (Aviator/Vortex)</label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="100"
            value={crashPoint}
            onChange={(e) => setCrashPoint(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            placeholder="e.g., 2.5 (Leave empty for random)"
          />
        </div>

        {/* Apply Button */}
        <button
          onClick={handlePredict}
          className="w-full btn-gold py-3 rounded-lg"
        >
          Apply Prediction
        </button>

        <p className="text-xs text-gray-500 text-center">
          Admin override — sets the next game result manually
        </p>
      </div>

      {/* Current Stats */}
      <div className="glass-card-3d p-4 mt-6">
        <h3 className="font-semibold mb-3">📊 Game Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-xs">Total Rounds</p>
            <p className="font-bold">1,234</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">House Edge</p>
            <p className="font-bold text-green-400">4.2%</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Active Players</p>
            <p className="font-bold">567</p>
          </div>
        </div>
      </div>
    </div>
  );
}
