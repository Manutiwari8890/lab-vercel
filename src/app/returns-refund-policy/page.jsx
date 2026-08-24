import RefundClient from "./RefundClient";

export const metadata = {
  title: "Returns & Refund Policy | Lab Disposable USA",
  description: "Read Lab Disposable’s Returns & Refund Policy outlining return eligibility, refund process, timelines, and conditions for lab supplies in the USA",
  keywords: ["returns and refund policy lab disposable", "lab disposable returns policy", "refund policy USA lab supplies", "return eligibility lab supplies", "refund process lab disposable", "laboratory supply returns", "lab consumables return terms", "lab equipment refund rules", "product return conditions lab disposable", "how to return lab supplies", "refund timeframe lab disposable", "USA lab supplies refund", "return procedures lab disposable", "lab supply refund eligibility", "refund conditions lab disposable", "return authorization lab supplies", "defective product returns", "lab order returns USA", "return shipping policy lab disposable", "refund guarantee lab supplies", "restocking fee lab disposable", "return terms and conditions lab supplies", "exchange policy lab disposable", "cancel order refund lab supplies", "partial refund lab disposable", "full refund lab supplies", "refund request lab disposable", "return policy for research lab supplies", "clinical lab supplies return policy", "biotech lab supplies refund", "refund solutions lab disposable", "customer return support lab supplies", "lab disposable customer refund", "refund policy for consumables", "refund policy for equipment", "return and refund instructions USA", "refundable lab supply purchases", "non-refundable items lab disposable", "product replacement lab supplies", "refund eligibility conditions", "return policy information lab disposable", "USA lab supply returns", "laboratory product refund policy", "returns process lab disposable"],

  alternates: {
    canonical: "https://www.labdisposable.com/returns-refund-policy",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Returns & Refund Policy | Lab Disposable USA",
    description:
      "Read Lab Disposable’s Returns & Refund Policy outlining return eligibility, refund process, timelines, and conditions for lab supplies in the USA",
    url: "https://www.labdisposable.com/returns-refund-policy",
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
    title: "Returns & Refund Policy | Lab Disposable USA",
    description:
      "Read Lab Disposable’s Returns & Refund Policy outlining return eligibility, refund process, timelines, and conditions for lab supplies in the USA",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
        <RefundClient />   
    )
}