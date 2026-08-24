import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Lab Disposable | Lab Supplies Support USA",
  description: "Get in touch with Lab Disposable for orders, support, and inquiries via phone, email, or form. Trusted USA lab supplies company ready to help you.",
  keywords: ["contact Lab Disposable", "lab disposable contact", "contact lab supplies USA", "laboratory disposable products contact", "lab supplies support", "contact customer support lab disposable", "lab disposable phone number", "lab disposable email", "contact form lab disposable", "get in touch lab disposable", "lab supplies inquiry", "contact for orders lab supplies", "reach lab disposable", "customer service lab disposable", "support lab supplies", "contact address lab disposable", "laboratory supplies contact info", "lab disposable Medford NJ", "contact business lab disposable", "lab products contact page", "contact lab suppliers USA", "contact research lab supplies", "contact clinical lab supplies", "lab disposable telephone contact", "email lab disposable", "support for lab consumables", "lab disposable support center", "contact for shipping queries", "contact for account assistance", "contact business supplier lab supplies", "laboratory supplier contact", "order support lab disposable", "general contact lab disposable", "contact us lab disposable USA", "lab disposable help page", "lab disposable inquiry form", "contact lab product questions", "contact lab disposables store", "contact lab consumables support", "lab supplies help center", "contact for wholesale lab supplies", "contact info lab disposable products", "lab disposable customer contact", "contact lab supplies retailer", "lab disposable business contact"],

  alternates: {
    canonical: "https://www.labdisposable.com/contact-us",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Contact Lab Disposable | Lab Supplies Support USA",
    description:
      "Get in touch with Lab Disposable for orders, support, and inquiries via phone, email, or form. Trusted USA lab supplies company ready to help you.",
    url: "https://www.labdisposable.com/contact-us",
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
    title: "Contact Lab Disposable | Lab Supplies Support USA",
    description:
      "Get in touch with Lab Disposable for orders, support, and inquiries via phone, email, or form. Trusted USA lab supplies company ready to help you.",
    images: [
      "https://labdisposable.com/assets/images/Laboratory-Disposable-Products-LDP-leading-Woman-Owned.webp",
    ],
  },
};

export default function Page(){
    return (
        <ContactClient />   
    )
}