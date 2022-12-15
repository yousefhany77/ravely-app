import { notFound } from "next/navigation";
import React from "react";
import CharacterCard from "../../../../components/cards/CharacterCard";
import MovieCard from "../../../../components/cards/MovieCard";
import SeasonCard from "../../../../components/cards/SeasonCard";
import UserFavorite from "../../../../components/Favorite";
import Hero from "../../../../components/media-page/Hero";
import Slider from "../../../../components/layout/Slider";
import VideoSlider from "../../movie/[movieId]/VideoSlider";
import Head from "./head";
import getSeries from "../../../../util/getSeries";
import { getImageUrl } from "../../../../util/getImageUrl";
interface Props {
  params: { seriesId: string };
}
export async function generateStaticParams() {
  return [{ seriesId: "76479" }];
}
async function page({ params: { seriesId } }: Props) {
  const seriesDetails = await getSeries(seriesId);
  if (seriesDetails === null) notFound();
  return (
    <>
      <Head title={seriesDetails.title} />
      <main className=" h-full text-white ">
        <Hero media={seriesDetails}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-4">
            <p>
              • Duration: {(seriesDetails.episode_run_time / 60).toFixed(0)}h{" "}
              {seriesDetails.episode_run_time % 60}m
            </p>
            <p>• Episodes: {seriesDetails.number_of_episodes} </p>
            <p>• Seasons: {seriesDetails.number_of_seasons} </p>
          </div>

          <UserFavorite
            mediaId={`s-${seriesDetails.id}`}
            posterLink={getImageUrl(seriesDetails.poseter_path, "original")}
            title={seriesDetails.title}
          />
        </Hero>
        <section className="p-5 w-full lg:w-10/12 aspect-video mx-auto">
          <h2 className="text-4xl font-bold my-6">Trailers</h2>
          <VideoSlider trailers={seriesDetails.trailers} />
        </section>

        <section className="w-[80vw] mx-auto p-5">
          <h2 className="text-3xl font-bold my-6">Seasons</h2>
          <Slider className="min-w-[66%] sm:min-w-[33%] lg:min-w-[25%] ">
            {seriesDetails.seasons.map((data) => (
              <SeasonCard
                data={data}
                key={data.id}
                seriesID={seriesDetails.id}
              />
            ))}
          </Slider>
        </section>
        <section className="w-[80vw] mx-auto p-5">
          <h2 className="text-3xl font-bold my-6">Cast</h2>
          <Slider className="min-w-[45%]  sm:min-w-[25%] lg:min-w-[16%]">
            {seriesDetails.cast.map((cast) => (
              <CharacterCard character={cast} key={cast.id} />
            ))}
          </Slider>
        </section>
        <section className="w-[80vw] mx-auto p-5">
          <h2 className="text-3xl font-bold my-6">Recommendations</h2>
          <Slider className="sm:min-w-[33%] lg:min-w-[25%] min-w-[55%]">
            {seriesDetails.recommendations.map((data) => (
              <MovieCard data={data} key={data.id} />
            ))}
          </Slider>
        </section>
      </main>
    </>
  );
}

export default page;
