"use client"
import React, { lazy, Suspense, useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = lazy(() => import("./CheckoutClient"));

export default function Page() {
    const [stripePromise, setStripePromise] = useState(null);
  useEffect(() => {
    const getStripe = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${baseUrl}site-setting`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        });
        const { data } = await res?.json();
        if (data?.STRIPE_KEY) {
          const stripe = await loadStripe(data?.STRIPE_KEY);
          setStripePromise(stripe);
        }
      } catch (err) {
        console.log(err)
      }
    };
    getStripe()
  }, [])

  return (
    <Suspense fallback={<div className="full_page_loader"></div>}>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </Suspense>
  );
}
