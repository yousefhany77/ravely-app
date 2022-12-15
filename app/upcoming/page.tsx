import React from "react";
import Card from "../../components/cards/MovieCard";
import Paginition from "../../components/Paginition";
import { ListResponse } from "../../util/getDataListing";

interface Props {
  searchParams?: { page: string };
}

async function Page({ searchParams }: Props) {
  const data: ListResponse = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&page=${searchParams?.page}`,
    {
      cache: "no-store",
    }
  ).then((response) => response.json());
  return (
    <div className=" h-full  text-white px-10 mt-20">
      <section className="mt-10 ">
        <h1 className="font-bold text-4xl my-6 capitalize">upcoming movies</h1>
        <div className="grid  md:grid-cols-3 lg:grid-cols-4  3xl:grid-cols-5 gap-4 ">
          {data.results.map((item: any) => (
            <Card data={item} key={item.id} />
          ))}
        </div>
      </section>
      <Paginition location="upcoming" pagesCount={data.total_pages} />
    </div>
  );
}

export default Page;
