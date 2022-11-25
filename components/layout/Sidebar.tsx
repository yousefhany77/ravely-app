"use client";
import React from "react";
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
  AiOutlineLogout,
  AiFillCaretRight,
} from "react-icons/ai";
import Netflix from "../Icons/Netflix.svg";
import AmazonPrime from "../Icons/AmazonPrime.svg";
import HBO from "../Icons/HBO.svg";
import Disney from "../Icons/Disney.svg";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
function Sidebar() {
  const path = useSelectedLayoutSegments();
  const [active, setActive] = React.useState(() => {
    // use switch case
    if (path.length === 0) return 0;
    else if (path[0] === "explore") return 1;
    else if (path[0] === "upcoming") return 3;
    else if (path[0] === "watchlist") return 2;
    else if (path[0] === "party") return 4;
    else if (path[0] === "settings") return 5;
    else return undefined;
  });
  const [isOpen, setIsOpen] = React.useState(true);
  const [showProviders, setShowProviders] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  if (!isOpen) {
    return (
      <AiFillCaretRight
        size={30}
        className="fixed  top-1/3   text-red  z-50 cursor-pointer"
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
      className="bg-darkest  flex flex-col items-center text-light-gray gap-6 pr-2  capitalize"
    >
      <Link href={"/"}>
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
          href={"/"}
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
              href={"/explore/serieses?&network=Netflix"}
              onClick={() => setShowProviders(false)}
            >
              <Netflix width={55} />
            </Link>
            <Link
              className="hover:scale-125 hover:mx-2 transition-all ease-in-out duration-150"
              href={"/explore/serieses?network=Amazon Prime"}
              onClick={() => setShowProviders(false)}
            >
              <AmazonPrime width={55} />
            </Link>
            <Link
              className="hover:scale-125 hover:mx-2 transition-all ease-in-out duration-150"
              href={"/explore/serieses?network=HBO"}
              onClick={() => setShowProviders(false)}
            >
              <HBO width={55} />
            </Link>
            <Link
              className="hover:scale-125 hover:mx-2 transition-all ease-in-out duration-150"
              href={"/explore/serieses?network=Disney"}
              onClick={() => setShowProviders(false)}
            >
              <Disney width={55} />
            </Link>
          </div>
        )}
      </section>
      {/* social */}{" "}
      <section className="flex flex-col gap-2 mr-5 self-start">
        <span className=" my-3 ml-5 font-medium hidden md:block">Social</span>

        <button
          className={`w-full border-l-4 flex gap-4 items-center hover:border-light-gray/40 transition-all ease ${
            active === 4 ? "active" : "border-transparent"
          } `}
          onClick={() => setActive(4)}
        >
          {active === 4 ? (
            <HiUserGroup className="ml-5 " size={22} />
          ) : (
            <HiOutlineUserGroup className="ml-5 text-light-gray " size={22} />
          )}

          <span className="hidden md:block">Party</span>
        </button>
      </section>
      {/* General */}
      <section className="flex flex-col gap-4 mr-5 self-start">
        <span className=" mt-3 mb-1 ml-5 font-medium hidden md:block">
          General
        </span>

        <button
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

          <span className="hidden md:block">Settings</span>
        </button>
        <button
          className={`w-full border-l-4 flex gap-4 items-center  hover:border-light-gray/40 transition-all ease ${
            active === 6 ? "active" : "border-transparent"
          } `}
          onClick={() => setActive(6)}
        >
          <AiOutlineLogout className="ml-5 " size={22} />

          <span className="hidden md:block">logout</span>
        </button>
      </section>
      <span
        className="my-3 cursor-pointer flex items-center self-start ml-5"
        onClick={() => setIsOpen(false)}
      >
        <AiFillCaretRight
          size={20}
          className="  text-red/80  z-50  rotate-180"
        />
        <span className="text-sm">Hide</span>
      </span>
    </div>
  );
}

export default Sidebar;
