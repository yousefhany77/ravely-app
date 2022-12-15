"use client";
import React, { memo, useContext } from "react";
import { BsCompass, BsCompassFill } from "react-icons/bs";
import Logo from "../../public/logo.png";
import { MdMonitor } from "react-icons/md";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineHeart,
  AiFillHeart,
  AiFillCalendar,
  AiOutlineCalendar,
  AiFillSetting,
  AiOutlineSetting,
  AiFillCaretRight,
} from "react-icons/ai";
import Netflix from "../Icons/Netflix.svg";
import AmazonPrime from "../Icons/AmazonPrime.svg";
import HBO from "../Icons/HBO.svg";
import Disney from "../Icons/Disney.svg";
import { MdOutlinePriceChange, MdPriceChange } from "react-icons/md";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import Image from "next/image";
import { AuthContext } from "../../context/authContext";
import SignOutButton from "../auth/SignOut";

function Sidebar() {
  const path = useSelectedLayoutSegments();
  const { user, loading } = useContext(AuthContext);
  const [active, setActive] = React.useState(() => {
    // use switch case
    if (path.length === 0) return 0;
    else if (path[0] === "explore") return 1;
    else if (path[0] === "upcoming") return 3;
    else if (path[0] === "watchlist") return 2;
    else if (path[0] === "party") return 4;
    else if (path[0] === "Account") return 5;
    else return undefined;
  });
  const [isOpen, setIsOpen] = React.useState(true);
  const [showProviders, setShowProviders] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  if (
    path.includes("login") ||
    path.includes("reauth") ||
    path.includes("forgot-password") ||
    path.includes("signup") ||
    path.includes("plans")
  ) {
    return null;
  }
  if (!isOpen) {
    return (
      <AiFillCaretRight
        size={30}
        className="fixed  top-1/3  z-[999]  text-red   cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          document.body?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }}
      />
    );
  }
  return (
    <div
      ref={menuRef}
      className=" min-h-screen  h-auto flex flex-col items-center text-light-gray gap-6 pr-3 xl:pr-5 bg-darkest capitalize"
    >
      <Link prefetch={false} href={"/my-space"}>
        <h2 className="font-bold text-3xl text-white text-center my-6 hidden md:block">
          Ravely<span className="text-red">.</span>
        </h2>
        <Image
          src={Logo}
          alt="Ravly Logo"
          className="rounded-md w-14 md:hidden my-6 "
        />
      </Link>
      {/* Menu */}
      <section className=" relative flex flex-col gap-5  self-start mr-3">
        <span className=" my-3 ml-5 font-medium hidden md:block">Menu</span>
        {/* Home */}
        <Link
          prefetch={false}
          href={"/my-space"}
          className={`w-full border-l-4 flex gap-4 items-center hover:border-light-gray/40 transition-all ease  ${
            active === 0 ? "active" : "border-transparent"
          } `}
          onClick={() => setActive(0)}
        >
          {active === 0 ? (
            <AiFillHome className="ml-5 " size={22} />
          ) : (
            <AiOutlineHome className="ml-5 text-light-gray " size={22} />
          )}

          <span className="hidden md:block">Home</span>
        </Link>
        {/* Explore */}
        <Link
          prefetch={false}
          href={"/explore/movies"}
          className={`w-full border-l-4 flex gap-4 items-center hover:border-light-gray/40 transition-all ease ${
            active === 1 ? "active" : "border-transparent"
          } `}
          onClick={() => setActive(1)}
        >
          {active === 1 ? (
            <BsCompassFill className="ml-5 " size={22} />
          ) : (
            <BsCompass className="ml-5 text-light-gray " size={22} />
          )}

          <span className="hidden md:block">Explore</span>
        </Link>
        {/* Coming soon */}
        <Link
          prefetch={false}
          href={"/upcoming"}
          className={`w-full border-l-4 flex gap-4 items-center hover:border-light-gray/40 transition-all ease ${
            active === 3 ? "active" : "border-transparent"
          } `}
          onClick={() => setActive(3)}
        >
          {active === 3 ? (
            <AiFillCalendar className="ml-5 " size={22} />
          ) : (
            <AiOutlineCalendar className="ml-5 text-light-gray " size={22} />
          )}

          <span className="hidden md:block leading-5 tracking-tighter">
            upcoming
          </span>
        </Link>
        {/* Watchlist */}
        <Link
          prefetch={false}
          href={"/watchlist"}
          className={`w-full border-l-4 flex gap-4 items-center hover:border-light-gray/40 transition-all ease  ${
            active === 2 ? "active" : "border-transparent"
          } `}
          onClick={() => setActive(2)}
        >
          {active === 2 ? (
            <AiFillHeart className="ml-5 " size={22} />
          ) : (
            <AiOutlineHeart className="ml-5 text-light-gray " size={22} />
          )}

          <span className="hidden md:block">Watchlist</span>
        </Link>
        <Link
          prefetch={false}
          href={"/plans"}
          className={`w-full border-l-4 flex gap-4 items-center hover:border-light-gray/40 transition-all ease  ${
            active === 4 ? "active" : "border-transparent"
          } `}
          onClick={() => setActive(4)}
        >
          {active === 4 ? (
            <MdPriceChange className="ml-5 " size={22} />
          ) : (
            <MdOutlinePriceChange className="ml-5 text-light-gray " size={22} />
          )}

          <span className="hidden md:block">Watchlist</span>
        </Link>

        <button
          className={`w-full border-l-4 flex  gap-4 items-center  hover:border-light-gray/40 transition-all ease ${
            active === 7 ? "active" : "border-transparent"
          } `}
          onClick={() => {
            setActive(7);
            setShowProviders(!showProviders);
          }}
        >
          <MdMonitor className="ml-5 " size={22} />

          <span className="hidden md:block ">Networks</span>
        </button>
        {showProviders && (
          <div className=" absolute z-50 bg-gray-800 shadow flex   rounded-xl  gap-3   px-3 justify-center items-center bottom-0 left-full translate-x-9 translate-y-3 ">
            <Link
              className="hover:scale-125 hover:mx-2 transition-all ease-in-out duration-150"
              prefetch={false}
              href={"/explore/serieses?&network=Netflix"}
              onClick={() => setShowProviders(false)}
            >
              <Netflix width={55} />
            </Link>
            <Link
              className="hover:scale-125 hover:mx-2 transition-all ease-in-out duration-150"
              prefetch={false}
              href={"/explore/serieses?network=Amazon Prime"}
              onClick={() => setShowProviders(false)}
            >
              <AmazonPrime width={55} />
            </Link>
            <Link
              className="hover:scale-125 hover:mx-2 transition-all ease-in-out duration-150"
              prefetch={false}
              href={"/explore/serieses?network=HBO"}
              onClick={() => setShowProviders(false)}
            >
              <HBO width={55} />
            </Link>
            <Link
              className="hover:scale-125 hover:mx-2 transition-all ease-in-out duration-150"
              prefetch={false}
              href={"/explore/serieses?network=Disney"}
              onClick={() => setShowProviders(false)}
            >
              <Disney width={55} />
            </Link>
          </div>
        )}
      </section>
      {/* General */}
      {user ? (
        <section className="flex flex-col gap-4 mr-5 self-start">
          <span className=" mt-3 mb-1 ml-5 font-medium hidden md:block">
            General
          </span>

          <Link
            prefetch={false}
            href={"/account"}
            className={`w-full border-l-4 flex gap-4 items-center hover:border-light-gray/40 transition-all ease ${
              active === 5 ? "active" : "border-transparent"
            } `}
            onClick={() => setActive(5)}
          >
            {active === 5 ? (
              <AiFillSetting className="ml-5 " size={22} />
            ) : (
              <AiOutlineSetting className="ml-5 text-light-gray " size={22} />
            )}

            <span className="hidden md:block">Account</span>
          </Link>
          <SignOutButton
            className={`w-full border-l-4 flex gap-4 items-center  hover:border-light-gray/40 transition-all ease ${
              active === 6 ? "active" : "border-transparent"
            } `}
            onClick={() => setActive(6)}
          />
        </section>
      ) : (
        !loading && (
          <Link
            prefetch={false}
            href={"/login"}
            onClick={() => setActive(6)}
            className={`  
         py-2 bg-slate-800 rounded-lg text-white font-bold w-5/6 mx-auto  hover:text-dark
        px-4  transition-colors ease-in-out duration-200   text-center   hover:bg-white active:bg-white"  `}
          >
            {" "}
            Login
          </Link>
        )
      )}
      <span
        className="my-3 w-fit cursor-pointer flex items-center "
        onClick={() => setIsOpen(false)}
      >
        <AiFillCaretRight
          size={20}
          className="  text-red/80  z-50  rotate-180 "
        />
        <span className="text-sm">Hide</span>
      </span>
    </div>
  );
}

export default memo(Sidebar);
