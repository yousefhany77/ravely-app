"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, FirebaseApp } from "../../firebase/firebase-init";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

function LoginButton() {
  const router = useRouter();
  const auth = getAuth(FirebaseApp);
  const provider = new GoogleAuthProvider();
  const SignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const token = await user.getIdTokenResult(true);
      setCookie("token", token.token);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <button
      onClick={SignIn}
      className="px-4 py-2 font-medium bg-blue-600 text-white"
    >
      Sign in with Google
    </button>
  );
}

export default LoginButton;
