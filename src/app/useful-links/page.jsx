import UseFulClient from "./UseFulClient";

export const metadata = {
  title: "Useful Links – Lab Disposable Resources | USA Lab Supplies",
  description: "Explore useful links to product categories, support, ordering info, and lab resource pages from Lab Disposable — trusted USA lab supplies partner.",
  keywords: ["useful links labdisposable", "lab disposable resources", "lab supplies useful links", "lab consumables links", "laboratory equipment links", "quick links lab supplies", "lab support links", "ordering info links lab disposable", "lab categories quick access", "scientific supplies links", "research lab resources", "clinical lab resources", "biotech lab resources", "pharma lab resources", "lab safety resources", "liquid handling links", "microbiological supplies links", "cryogenic supplies links", "sample preparation links", "PPE supplies links", "lab reagent links", "laboratory guidance links", "USA lab supplies links", "lab product navigation", "laboratory product categories links", "lab help links", "FAQ link lab disposable", "contact us link lab disposable", "shipping info link lab supplies", "account info link lab disposable", "payment options link lab disposable", "supplier information links", "lab disposable blog links", "product page links", "lab solutions links", "laboratory application links", "lab support center links", "lab disposable services links", "popular lab supplies links", "lab supply articles links", "lab news links", "downloadable resources lab supplies", "lab standards info links", "safety application link lab supplies"],

  alternates: {
    canonical: "https://www.labdisposable.com/useful-links/",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Useful Links – Lab Disposable Resources | USA Lab Supplies",
    description:
      "Explore useful links to product categories, support, ordering info, and lab resource pages from Lab Disposable — trusted USA lab supplies partner.",
    url: "https://www.labdisposable.com/useful-links/",
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
    title: "Useful Links – Lab Disposable Resources | USA Lab Supplies",
    description:
      "Explore useful links to product categories, support, ordering info, and lab resource pages from Lab Disposable — trusted USA lab supplies partner.",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
        <UseFulClient />   
    )
}