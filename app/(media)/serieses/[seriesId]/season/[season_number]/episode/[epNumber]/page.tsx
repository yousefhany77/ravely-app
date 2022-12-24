"use client";
import { notFound, usePathname } from "next/navigation";
import { useContext, useState, useRef } from "react";
import useSWR from "swr";
import MovieCard from "../../../../../../../../components/cards/MovieCard";
import FreeVideoPlayer from "../../../../../../../../components/video/FreeVideoPlayer";
import LoadingPlayer from "../../../../../../../../components/video/LoadingPlayer";
import { AuthContext } from "../../../../../../../../context/authContext";
import {
  getUserRole,
  stripeRole,
} from "../../../../../../../../util/getUserRole";
import Head from "../../../../../../movie/head";
import Slider from "../../../../../../../../components/layout/Slider";
import getSeries from "../../../../../../../../util/getSeries";
import { createParty, joinParty } from "../../../../../../../../util/party";
import { IPartyDetails } from "../../../../../../../party/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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
  const [showPartyControls, setShowPartyControls] = useState<boolean>(false);
  const [partyDetails, setPartyDetails] = useState<IPartyDetails>({
    partyName: "",
    mediaType: "series",
    mediaId: `${seriesId}-s-${season_number}-ep-${epNumber}`,
    mediaName: "",
  });
  const partyIdRef = useRef<HTMLInputElement>(null);

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
        <ToastContainer />
        <div className="flex flex-col gap-6 items-center ">
          <FreeVideoPlayer
            title={`${seriesDetails.title} S-${season_number} E-${epNumber}`}
            poster={seriesDetails.backdrop_path}
            fallbackPoster={seriesDetails.poseter_path}
            videoSrc={process.env.NEXT_PUBLIC_API_DOMAIN + "/video"}
          />
          {!showPartyControls && (
            <button
              className="btn-primary px-4 py-2 rounded-md "
              onClick={() => setShowPartyControls(true)}
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
                        mediaName: seriesDetails.title!,
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
