"use client";
import { User } from "firebase/auth";
import { nanoid } from "nanoid";
import { usePathname } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  lazy,
  Suspense,
} from "react";
import useSWR from "swr";
import MovieCard from "../../../../../components/cards/MovieCard";
import FreeVideoPlayer from "../../../../../components/video/FreeVideoPlayer";
import LoadingPlayer from "../../../../../components/video/LoadingPlayer";
import { AuthContext } from "../../../../../context/authContext";
import { getImageUrl } from "../../../../../util/getImageUrl";
import { getUserRole, stripeRole } from "../../../../../util/getUserRole";
import Head from "../../head";
import Slider from "../../../../../components/layout/Slider";
import getMovie from "../../../../../util/getMovie";
import { toast } from "react-toastify";
import copyToClipboard from "../../../../../util/CopyToClipboard";
import addToContinueWatching from "../../../../../util/addToContinueWatching";
import { createParty, joinParty } from "../../../../../util/party";
const PremiumVideoPlayer = lazy(
  () => import("../../../../../components/video/PremiumVideoPlayer")
);
function Page() {
  const pathname = usePathname();
  const movieId = pathname?.split("/")[2];
  const { data: movieDetails, error } = useSWR(movieId, fetchMovie);
  const { user } = useContext(AuthContext);
  const [party, setParty] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [userRole, setUserRole] = useState<stripeRole>("basic");
  if (!movieDetails && !error) return <LoadingPlayer />;
  if (movieDetails && !error && user) {
    getUserRole(user).then((role) => {
      setUserRole(role);
    });

    return (
      <section className="w-full max-w-7xl mx-auto ">
        <Head title={movieDetails.title} />
        <div className="flex flex-col gap-6 items-center ">
          {party ? (
            <Suspense fallback={<LoadingPlayer />}>
              <div className="flex justify-between items-center px-3  w-full ">
                <h1 className="capitalize text-3xl lg:text-4xl font-extrabold text-white shadow-lg w-fit">
                  {movieDetails.title ? movieDetails.title : "No title"}
                </h1>

                <p
                  className="pl-4 pr-0 bg-slate-800 rounded-lg text-slate-400 flex items-center gap-3 cursor-pointer  hover:bg-slate-700"
                  onClick={() => copyToClipboard(party)}
                >
                  <span>Party Id:</span>{" "}
                  <span className="bg-[#0000006b]  text-white rounded-lg p-2">
                    {party}
                  </span>
                </p>
              </div>
              <PremiumVideoPlayer
                mediaType="mp4"
                room={party}
                src={process.env.NEXT_PUBLIC_API_DOMAIN + "/video"}
                username={user.displayName}
                className="w-full rounded-xl"
                poster={
                  movieDetails.backdrop_path
                    ? getImageUrl(movieDetails.backdrop_path, "original")
                    : getImageUrl(movieDetails.poseter_path, "original")
                }
              />
            </Suspense>
          ) : (
            <>
              <FreeVideoPlayer
                title={movieDetails.title}
                poster={movieDetails.backdrop_path}
                fallbackPoster={movieDetails.poseter_path}
                videoSrc={process.env.NEXT_PUBLIC_API_DOMAIN + "/video"}
              />
              {userRole !== "basic" && (
                <div className="w-full flex items-center justify-between flex-wrap">
                  <div className="px-4 py-2 bg-slate-800 text-white flex items-center gap-4  flex-wrap rounded-lg">
                    <p className="text-lg font-bold">Party Id:</p>
                    <input
                      onChange={(e) => setInput(e.target.value)}
                      type="text"
                      className="bg-light-gray/25 w-full md:w-auto  rounded py-1 border-none outline-none focus:outline-red/25 px-2 "
                    />
                    <button
                      onClick={() => joinParty(user, setParty, input)}
                      className=" w-full md:w-auto  px-5 py-2 bg-white text-black   rounded-lg cursor-pointer shadow-lg transition-colors ease-in-out duration-150 hover:bg-red hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Join party 🎞️
                    </button>
                    <button
                      onClick={() => createParty(user, setParty)}
                      className="  w-full md:hidden btn-primary px-5 py-2 rounded-xl cursor-pointer shadow-lg   my-2"
                    >
                      Create party 🎞️
                    </button>
                  </div>
                  <button
                    onClick={() => createParty(user, setParty)}
                    className="  hidden md:block btn-primary px-5 py-2 rounded-xl cursor-pointer shadow-lg   my-2"
                  >
                    Create party 🎞️
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <section className=" mx-auto p-5">
          <h2 className="text-3xl font-bold my-6">Recommendations</h2>
          {movieDetails.recommendations.length > 0 ? (
            <Slider className="md:min-w-[33%] lg:min-w-[25%] min-w-[25%]">
              {movieDetails.recommendations.map((data) => (
                <MovieCard data={data} key={data.id} />
              ))}
            </Slider>
          ) : (
            <p>No recommendations</p>
          )}
        </section>
      </section>
    );
  }
}

export default Page;

const fetchMovie = async (movieId: string) => {
  const movieDetails = await getMovie(movieId);
  if (movieDetails) {
    const { title, poseter_path, backdrop_path, id } = movieDetails;
    await addToContinueWatching(`m-${id}`, {
      mediaId: id,
      title,
      posterLink:
        getImageUrl(backdrop_path, "original") ||
        getImageUrl(poseter_path, "original"),
    });
  }

  return movieDetails;
};
