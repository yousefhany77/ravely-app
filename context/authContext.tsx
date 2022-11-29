"use client";
import { User } from "firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { getAuth } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { FirebaseApp } from "../firebase/firebase-init";

interface AuthContext {
  user: User | null;
  loading: boolean;
  error: string | null;
}
type CompleteFn = () => void;
export const AuthContext = createContext<AuthContext>({
  user: null,
  loading: true,
  error: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = getAuth(FirebaseApp);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(
      async (user) => {
        if (user) {
          const token = await user.getIdTokenResult();
          setCookie("token", token.token, {
            path: "/",
            maxAge: 3600,
            sameSite: "strict",
          });
          setUser(user);
          setLoading(false);
        } else {
          deleteCookie("token");
          setUser(null);
          setLoading(false);
        }
      },
      (a: Error) => setError(a)
    );
    return () => {
      unsubscribe();
    };
  }, [auth]);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
      console.log("refresh token...");
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, [auth.currentUser]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
