import { toast } from "react-toastify";
import { User } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../firebase/firebase-init";
import { getUserRole } from "./getUserRole";
import { IPartyDetails } from "../app/party/page";

export const createParty = (user: User, partyDetails: IPartyDetails) => {
  toast.loading("Creating party...", {
    position: "top-center",
  });
  // @check if user is premium
  if (!user) return;
  getUserRole(user).then((role) => {
    if (role !== "basic") {
      // @create party
      //  if premium create party
      //   => mount premium video player
      addDoc(collection(db, "party"), {
        ...partyDetails,
        users: null,
      }).then(
        (docRef) => (
          toast.dismiss(),
          toast.success("Party created successfully", {
            position: "top-center",
          }),
          (window.location.href = `/party?partyId=${docRef.id}`)
        )
      );
      return;
    } else {
      // @prompt to upgrade
      //  if not premium prompt to upgrade or use free video player
      //   => mount free video player || => redirect to upgrade page
      toast.warning("You need to be premium to create a party");
      window.location.href = "/plans";
    }
  });

  return null;
};

export const joinParty = (user: User, partyId: string) => {
  // @check if user is premium
  if (!user) return;
  const docRef = doc(db, "party", partyId);
  getDoc(docRef).then((partyDoc) => {
    if (partyDoc.exists()) {
      getUserRole(user).then((role) => {
        if (role !== "basic") {
        
          return (window.location.href = `/party?partyId=${partyId}`);
        } else {
          // @prompt to upgrade
          //  if not premium prompt to upgrade or use free video player
          //   => mount free video player || => redirect to upgrade page
          toast.warning("You need to be premium to create a party");
          window.location.href = "/plans";
        }
      });
    } else {
      toast.warning("Invalid party id");
    }
  });

  return null;
};
