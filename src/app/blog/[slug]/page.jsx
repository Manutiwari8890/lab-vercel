import SingleBlog from "./SingleBlog";

const getBlogDetail = async (slug) => {
  console.log(slug)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}blogs/${slug}`,
    {
      cache: "no-store"
    }
  );
  if (!res.ok) {
    console.log(res)
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
}


export async function generateMetadata({ params }) {
    const {slug} = await params;
    const blog = await getBlogDetail(slug);
    const title =
    blog.meta_title ||
    `${blog.name} | Lab Disposable Products`;

  const description =
    blog.meta_description ||
    blog.short_description ||
    `Buy ${blog.name} at best price `;

  return {
    title,
    description, 

    keywords: blog.meta_keyword || `${blog?.name}, Lab Disposable Products`,

    alternates: {
      canonical: `https://labdisposable.com/blog/${slug}`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      url: `https://labdisposable.com/blog/${slug}`,
      siteName: "Lab Consumables, Chemicals & Equipment from Dawn Scientific",
      images: [
        {
          url: blog.image_url,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description, 
      images: [blog.image_url],
    },
  };
}

export default async function Page({params}){
    const { slug } = await params;
    const data = await getBlogDetail(slug);
    return (
        <SingleBlog initData={data?.data} />   
    )
}