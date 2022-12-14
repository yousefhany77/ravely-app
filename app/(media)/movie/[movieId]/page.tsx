import React from "react";
import Head from "../head";

import VideoSlider from "./VideoSlider";
import Slider from "../../../../components/layout/Slider";
import CharacterCard from "../../../../components/cards/CharacterCard";
import MovieCard from "../../../../components/cards/MovieCard";
import { notFound } from "next/navigation";
import { FavoriteButton } from "../../../../components/Favorite";
import Link from "next/link";
import Hero from "../../../../components/media-page/Hero";
import getMovie from "../../../../util/getMovie";
interface Props {
  params: { movieId: string };
}

export async function generateStaticParams() {
  return [{ movieId: "68721" }];
}
async function page({ params: { movieId } }: Props) {
  const movieDetails = await getMovie(movieId);
  if (movieDetails === null) {
    notFound();
  }

  return (
    <>
      <Head title={movieDetails.title} />
      <main className=" h-full text-white ">
        <Hero media={movieDetails}>
          <p>
            • {(movieDetails.runtime / 60).toFixed(0)}h{" "}
            {movieDetails.runtime % 60}m
          </p>
          <div className="flex items-center justify-end gap-3 w-full  ">
            <Link
              href={`/movie/${movieDetails.id}/watch`}
              className="btn-primary px-5 py-2 rounded-xl cursor-pointer  my-2 w-full lg:w-1/4 text-center"
            >
              Watch Now
            </Link>
            <FavoriteButton mediaId={`m-${movieDetails.id}`} />
          </div>
        </Hero>

        <section className="p-5 w-full lg:w-10/12 aspect-video mx-auto">
          <h2 className="text-4xl font-bold my-6">Trailers</h2>
          <VideoSlider trailers={movieDetails.trailers} />
        </section>
        <section className="w-[80vw] mx-auto p-5">
          <h2 className="text-3xl font-bold my-6">Cast</h2>
          <Slider className="min-w-[45%] md:min-w-[25%] lg:min-w-[16%]">
            {movieDetails.cast.map((cast) => (
              <CharacterCard character={cast} key={cast.id} />
            ))}
          </Slider>
        </section>
        {movieDetails.collection !== null && (
          <section className="w-[80vw] mx-auto p-5">
            <h2 className="text-3xl font-bold my-6">Parts</h2>
            <Slider
              className={`${
                movieDetails.collection?.length &&
                movieDetails.collection?.length > 2
                  ? "min-w-[66%]"
                  : "min-w-[80%]"
              } xl:min-w-[33%] lg:min-w-[25%]  `}
            >
              {movieDetails.collection!.map((data) => (
                <MovieCard data={data} key={data.id} />
              ))}
            </Slider>
          </section>
        )}
        <section className="w-[80vw] mx-auto p-5">
          <h2 className="text-3xl font-bold my-6">Recommendations</h2>
          <Slider className="sm:min-w-[33%] lg:min-w-[25%] min-w-[55%]">
            {movieDetails.recommendations.map((data) => (
              <MovieCard data={data} key={data.id} />
            ))}
          </Slider>
        </section>
      </main>
    </>
  );
}

export default page;
