import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

// Create Zustand store
const useAuthStore = create(
  persist(
    (set) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();
            set({ user: { ...user, ...userData }, isAuthenticated: true, isLoading: false });
          } catch (error) {
            console.error('Get user data error:', error);
            set({ user: { ...user }, isAuthenticated: true, isLoading: false });
          }
        } else {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      });
      return {
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      signIn: async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          set({ user: { ...user, ...userData }, isAuthenticated: true, isLoading: false });
          console.log('Sign in success:', user);
          Navigate('/dashboard');
          return userData;
        } catch (error) {
          console.error('Sign in error:', error);
          set({ user: null, isAuthenticated: false, isLoading: false });
          throw error;
        }
      },
      signOut: async () => {
        try {
          await signOut(auth);
          set({ user: null, isAuthenticated: false, isLoading: false });
          Navigate('/login');
        } catch (error) {
          console.error('Sign out error:', error);
        }
      },}
    },
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

// Custom hook for auth-related redirects
const useAuthRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to sign in page if not authenticated
        navigate('/login');
      } else if (isAuthenticated && !user.username) {
        // Redirect to profile page if authenticated but no username
        
      }
    }
  }, [isAuthenticated, isLoading, user]);

  return { isLoading };
};

export { useAuthStore, useAuthRedirect };