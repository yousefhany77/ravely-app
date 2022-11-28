import React from "react";
import { Plan as PlanDetails } from "../../app/plans/page";

interface Props {
  planDetails: PlanDetails;
}

function Plan({ planDetails }: Props) {
  return (
    <div className="border-light-gray text-black bg-white p-2 shadow">
      <h2 className="font-bold  text-lg">{planDetails.name}</h2>
      <ul>
        {planDetails?.description?.split(",").map((desc) => (
          <li key={desc}>{desc}</li>
        ))}
      </ul>
      {planDetails.price.active && (
        <span className=" text-base font-medium">
          {planDetails.price.unit_amount / 100} {planDetails.price.currency} /{" "}
          {planDetails.price.interval}
        </span>
      )}
      <button className="bg-light-gray  px-3 py-1 font-medium  transition-color ease-in-out duration-200 hover:bg-red">
        subscribe
      </button>
    </div>
  );
}

export default Plan;
