import React, { useEffect } from "react";
import LoginButton from "../components/auth/LoginButton";
import "../app/globals.css";
function Login() {
  return (
    <div className="flex h-screen items-center bg-darkest text-white justify-center font-sans">
      <LoginButton />
    
    </div>
  );
}

export default Login;
