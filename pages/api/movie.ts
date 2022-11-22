import { NextApiRequest, NextApiResponse } from "next";
import { MovieDetails as recommendation } from "../../app/(media)/movie/[movieId]/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=videos,credits,recommendations`
  );
  const data = await response.json();
  const trailers: [number] = data.videos.results
    .map((video: Video) => {
      if (
        video.type.includes("Trailer") &&
        video.site.toLowerCase() === "youtube"
      ) {
        return video.key;
      }
      return null;
    })
    .filter((video: Video) => video !== null);
  const cast: [Cast] = data.credits.cast.map((cast: Cast) => {
    return {
      name: cast.name,
      character: cast.character,
      profile_path: cast.profile_path,
      id: cast.id,
    };
  });
  const recommendations: [recommendation] = data.recommendations.results.map(
    (recommendation: recommendation) => {
      return {
        id: recommendation.id,
        title: recommendation.title,
        poster_path: recommendation.poster_path,
        vote_average: recommendation.vote_average,
        mediaType: recommendation.media_type,
      };
    }
  );
  const movie: MoviePage = {
    id: data.id,
    title: data.title,
    overview: data.overview,
    backdrop_path: data.backdrop_path,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    trailers: trailers,
    poseter_path: data.poster_path,
    cast: cast.slice(0, 20),
    recommendations: recommendations
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 10),
  };

  res.status(200).send(movie);
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface MoviePage {
  id: number;
  poseter_path: string;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  trailers: [number];
  cast: Cast[];
  recommendations: recommendation[];
}
