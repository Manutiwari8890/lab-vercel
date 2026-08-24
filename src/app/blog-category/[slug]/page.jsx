import BlogCategory from "./BlogCategory";

export const metadata = {
    title: "Laboratory Insights & Updates | Lab Disposable Blog",
    description:
        "Read expert blogs on laboratory supplies, applications, safety practices, consumables, and equipment insights for research and clinical labs in the USA.",

    keywords: ["laboratory blog", "lab supplies blog", "laboratory insights", "lab industry news", "scientific blog USA", "laboratory applications blog", "lab safety blog", "lab consumables blog", "laboratory equipment blog", "research laboratory articles", "clinical laboratory blog", "biotech lab blog", "pharma laboratory insights", "laboratory best practices", "lab workflow insights", "laboratory product knowledge", "lab consumables insights", "laboratory trends USA", "science lab articles", "laboratory education blog", "lab testing insights", "laboratory solutions blog", "lab product updates", "laboratory innovation blog", "lab safety practices", "laboratory standards blog", "lab research updates", "laboratory technology blog", "lab supply chain insights", "laboratory operations blog", "scientific equipment articles", "laboratory consumables guide", "lab product awareness", "laboratory expertise blog", "lab industry updates USA", "research lab knowledge", "laboratory process insights", "lab tools blog", "laboratory quality insights", "lab compliance blog", "laboratory guidance articles", "lab professional blog", "laboratory supplier blog", "lab science education", "laboratory consumables information", "lab disposable blog", "laboratory resource center", "lab industry expertise"],

    alternates: {
        canonical: "https://labdisposable.com/blog",
    },

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Laboratory Insights & Updates | Lab Disposable Blog",
        description:
            "Read expert blogs on laboratory supplies, applications, safety practices, consumables, and equipment insights for research and clinical labs in the USA.",
        url: "https://labdisposable.com/blog",
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
        title: "Laboratory Insights & Updates | Lab Disposable Blog",
        description:
            "Read expert blogs on laboratory supplies, applications, safety practices, consumables, and equipment insights for research and clinical labs in the USA.",
        images: [
            "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
        ],
    },
};

export default async function Page() {
    return (
        <BlogCategory />
    )
}