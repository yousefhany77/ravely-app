import { getGenreId } from "./getGenreId";
import getNetworkId from "./getNetworkId";
import getSortmethoud from "./getSortmethoud";

const getDicoverList = async (
  type: "movies" | "serieses",
  searchParams: any
) => {
  const { sort, genre, network, year, page = 1 } = searchParams;
  if (type === "movies") {
    const url = `https://api.themoviedb.org/3/discover/${"movie"}?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=en-US&sort_by=${getSortmethoud(
      sort
    )}&page=${page}&year=${year}&with_genres=${getGenreId(
      genre,
      "movie"
    )}&with_networks=${getNetworkId(
      network
    )}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=4&watch_region=US`;
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results.map((series: any) => {
      return {
        ...series,
        media_type: "movie",
      };
    });
    return {
      ...data,
      results,
    };
  } else {
    const url = `https://api.themoviedb.org/3/discover/${"tv"}?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
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
    const results = data.results.map((series: any) => {
      return {
        ...series,
        media_type: "tv",
      };
    });
    return {
      ...data,
      results,
    };
  }
};

export default getDicoverList;
