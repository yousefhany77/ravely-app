"use client";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { db, FirebaseApp } from "../firebase/firebase-init";

interface AuthContext {
  user: User | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<User | undefined>;
  signInWithGoogle: () => Promise<User | undefined>;
  login: (email: string, password: string) => Promise<User | undefined>;
  resetPassword: (email: string) => Promise<void>;
  reAuthUser: (user: User, password: string) => Promise<void>;
  reAuthWithProvider: (user: User) => Promise<void>;
}
export const AuthContext = createContext<AuthContext>({
  user: null,
  loading: true,
  error: null,
  login: async (_email, _password) => Promise.resolve(undefined),
  signInWithGoogle: async () => Promise.resolve(undefined),
  signUp: (_email, _password) => Promise.resolve(undefined),
  signOut: async () => { },
  resetPassword: async (_email) => { },
  reAuthUser: async (_email, _password) => { },
  reAuthWithProvider: async (_email) => { },
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
          await user.reload();
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
      if (!user.emailVerified) {
        auth.signOut();
        throw "Email not verified, Check your email for verification link";
      }
      const token = await user.getIdTokenResult(true);
      const customerRef = collection(
        db,
        "customers",
        user!.uid,
        "subscriptions"
      );
      const subscription = await getDocs(customerRef);
      if (
        subscription.docs[0] &&
        subscription.docs[0]?.data()?.status === "active"
      ) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });
        return user;
      }
      throw "You must be subscribed to access Ravely";
    } catch (_error) {
      const firebaseError = _error as rootFirebaseError;
      console.log(firebaseError);
      throw (
        firebaseError.code?.replaceAll("auth/", " ")?.replaceAll("-", " ") ||
        _error ||
        "Something went wrong"
      );
    }
  };
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user: userData } = await signInWithPopup(auth, provider);

      const token = await userData.getIdTokenResult(true);
      const customerRef = collection(
        db,
        "customers",
        userData!.uid,
        "subscriptions"
      );
      const subscription = await getDocs(customerRef);
      if (
        subscription.docs[0] &&
        subscription.docs[0]?.data()?.status === "active"
      ) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });
        return userData;
      }
      throw "You must be subscribed to access Ravely";
    } catch (_error) {
      const firebaseError = _error as rootFirebaseError;
      console.log(firebaseError);
      throw (
        firebaseError.code?.replaceAll("auth/", " ")?.replaceAll("-", " ") ||
        _error ||
        "Something went wrong"
      );
    }
  };
  const signOut = useCallback(async () => {
    await auth.signOut();
    await fetch("api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "/"
  }, [auth]);
  const resetPassword = async (email: string) => {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log(email, "Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw Error(errorMessage || errorCode);
        // ..
      });
  };
  const reAuthUser = async (user: User, password: string) => {
    if (user.email) {
      const credential = EmailAuthProvider.credential(user.email, password);
      try {
        const { user: authedUser } = await reauthenticateWithCredential(
          user,
          credential
        );
        setUser(authedUser);
        const token = await authedUser.getIdToken(true);
        await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        throw new Error("User is not authenticated");
      }
    }
  };
  const reAuthWithProvider = async (userData: User) => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await reauthenticateWithPopup(userData, provider);
      const token = await user.getIdToken(true);
      setUser(user);
      await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const refrech = setInterval(async () => {
      const token = await auth.currentUser?.getIdToken(true);

      await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }, 1000 * 60 * 10);

    return () => {
      console.log("UnMounted interval");
      clearInterval(refrech);
    };
  }, [auth.currentUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signUp,
        login,
        signInWithGoogle,
        signOut,
        resetPassword,
        reAuthUser,
        reAuthWithProvider,
      }}
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
