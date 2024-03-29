"use client";
import { motion } from "framer-motion";
import { AiOutlineCaretRight } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode[];
  className?: string;
}
function Slider({ children, className }: Props) {
  const [last, setLast] = useState(0);
  const [x, setX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const next = () => {
    const offset = sliderRef.current?.clientWidth || 400;
    if (Math.abs(x) <= last - offset) {
      setX((curr) => curr - offset);
      return;
    }
    // if last element is not fully visible then scroll to the last element
    else if (Math.abs(x) - last < offset && Math.abs(x) !== last) {
      setX(-last);
      return;
    } else {
      setX(0);
    }
  };
  const prev = () => {
    const offset = sliderRef.current?.clientWidth || 400;
    if (Math.abs(x) >= offset) {
      setX((curr) => curr + offset);
      return;
    }
    setX(0);
  };
  const carousel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLast(carousel.current!.scrollWidth - carousel.current!.offsetWidth);
  }, []);
  return (
    <section className=" overflow-hidden relative  ">
      {/* gradient at the end of the slider */}
      <div
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-[7%] h-full pointer-events-none  z-50 ${
          children.length > 4
            ? "bg-gradient-to-r from-transparent via-gray-900/30 to-black/95"
            : null
        }`}
      />
      <motion.div
        ref={carousel}
        className=" cursor-grab overflow-hidden "
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          animate={{ x: x }}
          dragConstraints={{
            right: 0,
            left: -last,
          }}
          className={` flex ${
            children.length < 2
              ? "justify-center  "
              : "justify-start"
          }    items-center px-2 lg:px-4`}
        >
          {children.map((child, i) => (
            <motion.div
              ref={sliderRef}
              key={i}
              className={`mx-1  min-h-[10rem]    ronded-xl  ${className}`}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <button
        onClick={next}
        className=" z-[999] absolute top-1/2 -translate-y-1/2 right-5 text-red bg-white/50 backdrop-blur-md shadow p-2 rounded-full  border-2 border-transparent hover:border-white transition-all ease-in-out duration-150"
      >
        <AiOutlineCaretRight className="text-xl lg:text-3xl" />
      </button>
      <button
        onClick={prev}
        className=" z-[999] absolute top-1/2 -translate-y-1/2 left-5 rotate-180 text-red bg-white/50 backdrop-blur-md shadow p-2 rounded-full  border-2 border-transparent hover:border-white transition-all ease-in-out duration-150"
      >
        <AiOutlineCaretRight className="text-xl lg:text-3xl" />
      </button>
    </section>
  );
}

export default Slider;
