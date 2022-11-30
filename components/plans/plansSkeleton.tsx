import React from "react";

function PlanSkeleton() {
  return (
    <div
      className={`relative shadow-lg cursor-default text-white bg-darkest  rounded-xl overflow-hidden   flex flex-col items-center justify-between w-full  h-full bg-gradient-to-b from-gray-400
       to-light-gray p-1 pb-0 
    `}
    >
      <section
        className={`gap-4 flex flex-col bg-darkest w-full flex-1 rounded-t-xl overflow-hidden px-8 `}
      >
        <div className="mt-6">
          <h2 className="w-full h-2 bg-light-gray rounded-full animate-pulse "></h2>
          <h2 className="w-1/2 mx-auto py-2 my-6 h-2 bg-light-gray rounded-full animate-pulse "></h2>
        </div>
        <ul className="text-start mx-auto  w-full">
          {[1, 2, 3, 4, 5].map((desc) => (
            <li
              className="my-3 font-medium w-full flex items-center gap-2"
              key={desc}
            >
              <span className="opacity-60">✅</span>{" "}
              <span className="w-full h-2 bg-light-gray rounded-full animate-pulse " />
            </li>
          ))}
        </ul>
      </section>
      <button className="animate-pulse  w-full mx-auto  bg-light-gray border-light-gray/50  px-3 py-3 font-medium  transition-color ease-in-out duration-200 hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-rose-700 to-pink-600 disabled:opacity-50 group-hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] group-hover:from-rose-700 group-hover:to-pink-600  ">
        subscribe
      </button>
    </div>
  );
}

export default PlanSkeleton;
