"use client";

import {
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { db } from "../firebase/firebase-init";

interface Props {
  isFavorite: boolean; // if the the media exists in the favorites list
  uid: string;
  mediaId: string;
}

export default function FavoriteButton({
  isFavorite: userValue,
  uid,
  mediaId,
}: Props) {
  const [isFavorite, setIsFav] = useState(userValue);

  // check if the data changed
  useEffect(() => {
    const subscribe = onSnapshot(doc(db, "favorite", uid), (doc) => {
      if (doc.exists()) {
        // check if the mediaId  exists in the favorite list
        setIsFav(doc.data()[mediaId]);
      }
    });

    return () => {
      subscribe();
    };
  }, [mediaId, uid]);

  //   toggle watchlater

  const toggle = async () => {
    const docRef = doc(db, "favorite", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const hasValue = !!docSnap.get(mediaId); // true or undefined
      //   if the value is true then delete from the watchlist
      if (hasValue) {
        await updateDoc(docRef, {
          [mediaId]: deleteField(),
        });
      } else {
        await updateDoc(docRef, {
          [mediaId]: true,
        });
      }
    }
    // create a new document for the user with the mediaId
    else {
      await setDoc(docRef, {
        [mediaId]: true,
      });
    }
  };

  return (
    <AiFillHeart
      role="button"
      title="toggle is favorite"
      onClick={toggle}
      className={`${
        isFavorite ? "text-red" : "text-light-gray"
      } transition-colors ease-linear duration-150 cursor-pointer hover:text-red`}
      size={30}
    />
  );
}
