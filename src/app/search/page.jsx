import Loader from "@/components/Loader";
import SearchClient from "./SearchClient";
import { Suspense } from "react";

export const metadata = {
  title: "Search Products | Lab Disposable Products",
  description: "Search high-quality laboratory products, scientific instruments, chemicals, glassware, consumables, and lab equipment from trusted brands at competitive prices at Lab Disposable Products",
  keywords: ["Lab Disposable Products", "Search Lab Products", "Lab Products", "Lab Equipments"],

  alternates: {
    canonical: "https://www.labdisposable.com/search",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Search Products | Lab Disposable Products",
    description:
      "Search high-quality laboratory products, scientific instruments, chemicals, glassware, consumables, and lab equipment from trusted brands at competitive prices at Lab Disposable Products",
    url: "https://www.labdisposable.com/search",
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
    title: "Search Products | Lab Disposable Products",
    description:
      "Search high-quality laboratory products, scientific instruments, chemicals, glassware, consumables, and lab equipment from trusted brands at competitive prices at Lab Disposable Products",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
      <Suspense fallback={<Loader />}>
        <SearchClient />
      </Suspense>
    )
}