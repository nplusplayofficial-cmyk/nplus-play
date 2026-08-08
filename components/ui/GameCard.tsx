'use client';

import Link from 'next/link';

interface GameCardProps {
  name: string;
  icon: string;
  rtp: string;
  link: string;
  popular?: boolean;
}

export default function GameCard({ name, icon, rtp, link, popular }: GameCardProps) {
  return (
    <Link href={link}>
      <div className="glass-card p-4 text-center cursor-pointer relative">
        {popular && (
          <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold px-2 py-1 rounded-full">
            POPULAR
          </span>
        )}
        <div className="text-4xl mb-2">{icon}</div>
        <h4 className="font-semibold text-sm">{name}</h4>
        <p className="text-xs text-gray-400 mt-1">RTP {rtp}</p>
      </div>
    </Link>
  );
}
