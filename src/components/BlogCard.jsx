"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

function BlogCard({data}){
    return (
        <>
            <motion.article
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white group h-max"
            >
                    <div className="overflow-hidden min-h-80 relative">
                        <div className="bg-gray-100 w-full h-full animate-pulse absolute top-0 left-0"></div>
                        <Image src={data?.image_url} alt={data?.title} width={300} height={300} className="w-full group-hover:scale-110 relative z-1" />
                    </div>
                    <div className="bg-white shadow-xl px-6 py-6 mr-4 mt-[-100px] relative z-1 group-hover:mt-[-105px] md:px-3 md:py-4">
                        <div className="w-0 absolute bottom-0 left-0 bg-primary h-[2px] group-hover:w-full"></div>
                        <h3 className="text-sm font-semibold mb-5">{data?.title}</h3>
{/*                        <p className="text-xs text-justify mb-5 font-medium text-gray-500 md:mb-3">In colleges and schools, science laboratories are crucial in practical learning. From simple experiments to sophisticated research, most laboratory work</p>*/}
                        <Link href={`/blog/${data?.slug}`} className="text-sm font-bold text-white btn btn-secondary py-3 px-5 bg-secondary w-full inline-block text-center btn-scale-0"><span className="relative z-1 flex justify-center">
                            Read More 
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 ml-1 group-hover:-rotate-180" ><path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" fill="currentColor" /></svg>
                        </span></Link>
                    </div>
            </motion.article>
        </>
    )
}

export default BlogCard;