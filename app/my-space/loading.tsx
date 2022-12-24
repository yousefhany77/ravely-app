import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import ContinueWatchingSkeleton from "../../components/continueWatchingSkeleton";

function loading() {
  return (
    <div
      className="
    text-7xl text-white w-full  p-10  my-10 opacity-90 animate-pulse "
    >
      <h2 className="font-bold text-3xl my-6 ">Continue Watching</h2>
      <ContinueWatchingSkeleton />

      <h2 className="font-bold text-3xl my-6 ">Trending</h2>
      <section className="grid  md:grid-cols-3 lg:grid-cols-4  3xl:grid-cols-5 gap-4 ">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className=" border-light-gray rounded-3xl cardAspect w-full bg-gray-700 flex flex-col overflow-hidden"
          >
            <div className="bg-slate-700 h-4/5 rounded-3xl" />
            <button
              className="  font-bold flex flex-col w-full items-center justify-center  gap-2 py-3  p-2 min-h-[4rem]
           
            bg-slate-900/9 flex-grow  "
            >
              <AiFillPlayCircle
                size={25}
                className="text-red bg-white w-6 h-6 rounded-full shadow-lg   "
              />
              <span className="border-b-4 w-full mx-auto  border-light-gray " />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default loading;
