"use client";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FirebaseApp } from "../../firebase/firebase-init";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  onClick?: Function;
}
function LoginButton({ className, onClick }: Props) {
  const router = useRouter();
  const auth = getAuth(FirebaseApp);
  const provider = new GoogleAuthProvider();
  const SignIn = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const token = await user.getIdTokenResult(true);
      await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
      onClick && onClick();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={SignIn}
      className={`px-4 py-2 font-medium bg-[#4285f4] text-white transition-colors ease-in-out duration-150 hover:bg-[#1669F2] active:bg-[#1669F2]"  ${className}`}
    >
      Sign in with Google
    </button>
  );
}

export default LoginButton;
