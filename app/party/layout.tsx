'use client'
import React from "react";
import { AuthProvider } from "../../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>
    <ToastContainer />
    {children}</AuthProvider>;
}

export default layout;
