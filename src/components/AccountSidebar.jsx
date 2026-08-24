"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AccountSidebar(){
    const { logout, isLoggedIn } = useContext(AuthContext);
    
    return(
        <>
            <div className="bg-[#fff] shadow-sm mb-6 w-full account-sidebar">
                <h2 className="text-xl font-semibold text-dark page-title mb-5 mt-3 mx-6">My Account</h2>
                <Link href="/user/account" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M23.9,11.437A12,12,0,0,0,0,13a11.878,11.878,0,0,0,3.759,8.712A4.84,4.84,0,0,0,7.113,23H16.88a4.994,4.994,0,0,0,3.509-1.429A11.944,11.944,0,0,0,23.9,11.437Zm-4.909,8.7A3,3,0,0,1,16.88,21H7.113a2.862,2.862,0,0,1-1.981-.741A9.9,9.9,0,0,1,2,13,10.014,10.014,0,0,1,5.338,5.543,9.881,9.881,0,0,1,11.986,3a10.553,10.553,0,0,1,1.174.066,9.994,9.994,0,0,1,5.831,17.076ZM7.807,17.285a1,1,0,0,1-1.4,1.43A8,8,0,0,1,12,5a8.072,8.072,0,0,1,1.143.081,1,1,0,0,1,.847,1.133.989.989,0,0,1-1.133.848,6,6,0,0,0-5.05,10.223Zm12.112-5.428A8.072,8.072,0,0,1,20,13a7.931,7.931,0,0,1-2.408,5.716,1,1,0,0,1-1.4-1.432,5.98,5.98,0,0,0,1.744-5.141,1,1,0,0,1,1.981-.286Zm-5.993.631a2.033,2.033,0,1,1-1.414-1.414l3.781-3.781a1,1,0,1,1,1.414,1.414Z" fill="currentColor"/></svg>
                    Dashboard
                </Link>
                <Link href="/user/profile" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M17.5,24c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5,6.5,2.916,6.5,6.5-2.916,6.5-6.5,6.5Zm0-11c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5,4.5-2.019,4.5-4.5-2.019-4.5-4.5-4.5Zm.999,6.354l1.886-1.833c.396-.385,.405-1.018,.021-1.414-.385-.395-1.018-.406-1.414-.02l-1.892,1.838c-.099,.1-.262,.1-.362,0l-.876-.858c-.395-.386-1.027-.379-1.414,.016s-.38,1.027,.015,1.414l.876,.858c.437,.428,1.01,.641,1.582,.641s1.146-.215,1.579-.643Zm-9.499-7.354c-3.309,0-6-2.691-6-6S5.691,0,9,0s6,2.691,6,6-2.691,6-6,6Zm0-10c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4ZM2,23c0-3.524,2.633-6.511,6.124-6.946,.548-.068,.937-.568,.869-1.116s-.574-.931-1.116-.868C3.386,14.629,0,18.469,0,23c0,.553,.448,1,1,1s1-.447,1-1Z" fill="currentColor" />
                    </svg>                    
                    Profile
                </Link>
                <Link href="/user/company" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                        <path d="m14,12v-7c0-1.654-1.346-3-3-3h-6c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h6c.553,0,1,.447,1,1s-.447,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h6c2.757,0,5,2.243,5,5v7c0,.553-.447,1-1,1s-1-.447-1-1Zm-8,1h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm-5,4h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1ZM6,5h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm-5,4h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm12.969,13.751c-.56-2.174-2.649-3.751-4.969-3.751s-4.409,1.577-4.969,3.751c-.138.534.185,1.08.72,1.218.53.137,1.08-.185,1.218-.72.33-1.282,1.633-2.249,3.031-2.249s2.701.967,3.031,2.249c.116.451.522.751.968.751.083,0,.167-.01.25-.031.535-.138.857-.684.72-1.218Zm-4.969-4.751c1.379,0,2.5-1.121,2.5-2.5s-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5,1.121,2.5,2.5,2.5Z" fill="currentColor" />
                    </svg>
                    Corporate Account
                </Link>
                <Link href="/user/orders" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                        <path d="M9,22c0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2,2,.895,2,2Zm8-2c-1.105,0-2,.895-2,2s.895,2,2,2,2-.895,2-2-.895-2-2-2ZM5.419,13l-.941-8h5.591c.087-.699,.262-1.369,.518-2H4.242l-.041-.351c-.178-1.511-1.459-2.649-2.979-2.649H0V2H1.222c.507,0,.934,.38,.993,.884l1.584,13.467c.178,1.511,1.459,2.649,2.979,2.649h13.222v-2H6.778c-.507,0-.934-.38-.993-.884l-.131-1.116H21.835l.363-2H5.419ZM24,6c0,3.309-2.691,6-6,6s-6-2.691-6-6S14.691,0,18,0s6,2.691,6,6Zm-2,0c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Zm-3-3h-2v3.414l2.293,2.293,1.414-1.414-1.707-1.707V3Z" fill="currentColor" />
                    </svg>
                    My Order List
                </Link>
                <Link href="/user/address" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M24,9.724V19a5.006,5.006,0,0,1-5,5H18a1,1,0,0,1,0-2h1a3,3,0,0,0,3-3V9.724a3,3,0,0,0-1.322-2.487l-7-4.723a2.979,2.979,0,0,0-3.356,0l-7,4.723A3,3,0,0,0,2,9.724V19a3,3,0,0,0,3,3H6a1,1,0,0,1,0,2H5a5.006,5.006,0,0,1-5-5V9.724A4.993,4.993,0,0,1,2.2,5.579L9.2.855a4.981,4.981,0,0,1,5.594,0l7,4.724A5,5,0,0,1,24,9.724Zm-5,5.283a6.952,6.952,0,0,1-2.05,4.949l-3.515,3.438a2.063,2.063,0,0,1-2.87,0l-3.507-3.43A7,7,0,1,1,19,15.007Zm-2,0a5,5,0,1,0-8.536,3.535l3.5,3.422,3.58-3.43A4.958,4.958,0,0,0,17,15.007ZM15,15a3,3,0,1,1-3-3A3,3,0,0,1,15,15Z" fill="currentColor" /></svg>                   
                    Addresses
                </Link>
                <Link href="/user/wishlist" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" fill="currentColor"/></svg>
                    Wishlist
                </Link>
                <button className="text-dark w-full text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white cursor-pointer"
                    onClick={() => {
                        logout();
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="m8 0c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm-3.5 4h6.5v2h-6.5c-1.379 0-2.5 1.122-2.5 2.5v5.5h-2v-5.5c0-2.481 2.019-4.5 4.5-4.5zm11.5 8h2v2h-2c-1.654 0-3-1.346-3-3v-6c0-1.654 1.346-3 3-3h2v2h-2c-.552 0-1 .449-1 1v6c0 .551.448 1 1 1zm8-3.941c0 .548-.24 1.07-.658 1.432l-2.681 2.362-1.322-1.5 1.535-1.354h-3.874v-2h3.74l-1.401-1.235 1.322-1.5 2.688 2.37c.411.355.651.877.651 1.425z" fill="currentColor"/></svg>
                    Logout
                </button>
            </div>
        </>
    )
}

export default AccountSidebar;