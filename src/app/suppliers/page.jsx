import SupplierClient from "./SupplierClient";

export const metadata = {
  title: "Lab Disposable Suppliers | Trusted Lab Supply Partners USA",
  description: "Explore Lab Disposable suppliers and trusted lab supply partners offering quality consumables, equipment, and reagents for research and clinical labs in the USA.",
  keywords: ["lab disposable suppliers", "lab supply partners USA", "laboratory suppliers list", "trusted lab vendors USA", "lab consumables suppliers", "laboratory equipment suppliers", "reagent suppliers USA", "scientific supply partners", "research lab suppliers", "clinical lab suppliers", "biotech lab suppliers", "pharmaceutical lab suppliers", "laboratory vendor directory", "lab supply distribution USA", "quality lab supply partners", "certified lab suppliers", "lab disposable supplier network", "medical lab suppliers", "lab consumables vendor", "equipment supplier USA", "reagent supplier list", "lab supplies wholesale USA", "laboratory supply company", "supplier profiles labdisposable", "lab supply partnership", "lab vendor resources", "lab procurement suppliers", "USA lab distribution partners", "supplier solutions for labs", "laboratory supply experts", "dependable lab suppliers", "lab supply brands USA", "top lab suppliers", "laboratory vendor list USA", "procurement for labs", "trusted scientific suppliers", "lab supply marketplace", "direct lab supply partners", "supplier catalog labdisposable", "lab supply partners for research", "supplier support USA labs", "national lab suppliers", "lab vendor connections"],

  alternates: {
    canonical: "https://www.labdisposable.com/suppliers/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Lab Disposable Suppliers | Trusted Lab Supply Partners USA",
    description:
      "Explore Lab Disposable suppliers and trusted lab supply partners offering quality consumables, equipment, and reagents for research and clinical labs in the USA.",
    url: "https://www.labdisposable.com/suppliers/",
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
    title: "Lab Disposable Suppliers | Trusted Lab Supply Partners USA",
    description:
      "Explore Lab Disposable suppliers and trusted lab supply partners offering quality consumables, equipment, and reagents for research and clinical labs in the USA.",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
        <SupplierClient />   
    )
}