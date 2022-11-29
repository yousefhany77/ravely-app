import { initializeApp, getApps, getApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDNe7q4EjoDR_x5dnXdxlbU1yYmvH99v-c",
  authDomain: "auth-fe87e.firebaseapp.com",
  projectId: "auth-fe87e",
  storageBucket: "auth-fe87e.appspot.com",
  messagingSenderId: "321612450940",
  appId: "1:321612450940:web:3d71cb6bc92f340a6f0df9",
};

export const FirebaseApp =
  getApps().length < 1 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(FirebaseApp);
const functions = getFunctions(FirebaseApp);
export const createPortalLink = httpsCallable(
  functions,
  "ext-firestore-stripe-payments-createPortalLink"
);
