import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase/firebase-init";
import { getUserRole } from "./getUserRole";

export const createParty = (
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
      addDoc(collection(db, "party"), {
        users: [user.uid],
      }).then((docRef) => setParty(docRef.id));
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

export const joinParty = (
  user: User,
  setParty: Dispatch<SetStateAction<any>>,
  room: string
) => {
  // @check if user is premium
  if (!user) return;
  const docRef = doc(db, "party", room);
  getDoc(docRef).then((partyDoc) => {
    if (partyDoc.exists()) {
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
    }
    else{
      alert("Invalid party id")
    }
  });

  return null;
};
