"use client";
import Image from "next/image";
import Link from "next/link";
import { AuthProvider } from "../context/authContext";
import useGetContinueWatching from "../hooks/useGetContinueWatching";
import { ContinueWatching } from "../util/addToContinueWatching";
import ContinueWatchingSkeleton from "./continueWatchingSkeleton";
import Slider from "./layout/Slider";

const ConintueWatchingComponent = () => {
  const [continueWatching, isLoading, error] = useGetContinueWatching();

  let continueWatchingCards: JSX.Element[] = [];
  if (error) return <h1 className="text-white text-2xl">Error</h1>;
  if (continueWatching) {
    for (const [key, value] of Object.entries(continueWatching)) {
      if (key.startsWith("m")) {
        const mediaLink = `/movie/${value.mediaId}/watch`;
        continueWatchingCards.unshift(
          <ConintueWatchingCard
            title={value.title}
            posterLink={value.posterLink}
            mediaLink={mediaLink}
            mediaId={value.mediaId}
            key={key}
          />
        );
      } else if (key.startsWith("s")) {
        // /serieses/76479/season/2/episode/1
        // s-id-s1-e1
        const mediaLink = `/serieses/${value.mediaId}/season/${key.split("-")[2]
          }/episode/${key.split("-")[3]}`;
        continueWatchingCards.unshift(
          <ConintueWatchingCard
            title={value.title}
            posterLink={value.posterLink}
            mediaLink={mediaLink}
            mediaId={value.mediaId}
            key={key}
          />
        );
      }
    }
    return (
      <div className="max-w-[120rem] mx-auto shadow-lg bg-darkest rounded-2xl p-2 lg:p-4   w-full h-full">
        {/* <h2 className="font-bold text-3xl my-6 ">Continue Watching</h2> */}
        <Slider className=" min-w-full lg:min-w-[66%] min-h-[100%]  ">
          {continueWatchingCards}
        </Slider>
      </div>
    );
  }
  if (isLoading) return <ContinueWatchingSkeleton />;
  else return null;
};
const continueWatching = () => {
  return (
    <AuthProvider>
      <ConintueWatchingComponent />
    </AuthProvider>
  );
};
export default continueWatching;

interface IContinueWatchingCard extends ContinueWatching {
  mediaLink: string;
}
const ConintueWatchingCard = ({
  title,
  posterLink,
  mediaLink,
}: IContinueWatchingCard) => {
  return (
    <Link href={mediaLink} className="w-full block  h-full   ">
      <div className="relative aspect-square lg:aspect-video">
        <div className="bg-gradient-to-b from-transparent via-transparent to-zinc-900 w-full h-full absolute z-50 " />
        <Image
          alt={title}
          src={posterLink}
          className="object-cover rounded-2xl  overflow-hidden bg-transparent border-2 border-red border-opacity-0 hover:border-opacity-100 transition-all duration-300 ease-in-out 
        cursor-pointer"
          fill
        />
        <span className="text-center text-white w-full font-bold text-3xl hidden sm:block absolute  bottom-5 z-50">
          {title}
        </span>
      </div>
      <span className="text-center text-white w-full font-bold text-xl sm:hidden block mx-auto my-1.5 ">
        {title.length > 16 ? title.slice(0, 16).concat("...") : title}
      </span>
    </Link>
  );
};
