"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { OverlayContext } from "../context/OverlayContext";
import Image from "next/image";

function CartSidebar() {
    const { overlay, toggleOverlay } = useContext(OverlayContext);
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, isCartOpen } = useContext(CartContext)
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const [loadingButton, setLoadingButton] = useState(null);
    const handleRemove = async (id)=>{
        setLoadingButton(id);
        let res = await removeFromCart(id)
        if(res){
            setLoadingButton(null)
        }
    }


    return (
        <>
            <aside className={`w-full bg-white h-screen fixed top-0 right-0 z-1000 transform ${(overlay === "cart Sidebar") ? "translate-x-0" : "translate-x-full"} transition-transform duration-0 shadow-[5px_0_10px_5px_rgba(255,255,255,0.5)] flex flex-col justify-between border-t-2 border-primary md:max-w-[350px]`}>
                <div className="w-full h-[70px] flex justify-between items-start absolute top-0 left-0">
                    <h4 className="text-xl font-semibold uppercase text-dark page-title  my-6 mx-4">Shopping Cart</h4>
                    <button className="btn-primary p-4 bg-primary text-white cursor-pointer" onClick={() => toggleOverlay(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-6 h-6 relative z-1" ><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor" /></svg>
                    </button>
                </div>
                <div className="min-h-screen pt-[70px] pb-[140px]">
                    {(cartItems && cartItems?.length > 0 ? 
                        <div className="overflow-y-scroll p-4 pb-30  items-scrollbar content-start h-[80vh]">
                            {cartItems?.map((item) => (
                                <div className="w-full flex items-start gap-2 border-b-1 border-gray-300 pb-3 mb-5" key={item.id}>
                                    <Link href={`/product/${item?.slug}`} className="inline-block border border-gray-300 p-1 mt-[5px] w-[60px]">
                                        <Image src={item?.image_url ? item?.image_url : "/assets/images/placeholder.jpg"} alt={item?.image_url} width={60} height={60} className="w-full h-auto" />
                                    </Link>
                                    <div className="text-left flex-1">
                                        <h3 className="mb-2">
                                            <Link href={`/product/${item?.slug}`} className="text-base font-semibold hover:text-primary">{item?.name}</Link>
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm font-semibold">{item?.quantity} x 
                                                ${isLoggedIn ?
                                                    item.discounted_price :
                                                    item.price
                                                }
                                            </p>
                                            <button className="text-secondary text-sm font-semibold cursor-pointer hover:text-dark" onClick={() => handleRemove(item?.id)} aria-label="Remove Cart Item">
                                                {loadingButton === item?.id ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="animate-spin w-4 h-4"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg> 
                                                    : "Remove"
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <div className="text-center content-center m-auto min-h-[50vh]">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="100px" width="100px" version="1.1" id="Capa_1" viewBox="0 0 231.523 231.523" xmlSpace="preserve" className="mx-auto"><g><path d="M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231   l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z"></path><path d="M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468   c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468   C147.235,148.377,150.23,152.062,154.351,152.488z"></path><path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221   c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523   c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215   C104.494,212.835,100.808,216.523,96.278,216.523z"></path><path d="M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221   c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523   c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215   C181.937,212.835,178.251,216.523,173.719,216.523z"></path><path d="M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876   c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046   c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z    M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z"></path><path d="M105.556,52.851c1.464,1.463,3.383,2.195,5.302,2.195c1.92,0,3.84-0.733,5.305-2.198c2.928-2.93,2.927-7.679-0.003-10.607   L92.573,18.665c-2.93-2.928-7.678-2.927-10.607,0.002c-2.928,2.93-2.927,7.679,0.002,10.607L105.556,52.851z"></path><path d="M159.174,55.045c1.92,0,3.841-0.733,5.306-2.199l23.552-23.573c2.928-2.93,2.925-7.679-0.005-10.606   c-2.93-2.928-7.679-2.925-10.606,0.005l-23.552,23.573c-2.928,2.93-2.925,7.679,0.005,10.607   C155.338,54.314,157.256,55.045,159.174,55.045z"></path><path d="M135.006,48.311c0.001,0,0.001,0,0.002,0c4.141,0,7.499-3.357,7.5-7.498l0.008-33.311c0.001-4.142-3.356-7.501-7.498-7.502   c-0.001,0-0.001,0-0.001,0c-4.142,0-7.5,3.357-7.501,7.498l-0.008,33.311C127.507,44.951,130.864,48.31,135.006,48.311z"></path></g></svg>
                        </div>
                    )}
                </div>
                {(cartItems && cartItems.length > 0 && (
                <div className="bg-white p-4 absolute bottom-[0px] w-full h-[125px]">
                    <div className="flex justify-between mb-5">
                        <h3 className="text-xl font-semibold">Total</h3>
                        <p className="text-lg font-semibold">${getCartTotal()}</p>
                    </div>
                    <div className="flex justify-stretch gap-2">
                        <Link href="/cart" className="btn-primary btn-scale-0 bg-primary text-white px-6 py-3 font-semibold inline-block w-1/2 text-center"><span className="relative z-1">View Cart</span></Link>
                        <Link href="/checkout" className="btn-secondary btn-scale-0 bg-secondary text-white px-6 py-3 font-semibold inline-block w-1/2 text-center"><span className="relative z-1">Checkout</span></Link>
                    </div>
                </div>
                ))}
            </aside>
        </>
    )
}

export default CartSidebar;