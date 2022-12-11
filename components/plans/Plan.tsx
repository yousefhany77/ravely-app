"use client";
import { loadStripe } from "@stripe/stripe-js";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { useContext, useState } from "react";
import { Plan as PlanDetails } from "../../app/plans/page";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebase/firebase-init";
import { getUserRole, stripeRole } from "../../util/getUserRole";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SyncLoader } from "react-spinners";
import { useCheckout } from "../../context/checkoutContext";

interface Props {
  planDetails: PlanDetails;
}

function Plan({ planDetails }: Props) {
  const { user, loading: loadingUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState<stripeRole>(null);
  const { isCheckingout, setIsCheckingout } = useCheckout();
  user && getUserRole(user).then((res) => setUserRole(res));
  const checkout = async (priceId: string) => {
    if (!user && !loadingUser) {
      toast.error("Please login to continue", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => window.location.assign("/login"),
        closeOnClick: true,
      });
      return toast.loading("redirecting to login...", {
        theme: "light",
        autoClose: 5000,
        className: "my-5",
      });
    }
    if (userRole) {
      return toast.warn(
        "You already have a plan to change your plan go to your account settings",
        {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,

          theme: "light",
        }
      );
    }

    if (user) {
      toast.loading("checkout...", {
        onOpen: () => setIsCheckingout(true),
      });
      const docRef = doc(db, "customers", user.uid);
      const colRef = collection(docRef, "checkout_sessions");
      const rec = await addDoc(colRef, {
        price: priceId,
        success_url: `${window.location.origin}/my-space`,
        cancel_url: "http://localhost:3000/",
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
    }
  };

  return (
    <div
      className={`relative  shadow-lg cursor-default text-white bg-darkest  rounded-xl overflow-hidden w-fit  flex flex-col items-center justify-between    capitalize text-center h-full 
      
      ${
        planDetails.role === userRole
          ? "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-rose-700 to-pink-600 p-1 pb-0 scale-110 transition-transform ease-in-out duration-200 hover:scale-105"
          : "bg-gradient-to-b from-gray-400 to-light-gray p-1 pb-0 transition-transform ease-in-out duration-200 hover:scale-95 group  hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] hover:from-rose-700 hover:to-pink-600"
      } flex-1 rounded-t-xl overflow-hidden
      `}
    >
      <section
        className={`gap-4 flex flex-col bg-darkest w-full flex-1 rounded-t-xl overflow-hidden px-8 `}
      >
        <div className="mt-6">
          <h2 className="font-extrabold m-1 text-gray-300  text-2xl ">
            {planDetails.name}
          </h2>
          {planDetails.price.active && (
            <div className=" text-3xl font-bold ">
              {planDetails.price.unit_amount / 100 > 0
                ? planDetails.price.unit_amount / 100
                : "Free"}
              {planDetails.price.unit_amount / 100 > 0 && (
                <span className="font-base text-xl text-light-gray">
                  / {planDetails.price.interval}
                </span>
              )}
            </div>
          )}
        </div>
        <ul className="text-start mx-auto  w-fit">
          {planDetails?.description?.split(",").map((desc) => (
            <li className="my-3 font-medium " key={desc}>
              ✅ {desc}
            </li>
          ))}
        </ul>
      </section>
      {userRole === planDetails.role ? (
        <div className=" w-full mx-auto  py-3 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-rose-700 to-pink-600  px-3  font-medium ">
          Current plan
        </div>
      ) : (
        <button
          disabled={!loadingUser && !isCheckingout ? false : true}
          onClick={() => {
            checkout(planDetails.price.priceId);
          }}
          className="  w-full mx-auto  bg-light-gray border-light-gray/50 cursor-pointer px-3 py-3 font-medium  transition-color ease-in-out duration-200 hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-rose-700 to-pink-600 disabled:opacity-50 group-hover:bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] group-hover:from-rose-700 group-hover:to-pink-600  "
        >
          {isCheckingout ? (
            <SyncLoader color="rgb(190, 18, 60)" size={8} />
          ) : (
            "subscribe"
          )}
        </button>
      )}
    </div>
  );
}

export default Plan;
