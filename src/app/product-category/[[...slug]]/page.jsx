import CategoryClient from './CategoryClient';

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

async function getCategoryDetails(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}categories/${slug}`,
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

  const [category, subCategory, childrenCat, child] = slug || [];
  const currentSlug = child || childrenCat || subCategory || category || "";
  const categoryDetails = currentSlug ? await getCategoryDetails(currentSlug) : {data : {name : "Lab Consumables, Chemicals &amp; Equipment from Lab Disaposable Products", description: "Buy high-quality laboratory equipment, chemicals, and supplies online at Lab Disposabled Products. Fast delivery, safe payment, and expert support."}};
  
  const title =
    categoryDetails?.data?.meta_title ||
    `${categoryDetails?.data?.name} | Lab Disposable Products`;

  const description =
    categoryDetails?.data?.meta_description ||
    categoryDetails?.data?.description ||
    `Buy ${categoryDetails?.data?.name} at best price`;

  return {
    title,
    description,

    keywords: categoryDetails?.data?.meta_keyword || `${categoryDetails?.data?.name}, ${categoryDetails?.data?.slug}, Lab Disposable Products`,

    alternates: {
      canonical: `https://www.labdisposable.com/product-category/${categoryDetails?.data?.slug}`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: `https://www.labdisposable.com/product-category/${categoryDetails?.data?.slug}`,
      siteName: "Lab Consumables, Chemicals & Equipment from Lab Disposabled Products",
      images: [
        {
          url: categoryDetails?.data?.image_url,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [categoryDetails?.data?.image_url],
    },
  };
}
export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const filters = await searchParams;
  const [category, subCategory, childrenCat, child] = slug || [];

  const currentSlug = child || childrenCat || subCategory || category || "";


  const categories = await getCategories();
  const categoryDetails = await getCategoryDetails(currentSlug);
  return <CategoryClient initData={{categories : categories, categoryDetails : categoryDetails}} />
}