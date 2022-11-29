"use client";
import { deleteCookie } from "cookies-next";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FirebaseApp } from "../../firebase/firebase-init";

interface Props {
  className?: string;
  onClick?: Function;
}

function SignOutButton({ className, onClick }: Props) {
  const router = useRouter();
  const auth = getAuth(FirebaseApp);

  const signOut = async () => {
    onClick && onClick();
    await auth.signOut();
    await fetch("api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <button className={className} onClick={signOut}>
      <AiOutlineLogout className="ml-5 " size={22} />
      <span className="hidden md:block">logout</span>
    </button>
  );
}

export default SignOutButton;
