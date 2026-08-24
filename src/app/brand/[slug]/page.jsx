import BrandClient from './BrandClient';

async function getProducts(slug, searchParams) {
  const params = new URLSearchParams();
  if (slug) {
    params.set("category", slug);
  }
  if (searchParams.brand) {
    params.set("brand", searchParams.brand);
  }
  if (searchParams.alphabet) {
    params.set("alphabet", searchParams.alphabet);
  }
  if (searchParams.price_min) {
    params.set("price_min", searchParams.price_min);
  }
  if (searchParams.price_max) {
    params.set("price_max", searchParams.price_max);
  }
  if (searchParams.sort_by) {
    params.set("sort_by", searchParams.sort_by);
  }
  if (searchParams.page) {
    params.set("page", searchParams.page);
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}products?${params.toString()}`,
    {
      cache: "no-store"
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}
async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}categories`,
    {
      cache: "no-store"
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Categories");
  }
  return res.json();
}

async function getBrandDetail(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}brands/${slug}`,
    {
      cache: "no-store"
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Categories");
  }
  return res.json();
}


export async function generateMetadata({ params }) {
  const {slug} = await params;
  const brandDetail = await getBrandDetail(slug);
  
  const title =
    brandDetail?.data?.meta_title ||
    `${brandDetail?.data?.name} | Lab Disposable Products`;

  const description =
    brandDetail?.data?.meta_description ||
    brandDetail?.data?.description ||
    `Buy ${brandDetail?.data?.name} at best price`;

  return {
    title,
    description,

    keywords: brandDetail?.data?.meta_keyword || `${brandDetail?.data?.name}, ${brandDetail?.data?.slug}, Lab Disposable Products`,

    alternates: {
      canonical: `https://www.labdisposable.com/brand/${brandDetail?.data?.slug}`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.labdisposable.com/brand/${brandDetail?.data?.slug}`,
      siteName: "Lab Consumables, Chemicals & Equipment from Lab Disposable Products",
      images: [
        {
          url: brandDetail?.data?.image_url,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [brandDetail?.data?.image_url],
    },
  };
}
export default async function Page({ params, searchParams }){
      const { slug } = await params;
      const filters = await searchParams;

      const products = await getProducts(slug, filters)
      const categories = await getCategories();
      const brandDetail = await getBrandDetail(slug);

    return <BrandClient initData={{products : products, categories : categories, brandDetail : brandDetail}} />
}
