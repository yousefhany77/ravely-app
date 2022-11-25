import Image from "next/image";
import React from "react";
import { getImageUrl } from "../../util/getImageUrl";
import Rating from "../Rating";
import { AiFillPlayCircle } from "react-icons/ai";
import Link from "next/link";
import { MovieDetails as Detials } from "../../app/(media)/movie/[movieId]/types";
import { Season } from "../../pages/api/serieses";

interface SeriesDetials extends Season {
  name: string;
  season_number: number;
}

interface Props {
  data: SeriesDetials;
  className?: string;
  seriesID: number;
}

export default function SeasonCard({ data, className, seriesID }: Props) {
  return (
    <Link href={`/serieses/${seriesID}/season/${data.season_number}`}>
      <div
        className={`w-full flex flex-col gap-3 pb-3 overflow-hidden border border-light-gray rounded-3xl cardAspect relative group cursor-pointer ${className} `}
      >
        <Image
          src={
            data.poster_path
              ? getImageUrl(data.poster_path, "w780")
              : "/logo.png"
          }
          alt="movie poster"
          fill
          className={`${
            data.poster_path
              ? "object-cover"
              : " object-contain p-10 opacity-70 "
          }   transition-transform duration-200 ease-linear hover:scale-110`}
        />
       
        <button
          className="  font-bold flex items-center justify-center  gap-2 py-3 flex-wrap p-2 min-h-[4rem]
            absolute bottom-0 left-1/2 -translate-x-1/2
            transition-all duration-200 w-full ease-out bg-slate-900/90 hover:bg-zinc-900 flex-grow  hover:underline underline-offset-2"
        >
          <AiFillPlayCircle
            size={25}
            className="text-red bg-white w-6 h-6 rounded-full shadow-lg   "
          />
          <h2 className="text-base ">{data.name || "unknown"}</h2>
        </button>
      </div>
    </Link>
  );
}
