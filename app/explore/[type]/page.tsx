import React from "react";
import Card from "../../../components/cards/MovieCard";
import { ListResponse } from "../../../util/getDataListing";
import { getGenreId } from "../../../util/getGenreId";
import getNetworkId from "../../../util/getNetworkId";
import getSortmethoud from "../../../util/getSortmethoud";
interface Props {
  searchParams: any;
  params: {
    type: "movies" | "seasons";
  };
}

// getDicoverList based on searchParams [genres , sort , provider, year]
const getDicoverList = async (
  type: "movies" | "seasons",
  searchParams: any
) => {
  const { sort, genre, network, year } = searchParams;
  if (type === "movies") {
    const url = `https://api.themoviedb.org/3/discover/${"movie"}?api_key=${
      process.env.API_KEY
    }&language=en-US&sort_by=${getSortmethoud(
      sort
    )}&page=1&year=${year}&with_genres=${getGenreId(
      genre,
      "movie"
    )}&with_networks=${getNetworkId(
      network
    )}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=4&watch_region=US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } else {
    const url = `https://api.themoviedb.org/3/discover/${"tv"}?api_key=${
      process.env.API_KEY
    }&language=en-US&sort_by=${getSortmethoud(
      sort
    )}&page=1&year=${year}&with_genres=${getGenreId(
      genre,
      "tv"
    )}&with_networks=${getNetworkId(
      network
    )}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=4&watch_region=US`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
};

async function page({ searchParams, params: { type } }: Props) {
  const data: ListResponse = await getDicoverList(type, searchParams);
  return (
    <div className=" h-full  text-white px-10">
      <section>
        <h2 className="font-bold text-4xl my-6 ">Discover</h2>
        <div className="grid  md:grid-cols-3 lg:grid-cols-4  3xl:grid-cols-5 gap-4 ">
          {data.results.map((item: any) => (
            <Card data={item} key={item.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default page;
