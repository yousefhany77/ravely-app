import { NextApiRequest, NextApiResponse } from "next";
import {
  MovieDetails,
  MovieDetails as recommendation,
} from "../../app/(media)/movie/[movieId]/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
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
          media_type: recommendation.media_type,
        };
      }
    );
    let collection: MovieDetails[] | null = null;
    if (data.belongs_to_collection) {
      const response: CollectionResopnse = await fetch(
        `https://api.themoviedb.org/3/collection/${data.belongs_to_collection.id}?api_key=${process.env.API_KEY}&language=en-US`
      ).then((res) => res.json());
      collection = response.parts;
    }
    const movie: MoviePage = {
      id: data.id,
      title: data.title,
      collection: collection ? collection : null,
      overview: data.overview,
      backdrop_path: data.backdrop_path,
      vote_average: data.vote_average,
      runtime: data.runtime,
      vote_count: data.vote_count,
      trailers: trailers,
      poseter_path: data.poster_path,
      cast: cast.slice(0, 20),
      recommendations: recommendations
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 10),
    };
    if (!data.id) {
      return res.status(404).send("No Movie 404");
    }
    return res.status(200).send(movie);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error });
  }
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface MoviePage {
  id: number;
  poseter_path: string;
  collection?: MovieDetails[] | null;
  title: string;
  original_name?: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  trailers: [number];
  cast: Cast[];
  recommendations: recommendation[];
}

export interface Collection {
  id: number;
  name: string;
}

export interface CollectionResopnse {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: MovieDetails[];
}
