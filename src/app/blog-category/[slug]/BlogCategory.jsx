"use client"
import BlogCard from "@/components/BlogCard";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { LoadingContext } from "@/context/LoadingContext";

export default function BlogCategory() {
    
    const [blogs, setBlogs] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { slug } = useParams();
    const { startLoading, stopLoading } = useContext(LoadingContext)
    const [meta, setMeta] = useState({});
    const searchParams = new useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchBlog = async () => {
            startLoading();
            const page = searchParams.get('page')
            try {
                const response = await fetch(`${baseUrl}blogs/category/${slug}?per_page=12${page ? `&page=${page}` : ''}`); // Example API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch Blog data');
                }
                const data = await response.json();
                setBlogs(data['data'])
                setMeta(data['meta'])
                stopLoading()
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchBlog();
    }, [searchParams.toString()]);


    const handlePage = (page) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(page).forEach(([key, value]) => {
            if (value === null || value === undefined || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">{blogs?.name}</h2>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-14 mb-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {blogs?.length > 0 &&
                            <AnimatePresence>
                                {blogs?.map(blog => (
                                    <BlogCard data={blog} key={blog?.id} />
                                ))}
                            </AnimatePresence>
                        }
                    </div>
                        <div className="mt-10 flex justify-center items-center gap-3 flex-wrap xl:mt-15">
                            {/* Previous button */}
                            <button
                                className={`text-base font-semibold px-2 py-1 ${meta?.current_page < 2 ? "text-dark/80 cursor-default hover:text-dark/80" : "hover:text-primary cursor-pointer"}`}
                                disabled={meta?.current_page < 2}
                                onClick={() => handlePage({ page: (meta?.current_page - 1) })}
                                aria-label="Previous"
                            >
                                Previous
                            </button>
                            {(() => {
                                const totalPages = Number(meta?.last_page) || 0;
                                const currentPage = Number(meta?.current_page) || 1;
                                const windowSize = 10;
                                let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                                let end = start + windowSize - 1;

                                if (end > totalPages) {
                                    end = totalPages;
                                    start = Math.max(1, end - windowSize + 1);
                                }

                                return [...Array(end - start + 1)].map((_, i) => {
                                    const page = start + i;
                                    return (
                                        <button
                                            key={page}
                                            className={`text-base font-semibold px-2 py-1 cursor-pointer shadow-sm w-[35px] h-[35px] hover:bg-primary hover:text-white ${currentPage === page ? "bg-primary text-white" : "bg-white"}`}
                                            onClick={() => handlePage({ page })}
                                            aria-label={`Page ${page}`}
                                        >
                                            {page}
                                        </button>
                                    );
                                });
                            })()}
                            {/* Next button */}
                            <button
                                className={`text-base font-semibold px-2 py-1 ${meta?.current_page >= meta?.last_page ? "text-dark/80 cursor-default hover:text-dark/80" : "hover:text-primary cursor-pointer"}`}
                                disabled={meta?.current_page >= meta?.last_page}
                                onClick={() => handlePage({ page: (meta?.current_page + 1) })}
                                aria-label="Next"
                            >
                                Next
                            </button>
                        </div>
                </div>
            </section>
        </>
    )
}