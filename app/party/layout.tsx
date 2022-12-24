import React from "react";
import { AuthProvider } from "../../context/authContext";

function layout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default layout;
