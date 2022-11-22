"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
function Slider({ children }: { children: React.ReactNode[] }) {
  const variants = {
    initial: {
      opacity: 0,
      x: 200,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
      x: -200,
    },
  };
  const ref = useRef<HTMLDivElement>(null);
  console.log(ref.current?.scrollWidth, ref.current?.offsetWidth);
  return (
    <div className="relative my-5">
      <div
        ref={ref}
        className="overflow-x-scroll grid auto-cols-auto grid-flow-col  w-[70vw] gap-4 mx-auto "
      >
        <span
          onClick={() => {
            ref.current?.scrollBy({
              left: ref.current?.offsetWidth,
              behavior: "smooth",
            });
          }}
          className="z-50 absolute top-1/2 right-5 -translate-y-1/2"
        >
          ▶️
        </span>
        <span
          onClick={() => {
            ref.current?.scrollBy({
              left: -ref.current?.offsetWidth,
              behavior: "smooth",
            });
          }}
          className="z-50 absolute top-1/2 left-5 -translate-y-1/2"
        >
          ◀️
        </span>
        {children.map((child, i) => (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className=" rounded-2xl bg-gradient-to-t from-zinc-900 via-red to-red  "
            key={i}
          
          >
            {child}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export default Slider;
