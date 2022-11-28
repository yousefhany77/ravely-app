"use client";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import Plan from "../../components/plans/Plan";
import { db } from "../../firebase/firebase-init";

function Page() {
  const [plans, setPlans] = React.useState<Plan[]>([]);
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach(async (plan) => {
        let plans: any = {};
        plans = plan.data();
        const prices = await getDocs(collection(db, plan.ref.path, "prices"));
        prices.forEach((priceDoc) => {
          plans.price = priceDoc.data();
        });
        setPlans((prev) => [...prev, plans]);
      });
    };
    getData();
  }, []);

  if (plans.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>loading</span>
      </div>
    );
  }
  return (
    <div className="grid gap-2 grid-cols-2 h-screen place-items-center">
      {plans?.map((plan) => (
        <Plan planDetails={plan} key={plan.id} />
      ))}
    </div>
  );
}

export default Page;

export interface Plan {
  id: string;
  active: boolean;
  name: string;
  description: string;
  role: string;

  price: {
    active: boolean;
    currency: string;
    interval: "month" | "year";
    unit_amount: number;
  };
}
