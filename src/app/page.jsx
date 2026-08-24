import Index from "./Index";

export const metadata = {
    title: "Laboratory Disposable Products - LDP - leading Woman Owned",
    description:
        "Laboratory Disposable Products (LDP) is a one of the leading distributors of laboratory supplies, Reagents, Equipment, and safety products since 1979.",

    keywords: ["Disposable lab supplies USA", "Laboratory disposable products USA", "Laboratory consumables supplier", "Wholesale lab supplies USA", "Buy lab supplies online USA", "High quality lab reagents", "University lab equipment", "Scientific laboratory glassware", "Laboratory products distributor", "Lab safety accessories", "Microbiological lab consumables", "High-grade microbiological lab consumables supplier", "Fast shipping disposable laboratory supplies in New Jersey", "Where to buy lab consumables online in the USA", "Who is a reliable laboratory products distributor for universities", "US laboratory supply company for bulk disposable products"],

    alternates: {
        canonical: "https://www.labdisposable.com",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Laboratory Disposable Products - LDP - leading Woman Owned",
        description:
            "Laboratory Disposable Products (LDP) is a one of the leading distributors of laboratory supplies, Reagents, Equipment, and safety products since 1979.",
        url: "https://www.labdisposable.com",
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
        title: "Laboratory Disposable Products - LDP - leading Woman Owned",
        description:
            "Laboratory Disposable Products (LDP) is a one of the leading distributors of laboratory supplies, Reagents, Equipment, and safety products since 1979.",
        images: [
            "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
        ],
    },
};


export default function Page() {
    return (
        <>
            <Index />
        </>
    )
}