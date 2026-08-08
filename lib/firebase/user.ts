import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

export const createUserDocument = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'Anonymous',
      balance: 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
};

export const getUserProfile = async (uid: string) => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
};
