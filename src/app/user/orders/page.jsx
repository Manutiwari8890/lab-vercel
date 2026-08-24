"use client"

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { LoadingContext } from "@/context/LoadingContext";
import { AuthContext } from "@/context/AuthContext";
import AccountSidebar from "@/components/AccountSidebar";

export default function Page(){
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const { startLoading, stopLoading } = useContext(LoadingContext);
    const [orders, setOrders] = useState([]); 

    useEffect(() => {
        startLoading();
        fetch(`${baseUrl}my-orders`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${localStorage?.getItem("token")}`, "Content-Type": "application/json" },
        })
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    setOrders(result.data)
                    stopLoading();
                })
                .catch(error => {
                    console.error('Error fetching Orders data:', error);
                });
            }, 
        []);    

    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">My Account</h2>
                    <div className="grid grid-cols-4 gap-5 xl:gap-6">
                        <div className="col-span-1 hidden lg:block">
                            <AccountSidebar />
                        </div>
                        <div className="col-span-4 lg:col-span-3">
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">My Orders List</h2>
                                <table className="w-full text-base font-semibold text-dark">
                                    {orders?.length>0 ? 
                                        <>
                                            <thead className="text-base xl:text-lg">
                                                <tr className="bg-primary text-white">
                                                    <th scope="col" className="font-semibold py-4 px-3 text-left"># Order No	</th>
                                                    <th scope="col" className="font-semibold py-4 px-3 text-center">Purchased Date</th>
                                                    <th scope="col" className="font-semibold py-4 px-3 text-center">Total</th>
                                                    <th scope="col" className="font-semibold py-4 px-3 text-center">Status</th>
                                                    <th scope="col" className="font-semibold py-4 px-3">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-base xl:text-lg">
                                                {orders.map((order) => (

                                                <tr className="border-b border-gray-300" key={order?.id}>
                                                    <td className="py-4 px-3">
                                                        #{order?.id}
                                                    </td>
                                                    <td className="py-4 px-3 text-center">
                                                        {
                                                        (() => {
                                                            const [day, month, year] = order.created_date.split("T")[0].split("-");
                                                            return `${day}-${month}-${year}`;
                                                        })()}
                                                    </td>
                                                    <td className="py-4 px-3 text-center">
                                                        ${order.total}
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        {order.status == 'pending' ?
                                                            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 text-white uppercase">Pending</span> : (order.status == 'completed') ?
                                                            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-400 via-green-400 to-green-400 text-white uppercase">Completed</span> : (order.status == 'cancelled') ?
                                                            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white uppercase">Canclled</span> : ''
                                                        }
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        <Link href={`/user/orders/${order.id}`} className="text-lg font-semibold text-primary hover:text-secondary">View</Link>
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </> :
                                        <tbody>
                                            <tr>
                                                <th>
                                                    <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                                                    <p className="text-base font-semibold text-gray-400">Your orders will appear here once you make a purchase.</p>
                                                </th>
                                            </tr>
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
