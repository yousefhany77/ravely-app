"use client";
import { User } from "firebase/auth";
import { getCookie, setCookie } from "cookies-next";
import { getAuth } from "firebase/auth";
import React, { createContext, memo, useEffect, useState } from "react";
import { FirebaseApp } from "../firebase/firebase-init";

interface AuthContext {
  user: User | null;
  loading: boolean;
  error: string | null;
}
export const AuthContext = createContext<AuthContext>({
  user: null,
  loading: true,
  error: null,
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
      (a: Error) => setError(a)
    );
    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
});
