"use client";
import React from "react";
import { AuthProvider } from "../../../../../../../context/authContext";

function VideoLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" p-6 w-full  text-white grid place-items-center  mt-20 mb-6">
      <AuthProvider>{children}</AuthProvider>
    </main>
  );
}

export default VideoLayout;
