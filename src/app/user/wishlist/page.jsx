"use client"

import Link from "next/link";
import AccountSidebar from "@/components/AccountSidebar";
import { AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { LoadingContext } from "@/context/LoadingContext";
import { WishListContext } from "@/context/WishListContext";


export default function Page() {
    const { logout } = useContext(AuthContext);
    const { wishList, toggleWishlist, wishlistLoadingIds, fetchWishList } = useContext(WishListContext);
    const { startLoading, stopLoading } = useContext(LoadingContext);

    function checkWishlist(id) {
        return wishList.some(item => item.id === id);
    }

    useEffect(() => {
        const loadWishlist = async () => {
            startLoading();
            await fetchWishList(); 
            stopLoading();
        };
        loadWishlist();
    }, []);

    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-3xl mx-auto font-semibold uppercase text-dark page-title mb-10 xl:mb-15">My Account</h2>
                    <div className="grid grid-cols-4 gap-5 xl:gap-6">
                        <div className="col-span-1 hidden lg:block">
                            <AccountSidebar />
                        </div>
                        <div className="col-span-4 lg:col-span-3">
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Wishlist</h2>
                                {wishList?.length > 0 ? (
                                    <AnimatePresence mode="wait">
                                        {wishList.map(pro => (
                                            <ProductCard value={pro} key={pro?.id} />
                                        ))}
                                    </AnimatePresence>
                                ) : <div className="h-full text-center mb-5">
                                    <div className="mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" dataname="Layer 1" viewBox="0 0 24 24" className="w-50 h-50 m-auto"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" fill="currentColor"></path></svg>
                                    </div>
                                    <Link href="/product-category" className="text-sm font-bold text-white btn btn-primary py-4 px-5 bg-primary my-2 inline-block w-max"> 
                                        <span className="relative z-1 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-6 h-6 relative z-1 m-auto"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor"></path></svg>
                                            Continue Shopping
                                        </span>
                                    </Link>
                                </div>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
