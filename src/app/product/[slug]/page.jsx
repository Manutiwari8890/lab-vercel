import ProductClient from "./ProductClient";


async function getProduct(slug) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${BASE_URL}products/${slug}`, {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();

  return result?.data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const title =
    product?.meta_title ||
    `${product?.name} | Dawn Scientific`;

  const description =
    product?.meta_description ||
    product?.short_description ||
    `Buy ${product?.name} at best price`;

  return {
    title,
    description,

    keywords: product?.meta_keyword || `${product?.name}, ${product?.sku}, Dawn Scientific`,

    alternates: {
      canonical: `https://www.labdisposable.com/product/${product?.slug}`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.labdisposable.com/product/${product?.slug}`,
      siteName: "Lab Consumables, Chemicals & Equipment from Dawn Scientific",
      images: [
        {
          url: product?.image_url,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product?.image_url],
    },
  };
}
export default async function Page({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);
  const schema = [{
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name,
    image: product?.image_url,
    description: product?.meta_description,
    sku: product?.sku,
    brand: {
      "@type": "Brand",
      name: product?.brands?.[0]?.name,
    },
    offers: {
      "@type": "Offer",
      url: `https://www.labdisposable.com/product/${product?.slug}`,
      priceCurrency: "USD",
      price: product?.discounted_price,
      availability: "https://schema.org/InStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",

        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },

        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },

        deliveryTime: {
          "@type": "ShippingDeliveryTime",

          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },

          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",

        merchantReturnDays: 30,

        returnMethod: "https://schema.org/ReturnByMail",

        returnFees: "https://schema.org/FreeReturn",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.labdisposable.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `https://www.labdisposable.com/product-category${product?.categories?.[0]?.name}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product?.name,
        item: `https://www.labdisposable.com/product/${product?.slug}`,
      },
    ],
  },
];
  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
    <ProductClient initialData={product} slug={slug} />
  </>
}