"use client";
import AccountSidebar from "@/components/AccountSidebar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { LoadingContext } from "@/context/LoadingContext";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const { startLoading, stopLoading } = useContext(LoadingContext);
    
    let {id} = useParams()

    const [orderDetails, setOrderDetails]  = useState([]);


    useEffect(() => {
        startLoading();
        fetch(`${baseUrl}my-orders/${id}`, {
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
                    setOrderDetails(result.data.order)
                    stopLoading();
                })
                .catch(error => {
                    console.error('Error fetching menu data:', error);
                    stopLoading();
                });
            }, 
        []);

    const states = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' },
    ];
    

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
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Order Details</h2>
                                <div className="overflow-x-scroll lg:overflow-x-hidden">
                                    <table className="w-max text-base font-semibold text-dark lg:w-full">
                                        <thead className="text-sm xl:text-base">
                                            <tr className="bg-primary text-white">
                                                <th scope="col" className="font-semibold py-4 px-3 text-left">Image</th>
                                                <th scope="col" className="font-semibold py-4 px-3 text-center">Product</th>
                                                <th scope="col" className="font-semibold py-4 px-3 text-center">Price</th>
                                                <th scope="col" className="font-semibold py-4 px-3 text-center">Quantity</th>
                                                <th scope="col" className="font-semibold py-4 px-3">Sub Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-base xl:text-lg">
                                            {orderDetails && orderDetails?.items?.map((item) => (
                                                <tr className="border-b border-gray-300" key={item?.id}>
                                                    <td className="py-4 px-3">
                                                        <Link href={`/product/${item.product.slug}`}><img src={item?.product?.image_url} alt="" className="w-20" /></Link>
                                                    </td>
                                                    <td className="py-4 px-3 max-w-[250px]">
                                                        <Link href={`/product/${item.product.slug}`} className="text-sm hover:text-primary">{item.product.name}</Link>
                                                    </td>
                                                    <td className="py-4 px-3 text-center">
                                                        ${item?.discounted_price}
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        x {item?.quantity}
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        ${item.total_price}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Billing Address</h2>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-4">
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="fname" placeholder="Your First Name" value={orderDetails?.details?.billing_first_name || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="lname" placeholder="Your Last Name" value={orderDetails?.details?.billing_last_name || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                        <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="email" placeholder="Your Email" autoComplete="email" value={orderDetails?.details?.billing_email || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                        <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="tel" placeholder="Your Contact Number" autoComplete="tel" value={orderDetails?.details?.billing_phone || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="company" className="text-left text-sm font-semibold inline-block w-full mb-2">Company</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="company" placeholder="Company" autoComplete="company" value={orderDetails?.details?.billing_company || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="country" className="text-left text-sm font-semibold inline-block w-full mb-2">Country</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="country" placeholder="Country" autoComplete="country" value={orderDetails?.details?.billing_country || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="address1" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 1</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="address1" placeholder="Address Line 1" value={orderDetails?.details?.billing_address_1 || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="address2" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 2 (Optional)</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="address2" placeholder="Address Line 2" value={orderDetails?.details?.billing_address_2 || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="state" className="text-left text-sm font-semibold inline-block w-full mb-2">State</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="state" placeholder="State" 
                                            value={
                                                states?.find(state => state.value==orderDetails?.details?.billing_state)?.label ?? ""
                                            } 
                                            readOnly={true} 
                                        />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="city" className="text-left text-sm font-semibold inline-block w-full mb-2">City</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="city" placeholder="City" value={orderDetails?.details?.billing_city || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="postcode" className="text-left text-sm font-semibold inline-block w-full mb-2">Postcode</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="postcode" placeholder="Post Code" value={orderDetails?.details?.billing_postcode || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="message" className="text-left text-sm font-semibold inline-block w-full mb-2">Your Message For Order</label>
                                        <textarea className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="message" placeholder="Your Message" defaultValue={orderDetails?.details?.billing_message || ""} readOnly={true}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-4">
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="sfname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="sfname" placeholder="Your First Name" value={orderDetails?.details?.shipping_first_name || orderDetails?.details?.billing_first_name || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="slname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="slname" placeholder="Your Last Name" value={orderDetails?.details?.shipping_last_name || orderDetails?.details?.billing_last_name || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="semail" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                        <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="semail" placeholder="Your Email" value={orderDetails?.details?.shipping_email || orderDetails?.details?.billing_email || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="stel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                        <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="stel" placeholder="Your Contact Number" value={orderDetails?.details?.billing_phone || orderDetails?.details?.billing_phone || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="scompany" className="text-left text-sm font-semibold inline-block w-full mb-2">Company</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="scompany" placeholder="Company" value={orderDetails?.details?.shipping_company || orderDetails?.details?.billing_company || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="scountry" className="text-left text-sm font-semibold inline-block w-full mb-2">Country</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="scountry" placeholder="Country" value={orderDetails?.details?.shipping_country || orderDetails?.details?.billing_country || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="saddress1" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 1</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="saddress1" placeholder="Address Line 1" value={orderDetails?.details?.shipping_address_1 || orderDetails?.details?.billing_address_1 || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="saddress2" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 2 (Optional)</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="saddress2" placeholder="Address Line 2" value={orderDetails?.details?.shipping_address_2 || orderDetails?.details?.billing_address_2 || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="sstate" className="text-left text-sm font-semibold inline-block w-full mb-2">State</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="sstate" placeholder="State" 
                                            value={
                                                orderDetails?.details?.shipping_state ? 
                                                states?.find(state => state.value==orderDetails?.details?.shipping_state)?.label :
                                                states?.find(state => state.value==orderDetails?.details?.billing_state)?.label ?? ""
                                            } 
                                            readOnly={true} 
                                        />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="scity" className="text-left text-sm font-semibold inline-block w-full mb-2">City</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="scity" placeholder="City" value={orderDetails?.details?.shipping_city || orderDetails?.details?.billing_city || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="spostcode" className="text-left text-sm font-semibold inline-block w-full mb-2">Postcode</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="spostcode" placeholder="Post Code" value={orderDetails?.details?.shipping_postcode || orderDetails?.details?.billing_postcode || ""} readOnly={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="smessage" className="text-left text-sm font-semibold inline-block w-full mb-2">Your Message For Order</label>
                                        <textarea className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="smessage" placeholder="Your Message" defaultValue={orderDetails?.details?.shipping_message || orderDetails?.details?.billing_message || ""} readOnly={true}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 w-full lg:w-2/3 xl:mb-6">
                                <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Order Summary</h2>
                                <table className="w-full font-semibold text-dark">
                                    <tbody className="text-sm text-left xl:text-lg">
                                        <tr className="border-b border-gray-300">
                                            <th className="py-4">
                                                Order Date
                                            </th>
                                            <td className="py-4">
                                                {
                                                    new Date(orderDetails?.created_at).toLocaleDateString("en-IN", {
                                                        "day" : "2-digit",
                                                        "month" : "long",
                                                        "year" : "numeric"
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-300">
                                            <th className="py-4">
                                                Payment ID
                                            </th>
                                            <td className="py-4">
                                                {orderDetails?.payment_intent}
                                            </td>
                                        </tr>
                                        {Number(orderDetails?.fuel_surcharge?.replace(/,/g, "")) > 0 ?
                                            <tr className="border-b border-gray-300">
                                                <th className="py-4">Fuel Surcharges</th>
                                                <td className="py-4">+ ${orderDetails?.fuel_surcharge}</td>
                                            </tr> : null
                                        }
                                        {Number(orderDetails?.packing_handling_charges?.replace(/,/g, "") > 0) ?
                                            <tr className="border-b border-gray-300">
                                                <th className="py-4">Packing & Handling Charges</th>
                                                <td className="py-4">+ ${orderDetails?.packing_handling_charges}</td>
                                            </tr> : null
                                        }
                                        {Number(orderDetails?.tariff?.replace(/,/g, "")) > 0 ?
                                            <tr className="border-b border-gray-300">
                                                <th className="py-4">Tariff Charge</th>
                                                <td className="py-4">+ ${orderDetails?.tariff} ({orderDetails?.tariff_charge}%)</td>
                                            </tr> : null
                                        }
                                        {Number(orderDetails?.hazmat_charges?.replace(/,/g, "")) > 0 ?
                                            <tr className="border-b border-gray-300">
                                                <th className="py-4">Hazmat Charges</th>
                                                <td className="py-4">+ ${orderDetails?.hazmat_charges}</td>
                                            </tr> : null
                                        }
                                        <tr className="border-b border-gray-300">
                                            <th className="py-4">Subtotal</th>
                                            <td className="py-4">${orderDetails.subtotal}</td>
                                        </tr>
                                        {orderDetails?.items?.map((order, index) => (
                                            <tr className="border-b border-gray-300" key={order?.id}>
                                                <th className="py-4">Fedex Charge {index+1}</th>
                                                <td className="py-4"> ${order?.fedex_charge}</td>
                                            </tr>
                                        ))}
                                        {orderDetails?.user_discount &&
                                            <tr className="border-b border-gray-300">
                                                <th className="py-4">You Save</th>
                                                <td className="py-4"> ${orderDetails?.user_discount}</td>
                                            </tr>
                                        }
                                        
                                        {orderDetails.coupon_discount != "0.00" && orderDetails?.coupon_discount &&
                                            <tr className="border-b border-gray-300">
                                                <th className="py-4">Coupon Discount</th>
                                                <td className="py-4">-${orderDetails.coupon_discount} <span className="badge badge-primary">{orderDetails.coupon_code}</span></td>
                                            </tr>
                                        }
                                        <tr className="border-b border-gray-300">
                                            <th className="py-4">Total</th>
                                            <td className="py-4">${orderDetails.total}</td>
                                        </tr>
                                        <tr>
                                            <th className="py-4">status</th>
                                            <td className="py-4">
                                                {orderDetails.status == 'pending' ?
                                                    <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 text-white uppercase">Pending</span> : (orderDetails.status == 'completed') ?
                                                        <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-400 via-green-400 to-green-400 text-white uppercase">Completed</span> : (orderDetails.status == 'cancelled') ?
                                                            <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white uppercase">Canclled</span> : ''
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
