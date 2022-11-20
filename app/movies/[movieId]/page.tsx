import React from "react";
interface Props {
  params: { movieId: string };
}
function page({ params }: Props) {
  return (
    <div className=" h-screen text-white bg-slate-700">
      <h2 className="text-white p-5">Movie {params.movieId}</h2>
    </div>
  );
}

export default page;
