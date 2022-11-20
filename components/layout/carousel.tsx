import React from "react";

function Carousel({ title }: { title: string }) {
  return (
    <section className="w-[83vw] 3xl:max-w-[90vw] mx-auto my-5 ">
      <h2 className="font-bold text-3xl my-1">{title}</h2>
      <div className="grid auto-cols-[80vw] md:auto-cols-[50vw]  grid-flow-col px-3 py-3 mx-auto     gap-3 overflow-x-scroll whitespace-nowrap snap-x snap-mandatory">
        <div className="w-full  bannerAspect snap-start shadow-lg  bg-slate-600  rounded-3xl"></div>
        <div className="w-full  bannerAspect snap-start shadow-lg  bg-slate-600  rounded-3xl"></div>
        <div className="w-full  bannerAspect snap-start shadow-lg  bg-slate-600  rounded-3xl"></div>
        <div className="w-full  bannerAspect snap-start shadow-lg  bg-slate-600  rounded-3xl"></div>
        <div className="w-full  bannerAspect snap-start shadow-lg  bg-slate-600  rounded-3xl"></div>
        <div className="w-full  bannerAspect snap-start shadow-lg  bg-slate-600  rounded-3xl"></div>
        <div className="w-full  bannerAspect snap-start shadow-lg  bg-slate-600  rounded-3xl"></div>
        <div className="w-full  bannerAspect snap-start shadow-lg  bg-slate-600  rounded-3xl"></div>
      </div>
    </section>
  );
}

export default Carousel;
