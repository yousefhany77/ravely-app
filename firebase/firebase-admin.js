import { getApps, getApp, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNe7q4EjoDR_x5dnXdxlbU1yYmvH99v-c",
  authDomain: "auth-fe87e.firebaseapp.com",
  projectId: "auth-fe87e",
  storageBucket: "auth-fe87e.appspot.com",
  messagingSenderId: "321612450940",
  appId: "1:321612450940:web:3d71cb6bc92f340a6f0df9",
};

export const Admin_Firebase =
  getApps().length < 1 ? initializeApp(firebaseConfig) : getApp();

export const db_Admin = getFirestore();

