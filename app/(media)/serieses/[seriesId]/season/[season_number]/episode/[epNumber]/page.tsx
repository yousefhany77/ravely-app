import React from "react";
interface Props {
  params: { seriesId: string; episodeId: string };
}
function page({ params }: Props) {
  return (
    <div className=" h-screen text-white bg-slate-700">
      <h2 className="text-white p-5">episode {params.episodeId}</h2>
    </div>
  );
}

export default page;
