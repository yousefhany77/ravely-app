import { notFound } from "next/navigation";
import React from "react";
import Card from "../../../components/cards/MovieCard";
import Paginition from "../../../components/Paginition";
import { ListResponse } from "../../../util/getDataListing";
import getDicoverList from "../../../util/getDiscoverList";
interface Props {
  searchParams: any;
  params: {
    type: "movies" | "serieses";
  };
}



async function page({ searchParams, params: { type } }: Props) {
  const data: ListResponse = await getDicoverList(type, searchParams);
  if (!data.total_results) notFound();
  return (
    <div className=" h-full  text-white px-10">
      <section>
        <h2 className="font-bold text-4xl mt-3 mb-6 ">Explore</h2>
        <div className="grid  md:grid-cols-3 lg:grid-cols-4  3xl:grid-cols-5 gap-4 ">
          {data.results.map((item: any) => (
            <Card data={item} key={item.id} />
          ))}
        </div>
      </section>
      <Paginition location={`explore/${type}`} pagesCount={data.total_pages} />
    </div>
  );
}

export default page;
