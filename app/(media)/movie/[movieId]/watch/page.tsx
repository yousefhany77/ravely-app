"use client";
import { usePathname } from "next/navigation";
import { useContext, useState, lazy, Suspense, useRef } from "react";
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
import addToContinueWatching from "../../../../../util/addToContinueWatching";
import { createParty, joinParty } from "../../../../../util/party";
import { IPartyDetails } from "../../../../party/page";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Page() {
  const pathname = usePathname();
  const movieId = pathname?.split("/")[2];
  const { data: movieDetails, error } = useSWR(movieId, fetchMovie);
  const { user } = useContext(AuthContext);
  const [showPartyControls, setShowPartyControls] = useState<boolean>(false);
  const [partyDetails, setPartyDetails] = useState<IPartyDetails>({
    partyName: "",
    mediaType: "m",
    mediaId: movieId || "",
    mediaName: movieDetails?.title || "",
  });
  const partyIdRef = useRef<HTMLInputElement>(null);
  const [userRole, setUserRole] = useState<stripeRole>("basic");
  if (!movieDetails && !error) return <LoadingPlayer />;
  if (movieDetails && !error && user) {
    getUserRole(user).then((role) => {
      setUserRole(role);
    });

    return (
      <section className="w-full max-w-7xl mx-auto ">
        <ToastContainer />
        <Head title={movieDetails.title} />
        <div className="flex flex-col gap-3 lg:gap-6 items-center ">
          <FreeVideoPlayer
            title={movieDetails.title}
            poster={movieDetails.backdrop_path}
            fallbackPoster={movieDetails.poseter_path}
            videoSrc={process.env.NEXT_PUBLIC_API_DOMAIN + "/video"}
          />
          {!showPartyControls && (
            <button
              className="btn-primary px-4 py-2 rounded-md "
              onClick={
                () => {
                if(userRole === "basic"){
                  toast.error("You need a premium account to create or join a party")
                }else{
                  setShowPartyControls(true)
                }
               }}
            >
              Create or Join Party
            </button>
          )}
          {userRole !== "basic" && showPartyControls && (
            <div className="lg:w-2/3 p-6 flex flex-col gap-4">
              <button
                className="bg-white rounded-full w-fit p-1.5 lg:p-3 flex items-center justify-center aspect-square text-white hover:bg-slate-700 self-end "
                onClick={() => setShowPartyControls(false)}
              >
                <span>❌</span>
              </button>
              {/* create party */}
              <section className="grid  lg:grid-cols-2  gap-8 lg:gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold">Create Party</h2>
                  <input
                    type="text"
                    placeholder="Party Name"
                    value={partyDetails?.partyName}
                    onChange={(e) =>
                      setPartyDetails({
                        ...partyDetails,
                        mediaId: movieId!,
                        mediaName: movieDetails.title!,
                        partyName: e.target.value,
                      })
                    }
                    className="p-2 rounded-md border border-gray-300 text-black"
                  />
                  <button
                    className="p-2 rounded-md btn-primary text-white"
                    onClick={() => {
                      if (partyDetails?.partyName) {
                        createParty(user, partyDetails);
                      }
                    }}
                  >
                    Create party
                  </button>
                </div>
                {/* join party */}
                <div className="flex flex-col gap-2 ">
                  <h2 className="text-2xl font-bold ">Join Party</h2>
                  <input
                    type="text"
                    placeholder="Party Name"
                    ref={partyIdRef}
                    className="p-2 rounded-md border border-gray-300 text-black"
                  />
                  <button
                    className="p-2 rounded-md btn-primary text-white"
                    onClick={() => {
                      if (partyIdRef.current && partyIdRef.current.value) {
                        joinParty(user, partyIdRef.current.value);
                      }
                    }}
                  >
                    Join party
                  </button>
                </div>
              </section>
              <p className="text-sm text-gray-500">
                Note: You can only join a party if you have a premium account
              </p>
              <p className="text-sm text-gray-500">
                Note: You can only create a party if you have a premium account
              </p>
            </div>
          )}
        </div>
        <section className=" mx-auto p-5">
          <h2 className="text-3xl font-bold my-6">Recommendations</h2>
          {movieDetails.recommendations.length > 0 ? (
            <Slider className="md:min-w-[33%] lg:min-w-[25%] min-w-[66%]">
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
