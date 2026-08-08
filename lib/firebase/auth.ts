import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously as firebaseSignInAnonymously,
  updateProfile,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserDocument } from './user';

export const signInWithEmail = async (email: string, password: string) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName });
  await createUserDocument(cred.user);
  return cred.user;
};

export const signInAnonymously = async () => {
  const cred = await firebaseSignInAnonymously(auth);
  await createUserDocument(cred.user);
  return cred.user;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await createUserDocument(cred.user);
  return cred.user;
};

export const signOut = () => firebaseSignOut(auth);
