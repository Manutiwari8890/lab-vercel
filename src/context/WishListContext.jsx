"use client"
import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '../context/ToastContext'
export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const [wishlistLoadingIds, setWishlistLoadingIds] = useState([]);
    //const { showToast } = useToast();
    const toast = useToast();

    const { showToast } = toast;
    const router = useRouter();

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [refreshWishList, setRefreshWishList] = useState(false);

    const [wishList, setWishList] = useState([]);

    const toggleWishlist = async (id) => {
        if (!localStorage.getItem("token")) {
            router.push(`/login`);
            return;
        }
        const isAlreadyInWishlist = wishList.some(item => item.id === id);
        if (!isAlreadyInWishlist && wishList.length >= 10) {
            showToast("You can only add a maximum of 10 products to your wishlist.", "warning")
            return;
        }
        setWishlistLoadingIds((prev) => [...prev, id]);
        setWishList(prev => {
            const exists = prev.some(item => item.id === id);
            if (exists) {
                return prev.filter(item => item.id !== id);
            } else {
                return [...prev, { id }];
            }
        });
        try {
            const response = await fetch(`${baseUrl}wishlist/toggle/${id}`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            });
            const data = await response.json();

            if (response.status === 200) {
                setRefreshWishList(prev => !prev)
                fetchWishList();
                if (data.data.status === "removed") {
                    showToast(data.message, "error");
                } else {
                    showToast(data.message, "success");
                }

                return "";
            } else {
                return data.message || "Toggle WishList failed.";
            }
        } catch (error) {
            console.log(error);
            setWishList(prev => {
                const exists = prev.some(item => item.id === id);
                if (exists) {
                    return prev.filter(item => item.id !== id);
                } else {
                    return [...prev, { id }];
                }
            });
        } finally {
            setWishlistLoadingIds((prev) => prev.filter(pid => pid !== id));
        }
    };


    const fetchWishList = async () => {
        if (!localStorage.getItem("token")) return;
        try {
            const response = await fetch(`${baseUrl}wishlist`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" }
            });
            if (!response.ok) throw new Error("Failed to fetch product WishList");
            const data = await response.json();
            setWishList(data.data);
        } catch (err) {
            console.log(err);
        }
    };


    const getWishList = () => wishList;
    return (
        <WishListContext.Provider value={{ toggleWishlist, getWishList, wishlistLoadingIds, fetchWishList, wishList }}>
            {children}
        </WishListContext.Provider>
    )

}