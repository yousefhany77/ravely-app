import { getApps, getApp, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_ADMIN_SDK_Api_Key,
  authDomain: process.env.FIREBASE_ADMIN_SDK_authDomain,
  projectId: process.env.FIREBASE_ADMIN_SDK_projectId,
  storageBucket: process.env.FIREBASE_ADMIN_SDK_storageBucket,
  messagingSenderId: process.FIREBASE_ADMIN_SDK_messagingSenderId,
  appId: process.env.FIREBASE_ADMIN_SDK_appId,
  credential: cert({
    type: "service_account",
    project_id: process.env.FIREBASE_ADMIN_SDK_projectId,
    private_key_id: process.env.FIREBASE_ADMIN_SDK_private_key_id,
    private_key: process.env.FIREBASE_ADMIN_SDK_private_key,
    client_email: process.env.FIREBASE_ADMIN_SDK_client_email,
    client_id: process.env.FIREBASE_ADMIN_SDK_client_id,
    auth_uri: process.env.FIREBASE_ADMIN_SDK_auth_uri,
    token_uri: process.env.FIREBASE_ADMIN_SDK_token_uri,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_ADMIN_SDK_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_SDK_client_x509_cert_url,
  }),
};

export const Admin_Firebase =
  getApps().length < 1 ? initializeApp(firebaseConfig) : getApp();
export const adminAuth = getAuth(Admin_Firebase);
export const db_Admin = getFirestore();
