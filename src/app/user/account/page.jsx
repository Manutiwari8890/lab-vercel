"use client"

import Link from "next/link";
import AccountSidebar from "@/components/AccountSidebar";
import { useContext, useState, useEffect} from "react";
import { AuthContext } from "@/context/AuthContext";
import { LoadingContext } from "@/context/LoadingContext";

export default function Page(){
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const { startLoading, stopLoading } = useContext(LoadingContext);

    const [orders, setOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [role, setRole] = useState("");


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

                setPendingOrders(result.data.filter((order) => {
                    return order.status == 'processing'
                }))

                setCompletedOrders(result.data.filter((order) => {
                    return order.status == 'completed'
                }))
            })
            .catch(error => {
                console.error('Error fetching Orders data:', error);
            });
    },
        []);

    useEffect(() => {
        const fetchUser = () => {
            fetch(`${baseUrl}user`, {
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
                setRole(result.data.role || "")
                stopLoading()
            })
            .catch(error => {
                console.error('Error fetching User data:', error);
            });
        }
        fetchUser()
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
                            <div className="bg-[#fff] shadow-sm  py-4 px-3 mb-5 xl:mb-6 xl:px-5">
                                <h2 className="text-xl font-semibold text-dark page-title mb-5">Summary</h2>
                                <div className="grid gap-3 grid-cols-1 md:grid-cols-3 xl:gap-5">
                                    <div className="grid grid-cols-4 p-4 bg-gradient-to-r from-yellow-400/10 to-amber-500/50 items-center xl:p-8">
                                        <div className="col-span-3">
                                            <h4 className="text-4xl font-semibold text-amber-600 mb-3 xl:text-5xl">{pendingOrders.length}</h4>
                                            <h5 className="text-base font-bold text-amber-600 xl:text-lg">Pending Orders</h5>
                                        </div>
                                        <div className="bg-amber-600 w-[75px] h-[75px] rounded-full text-center content-center md:w-[50px] md:h-[50px] xl:w-[65px] xl:h-[65px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-[40px] h-[40px] text-white m-auto md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]">
                                                <path d="m17.5,7c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h3.692c-2.023-3.091-5.474-5-9.192-5C5.935,1,1,5.935,1,12s4.935,11,11,11c1.5,0,2.289-.22,2.901-.387.276-.07.542.086.614.351.072.267-.085.542-.351.614-.668.182-1.665.422-3.165.422C5.383,24,0,18.617,0,12S5.383,0,12,0c4.04,0,7.789,2.066,10,5.414V1.5c0-.276.224-.5.5-.5s.5.224.5.5v4c0,.827-.673,1.5-1.5,1.5h-4Zm6,4.5c-.276,0-.5.224-.5.5,0,.64-.055,1.28-.163,1.903-.048.272.135.531.406.578.029.006.058.008.087.008.238,0,.449-.171.491-.414.119-.681.179-1.378.179-2.075,0-.276-.224-.5-.5-.5Zm-.855,4.891c-.25-.118-.548-.009-.664.242-.269.577-.589,1.134-.953,1.655-.158.227-.103.538.124.696.087.061.187.09.286.09.157,0,.313-.074.41-.214.397-.569.747-1.177,1.039-1.806.116-.251.008-.548-.242-.664Zm-3.547,4.013c-.486.412-1.011.782-1.56,1.103-.238.139-.319.444-.18.684.093.159.26.248.432.248.086,0,.173-.021.252-.068.599-.349,1.171-.753,1.702-1.202.211-.179.237-.494.059-.705-.178-.209-.494-.234-.705-.059Zm-2.357-6.342l-4.24-2.32v-6.241c0-.276-.224-.5-.5-.5s-.5.224-.5.5v6.538c0,.183.1.351.26.438l4.5,2.462c.076.042.158.062.24.062.177,0,.348-.094.438-.26.133-.242.044-.546-.198-.679Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 p-4 bg-gradient-to-r from-emerald-400/20 to-green-400/50 items-center xl:p-8">
                                        <div className="col-span-3">
                                            <h4 className="text-4xl font-semibold text-emerald-600 mb-3 xl:text-5xl">{completedOrders.length}</h4>
                                            <h5 className="text-base font-bold text-emerald-600 xl:text-lg">Completed Orders</h5>
                                        </div>
                                        <div className="bg-emerald-600 w-[75px] h-[75px] rounded-full text-center content-center md:w-[50px] md:h-[50px] xl:w-[65px] xl:h-[65px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1" className="w-[40px] h-[40px] text-white m-auto md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]">
                                                <path d="m23.618 12.26h-.002s-.002-.006-.004-.01l-2.054-3.233-3.216-1.067c-.144.309-.306.608-.492.89l2.067.686-7.922 2.65-7.803-2.61 2.011-.644c-.19-.281-.354-.581-.503-.889l-3.305 1.058-2.02 3.159s-.002.008-.005.012h-.002c-.23.38-.369.817-.369 1.238 0 .342.035.688.157 1.021.278.75.872 1.324 1.629 1.576l.221.074-.008 4.487 9.997 3.332 9.996-3.332.008-4.494.199-.066c.758-.252 1.352-.826 1.63-1.577.104-.282.17-.573.17-.864 0-.562-.125-.968-.382-1.395zm-22.523 1.914c-.172-.467-.124-.975.13-1.397l1.658-2.594 8.354 2.794-1.95 3.251c-.371.617-1.168.924-1.87.69l-5.314-1.771c-.468-.155-.836-.511-1.007-.974zm1.905 2.33 4.102 1.365c.264.088.538.132.812.132.911 0 1.766-.481 2.23-1.258l1.358-2.258-.003 8.284-8.506-2.831.006-3.433zm18 3.433-8.503 2.831.003-8.264 1.342 2.238c.464.776 1.319 1.258 2.23 1.258.275 0 .548-.044.813-.132l4.121-1.371zm1.892-5.764c-.172.464-.54.819-1.008.975l-5.313 1.771c-.707.233-1.5-.072-1.871-.69l-1.95-3.251 8.362-2.797 1.65 2.596c.254.421.302.93.13 1.396zm-10.892-4.173c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5zm0-9c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4zm-1.27 5.658-1.602-1.544.694-.72 1.608 1.551c.071.071.177.071.242.006l2.518-2.461.699.715-2.514 2.457c-.216.216-.509.338-.821.338s-.605-.122-.825-.342z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 p-4 bg-gradient-to-r from-primary/10 to-primary/30 items-center xl:p-8">
                                        <div className="col-span-3">
                                            <h4 className="text-2xl font-semibold text-primary mb-3 xl:text-3xl">{role}</h4>
                                            <h5 className="text-base font-bold text-primary xl:text-lg">User Type</h5>
                                        </div>
                                        <div className="bg-primary w-[75px] h-[75px] rounded-full text-center content-center md:w-[50px] md:h-[50px] xl:w-[65px] xl:h-[65px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-[40px] h-[40px] text-white m-auto md:w-[30px] md:h-[30px] xl:w-[40px] xl:h-[40px]">
                                                <path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z" fill="currentColor" /><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z" fill="currentColor" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Recent Orders</h2>
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
