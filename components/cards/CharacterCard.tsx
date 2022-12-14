import Image from "next/image";
import React from "react";
import { getImageUrl } from "../../util/getImageUrl";
import { Cast } from "../../util/types";

interface Props {
  character: Cast;
  className?: string;
}

function CharacterCard({ character, className }: Props) {
  return (
    <div
      className={`bg-darkest border border-light-gray shadow w-full h-full rounded-2xl overflow-hidden aspect-[1/1.6] relative  text-center flex flex-col group ${className}`}
    >
      <div className="bg-red h-full w-full   pointer-events-none">
        <Image
          src={
            character.profile_path
              ? getImageUrl(character.profile_path, "w300")
              : "/logo.png"
          }
          alt={character.name}
          fill
          className="object-cover object-top"
        />
      </div>
      <h2 className="text-white font-bold lg:text-lg z-[49] absolute bottom-0 py-2 left-1/2 -translate-x-1/2 w-full bg-red group-hover:opacity-0 transition-all duration-100 ease-in-out">{character.name}</h2>
      <div className="flex flex-col  bg-red h-fit z-[50] items-center justify-center flex-grow p-2 gap-1 translate-y-40 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
        <h2 className="text-white font-bold lg:text-lg">{character.name}</h2>
        <h2 className="text-slate-800 font-medium text-sm lg:text-base   ">
          {character.character}
        </h2>
      </div>
    </div>
  );
}

export default CharacterCard;
