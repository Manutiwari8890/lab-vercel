"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import { WishListContext } from "../context/WishListContext";
import { AuthContext } from "../context/AuthContext";

function ProductCard({value}){
    const { toggleWishlist, getWishList, wishlistLoadingIds, fetchWishList, wishList } = useContext(WishListContext);
    const { user, logout, isLoggedIn } = useContext(AuthContext);

    const checkWishlist = (id) => {
        return wishList.some(item => item.id === id);
    }
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-5 gap-2 items-center bg-white shadow-sm px-5 py-5 mb-5 xl:gap-4"
            >
                <div className="text-left col-span-5 md:col-span-1">
                    <Link href={`/product/${value?.slug}`} className="bg-primary/15 text-center text-xs font-semibold py-1 px-3 rounded-full text-dark">{value?.sku}</Link>
                </div>
                <div className="text-left col-span-5 md:col-span-2">
                    <h2><Link href={`/product/${value?.slug}`} className="text-base font-semibold text-dark hover:text-primary">{value?.name}</Link></h2>
                    <Link href={`/brand/${value?.brands?.[0]?.slug}`} className="text-sm text-[#757f95] font-semibold hover:text-[#00c97a]">{value?.brands?.[0]?.name}</Link>
                </div>
                <div className="text-left col-span-3 md:text-center md:col-span-1">
                    <Link href={`/product/${value?.slug}`} className="text-base font-semibold hover:text-primary xl:text-lg">
                        {(value?.variations?.length > 1) ?
                            <>
                                {(isLoggedIn && value?.variations[0].price != value?.variations[value?.variations.length - 1].price) ?
                                    <>
                                        {(value?.variations[value?.variations.length - 1].discounted_price > 0 && value?.variations[value?.variations.length - 1]?.stock > 0) ?
                                            <>
                                                <del className="text-sm mr-1">${value?.variations.map(v => Number(v["sell_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - ${value?.variations.map(v => Number(v["price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}</del>
                                                <span className="text-[#00c97a]">${value?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - ${value?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}</span>
                                            </> : <span className="text-[#00c97a]">Inquiry Now</span>
                                        }

                                    </> :
                                    <>
                                            <span className="text-[#00c97a]">
                                                {(value?.variations[value?.variations.length - 1].discounted_price > 0 && value?.variations[value?.variations.length - 1]?.stock > 0) ?
                                                    `$${value?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - $${value?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}` : 'Inquiry Now'
                                                }
                                            </span>

                                    </>
                                }
                            </> :
                            <>
                                {(isLoggedIn && value?.price != value?.discounted_price) ?
                                    <>
                                        <del className="text-sm mr-1">${value?.price}</del>
                                        <span className="text-[#00c97a]"> ${value?.discounted_price ? value?.discounted_price : value?.sell_price}</span>
                                    </> :
                                    <span className="text-[#00c97a]">{value?.price > 0 ? '$' + value?.price : 'Inquiry Now'}</span>
                                }
                            </>
                        }
                    </Link>
                </div>
                <div className="text-right col-span-2 flex gap-2 items-center justify-center md:col-span-1">
                    <Link href={`/product/${value?.slug}`} className="text-white bg-primary btn-primary text-base inline-block w-10 h-10 text-center content-center hover:bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto relative z-1"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg>
                    </Link>
                    <button className={`text-base rounded-full font-bold btn btn-secondary btn-scale-0 w-[45px] h-[45px] cursor-pointer ${wishlistLoadingIds.includes(value?.id) ? "bg-secondary/70 disabled" : "bg-secondary"} text-white`} onClick={() => toggleWishlist(value?.id)} disabled={wishlistLoadingIds.includes(value?.id)} aria-label="Toggle Wishlist">
                        {wishlistLoadingIds.includes(value?.id) ? (
                            <div role="status" className="flex gap-2 items-center justify-center">
                                <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                            </div>
                        ) : (
                            checkWishlist(value?.id) ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto relative z-1"><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" fill="currentColor"></path></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto relative z-1" ><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" fill="currentColor"></path></svg>
                        )}
                    </button>
                </div>
            </motion.div>
        </>
    )
}

export default ProductCard;