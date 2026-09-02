"use client"
import React, { lazy, Suspense } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const Checkout = lazy(() => import("./CheckoutClient"));

export default function Page() {
  return (
    <Suspense fallback={<div className="full_page_loader"></div>}>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </Suspense>
  );
}
