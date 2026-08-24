"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useContext, Fragment } from "react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";

export default function BlogClient({initData}){
    const [blogs, setBlogs] = useState(initData);

    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">Blog</h2>
                    {blogs?.length > 0 &&
                    blogs?.map((cat) => (
                        <Fragment key={cat?.id}>
                            <h3 className="text-2xl page-title font-semibold my-4 mb-8">{cat?.name}</h3>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-14 mb-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                <AnimatePresence>
                                    {cat?.blogs?.slice(0, 4)?.map(blog => (
                                        <BlogCard data={blog} key={blog?.id} />
                                    ))}
                                </AnimatePresence>
                            </div>    
                            <Link href={`/blog-category/${cat?.slug}`} className="text-xs font-bold uppercase text-white btn btn-primary py-3 px-5 bg-primary mx-auto mt-2 w-max block"><span className="relative z-2">View More</span></Link>        
                        </Fragment>
                    ))}
                    
                </div>
            </section>
        </>
    )
}
