"use client";
import { deleteCookie } from "cookies-next";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { FirebaseApp } from "../../firebase/firebase-init";

function SignOutButton() {
  const router = useRouter();
  const auth = getAuth(FirebaseApp);

  const signOut = async () => {
    console.log("signout...");
    await auth.signOut();
    deleteCookie("token");
    router.refresh();
  };

  return (
    <button className="bg-red text-white  p-3" onClick={signOut}>
      SignOut
    </button>
  );
}

export default SignOutButton;
