"use client";
import "./globals.css";
import Header from "../components/layout/Header";
import { Nunito } from "@next/font/google";
import Sidebar from "../components/layout/Sidebar";
const nunito = Nunito({
  subsets: ["latin"],
  preload: true,
  variable: "--font-nunito",
  display:"block"
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} font-sans bg-zinc-900 h-full `}
    >
      <head />

      <body className="flex   w-full">
        {/* sidebar */}
        <Sidebar />
        {/* main */}

        <main className="relative w-full h-full flex-1  ">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
