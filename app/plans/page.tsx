"use client";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import Plan from "../../components/plans/Plan";
import { AuthProvider } from "../../context/authContext";
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
        setPlans((prev) => [...prev, plans]);
      });
    };
    getData();
  }, []);
  console.log(plans);
  if (plans.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>loading</span>
      </div>
    );
  }
  return (
    <AuthProvider>
      <div className="h-screen flex items-center justify-center">
        <div className="grid grid-cols-2 max-w-fit p-5 gap-3 max-h-[30rem] mx-auto">
          {plans?.map((plan) => (
            <Plan planDetails={plan} key={plan.planId} />
          ))}
        </div>
      </div>
    </AuthProvider>
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
