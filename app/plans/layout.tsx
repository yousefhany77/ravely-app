"use client";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../../context/authContext";
import { CheckoutProvider } from "../../context/checkoutContext";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CheckoutProvider>
        <ToastContainer limit={3} />
        {children}
      </CheckoutProvider>
    </AuthProvider>
  );
}
