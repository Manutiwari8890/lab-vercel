import LiteratureClient from "./LiteratureClient";

export const metadata = {
  title: "Technical Catalogs & Literature | Laboratory Disposable Products (LDP)",
  description: "Learn about LabDisposable – a trusted USA supplier of lab supplies, disposable products, equipment & reagents. Committed to quality, service & fast shipping.",
  keywords: ["Laboratory consumables", "reagents", "equipment distributor USA", "Lab disposable company USA", "Lab consumables supplier USA", "Laboratory consumables distributor USA", "Laboratory solutions provider in NJ", "Quality laboratory products supplier", "Laboratory reagents supplier", "Disposable lab products", "ISO certified lab consumables", "Trusted lab equipment distributor", "Fast shipping lab supplies USA", "Where to buy fast shipping disposable lab products in the USA", "High-grade consumable materials for microbiological laboratory applications", "ISO certified laboratory company providing lab consumables in the USA", "Wholesale laboratory disposable products supplier in USA", "Which laboratory supply company offers bulk ordering and fast shipping"],

  alternates: {
    canonical: "https://www.labdisposable.com/literature",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Technical Catalogs & Literature | Laboratory Disposable Products (LDP)",
    description:
      "Learn about LabDisposable – a trusted USA supplier of lab supplies, disposable products, equipment & reagents. Committed to quality, service & fast shipping.",
    url: "https://www.labdisposable.com/literature",
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
    title: "Technical Catalogs & Literature | Laboratory Disposable Products (LDP)",
    description:
      "Learn about LabDisposable – a trusted USA supplier of lab supplies, disposable products, equipment & reagents. Committed to quality, service & fast shipping.",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
        <LiteratureClient />   
    )
}