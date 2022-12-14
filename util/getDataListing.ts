export type mediaType = "series" | "movie";
export type listType =
  | "trending"
  | "upcoming"
  | "latest"
  | "top_rated"
  | "popular";
const MoviesUrl = {
  trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
  upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
  latest: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}f&language=en-US&sort_by=primary_release_date.desc&include_adult=true&primary_release_year=2022&with_original_language=en&with_watch_monetization_types=flatrate&page=`,
  top_rated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
  popular: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
};

const SeriesUrl = {
  trending: `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
  upcoming: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
  latest: `https://api.themoviedb.org/3/tv/latest?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
  top_rated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
  popular: `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=`,
};

export const getDataListing = async (
  mediaType: mediaType,
  listType: listType,
  page: number = 1
) => {
  if (!mediaType) throw new Error("mediaType is required");
  if (!listType) throw new Error("listType is required");
  const url = mediaType === "movie" ? MoviesUrl[listType] : SeriesUrl[listType];
  const response = await fetch(url + page);
  const data: ListResponse = await response.json();
  return data;
};

// response from the API is an object with a results property that is an array of objects with the data we need to display on the page eather it is a movie or a series
export type ListResponse = {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ListItem[];
  total_pages: number;
  total_results: number;
};

// Movie and Series are the same type
export type ListItem = {
  id: number;
  original_title: string;
  title: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  poster_path: string;
  video: boolean;
  vote_average: number;
  name: string;
  media_type: "tv" | "movie";
};
