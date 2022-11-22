import Image from "next/image";
import React from "react";
import { getImageUrl } from "../../../../util/getImageUrl";
interface Props {
  params: { movieId: string };
}
import { AiFillHeart } from "react-icons/ai";
import { MoviePage } from "../../../../pages/api/movie";
import { motion } from "framer-motion";
import VideoSlider from "./VideoSlider";
import Slider from "./Slider";
const getMoveDetails = async (movieId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/movie?id=${movieId}`
  );
  const data: MoviePage = await res.json();
  return data;
};
async function page({ params: { movieId } }: Props) {
  const movieDetails = await getMoveDetails(movieId);
  return (
    <main className=" h-full text-white ">
      <div className="w-full mx-auto rounded-2xl aspect-video relative overflow-hidden">
        <div className="bg-gradient-to-b from-transparent via-transparent to-zinc-900 w-full h-full absolute z-50" />
        <Image
          src={
            movieDetails.backdrop_path
              ? getImageUrl(movieDetails.backdrop_path, "original")
              : getImageUrl(movieDetails.poseter_path, "original")
          }
          alt="movie poster"
          fill
          priority
          loading="eager"
          className="object-cover"
          placeholder="blur"
          blurDataURL={
            movieDetails.backdrop_path
              ? getImageUrl(movieDetails.backdrop_path, "w780")
              : getImageUrl(movieDetails.poseter_path, "w300")
          }
        />
        <section className="p-5  absolute  top-2/3 -translate-y-2/3 w-1/2 bg-light-gray/30 backdrop-blur-lg rounded-tr-2xl rounded-br-2xl z-[51] hidden lg:block">
          <h1 className="capitalize text-4xl my-3 font-extrabold text-red">
            {movieDetails.title ? movieDetails.title : "No title"}
          </h1>
          <p className="text-justify">
            {movieDetails.overview
              ? movieDetails.overview
              : "No overview available"}
          </p>
          <div className="flex items-center justify-end gap-3 ">
            <button className="btn-primary px-5 py-2 rounded-xl cursor-pointer  my-2">
              Watch Now
            </button>
            <AiFillHeart
              className="text-light-gray transition-colors ease-linear duration-150 cursor-pointer hover:text-red"
              size={30}
            />
          </div>
        </section>
      </div>
      <section className="p-5 my-5 w-full  block lg:hidden">
        <h1 className="capitalize text-4xl my-3 font-extrabold text-red">
          {movieDetails.title ? movieDetails.title : "No title"}
        </h1>
        <p className="text-justify">
          {movieDetails.overview
            ? movieDetails.overview
            : "No overview available"}
        </p>
        <div className="flex items-center justify-end gap-3 my-3">
          <button className="btn-primary px-5 py-2 rounded-xl cursor-pointer flex-1">
            Watch Now
          </button>
          <AiFillHeart
            className="text-light-gray transition-colors ease-linear duration-150 cursor-pointer hover:text-red"
            size={30}
          />
        </div>
      </section>
      <section className="p-5 w-full  lg:w-10/12  mx-auto">
        <h2 className="text-3xl font-bold">Cast</h2>
        <Slider>
          <div className="w-96 pointer-events-none  h-52 bg-slate-500">
            Hello 1
          </div>
          <div className="w-96 pointer-events-none h-52 bg-slate-500">
            Hello 2
          </div>
          <div className="w-96 pointer-events-none h-52 bg-slate-500">
            Hello 3
          </div>
          <div className="w-96 pointer-events-none h-52 bg-slate-500">
            Hello 4
          </div>
          <div className="w-96 pointer-events-none h-52 bg-slate-500">
            Hello 5
          </div>
          <div className="w-96 pointer-events-none h-52 bg-slate-500">
            Hello 6
          </div>
          <div className="w-96 pointer-events-none h-52 bg-slate-500">
            Hello 7
          </div>
          <div className="w-96 pointer-events-none h-52 bg-slate-500">
            Hello 8
          </div>
          <div className="w-96 pointer-events-none h-52 bg-slate-500">
            Hello 9
          </div>
        </Slider>
      </section>
      <section className="p-5 w-full lg:w-10/12 aspect-video mx-auto">
        <h2 className="text-4xl font-bold my-6">Trailers</h2>
        <VideoSlider trailers={movieDetails.trailers} />
      </section>
    </main>
  );
}

export default page;
