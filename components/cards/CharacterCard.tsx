import Image from "next/image";
import React from "react";
import { Cast } from "../../pages/api/movie";
import { getImageUrl } from "../../util/getImageUrl";

interface Props {
  character: Cast;
  className?: string;
}

function CharacterCard({ character, className }: Props) {
  return (
    <div
      className={`bg-darkest border border-light-gray shadow w-full h-full rounded-2xl overflow-hidden aspect-[1/1.6]  text-center flex flex-col ${className}`}
    >
      <div className="bg-red h-3/4 w-full  relative pointer-events-none">
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
      <div className="flex flex-col  bg-rose-900 h-fit items-center justify-center flex-grow  ">
        <h2 className="text-white font-bold text-lg">{character.name}</h2>
        <h2 className="text-black font-medium ">{character.character}</h2>
      </div>
    </div>
  );
}

export default CharacterCard;
