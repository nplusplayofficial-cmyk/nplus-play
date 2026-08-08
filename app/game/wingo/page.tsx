'use client';

import { useAuth } from '@/lib/firebase/AuthContext';
import { useRouter } from 'next/navigation';
import WingoBoard from '@/components/game/WingoBoard';

export default function WingoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return <WingoBoard />;
}
