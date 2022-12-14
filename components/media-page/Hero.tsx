import Image from "next/image";
import React from "react";
import { getImageUrl } from "../../util/getImageUrl";
import Rating from "../Rating";

interface IHero {
  media: HeroSectionDetails;
  children: React.ReactNode;
}
interface HeroSectionDetails {
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  poseter_path: string;
}
function Hero({ media, children }: IHero) {
  return (
    <div className="w-full mx-auto relative flex flex-col overflow-hidden ">
      <div className="bg-gradient-to-t from-transparent via-transparent to-zinc-900 w-full h-1/4 absolute z-50 " />
      <div className="bg-gradient-to-b from-transparent via-transparent to-zinc-900 w-full h-full absolute z-50 " />
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={
            media.backdrop_path
              ? getImageUrl(media.backdrop_path, "original")
              : getImageUrl(media.poseter_path, "original")
          }
          alt="movie poster"
          fill
          priority
          className="object-cover"
          placeholder="blur"
          blurDataURL={
            media.backdrop_path
              ? getImageUrl(media.backdrop_path, "w780")
              : getImageUrl(media.poseter_path, "w300")
          }
        />
      </div>

      <section className="p-5  lg:absolute  lg:top-2/3 lg:-translate-y-2/3 lg:w-1/2 bg-light-gray/30 backdrop-blur-lg lg:rounded-tr-2xl lg:rounded-br-2xl z-[51] ">
        <div className="flex gap-2 items-center justify-between">
          <h1 className="capitalize text-3xl lg:text-4xl my-3 font-extrabold text-red">
            {media.title ? media.title : "No title"}
          </h1>
          <Rating rating={media.vote_average} />
        </div>
        <p className="text-justify">
          {media.overview ? media.overview : "No overview available"}
        </p>
        <div className="flex justify-between items-center my-1 flex-wrap">
          {children}
        </div>
      </section>
    </div>
  );
}

export default Hero;
