"use client";
import {
  deleteField,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  serverTimestamp ,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AuthContext, AuthProvider } from "../context/authContext";
import { db } from "../firebase/firebase-init";

interface IFavorite {
  mediaId: string;
  posterLink: string;
  title: string;
}

export function FavoriteButton(props: IFavorite) {
  const { user, loading } = useContext(AuthContext);

  // check if the data changed
  //   toggle watchlater
  return !loading && user ? (
    <FavoriteButton1 {...props} uid={user.uid} />
  ) : (
    <AiFillHeart
      size={38}
      role="button"
      title="toggle is favorite "
      className="text-darkest  animate-pulse"
    />
  );
}

export const useUserFavorite = (mediaId: string, uid: string) => {
  const [isFavoriteState, setIsFav] = useState(false);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    // check if the user is logged in

    console.log("uid", uid);
    const subscribe = onSnapshot(doc(db, "favorite", uid), (doc) => {
      if (doc.exists()) {
        // check if the mediaId  exists in the favorite list
        const hasValue = !!doc.data()[mediaId]; // true or undefined
        setIsFav(hasValue);
      }
      setIsLoading(false);
    });

    return () => {
      subscribe();
    };
  }, [mediaId, uid]);

  //  hook methods

  const toggle = async ({ mediaId, posterLink, title }: IFavorite) => {
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
          [mediaId]: {
            posterLink,
            title,
            mediaId,
            timestamp: serverTimestamp(),
          },
        });
      }
    }
    // create a new document for the user with the mediaId
    else {
      await setDoc(docRef, {
        [mediaId]: {
          posterLink,
          title,
          mediaId,
          timestamp: serverTimestamp(),
        },
      });
    }
  };

  return {
    isFavorite: isFavoriteState,
    loading,
    toggle,
  };
};

const FavoriteButton1 = ({
  mediaId,
  posterLink,
  title,
  uid,
}: {
  mediaId: string;
  posterLink: string;
  title: string;
  uid: string;
}) => {
  const { isFavorite, toggle, loading } = useUserFavorite(mediaId, uid);
  if (loading) {
    return (
      <AiFillHeart
        size={38}
        role="button"
        title="toggle is favorite "
        className="text-darkest animate-pulse"
      />
    );
  }
  return (
    <AiFillHeart
      role="button"
      title="toggle is favorite"
      onClick={() => toggle({ mediaId, posterLink, title })}
      className={`${
        isFavorite ? "text-red" : "text-light-gray l"
      } transition-colors ease-linear duration-150 cursor-pointer hover:text-red`}
      size={38}
    />
  );
};

const UserFavorite = (props: IFavorite) => {
  return (
    <AuthProvider>
      <FavoriteButton {...props} />
    </AuthProvider>
  );
};

export default UserFavorite;
