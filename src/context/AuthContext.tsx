"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { 
  auth, 
  signInWithGoogle as fbSignInWithGoogle, 
  signInWithEmail as fbSignInWithEmail, 
  signUpWithEmail as fbSignUpWithEmail, 
  logOut as fbLogOut, 
  onAuthChange 
} from "@/lib/firebase";

export interface SupabaseUserProfile {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  profile_completeness: number;
  overall_readiness: number;
  created_at?: string;
}

interface AuthContextType {
  firebaseUser: User | null;
  userProfile: SupabaseUserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  userProfile: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  logout: async () => {},
  refreshProfile: async () => {},
});

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<SupabaseUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync with Supabase PostgreSQL via FastAPI
  const syncWithSupabase = async (fbUser: User) => {
    try {
      const token = await fbUser.getIdToken();
      const res = await fetch(`${API_BASE}/auth/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: fbUser.uid,
          email: fbUser.email || "",
          name: fbUser.displayName || fbUser.email?.split("@")[0] || "Engineer",
          avatar_url: fbUser.photoURL || undefined,
        }),
      });

      if (res.ok) {
        const data: SupabaseUserProfile = await res.json();
        setUserProfile(data);
      }
    } catch (err) {
      console.error("Failed to sync user with Supabase PostgreSQL:", err);
    }
  };

  useEffect(() => {
    // Safety fallback: ensure loading never hangs more than 1.5s on cold starts
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const unsubscribe = onAuthChange(async (user) => {
      try {
        setFirebaseUser(user);
        if (user) {
          await syncWithSupabase(user);
        } else {
          setUserProfile(null);
        }
      } catch (e) {
        console.warn("Auth initialization sync warning:", e);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const user = await fbSignInWithGoogle();
      if (user) {
        await syncWithSupabase(user);
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const user = await fbSignInWithEmail(email, pass);
      if (user) {
        await syncWithSupabase(user);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    setLoading(true);
    try {
      const user = await fbSignUpWithEmail(email, pass, name);
      if (user) {
        await syncWithSupabase(user);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fbLogOut();
      setUserProfile(null);
      setFirebaseUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (firebaseUser) {
      await syncWithSupabase(firebaseUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        userProfile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
