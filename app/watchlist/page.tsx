"use client";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebase/firebase-init";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { AiTwotoneDelete } from "react-icons/ai";
import useSWRMutation from "swr/mutation";

const deleteFn = async (url: any, { arg }: any) => {
  // get the user id
  const { id, uid } = arg;
  if (uid) {
    const docRef = doc(db, "favorite", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [id]: deleteField(),
      });
    }
  }
};
function Page() {
  const { user } = useContext(AuthContext);
  const { data, isLoading, mutate, error } = useSWR(
    user?.uid ? "favorite" : null,
    () => getWatchlist(user?.uid)
  );

  if (isLoading) return <div>Loading...</div>;
  if (!error && data && user) {
    if (data.length === 0) {
      return (
        <p>
          You don&apos;t have any favorite movie or series. <br />
        </p>
      );
    }
    return (
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  3xl:grid-cols-6 gap-4 ">
        {data.map((item) => (
          <Card {...item} key={item.mediaId} uid={user?.uid} />
        ))}
      </div>
    );
  }
}

export default Page;

const Card = ({ mediaId, posterLink, title, uid }: IWatchlist | any) => {
  const { trigger } = useSWRMutation("favorite", (url, arg) =>
    deleteFn(url, arg)
  );
  const mediaLink = mediaId.startsWith("m")
    ? `/movie/${mediaId.split("-")[1]}`
    : `/serieses/${mediaId.split("-")[1]}${
        mediaId.split("-")[2] ? `/season${mediaId.split("-")[2]}` : ""
      }`;
  return (
    <div className="w-full cardAspect bg-gray-700 rounded-md relative overflow-hidden">
      <button
        onClick={async () => {
          trigger(
            { id: mediaId, uid },
            {
              optimisticData: (data: any) =>
                data.filter((item: any) => item.mediaId !== mediaId),
              rollbackOnError: true,
            }
          );
        }}
        className="rounded-full p-2 bg-white/50  shadow absolute right-3 top-3 z-[999] hover:bg-white/80"
      >
        <AiTwotoneDelete className="text-dark " />
      </button>
      <Link href={mediaLink}>
        <div className="bg-gradient-to-b from-transparent via-transparent to-zinc-900 w-full h-full absolute z-50 " />
        <Image src={posterLink} alt={title} fill />
        <h2 className="text-center text-white w-full font-bold text-lg lg:text-xl absolute bottom-5 z-50">
          {title}
        </h2>
      </Link>
    </div>
  );
};

interface IWatchlist {
  mediaId: string;
  posterLink: string;
  title: string;
}

const getWatchlist = async (uid: string | undefined) => {
  // get the user id
  if (uid) {
    const docRef = doc(db, "favorite", uid);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const watchlist = [];
      const data = docSnap.data();
      for (const key in data) {
        watchlist.push(data[key]);
      }
      return watchlist as IWatchlist[];
    }
  }
};
