'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface User {
  uid: string;
  email: string;
  displayName: string;
  balance: number;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersData = querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-12">Loading users...</div>;
  }

  return (
    <div className="text-white">
      <Link href="/admin" className="text-gold hover:underline mb-4 inline-block">
        ← Back to Dashboard
      </Link>
      
      <h1 className="text-3xl gold-text font-bold mb-6">👥 User Management</h1>

      <div className="glass-card-3d p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Balance</th>
              <th className="text-left py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} className="border-b border-gray-800">
                <td className="py-2">{user.displayName || 'Anonymous'}</td>
                <td className="py-2">{user.email || 'Guest'}</td>
                <td className="py-2 gold-text font-bold">{user.balance || 0}</td>
                <td className="py-2 text-gray-400">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
