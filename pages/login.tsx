import React, { useEffect } from "react";
import LoginButton from "../components/auth/LoginButton";
import "../app/globals.css";
function Login() {
  return (
    <div className="flex h-screen items-center bg-darkest text-white justify-center font-sans">
      <LoginButton />
      <button
        onClick={() => {
          // post request   to api/auth/login with headers
          fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${"mytoken"}`,
            },
          });
        }}
      >
        Post cookie
      </button>
    </div>
  );
}

export default Login;
