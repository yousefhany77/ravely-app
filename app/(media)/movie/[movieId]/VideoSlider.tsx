"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineCaretRight } from "react-icons/ai";
import { MoviePage } from "../../../../util/types";
function VideoSlider({ trailers }: { trailers: MoviePage["trailers"] }) {
  const [currentTrailer, setCurrentTrailer] = useState(0);
  const next = () => {
    if (currentTrailer + 1 < trailers.length) {
      setCurrentTrailer(currentTrailer + 1);
      setDirection(1);
      return;
    }

    setCurrentTrailer(0);
    setDirection(-1);
  };
  const prev = () => {
    if (currentTrailer + 1 >= trailers.length) {
      setCurrentTrailer(currentTrailer - 1);
      setDirection(-1);
      return;
    }

    setCurrentTrailer(0);
    setDirection(1);
  };
  const [direction, setDirection] = useState<1 | -1>(1);
  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: 100 * direction,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: -100 * direction,
    }),
  };
  return (
    <div className="relative h-full">
      <span
        onClick={next}
        className=" absolute z-50 top-1/2 -translate-y-1/2 right-5  text-red bg-white/50 backdrop-blur-md shadow p-2 rounded-full  border-2 border-transparent hover:border-white transition-all ease-in-out duration-150  cursor-pointer"
      >
        <AiOutlineCaretRight size={35} />
      </span>
      <span
        onClick={prev}
        className=" absolute z-50 top-1/2 -translate-y-1/2 left-5 rotate-180 text-red bg-white/50 backdrop-blur-md shadow p-2 rounded-full  border-2 border-transparent hover:border-white transition-all ease-in-out duration-150 cursor-pointer"
      >
        <AiOutlineCaretRight size={35} />
      </span>
      <motion.iframe
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-t from-zinc-900 via-red to-red "
        src={`https://www.youtube.com/embed/${trailers[currentTrailer]}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture "
        allowFullScreen
        key={trailers[currentTrailer]}
        custom={direction}
      />
    </div>
  );
}
export default VideoSlider;
