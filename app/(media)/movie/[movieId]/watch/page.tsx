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
import { MoviePage } from "../../../../../pages/api/movie";
import { getImageUrl } from "../../../../../util/getImageUrl";
import { getUserRole, stripeRole } from "../../../../../util/getUserRole";
import Head from "../../head";
import Slider from "../Slider";
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
                <h1 className="capitalize text-5xl font-extrabold text-white shadow-lg ">
                  {movieDetails.title ? movieDetails.title : "No title"}
                </h1>

                <p className="pl-4 pr-0 bg-slate-800 rounded-lg text-slate-400 flex items-center gap-3">
                  <span>Party Id:</span>{" "}
                  <span className="bg-[#0000006b]  text-white rounded-lg p-2">
                    {party}
                  </span>
                </p>
              </div>
              <PremiumVideoPlayer
                mediaType="mp4"
                room={party}
                src="/api/video"
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
                videoSrc="/api/video"
              />
              {userRole !== "basic" && (
                <div className="w-full flex items-center justify-between">
                  <div className="px-4 py-2 bg-slate-800 text-white flex items-center gap-4">
                    <p className="text-lg font-bold">Party Id:</p>
                    <input
                      onChange={(e) => setInput(e.target.value)}
                      type="text"
                      className="bg-light-gray/25 rounded py-1 border-none outline-none focus:outline-red/25 px-2 "
                    />
                    <button
                      disabled={input.length !== 10}
                      onClick={() => joinParty(user, setParty, input)}
                      className=" px-4 bg-white text-black  py-1 rounded-lg cursor-pointer shadow-lg transition-colors ease-in-out duration-150 hover:bg-red hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Join party 🎞️
                    </button>
                  </div>
                  <button
                    onClick={() => createParty(user, setParty)}
                    className=" btn-primary px-5 py-2 rounded-xl cursor-pointer shadow-lg   my-2"
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
          ) : <p>No recommendations</p>}
        </section>
      </section>
    );
  }
}

export default Page;

const getMoveDetails = async (movieId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/movie?id=${movieId}`
  );
  const data: MoviePage = await res.json();
  return data;
};

const createParty = (
  user: User,
  setParty: Dispatch<SetStateAction<string>>
) => {
  // @check if user is premium
  if (!user) return;
  getUserRole(user).then((role) => {
    if (role !== "basic") {
      // @create party
      //  if premium create party
      //   => mount premium video player
      const roomid = nanoid(10);
      setParty(roomid);
      return;
    } else {
      // @prompt to upgrade
      //  if not premium prompt to upgrade or use free video player
      //   => mount free video player || => redirect to upgrade page
      alert("You need to be premium to create a party");
      window.location.href = "/plans";
    }
  });

  return null;
};

const joinParty = (
  user: User,
  setParty: Dispatch<SetStateAction<any>>,
  room: string
) => {
  // @check if user is premium
  if (!user) return;
  if (!room || room.length < 10) {
    return alert("Invalid party id");
  }
  getUserRole(user).then((role) => {
    if (role !== "basic") {
      // @create party
      //  if premium create party
      //   => mount premium video player
      setParty(room);
      return;
    } else {
      // @prompt to upgrade
      //  if not premium prompt to upgrade or use free video player
      //   => mount free video player || => redirect to upgrade page
      alert("You need to be premium to create a party");
      window.location.href = "/plans";
    }
  });

  return null;
};
const fetchMovie = async (movieId: string) => {
  const movieDetails = await getMoveDetails(movieId);
  return movieDetails;
};
