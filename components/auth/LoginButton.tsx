"use client";
import { FcGoogle } from "react-icons/fc";
interface Props {
  className?: string;
  onClick?: Function;
}
function GoogleLogin({ className, onClick }: Props) {
  return (
    <button
      onClick={onClick ? () => onClick() : undefined}
      className={`  
      w-full flex items-center gap-3 py-2  bg-slate-800 rounded-lg text-white font-bold   hover:text-dark
      px-4 justify-center transition-colors ease-in-out duration-200   text-center   hover:bg-[#4285f4] active:bg-[#4285f4]"  ${className}`}
    >
      <FcGoogle size={23} /> Continue with Google
    </button>
  );
}

export default GoogleLogin;
