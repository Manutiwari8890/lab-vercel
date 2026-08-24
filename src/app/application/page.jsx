import ApplicationClient from "./ApplicationClient";

export const metadata = {
  title: "Laboratory Applications | Lab Disposable Products USA",
  description: "Laboratory applications for research, clinical, biotech, pharma, and education with trusted lab disposables, consumables, equipment, and reagents across the USA.",
  keywords: ["laboratory applications lab products", "lab application products", "liquid handling lab supplies", "cryogenic lab supplies", "microbiological lab supplies", "sample preparation lab products", "laboratory workflow solutions", "precision lab equipment", "lab safety products", "laboratory consumables USA", "pipettes and micropipettes", "multichannel pipettors", "culture tubes", "Pasteur pipettes", "filter papers", "weighing boats and dishes", "cryogenic storage vials", "low temperature lab supplies", "lab protective gear", "personal protective equipment lab", "spill control kits", "laboratory efficiency tools", "dependable lab supplies", "accurate laboratory tools", "premium laboratory products", "research laboratory supplies", "clinical laboratory applications", "biotech lab consumables", "pharma lab supplies", "education lab applications", "analytical laboratory supplies", "laboratory standards products", "quality lab instruments", "lab accessories supplier", "laboratory process support", "certified lab consumables", "reliable laboratory products", "laboratory product range", "lab products online USA", "laboratory distribution partner", "scientific lab support", "laboratory solutions provider", "high precision laboratory tools", "lab consumables for research", "laboratory testing applications", "lab tools for workflows", "lab products for microbiology", "cryogenic handling products", "lab products for safety protocols", "USA lab consumables supplier", "custom tailored lab solutions"],

  alternates: {
    canonical: "https://www.labdisposable.com/application-page/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Laboratory Applications | Lab Disposable Products USA",
    description:
      "Laboratory applications for research, clinical, biotech, pharma, and education with trusted lab disposables, consumables, equipment, and reagents across the USA.",
    url: "https://www.labdisposable.com/application-page/",
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
    title: "Laboratory Applications | Lab Disposable Products USA",
    description:
      "Laboratory applications for research, clinical, biotech, pharma, and education with trusted lab disposables, consumables, equipment, and reagents across the USA.",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
        <ApplicationClient />   
    )
}