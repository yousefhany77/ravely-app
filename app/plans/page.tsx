import { collection, getDocs } from "firebase/firestore";
import Plan from "../../components/plans/Plan";
import { db } from "../../firebase/firebase-init";
const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const pricingPlans = querySnapshot.docs.map(async (plan) => {
    let plans: any = {};
    plans = plan.data();
    plans.planId = plan.id;
    const prices = await getDocs(collection(db, plan.ref.path, "prices"));
    prices.forEach((priceDoc) => {
      plans.price = priceDoc.data();
      plans.price.priceId = priceDoc.id;
    });
    return plans;
  });
  return Promise.all(pricingPlans).then((plans) =>
    plans.sort((a, b) => a.price.unit_amount - b.price.unit_amount)
  );
};

async function Page() {
  const plans = await getData();
  return (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      <h1 className="text-3xl lg:text-5xl font-extrabold my-6 text-rose-400">
        Choose Your Plan
      </h1>

      <div className="grid lg:grid-cols-3 gap-10  p-5  place-items-center w-fit h-fit mx-auto">
        {plans?.map((plan) => (
          <Plan planDetails={plan} key={plan.planId} />
        ))}
      </div>
    </div>
  );
}

export default Page;

export interface Plan {
  metadata: PricePlanMetadata;
  active: boolean;
  name: string;
  role: string;
  tax_code: null;
  description: string;
  images: any[];
  planId: string;
  price: Price;
}

export interface PricePlanMetadata {
  firebaseRole: string;
}

export interface Price {
  interval_count: number;
  recurring: null[];
  product: string;
  active: boolean;
  tax_behavior: string;
  tiers_mode: null;
  description: null;
  interval: string;
  transform_quantity: null;
  metadata: PriceMetadata;
  type: string;
  billing_scheme: string;
  currency: string;
  unit_amount: number;
  trial_period_days: null;
  tiers: null;
  priceId: string;
}

export interface PriceMetadata {}
