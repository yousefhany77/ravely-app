"use client";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import React, { createContext, memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FirebaseApp } from "../firebase/firebase-init";

interface AuthContext {
  user: User | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<User | undefined>;
  signInWithGoogle: () => Promise<User | undefined>;
  login: (email: string, password: string) => Promise<User | undefined>;
}
export const AuthContext = createContext<AuthContext>({
  user: null,
  loading: true,
  error: null,
  login: async (email, password) => Promise.resolve(undefined),
  signInWithGoogle: async () => Promise.resolve(undefined),
  signUp: (email, password) => Promise.resolve(undefined),
  signOut: async () => {},
});
export const AuthProvider = memo(function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getAuth(FirebaseApp);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
          await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      },
      (a) => setError(a)
    );
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await user.getIdTokenResult(true);
      await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      return user;
    } catch (_error) {
      const firebaseError = _error as rootFirebaseError;
      throw Error(
        firebaseError.code.replaceAll("auth/", " ").replaceAll("-", " ") ||
          "Something went wrong"
      );
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdTokenResult(true);
      await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      return user;
    } catch (_error) {
      const firebaseError = _error as rootFirebaseError;
      throw Error(
        firebaseError.code.replaceAll("auth/", " ").replaceAll("-", " ") ||
          "Something went wrong"
      );
    }
  };
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const token = await user.getIdTokenResult(true);
      await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      return user;
    } catch (_error) {
      const firebaseError = _error as rootFirebaseError;
      console.log(firebaseError);
      toast.error("Something went wrong");
    }
  };
  const signOut = async () => {
    await auth.signOut();
    await fetch("api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.assign("/login");
  };
  useEffect(() => {
    const refrech = setTimeout(async () => {
      if (auth.currentUser) {
        const token = auth.currentUser?.getIdToken(true);
        await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }, 1000 * 60 * 50);

    return () => {
      clearTimeout(refrech);
    };
  }, [auth.currentUser]);
  return (
    <AuthContext.Provider
      value={{ user, loading, error, signUp, login, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
});

export interface rootFirebaseError {
  code: string;
  customData: CustomData;
  name: string;
}

export interface CustomData {
  appName: string;
  _tokenResponse: TokenResponse;
}

export interface TokenResponse {
  error: Error;
}

export interface FirebaseError {
  code: number;
  message: string;
  errors: Error2[];
}

export interface Error2 {
  message: string;
  domain: string;
  reason: string;
}
