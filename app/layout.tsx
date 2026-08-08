import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/firebase/AuthContext';
import Header from '@/components/ui/Header';
import BottomNav from '@/components/ui/BottomNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'N+ PLAY',
  description: 'Premium iGaming platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 pb-24">{children}</main>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
