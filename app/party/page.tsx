"use client";
import React, { lazy, Suspense, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "firebase/auth";
import { AuthContext } from "../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-init";
import { getUserRole } from "../../util/getUserRole";
import Loader from "../../components/layout/Loader/Loader";
import Head from "../(media)/movie/head";
import LoadingPlayer from "../../components/video/LoadingPlayer";
import copyToClipboard from "../../util/CopyToClipboard";
import Image from "next/image";
import { toast } from "react-toastify";
const PremiumVideoPlayer = lazy(
  () => import("../../components/video/PremiumVideoPlayer")
);

const getParty = async (partyId: string, user: User) => {
  // check if the party exists in firebase and if it does, return true
  const docRef = doc(db, "party", partyId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const role = await getUserRole(user);
    if (role === "premium" || role === "premium4k") {
      const party = docSnap.data();
      return {
        partyName: party?.partyName,
        mediaType: party?.mediaType,
        mediaId: party?.mediaId,
        mediaName: party?.mediaName,
      } as IPartyDetails;
    }
    else {
      throw new Error("You are not a premium user")
    }

  }

  // if not, return false
  return false;
};

export interface IPartyDetails {
  partyName: string;
  mediaType: string;
  mediaId: string;
  mediaName: string;
}
function PartyPage() {
  // check if the party exists in firebase and if it does, render the party page
  // if not, render a 404 page
  const searchParams = useSearchParams();
  const [notFound, setNotFound] = useState(false);
  const partyId = searchParams.get("partyId");
  const { user } = useContext(AuthContext);
  const [loadingParty, setLoadingParty] = useState(true);
  const [party, setParty] = useState<IPartyDetails>();
  const [inCall, setInCall] = useState(false);
  const AudioCall = lazy(() => import("../../components/chat/AudioCall"));
  if (partyId && user && !party) {
    getParty(partyId, user).then((partyDetails) => {
      if (partyDetails) {
        // render the party page
        setParty(partyDetails);
        setLoadingParty(false);
      } else {
        setLoadingParty(false);
        setNotFound(true);
      }
    }).catch((err) => {
      if (err.message === "You are not a premium user") {
        toast.error("You are not a premium user to use party features please upgrade your plan", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          onClose: () => {
            window.location.href = "/plans"
          }
        })
        return
      }
      toast.error("something went wrong")
    });
  }
  if (!partyId)
    return (
      <div className="font-bold  min-h-screen flex items-center justify-center flex-col gap-3  text-2xl lg:text-4xl text-white ">
        <Image
          src={"/cat-notfound.jpg"}
          alt="Not Found 404"
          width={460}
          height={428}
          className="rounded-lg shadow-lg overflow-hidden"
        />
        Party Id not found
      </div>
    );
  if (notFound)
    return (
      <div className="font-bold  min-h-screen flex items-center justify-center flex-col gap-3  text-2xl lg:text-4xl text-white rounded-lg overflow-hidden">
        {" "}
        <Image
          src={"/cat-notfound.jpg"}
          alt="Not Found 404"
          width={460}
          height={428}
          className="rounded-lg shadow-lg overflow-hidden"
        />
        Party Id not found
      </div>
    );
  return (
    <>
      {loadingParty ? (
        <div className="font-bold text-3xl p-3 lg:p-6 text-white min-h-screen flex flex-col items-center justify-center gap-3">
          <Loader />
          <p>Loading...</p>
        </div>
      ) : (
        <main className="font-bold p-3 lg:p-6 max-w-7xl mx-auto text-white">
          {party && partyId && user && (
            <>
              <Head title={party.mediaName || "Ravely"} />
              <Suspense fallback={<LoadingPlayer />}>
                <h1 className="capitalize text-xl lg:text-3xl font-extrabold text-white shadow-lg w-fit">
                  {party.mediaName || "No title"}
                </h1>
                <PremiumVideoPlayer
                  mediaType="mp4"
                  room={partyId}
                  src={process.env.NEXT_PUBLIC_API_DOMAIN + "/video"}
                  username={user.displayName}
                  className="w-full rounded-xl my-4"
                />
              </Suspense>

              {/* users in the audio chat */}
              <div className="flex flex-col items-center justify-center lg:justify-between gap-4 lg:flex-row my-4">
                <h2 className="font-bold text-xl lg:text-2xl">
                  {party.partyName}
                </h2>
                <p
                  className=" bg-slate-800 rounded-lg text-slate-400 flex flex-col lg:flex-row p-2 items-center gap-3 cursor-pointer  hover:bg-slate-700 lg:pl-4 lg:pr-0"
                  onClick={() => copyToClipboard(partyId)}
                >
                  <span>Party Id:</span>{" "}
                  <span className="bg-[#0000006b]  text-white rounded-lg p-2">
                    {partyId}
                  </span>
                </p>
              </div>
              {inCall ? (
                <Suspense
                  fallback={
                    <p className="h-full min-h-fit w-full p-3 flex items-center justify-center">
                      <Loader />
                    </p>
                  }
                >
                  <h2 className="font-bold text-xl text-light-gray">Members</h2>
                  <AudioCall
                    partyId={partyId}
                    setInCall={setInCall}
                    currentUser={user}
                  />
                </Suspense>
              ) : (
                <button
                  className="bg-red hover:bg-rose-900 shadow-md block text-white font-bold py-2 px-4 rounded mx-auto my-6"
                  onClick={() => setInCall(true)}
                >
                  Join Audio Chat
                </button>
              )}
            </>
          )}
        </main>
      )}
    </>
  );
}

export default PartyPage;
