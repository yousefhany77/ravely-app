import "./globals.css";
import Header from "../components/layout/Header";
import { Nunito } from "@next/font/google";
import Sidebar from "../components/layout/Sidebar";
import SidebarHeader from "../components/layout/SidebarHeader";
import { AuthProvider } from "../context/authContext";

const nunito = Nunito({
  subsets: ["latin"],
  preload: true,
  variable: "--font-nunito",
  display: "block",
});
export default async function RootLayout({
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

        <div className="flex bg-darkest  flex-col">
          <AuthProvider>
          {/* @ts-ignore*/}
            <SidebarHeader />
            <Sidebar />
          </AuthProvider>
        </div>
        {/* main */}

        <main className="relative w-full h-full flex-1  ">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
