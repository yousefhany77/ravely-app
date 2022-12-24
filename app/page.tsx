import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroSection from "../components/Home/Hero";
import SoundWaves from "../components/Home/SoundWaves";
import VideoFeature from "../components/Home/VideoFeature";

function page() {
  return (
    <main className="max-w-7xl w-full mx-auto text-justify flex flex-col items-center justify-center gap-10  min-h-screen px-6 pb-4 ">
      {/* Heading */}
      <HeroSection />

      <section className="flex flex-col gap-10 w-full  ">
        <div className="flex flex-col gap-3 my-3">
          <h2 className="text-3xl capitalize font-extrabold text-white sm:text-center sm:text-5xl">
            create a party with voice chat
          </h2>
          <p className="text-xl md:text-2xl leading-8 text-slate-400 sm:text-center">
            syncronized video player amoung all party members
          </p>
        </div>
        <div className="w-5/6 mx-auto  flex flex-col lg:flex-row flex-warp items-center justify-center gap-10">
          <VideoFeature text="real-time cinematic experience" />
          <VideoFeature text="real-time cinematic experience" />
        </div>
        {/* audio chat */}
        <h2 className="text-3xl capitalize mt-6 mb-2  font-bold text-light-gray sm:text-center sm:text-4xl">
          Real-time communication
        </h2>
        <section className="flex  justify-between items-center gap-4 md:gap-2">
          <div className="flex   mx-auto  items-center gap-6">
            <div className="w-24 md:w-28 lg:w-32  aspect-square rounded-full shadow-md border-4   relative overflow-hidden  ">
              <Image src="/avatar.png" fill alt="user-aduio chat profile 1" />
            </div>
            <SoundWaves />
          </div>
          <div className="flex    mx-auto  items-center gap-6">
            <SoundWaves />
            <div className="w-24 md:w-28 lg:w-32 aspect-square rounded-full shadow-md border-4   relative overflow-hidden ">
              <Image src="/avatar2.png" fill alt="user-aduio chat profile 2" />
            </div>
          </div>
        </section>
        {/* cta */}
        <Link href="/signup"
          className={`w-fit text-lg lg:text-2xl font-bold my-10  btn-secondary  px-6 py-2 lg:px-8 lg:py-3 rounded-xl cursor-pointer shadow-lg   mx-auto block  `}
        >
          Sign up Now
        </Link>
      </section>
    </main>
  );
}

export default page;
