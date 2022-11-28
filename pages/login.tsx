import React, { useEffect } from "react";
import LoginButton from "../components/auth/LoginButton";
import "../app/globals.css";
function Login() {

  return (
    <div className="flex h-screen items-center justify-center font-sans">
      Login
      <LoginButton />;
    </div>
  );
}

export default Login;
