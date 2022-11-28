"use client";
import { User } from "firebase/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { getAuth } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { FirebaseApp } from "../firebase/firebase-init";

export const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = getAuth(FirebaseApp);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        setCookie("token", token.token, {
          path: "/",
          maxAge: 3600,
          sameSite: "strict",
        });
        setUser(user);
      } else {
        deleteCookie("token");
      }
    });
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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
