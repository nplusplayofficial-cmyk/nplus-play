'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from '@/lib/firebase/auth';
import { useAuth } from '@/lib/firebase/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password, displayName);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <input type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 mb-4 border rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">Register</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-blue-600">Log In</a></p>
    </div>
  );
}
