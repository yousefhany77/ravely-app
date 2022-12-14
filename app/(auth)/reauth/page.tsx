"use client";
import Image from "next/image";
import { memo, useContext } from "react";
import PromtUserReAuthwithPassword from "../../../components/auth/PromtUserReAuthwithPassword";
import { AuthContext, AuthProvider } from "../../../context/authContext";
import logo from "../../../public/logo.png";
import "react-toastify/dist/ReactToastify.min.css";
import { SyncLoader } from "react-spinners";
import { redirect } from "next/navigation";

function Page() {
  return (
    <AuthProvider>
      <ReauthenticateForm />
    </AuthProvider>
  );
}

export default Page;

const ReauthenticateForm = memo(function Form() {
  const { user, loading } = useContext(AuthContext);
  if (user && !loading) {

    return (
      <section className="h-screen   flex flex-col items-center justify-center p-5 max-w-7xl mx-auto ">
        <div className="w-4/6 max-w-7xl bg-darkest overflow-hidden  grid md:grid-cols-[1fr_2fr] rounded-2xl   border border-light-gray/50">
          <div className="bg-darkest flex items-center justify-center  md:-ml-5 -mb-2">
            <Image
              src={logo}
              alt="Ravly Logo"
              className="object-contain w-16 md:w-32 py-5 md:ml-5"
            />
          </div>
          <PromtUserReAuthwithPassword />
        </div>
      </section>
    );
  } else if (loading && !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <SyncLoader color="rgb(190, 18, 60)" size={16} loading={true} className='animate-pulse' />
      </div>
    );
  } else {
    redirect("/login");
  }
});
