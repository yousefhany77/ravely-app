"use client";
import {
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AuthContext, AuthProvider } from "../context/authContext";
import { db } from "../firebase/firebase-init";

interface Props {
  mediaId: string;
}

export function FavoriteButton({ mediaId }: Props) {
  const { isFavorite, loading, toggle } = useUserFavorite(mediaId);
  // check if the data changed
  //   toggle watchlater
  return !loading ? (
    <AiFillHeart
      role="button"
      title="toggle is favorite"
      onClick={toggle}
      className={`${
        isFavorite ? "text-red" : "text-light-gray l"
      } transition-colors ease-linear duration-150 cursor-pointer hover:text-red`}
      size={38}
    />
  ) : (
    <AiFillHeart
      size={38}
      role="button"
      title="toggle is favorite "
      className="text-darkest animate-pulse"
    />
  );
}

export const useUserFavorite = (mediaId: string) => {
  const { user } = useContext(AuthContext);
  const [isFavoriteState, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);
  const uid: string = user?.uid || "_";
  useEffect(() => {
    const subscribe = onSnapshot(doc(db, "favorite", uid), (doc) => {
      if (doc.exists()) {
        // check if the mediaId  exists in the favorite list
        setIsFav(doc.data()[mediaId]);
        setLoading(false);
      }
    });

    return () => {
      subscribe();
    };
  }, [mediaId, uid]);

  //  hook methods

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

  return {
    isFavorite: isFavoriteState,
    loading,
    toggle,
  };
};

const AuthWarper = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const UserFavorite = ({ mediaId }: Props) => {
  return (
    <AuthWarper>
      <FavoriteButton mediaId={mediaId} />
    </AuthWarper>
  );
};

export default UserFavorite;
