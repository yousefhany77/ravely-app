import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}&append_to_response=videos,credits,recommendations`
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
    const recommendations: [seriesRecommendations] =
      data.recommendations.results.map((recommendation: any) => {
        return {
          id: recommendation.id,
          title: recommendation.name,
          original_name: recommendation.original_name,
          poster_path: recommendation.poster_path,
          vote_average: recommendation.vote_average,
          media_type: recommendation.media_type,
        };
      });
    const series: SeriesPage = {
      id: data.id,
      title: data.name,
      seasons: data.seasons,
      overview: data.overview,
      backdrop_path: data.backdrop_path,
      vote_average: data.vote_average,
      // get the avg
      episode_run_time: data.episode_run_time.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      ),
      vote_count: data.vote_count,
      trailers: trailers,
      poseter_path: data.poster_path,
      cast: cast.slice(0, 20),
      recommendations: recommendations
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 10),
      number_of_episodes: data.number_of_episodes,
      number_of_seasons: data.number_of_seasons,
    };

    res.status(200).send(series);
  } catch (error) {
    res.status(500).json({ error: error });
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

export interface SeriesPage {
  id: number;
  poseter_path: string;
  seasons: Season[];
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  episode_run_time: number;
  trailers: [number];
  cast: Cast[];
  recommendations: seriesRecommendations[];
  number_of_episodes: number;
  number_of_seasons: number;
}

interface seriesRecommendations {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  media_type: string;
  original_name: string;
}

export interface Collection {
  id: number;
  name: string;
}
export interface Season {
  name: string;
  episode_count: number;
  id: number;
  poster_path: string;
  season_number: number;
}
