import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../utils/axios";
import CricketBallLoader from "../layouts/loader/Loader";

const LazyPayment = React.lazy(() => import("./Payment"));

let stripePromise = null;

async function getStripePromise() {
  if (stripePromise) return stripePromise;

  let key = sessionStorage.getItem("stripeApiKey");
  if (key) {
    try {
      key = JSON.parse(key);
    } catch {
      // use raw value if not JSON
    }
  }

  if (!key) {
    const { data } = await axios.get("/api/v1/stripeapikey");
    key = data.stripeApiKey;
    if (key) {
      sessionStorage.setItem("stripeApiKey", JSON.stringify(key));
    }
  }

  stripePromise = loadStripe(key);
  return stripePromise;
}

function PaymentRoute() {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    let mounted = true;
    getStripePromise().then((s) => {
      if (mounted) setStripe(s);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!stripe) {
    return <CricketBallLoader />;
  }

  return (
    <React.Suspense fallback={<CricketBallLoader />}>
      <Elements stripe={stripe}>
        <LazyPayment />
      </Elements>
    </React.Suspense>
  );
}

export default PaymentRoute;
