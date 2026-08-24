import PrivacyClient from "./PrivacyClient";

export const metadata = {
  title: "Privacy Policy | Lab Disposable USA – Data Protection",
  description: "Read Lab Disposable’s Privacy Policy explaining how we collect, use, and protect your personal data and privacy for USA lab supplies customers.",
  keywords: ["Laboratory consumables", "reagents", "equipment distributor USA", "Lab disposable company USA", "Lab consumables supplier USA", "Laboratory consumables distributor USA", "Laboratory solutions provider in NJ", "Quality laboratory products supplier", "Laboratory reagents supplier", "Disposable lab products", "ISO certified lab consumables", "Trusted lab equipment distributor", "Fast shipping lab supplies USA", "Where to buy fast shipping disposable lab products in the USA", "High-grade consumable materials for microbiological laboratory applications", "ISO certified laboratory company providing lab consumables in the USA", "Wholesale laboratory disposable products supplier in USA", "Which laboratory supply company offers bulk ordering and fast shipping"],

  alternates: {
    canonical: "https://www.labdisposable.com/privacy-policy",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Privacy Policy | Lab Disposable USA – Data Protection",
    description:
      "Read Lab Disposable’s Privacy Policy explaining how we collect, use, and protect your personal data and privacy for USA lab supplies customers.",
    url: "https://www.labdisposable.com/privacy-policy",
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
    title: "Privacy Policy | Lab Disposable USA – Data Protection",
    description:
      "Read Lab Disposable’s Privacy Policy explaining how we collect, use, and protect your personal data and privacy for USA lab supplies customers.",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
        <PrivacyClient />   
    )
}