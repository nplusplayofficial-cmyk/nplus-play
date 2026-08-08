'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

interface GameCard3DProps {
  name: string;
  icon: string;
  rtp: string;
  link: string;
  popular?: boolean;
}

export default function GameCard3D({ name, icon, rtp, link, popular }: GameCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glow, setGlow] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((y - centerY) / centerY) * -12;
    const rotateYVal = ((x - centerX) / centerX) * 12;
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
    setGlow(30 + (Math.abs(rotateXVal) + Math.abs(rotateYVal)) * 2);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlow(50);
  };

  return (
    <Link href={link}>
      <div
        ref={cardRef}
        className="glass-card-3d p-4 text-center cursor-pointer relative border-shimmer"
        style={{
          transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transition: 'transform 0.1s ease-out',
          boxShadow: `0 20px ${glow}px -10px rgba(245, 197, 24, ${glow / 200})`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {popular && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
            🔥 POPULAR
          </span>
        )}
        <div className="text-5xl mb-3 drop-shadow-2xl">{icon}</div>
        <h4 className="font-bold text-sm tracking-wider">{name}</h4>
        <p className="text-xs text-gray-400 mt-1 font-mono">RTP {rtp}</p>
        <div className="w-8 h-1 bg-gold/30 mx-auto mt-2 rounded-full"></div>
      </div>
    </Link>
  );
}
