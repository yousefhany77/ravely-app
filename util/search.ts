export const search = async (term: string) => {
  const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=54095c148fb928ecb6191c64df56e75f&language=en-US&query=${term}&page=1&include_adult=true`;
  const response = await fetch(new URL(searchUrl));
  const data = await response.json();
  return data.results as SearchResponse;
};

export type SearchResponse = [
  {
    id: number;
    original_title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    name: string;
    title: string;
    media_type: "tv" | "movie";
  }
];
