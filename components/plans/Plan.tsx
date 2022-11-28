"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useContext } from "react";
import { Plan as PlanDetails } from "../../app/plans/page";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebase/firebase-init";

interface Props {
  planDetails: PlanDetails;
}

function Plan({ planDetails }: Props) {
  const { user } = useContext(AuthContext);
  const checkout = async (priceId: string, uid: string) => {
    const docRef = doc(db, "customers", uid);
    const colRef = collection(docRef, "checkout_sessions");
    const rec = await addDoc(colRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(rec, async (snap) => {
      const data = snap.data();
      if (data!.error) {
        alert(data!.error.message);
      }
      if (data!.sessionId) {
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
        stripe?.redirectToCheckout({ sessionId: data!.sessionId });
      }
    });
  };
  return (
    <div className="border-light-gray text-black bg-white  py-4 rounded-lg shadow flex flex-col gap-2 w-96 h-full relative overflow-hidden ">
      <h2 className="font-bold m-1  text-lg">{planDetails.name}</h2>
      <ul>
        {planDetails?.description?.split(",").map((desc) => (
          <li key={desc}>{desc}</li>
        ))}
      </ul>
      {planDetails.price.active && (
        <div className=" text-base font-medium m-3">
          {planDetails.price.unit_amount / 100} {planDetails.price.currency} /{" "}
          {planDetails.price.interval}
        </div>
      )}
      <button
        disabled={user?.uid ? false : true}
        onClick={() => checkout(planDetails.price.priceId, user!.uid)}
        className="absolute bottom-0 w-full bg-light-gray  px-3 py-1 font-medium  transition-color ease-in-out duration-200 hover:bg-red disabled:opacity-50"
      >
        subscribe
      </button>
    </div>
  );
}

export default Plan;
