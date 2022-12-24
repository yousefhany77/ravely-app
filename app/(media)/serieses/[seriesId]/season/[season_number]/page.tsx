import { notFound } from "next/navigation";
import React from "react";
import EpisodeCard from "../../../../../../components/cards/MovieCard";
import FavoriteButton from "../../../../../../components/Favorite";
import Hero from "../../../../../../components/media-page/Hero";
import Slider from "../../../../../../components/layout/Slider";
import Head from "../../head";
import getSeries, { SeriesPage } from "../../../../../../util/getSeries";
import { getImageUrl } from "../../../../../../util/getImageUrl";
const getSeasonData = async (
  id: number,
  season_number: number
): Promise<SeasonResponse> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data;
};

interface Props {
  params: {
    seriesId: number;
    season_number: number;
  };
}
export async function generateStaticParams() {
  return [{ seriesId: "76479", season_number: "1" }];
}
async function page({ params: { seriesId, season_number } }: Props) {
  const seasonDetails = await getSeasonData(seriesId, season_number);
  const seriesDetails = await getSeries(seriesId);
  if (seriesDetails === null) notFound();

  const tabTitle = seriesDetails.title;
  const rating = seriesDetails.vote_average;
  const ep_runTime = seriesDetails.episode_run_time;

  return (
    <>
      <Head title={`${tabTitle} | season ${season_number}`} />
      <main className="h-full text-white">
        <Hero
          media={{
            backdrop_path: seriesDetails.backdrop_path,
            title: seriesDetails.title,
            overview: seriesDetails.overview,
            vote_average: seriesDetails.vote_average,
            poseter_path: seriesDetails.backdrop_path,
          }}
        >
          <p>
            • Duration: {(ep_runTime / 60).toFixed(0)}h {ep_runTime % 60}m
          </p>
          <p>• Episodes: {seasonDetails.episodes?.length || "unknown"} </p>

          <FavoriteButton
            mediaId={`s-${seriesId}-${season_number}`}
            posterLink={getImageUrl(seasonDetails.poster_path, "original")}
            title={`${tabTitle} | season ${season_number}`}
          />
        </Hero>
        <section className="w-[80vw] mx-auto p-5">
          <h2 className="text-3xl font-bold my-6">Episodes</h2>
          <Slider className=" min-w-[66%] md:min-w-[33%] lg:min-w-[25%] ">
            {seasonDetails.episodes.map((data) => {
              const ep = {
                id: data.id,
                title: `Ep ${data.episode_number} | ${data.name}`,
                poster_path: data.still_path,
                vote_average: data.vote_average,
                media_type: "episode",
                episode_number: data.episode_number,
                season_number: season_number,
                seriesId,
              };
              return <EpisodeCard data={ep} key={ep.id} />;
            })}
          </Slider>
        </section>
      </main>
    </>
  );
}

export default page;

interface SeasonResponse {
  episodes: episode[];
  season_number: number;
  poster_path: string;
  overview: string;
}

interface episode {
  id: number;
  episode_number: number;
  name: string;
  still_path: string;
  vote_average: number;
  media_type: string;
  guest_stars: {
    character: string;
    credit_id: string;
    name: string;
    profile_path: string;
  };
}
