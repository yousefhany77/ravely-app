"use client";
import { User } from "firebase/auth";
import { nanoid } from "nanoid";
import { notFound, usePathname } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  lazy,
  Suspense,
} from "react";
import useSWR from "swr";
import MovieCard from "../../../../../../../../components/cards/MovieCard";
import FreeVideoPlayer from "../../../../../../../../components/video/FreeVideoPlayer";
import LoadingPlayer from "../../../../../../../../components/video/LoadingPlayer";
import { AuthContext } from "../../../../../../../../context/authContext";
import { getImageUrl } from "../../../../../../../../util/getImageUrl";
import {
  getUserRole,
  stripeRole,
} from "../../../../../../../../util/getUserRole";
import Head from "../../../../../../movie/head";
import Slider from "../../../../../../../../components/layout/Slider";
import getSeries from "../../../../../../../../util/getSeries";
import copyToClipboard from "../../../../../../../../util/CopyToClipboard";
const PremiumVideoPlayer = lazy(
  () => import("../../../../../../../../components/video/PremiumVideoPlayer")
);
export async function generateStaticParams() {
  return [{ seriesId: "76479", season_number: "1", epNumber: "1" }];
}
function Page() {
  const pathname = usePathname();
  const seriesId = pathname?.split("/")[2];
  const season_number = pathname?.split("/")[4];
  const epNumber = pathname?.split("/")[6];

  const { data: seriesDetails, error } = useSWR(
    seriesId,
    async (seriesId) => await getSeries(seriesId)
  );

  const { user } = useContext(AuthContext);
  const [party, setParty] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [userRole, setUserRole] = useState<stripeRole>("basic");
  if (seriesDetails === null) notFound();
  if (!seriesDetails && !error) return <LoadingPlayer />;
  if (seriesDetails && !error && user) {
    getUserRole(user).then((role) => {
      setUserRole(role);
    });

    return (
      <section className="w-full max-w-7xl mx-auto ">
        <Head
          title={`${seriesDetails.title} S-${season_number} E-${epNumber}`}
        />
        <div className="flex flex-col gap-6 items-center ">
          {party ? (
            <Suspense fallback={<LoadingPlayer />}>
              <div className="flex justify-between items-center px-3  w-full ">
                <h1 className="capitalize text-3xl lg:text-5xl font-extrabold text-white shadow-lg ">
                  {seriesDetails.title
                    ? `${seriesDetails.title} S-${season_number} E-${epNumber}`
                    : "No title"}
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
                src="/api/video"
                username={user.displayName}
                className="w-full rounded-xl"
                poster={
                  seriesDetails.backdrop_path
                    ? getImageUrl(seriesDetails.backdrop_path, "original")
                    : getImageUrl(seriesDetails.poseter_path, "original")
                }
              />
            </Suspense>
          ) : (
            <>
              <FreeVideoPlayer
                title={`${seriesDetails.title} S-${season_number} E-${epNumber}`}
                poster={seriesDetails.backdrop_path}
                fallbackPoster={seriesDetails.poseter_path}
                videoSrc="/api/video"
              />
              {userRole !== "basic" && (
                <div className="w-full flex items-center justify-between flex-wrap">
                  <div className="px-4 py-2 bg-slate-800 text-white flex items-center gap-4 flex-wrap rounded-lg">
                    <p className="text-lg font-bold">Party Id:</p>
                    <input
                      onChange={(e) => setInput(e.target.value)}
                      type="text"
                      className="bg-light-gray/25 w-full md:w-auto  rounded py-1 border-none outline-none focus:outline-red/25 px-2 "
                    />
                    <button
                      disabled={input.length !== 10}
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
          {seriesDetails.recommendations.length > 0 ? (
            <Slider className="md:min-w-[33%] lg:min-w-[25%] min-w-[66%]">
              {seriesDetails.recommendations.map((data) => (
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
