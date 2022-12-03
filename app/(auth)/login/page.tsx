"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";
import "react-toastify/dist/ReactToastify.min.css";
import {  AuthProvider } from "../../../context/authContext";
import LoginForm from "../../../components/auth/LoginForm";
function Signup() {
  return (
    
    <AuthProvider>
      <section className="h-screen   flex flex-col items-center justify-center p-5 max-w-7xl mx-auto ">
        <div className="w-4/6 max-w-7xl bg-darkest overflow-hidden  grid md:grid-cols-[1fr_2fr] rounded-2xl   border border-light-gray/50">
          <div className="bg-darkest flex items-center justify-center  md:-ml-5 -mb-2">
            <Image
              src={logo}
              alt="Ravly Logo"
              className="object-contain w-16 md:w-32 py-5 md:ml-5"
            />
          </div>
          <LoginForm />
        </div>
      </section>
    </AuthProvider>
  );
}
export default Signup;