import React from "react";
import { AuthProvider } from "../../context/authContext";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="text-white p-5">
      <AuthProvider>
        <h1 className="font-bold text-4xl my-6 capitalize">Favourite</h1>
        {children}
      </AuthProvider>
    </main>
  );
}

export default layout;
