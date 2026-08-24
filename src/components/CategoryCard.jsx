"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

function CategoryCard({url, image, title, productCount, countShow}) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="h-full"
            >
                <Link href={url} className="bg-white shadow-sm py-5 px-5 flex flex-col justify-between w-full h-full group overflow-hidden relative">
                    <div className="absolute w-0 h-0 border-primary top-0 left-0 group-hover:border-t-2 group-hover:border-l-2 group-hover:w-[50%] group-hover:h-[50%]"></div>
                    <div className="absolute w-0 h-0 border-primary bottom-0 right-0 group-hover:border-b-2 group-hover:border-r-2 group-hover:w-[50%] group-hover:h-[50%]"></div>
                    <div className="absolute bottom-[-4px] right-0 opacity-0 w-max text-center visibility-hidden z-10 origin-bottom-right scale-0 group-hover:opacity-100 group-hover:scale-100">
                        <p className="text-white bg-primary inline-block w-[50px] h-[50px] text-center content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg>
                        </p>
                    </div>
                    <div className="img-area overflow-hidden p-2 mb-2">
                        <Image src={image ? image : "/assets/images/placeholder.jpg"} alt={title} width={200} height={200} className="m-auto w-3/4 max-h-70 h-auto group-hover:scale-110" />
                    </div>
                    <div className="text-bottom">
                        <h3 className="text-base font-semibold mb-2 break-words">{title}</h3>
                        {countShow && <p className="text-sm font-semibold text-primary">{productCount} Products</p>}
                    </div>
                </Link>
            </motion.div>
        </>
    )
}

export default CategoryCard;