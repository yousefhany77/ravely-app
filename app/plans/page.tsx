"use client";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Plan from "../../components/plans/Plan";
import PlanSkeleton from "../../components/plans/plansSkeleton";
import { AuthProvider } from "../../context/authContext";
import { CheckoutProvider } from "../../context/checkoutContext";
import { db } from "../../firebase/firebase-init";

function Page() {
  const [plans, setPlans] = React.useState<Plan[]>([]);
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach(async (plan) => {
        let plans: any = {};
        plans = plan.data();
        plans.planId = plan.id;
        const prices = await getDocs(collection(db, plan.ref.path, "prices"));
        prices.forEach((priceDoc) => {
          plans.price = priceDoc.data();
          plans.price.priceId = priceDoc.id;
        });
        setPlans((prev) =>
          [...prev, plans].sort(
            (a, b) => a.price.unit_amount - b.price.unit_amount
          )
        );
      });
    };
    getData();
    return setPlans([]);
  }, []);

  if (plans.length === 0) {
    return (
      <div className="h-screen flex flex-col gap-6 items-center justify-center">
        <h1 className="text-5xl font-extrabold my-6 text-red">
          Choose Your Plan
        </h1>
        <div className="grid lg:grid-cols-3 gap-10  w-11/12   p-5  place-items-center  h-fit mx-auto">
          {[1, 2, 3].map((plan) => (
            <PlanSkeleton key={plan} />
          ))}
        </div>
      </div>
    );
  }
  // const viewMyPlan = async () => {
  //   const { data }: { data: any } = await createPortalLink({
  //     returnUrl: window.location.origin,
  //     locale: "auto", // Optional, defaults to "auto"

  //   });
  //   // console.log(data);
  //   window.location.assign(data.url);
  // };
  return (
    <CheckoutProvider>
      <AuthProvider>
        <div className="h-screen flex flex-col gap-6 items-center justify-center">
          <ToastContainer limit={3} />
          <h1 className="text-5xl font-extrabold my-6 text-rose-400">
            Choose Your Plan
          </h1>
          <div className="grid lg:grid-cols-3 gap-10  p-5  place-items-center w-fit h-fit mx-auto">
            {plans?.map((plan) => (
              <Plan planDetails={plan} key={plan.planId} />
            ))}
          </div>
        </div>
      </AuthProvider>
    </CheckoutProvider>
  );
}

export default Page;

export interface Plan {
  planId: string;
  active: boolean;
  name: string;
  description: string;
  role: string;

  price: {
    priceId: string;
    active: boolean;
    currency: string;
    interval: "month" | "year";
    unit_amount: number;
  };
}
