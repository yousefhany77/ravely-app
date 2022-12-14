import React from "react";
import PlanSkeleton from "../../components/plans/plansSkeleton";

function loading() {
  return (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      <h1 className=" text-3xl lg:text-5xl font-extrabold my-6 text-red">
        Choose Your Plan
      </h1>
      <div className="grid lg:grid-cols-3 gap-10  w-11/12   p-5  place-items-center  h-fit mx-auto">
        {[1, 2, 3].map((plan) => (
          <PlanSkeleton key={plan} />
        ))}
      </div>
    </div>
  );
}

export default loading;
