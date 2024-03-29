import React from "react";
import { getImageUrl } from "../../util/getImageUrl";

function FreeVideoPlayer({
  title,
  poster,
  fallbackPoster,
  videoSrc,
}: {
  title: string;
  poster: string;
  fallbackPoster: string;
  videoSrc: string;
}) {
  return (
    <>
      <div className="flex justify-between items-center px-3  w-full ">
        <h1 className="capitalize text-xl lg:text-3xl font-extrabold text-white shadow-lg w-fit ">
          {title ? title : "No title"}
        </h1>
      </div>
      <video
        poster={
          poster
            ? getImageUrl(poster, "original")
            : getImageUrl(fallbackPoster, "original")
        }
        className="w-full rounded-xl"
        src={videoSrc}
        controls={true}
      >
        Your browser does not support the video tag.
      </video>
    </>
  );
}

export default FreeVideoPlayer;
