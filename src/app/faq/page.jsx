import FaqClient from "./FaqClient";

export const metadata = {
  title: "Lab Disposable FAQ – Shipping, Orders & Support | USA",
  description: "Get answers on shipping methods, order tracking, placing orders, account setup, and contacting Lab Disposable support for USA lab supplies.",
  keywords: ["lab disposable FAQ", "Laboratory Disposable Products FAQ", "shipping methods lab supplies", "order tracking lab supplies", "how to track order lab disposable", "place an order lab supplies", "lab product ordering questions", "FAQ lab supply orders", "lab consumables FAQ", "lab equipment shipping questions", "lab supply support USA", "FAQ shipping carriers lab", "UPS FedEx USPS lab orders", "bulk orders shipping lab supplies", "order lead time lab disposable", "how long delivery lab supplies", "tracking details lab orders", "contact lab disposable FAQ", "lab disposable contact queries", "need account to place order", "lab order account requirement", "ordering without account lab supplies", "non-residential shipping requirement", "lab disposable customer support", "laboratory supply questions", "lab supplies help FAQ", "lab disposable order help", "FAQ lab consumables online", "FAQ research lab supplies", "general lab supply FAQs", "USA lab supply information", "lab product delivery questions", "help with lab supply orders", "lab supply service questions", "lab disposable phone support FAQ", "email support lab disposable", "lab supplies shipping FAQ USA", "FAQ placing lab orders online", "FAQ lab order process", "lab disposable order tracking info", "lab supply ordering support", "FAQ lab disposable USA", "ordering lab products FAQ", "lab supply account questions"],

  alternates: {
    canonical: "https://www.labdisposable.com/faq",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Lab Disposable FAQ – Shipping, Orders & Support | USA",
    description:
      "Get answers on shipping methods, order tracking, placing orders, account setup, and contacting Lab Disposable support for USA lab supplies.",
    url: "https://www.labdisposable.com/faq",
    siteName: "Lab Disposable Products",
    type: "website",
    locale: "en_IN",

    images: [
      {
        url: "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
        width: 1200,
        height: 630,
        alt: "Lab Disposable Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Lab Disposable FAQ – Shipping, Orders & Support | USA",
    description:
      "Get answers on shipping methods, order tracking, placing orders, account setup, and contacting Lab Disposable support for USA lab supplies.",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
        <FaqClient />   
    )
}