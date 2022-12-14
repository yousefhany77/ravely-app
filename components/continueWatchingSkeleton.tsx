import React from "react";
import Loader from "./layout/Loader/Loader";
import Slider from "./layout/Slider";

function ContinueWatchingSkeleton() {
  return (
    <div className="max-w-[120rem] mx-auto shadow-lg bg-darkest rounded-2xl p-4   w-full h-fit">
      <Slider className=" min-w-[66%]">
        {[1, 2, 3].map((item) => (
          <CardSkeleton key={item} />
        ))}
      </Slider>
    </div>
  );
}

export default ContinueWatchingSkeleton;

const CardSkeleton = () => {
  return (
    <div className="w-full block relative aspect-video bg-dark ">
      <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 " />
      <span className="text-center block w-full rounded-xl bg-white absolute bottom-5 z-50" />
    </div>
  );
};
