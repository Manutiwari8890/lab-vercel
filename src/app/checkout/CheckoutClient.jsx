"use client"

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import { LoadingContext } from "@/context/LoadingContext";
import SearchSelect from "@/components/SearchSelect";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export default function CheckoutClient() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const { cartItems, addToCart, removeFromCart, cartDetail, clearCart, getCartTotal, fetchCartFromApi, updateCartItemQuantity } = useContext(CartContext)
    const { user, logout, isLoggedIn, login } = useContext(AuthContext);
    
    const [checkoutData, setCheckoutData] = useState({});
    const [shipAdds, setShipAdds] = useState("");
    const { startLoading, stopLoading } = useContext(LoadingContext);
    const [selectShip, setSelectShip] = useState();

    const [cartLoading, setCartLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const [coupon, setCoupon] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [couponLoading, setCouponLoading] = useState(false);

    const [billing_fname, setBfname] = useState("");
    const [billing_lname, setBlname] = useState("");
    const [billing_company, setBcompany] = useState("");
    const [billing_email, setBemail] = useState("");
    const [billing_phone, setBphone] = useState("");
    const [billing_address, setBaddress] = useState("");
    const [billing_address2, setBaddress2] = useState("");
    const [billing_country, setBcountry] = useState("United States");
    const [billing_city, setBcity] = useState("");
    const [billing_postcode, setBpostCode] = useState("");
    const [billing_state, setBstate] = useState("");
    const [billing_message, setBmessage] = useState("");

    const [shipping_fname, setSfname] = useState("");
    const [shipping_lname, setSlname] = useState("");
    const [shipping_company, setScompany] = useState("");
    const [shipping_email, setSemail] = useState("");
    const [shipping_phone, setSphone] = useState("");
    const [shipping_address, setSaddress] = useState("");
    const [shipping_address2, setSaddress2] = useState("");
    const [shipping_country, setScountry] = useState("United States");
    const [shipping_city, setScity] = useState("");
    const [shipping_postcode, setSpostCode] = useState("");
    const [shipping_state, setSstate] = useState("");
    const [shipping_message, setSmessage] = useState("");
    const [shipping_residential, setSresident] = useState(false);
    const [shipDiff, setShipDiff] = useState(false);
    const [checkTerm, setCheckTerm] = useState(false);


    const [billErrors, setBillErrors] = useState({});
    const [messageType, setMessageType] = useState(false);


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


    if (!isLoggedIn) {
        router.push('/login');
    }

    useEffect(() => {
        startLoading();
        const getShipAddresses = async () => {
            try {
                const response = await fetch(`${baseUrl}user/addresses`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                })

                if (!response.ok) {
                    throw new Error("Shipping Address Fetch Unsuccessful");
                }

                const result = await response.json();
                if (result.status) {
                    setShipAdds(result.data)
                }
            } catch (err) {
                console.error(err)
            }
        }

        getShipAddresses();
    }, [])

    useEffect(() => {
        const fetchBill = async () => {
            try {
                const response = await fetch(`${baseUrl}user/address`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                })

                if (!response.ok) {
                    throw new Error("Update Bill Failed")
                }
                const result = await response.json();
                if (result.status) {
                    setBfname(result.data.billing_first_name)
                    setBlname(result.data.billing_last_name)
                    setBemail(result.data.billing_email)
                    setBphone(result.data.billing_phone)
                    setBcompany(result.data.billing_company ? result.data.billing_company : "")
                    setBaddress(result.data.billing_address_1)
                    setBaddress2(result.data.billing_address_2)
                    setBcity(result.data.billing_city)
                    setBstate(result.data.billing_state)
                    setBpostCode(result.data.billing_postcode)
                }

            } catch (err) {
                console.error(err)
            }
        }

        fetchBill();
    }, [])

    useEffect(() => {
        const fetchCartDetail = async () => {
            const data = await cartDetail()
            setCheckoutData(data);
            stopLoading();
        }
        fetchCartDetail();

    }, [])


    useEffect(() => {
        const fetchCartDetail = async (add) => {
            try {
                const response = await fetch(`${baseUrl}cart/detail`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        guest_token: localStorage.getItem("guest_key_token"),
                        address_id: selectShip,
                        city: add[4],
                        state: add[5],
                        postcode: add[6],
                        country: add[9],
                        address_1: add[7],
                        first_name: add[0],
                        last_name: add[1],
                        company: add[8],
                        phone: add[3],
                        email: add[2]
                    }),
                })

                if (!response.ok) {
                    throw new Error("Cart Detail Ftech Unsuccessful");
                }
                const result = await response.json();
                setCheckoutData(result.data)

            } catch (err) {
                console.error(err)
            } finally{
                setIsLoading(false);
            }
        }

        if (!shipDiff && billing_fname && billing_lname && billing_email && billing_phone && billing_city && billing_state && billing_postcode) {
            setIsLoading(true);
            fetchCartDetail([billing_fname, billing_lname, billing_email, billing_phone, billing_city, billing_state, billing_postcode, billing_address, billing_company, billing_country]);
        }
        if (shipDiff || (shipDiff && shipping_fname && shipping_lname && shipping_email && shipping_phone && shipping_city && shipping_state && shipping_postcode)) {
            setIsLoading(true);
            fetchCartDetail([shipping_fname, shipping_lname, shipping_email, shipping_phone, shipping_city, shipping_state, shipping_postcode, shipping_address, shipping_company, shipping_country]);
        }
    }, [billing_fname, billing_lname, billing_email, billing_phone, billing_city, billing_state, billing_postcode, cartItems, shipDiff, shipping_fname, shipping_lname, shipping_email, shipping_phone, shipping_city, shipping_state, shipping_postcode, shipping_address, shipping_company])


    const customerDetails = {
        coupon_code: coupon,
        billing_first_name: billing_fname,
        billing_last_name: billing_lname,
        billing_email: billing_email,
        billing_company: billing_company,
        billing_phone: billing_phone,
        billing_address_1: billing_address,
        billing_city: billing_city,
        billing_country: billing_country,
        billing_postcode: billing_postcode,
        billing_state: billing_state,
        notes: billing_message,

        ship_to_different_address: shipDiff,
        shipping_first_name: shipping_fname,
        shipping_last_name: shipping_lname,
        shipping_company: shipping_company,
        shipping_email: shipping_email,
        shipping_phone: shipping_phone,
        shipping_address_1: shipping_address,
        shipping_country: shipping_country,
        shipping_city: shipping_city,
        shipping_postcode: shipping_postcode,
        shipping_state: shipping_state,
        shipping_message: shipping_message,

        user_discount: checkoutData?.user_discount,
        tariff_charge: checkoutData?.tariff,
        fuel_surcharge: checkoutData?.fuel_surcharge,
        packing_handling_charges: checkoutData?.packing_handling_charges,
        hazmat_charges: checkoutData?.hazmat_charges,
        coupon_discount: checkoutData?.coupon_discount,
        subtotal: parseFloat(checkoutData?.sub_total?.replace(/,/g, '')),
        total: parseFloat(checkoutData?.total?.replace(/,/g, '')),
    }

    async function placeOrder(e) {
        e.preventDefault();
        const errors = billingFormValidate(customerDetails);
        setBillErrors(errors)
        if (Object.keys(errors).length === 0) {
            setIsLoading("Processing your order...");
            const orderData = {
                ...customerDetails,
                amount: parseFloat(checkoutData.total),
                payment_method: 'stripe',
            };
            const intentData = {
                amount: parseFloat(checkoutData.total),
                currency: 'usd',
            };
            const res = await fetch(`${baseUrl}create-payment-intent`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(intentData),
            });
            const data = await res.json();
            if (res.ok) {
                setIsLoading("Payment Completed ✔");
                const result = await stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                });
                if (result.error) {
                    alert(result.error.message);
                    setIsLoading(false);
                    return;
                }

                const orderRes = await fetch(`${baseUrl}checkout`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...orderData, payment_intent_id: result.paymentIntent.id,
                    }),
                });
                setIsLoading("Finalizing…");
                const orderResult = await orderRes.json();
                const clearCart = await fetchCartFromApi();
                if (orderResult && orderResult.status) {
                    router.push("/thankyou", { state: { data: result } });
                }
            }

        }
        setIsLoading(false);
    }

    const billingFormValidate = (val) => {
        const billingError = {}
        if (!val.billing_first_name) {
            billingError.fname = "The billing first name field is required."
        }
        if (!val.billing_last_name) {
            billingError.lname = "The billing last name field is required."
        }
        if (!val.billing_company) {
            billingError.company = "The billing company field is required."
        }
        if (!val.billing_email) {
            billingError.email = "The billing email field is required."
        }
        if (!val.billing_phone) {
            billingError.phone = "The billing phone field is required."
        }
        if (!val.billing_address_1) {
            billingError.address = "The billing address field is required."
        }
        if (!val.billing_city) {
            billingError.city = "The billing city field is required."
        }
        if (!val.billing_country) {
            billingError.country = "The billing country field is required."
        }
        if (!val.billing_postcode) {
            billingError.postcode = "The billing postcode field is required."
        }
        if (!val.billing_state) {
            billingError.state = "The billing state field is required."
        }
        if (!shipping_residential && !selectShip) {
            billingError.resdetial = "Please Confirm !"
        }
        if (!checkTerm) {
            billingError.checkTerm = "Please Confirm !"
        }
        if (!checkoutData?.products[0].charges?.net_charge) {
            billingError.fedexError = "Fedex Error"
        }
        if (shipDiff) {
            if (!shipping_fname) {
                billingError.sfname = "The Shipping first name field is required."
            }
            if (!shipping_lname) {
                billingError.slname = "The Shipping last name field is required."
            }
            if (!shipping_company) {
                billingError.scompany = "The Shipping company field is required."
            }
            if (!shipping_email) {
                billingError.semail = "The Shipping email field is required."
            }
            if (!shipping_phone) {
                billingError.sphone = "The Shipping phone field is required."
            }
            if (!shipping_address) {
                billingError.saddress = "The Shipping address field is required."
            }
            if (!shipping_city) {
                billingError.scity = "The Shipping city field is required."
            }
            if (!billing_country) {
                billingError.scountry = "The Shipping country field is required."
            }
            if (!shipping_postcode) {
                billingError.spostcode = "The Shipping postcode field is required."
            }
            if (!shipping_state) {
                billingError.sstate = "The Shipping state field is required."
            }
        }
        return billingError
    }


    async function handleCoupon() {
        setCouponLoading(true);
        try {
            const response = await fetch(`${baseUrl}cart/coupon`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                body: JSON.stringify({ coupon_code: coupon })
            })

            if (!response.ok) {
                throw new Error("Coupon Fetch UnsuccessFul");
            }

            const result = await response.json();
            setMessageType((result.status) ? true : false)
            const newData = await cartDetail(coupon);
            setCheckoutData(newData)
            setCouponMessage(result.status ? "Coupon Added" : result.message)
            setCouponLoading(false);
        } catch (err) {
            console.error(err)
        }
    }

    const handleAdds = (id) => {
        const newAdd = shipAdds.find(item => item.id === id)
        if (newAdd) {
            setSfname(newAdd.first_name);
            setSlname(newAdd.last_name);
            setScompany(newAdd.company || "");
            setSemail(newAdd.email);
            setSphone(newAdd.phone);
            setSaddress(newAdd.address_1);
            setSaddress2(newAdd.address_2);
            setScity(newAdd.city);
            setSpostCode(newAdd.postcode);
            const foundState = states.find(st => st.value === newAdd.state);
            setSstate(foundState.value || "");
        } else {
            setSfname("");
            setSlname("");
            setScompany("");
            setSemail("");
            setSphone("");
            setSaddress("");
            setSaddress2("");
            setScity("");
            setSpostCode("");
            setSstate("");
        }

    }


    return (
        <>
            <section className="py-10 bg-[#F4F8FB]">
                <div className="container px-3 mx-auto md:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:gap-15">Checkout</h2>
                    <Link href="/cart" className="inline-block text-sm font-bold text-center uppercase text-white btn btn-secondary py-3 px-6 bg-secondary mb-6">
                        <span className="relative z-1 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" className="w-4 h-4 -rotate-180"><g><path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor"></path><path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor"></path></g></svg>
                            Cart
                        </span>
                    </Link>
                    <form onSubmit={(e) => {placeOrder(e)}}>
                        <div className="grid grid-cols-10 gap-5 xl:gap-6">
                            <div className="col-span-10 md:col-span-5">
                                <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-6">
                                    <h2 className="text-xl font-semibold text-dark mb-3 xl:mb-5">Your Billing Address</h2>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-4">
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.fname ? "border-red-500" : "border-[#afafaf]"}`} id="fname" placeholder="Your First Name" value={billing_fname} onChange={(e) => setBfname(e.target.value)} />
                                            {billErrors?.fname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.fname}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.lname ? "border-red-500" : "border-[#afafaf]"}`} id="lname" placeholder="Your Last Name" value={billing_lname} onChange={(e) => setBlname(e.target.value)} />
                                            {billErrors?.lname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.lname}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                            <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.email ? "border-red-500" : "border-[#afafaf]"}`} id="email" placeholder="Your Email" value={billing_email} onChange={(e) => setBemail(e.target.value)} />
                                            {billErrors?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.email}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                            <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.phone ? "border-red-500" : "border-[#afafaf]"}`} id="tel" placeholder="Your Contact Number" value={billing_phone} onChange={(e) => setBphone(e.target.value)} />
                                            {billErrors?.phone && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.phone}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="company" className="text-left text-sm font-semibold inline-block w-full mb-2">Company</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.company ? "border-red-500" : "border-[#afafaf]"}`} id="company" placeholder="Company" value={billing_company} onChange={(e) => setBcompany(e.target.value)} />
                                            {billErrors?.company && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.company}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="country" className="text-left text-sm font-semibold inline-block w-full mb-2">Country</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.country ? "border-red-500" : "border-[#afafaf]"}`} id="country" placeholder="Country" value={billing_country} readOnly />
                                            {billErrors?.country && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.country}</p>}                                        
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="address1" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 1</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.address ? "border-red-500" : "border-[#afafaf]"}`} id="address1" placeholder="Address Line 1" value={billing_address} onChange={(e) => setBaddress(e.target.value)} />
                                            {billErrors?.address && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.address}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="address2" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 2 (Optional)</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="address2" placeholder="Address Line 2" value={billing_address2 ?? ""} onChange={(e) => setBaddress2(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="state" className="text-left text-sm font-semibold inline-block w-full mb-2">State</label>
                                            <SearchSelect
                                                classes={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary placeholder:text-black/80 ${billErrors?.state ? "border-red-500" : "border-[#afafaf]"}`}
                                                placeholder="Select State"
                                                id="state"
                                                value={billing_state}
                                                data={states}
                                                onSelect={(cat) => {
                                                    setBstate(cat);
                                                }}
                                            />
                                            {billErrors?.state && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.state}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="city" className="text-left text-sm font-semibold inline-block w-full mb-2">City</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.city ? "border-red-500" : "border-[#afafaf]"}`} id="city" placeholder="City" value={billing_city} onChange={(e) => setBcity(e.target.value)} />
                                            {billErrors?.city && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.city}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="postcode" className="text-left text-sm font-semibold inline-block w-full mb-2">Postcode</label>
                                            <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.postcode ? "border-red-500" : "border-[#afafaf]"}`} id="postcode" placeholder="Post Code" value={billing_postcode} onChange={(e) => setBpostCode(e.target.value)} />
                                            {billErrors?.postcode && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.postcode}</p>}
                                        </div>
                                        <div className="form-group mb-3 relative">
                                            <label htmlFor="message" className="text-left text-sm font-semibold inline-block w-full mb-2">Your Message For Order</label>
                                            <textarea maxLength="200" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="message" placeholder="Your Message" onChange={(e) => setBmessage(e.target.value)} defaultValue={billing_message}></textarea>
                                        </div>
                                        <div className="flex items-start col-span-2">
                                            <input id="shipDiff" type="checkbox" className="w-4 h-4 mt-1 accent-primary rounded-sm" checked={shipDiff} onChange={() => setShipDiff(!shipDiff)} />
                                            <label htmlFor="shipDiff" className="ms-2 flex-1 text-sm font-medium text-justify cursor-pointer">Ship to a different address?</label>
                                        </div>
                                    </div>
                                </div>
                                <AnimatePresence mode="wait">
                                    {shipDiff &&
                                        <motion.div
                                            initial={{ opacity: 0, y: -50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -50 }}
                                            transition={{ duration: 0.4 }}
                                            className="bg-[#fff] shadow-sm  py-4 px-5 mb-6"
                                        >
                                            <h2 className="text-xl font-semibold text-dark mb-3 xl:mb-5">Shipping Address and Billing Address</h2>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-4">
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="fname2" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.sfname ? "border-red-500" : "border-[#afafaf]"}`} id="fname2" placeholder="Your First Name" value={shipping_fname} onChange={(e) => setSfname(e.target.value)} />
                                                    {billErrors?.sfname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.sfname}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="lname2" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.slname ? "border-red-500" : "border-[#afafaf]"}`} id="lname2" placeholder="Your Last Name" value={shipping_lname} onChange={(e) => setSlname(e.target.value)} />
                                                    {billErrors?.slname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.slname}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="email2" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                                    <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.semail ? "border-red-500" : "border-[#afafaf]"}`} id="email2" placeholder="Your Email" value={shipping_email} onChange={(e) => setSemail(e.target.value)} />
                                                    {billErrors?.semail && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.semail}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="tel2" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                                    <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.sphone ? "border-red-500" : "border-[#afafaf]"}`} id="tel2" placeholder="Your Contact Number" value={shipping_phone} onChange={(e) => setSphone(e.target.value)} />
                                                    {billErrors?.sphone && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.sphone}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="company2" className="text-left text-sm font-semibold inline-block w-full mb-2">Company</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.scompany ? "border-red-500" : "border-[#afafaf]"}`} id="company2" placeholder="Company" value={shipping_company} onChange={(e) => setScompany(e.target.value)} />
                                                    {billErrors?.scompany && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.scompany}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="country2" className="text-left text-sm font-semibold inline-block w-full mb-2">Country</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.scountry ? "border-red-500" : "border-[#afafaf]"}`} id="country2" placeholder="Country" value={shipping_country} readOnly />
                                                    {billErrors?.scountry && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.scountry}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="address1s" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 1</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.saddress ? "border-red-500" : "border-[#afafaf]"}`} id="address1s" placeholder="Address Line 1" value={shipping_address} onChange={(e) => setSaddress(e.target.value)} />
                                                    {billErrors?.saddress && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.saddress}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="address2s" className="text-left text-sm font-semibold inline-block w-full mb-2">Address Line 2 (Optional)</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="address2s" placeholder="Address Line 2" value={shipping_address2} onChange={(e) => setSaddress2(e.target.value)} />
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="state2" className="text-left text-sm font-semibold inline-block w-full mb-2">State</label>
                                                    <SearchSelect
                                                        classes={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary placeholder:text-black/80 ${billErrors?.sstate ? "border-red-500" : "border-[#afafaf]"}`}
                                                        placeholder="Select State"
                                                        id="state2"
                                                        value={shipping_state}
                                                        data={states}
                                                        onSelect={(cat) => {
                                                            setSstate(cat);
                                                        }}
                                                    />
                                                    {billErrors?.sstate && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.sstate}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="city2" className="text-left text-sm font-semibold inline-block w-full mb-2">City</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.scity ? "border-red-500" : "border-[#afafaf]"}`} id="city2" placeholder="City" value={shipping_city} onChange={(e) => setScity(e.target.value)} />
                                                    {billErrors?.scity && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.scity}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="postcode2" className="text-left text-sm font-semibold inline-block w-full mb-2">Postcode</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${billErrors?.spostcode ? "border-red-500" : "border-[#afafaf]"}`} id="postcode2" placeholder="Post Code" value={shipping_postcode} onChange={(e) => setSpostCode(e.target.value)} />
                                                    {billErrors?.spostcode && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.spostcode}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="message2" className="text-left text-sm font-semibold inline-block w-full mb-2">Your Message For Order</label>
                                                    <textarea maxLength="200" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="message2" placeholder="Your Message" defaultValue={shipping_message} onChange={(e) => setSmessage(e.target.value)}></textarea>
                                                </div>
                                            </div>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            <div className="col-span-10 md:col-span-5">
                                <div className="bg-[#fff] shadow-sm mb-5 xl:mb-6">
                                    <div className="flex">
                                        <div className="form-group relative w-full flex-1">
                                            <input type="text" className="w-full border border-transparent py-4 px-4 text-sm font-semibold focus:border-primary" id="coupon" placeholder="Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                        </div>
                                        <button type="button" className={`w-max text-sm font-bold text-center uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 cursor-pointer ${couponLoading ? "bg-primary/70" : "bg-primary"}`} onClick={handleCoupon}  disabled={couponLoading ? true : false} aria-label="Apply Coupon" >
                                            {couponLoading ? 
                                                <div role="status" className="flex gap-2 items-center justify-center">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/></svg>
                                                    Please Wait...
                                                </div> :
                                                <span className="relative z-1 flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 " ><path d="M1,24c-.256,0-.512-.098-.707-.293-.391-.391-.391-1.023,0-1.414L22.293,.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414L1.707,23.707c-.195,.195-.451,.293-.707,.293ZM9,5c0-2.206-1.794-4-4-4S1,2.794,1,5s1.794,4,4,4,4-1.794,4-4Zm-2,0c0,1.103-.897,2-2,2s-2-.897-2-2,.897-2,2-2,2,.897,2,2Zm16,14c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Zm-2,0c0,1.103-.897,2-2,2s-2-.897-2-2,.897-2,2-2,2,.897,2,2Z" fill="currentColor" /></svg>
                                                     Apply Coupon
                                                </span>
                                            }
                                        </button>
                                    </div>
                                    {couponMessage &&  <p className={`text-sm font-semibold text-left px-4 py-2 ${messageType ? "text-green-500" : "text-red-500"}`}>{couponMessage}</p>}
                                </div>
                                <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-5 xl:mb-6">
                                    <h2 className="text-xl font-semibold text-dark mb-3 xl:mb-5">Cart Totals</h2>
                                    <table className={`w-full text-sm font-semibold text-dark xl:text-base ${isLoading ? "opacity-20" : ""} `}>
                                        <tbody>
                                            <tr>
                                                <th scope="col" className="text-left font-semibold text-base py-2">Product</th>
                                                <th scope="col" className="text-right font-semibold text-base py-2">Subtotal</th>
                                            </tr>
                                            {checkoutData &&
                                                checkoutData?.products?.map((product) => (
                                                    <tr key={product?.id}>
                                                        <th scope="col" className="text-left font-semibold text-base py-2 w-[80%] md: w-[60%]">
                                                            <Link href={`/product/${product?.slug}`} className="hover:text-primary leading-7 mb-2 inline-block">{product?.name} <span className="text-gray-500">x {product?.quantity}</span></Link><br />
                                                            <Link href={`/product/${product?.slug}`} className="bg-primary/15 text-center text-[10px] font-bold py-1 px-3 rounded-full text-dark hover:text-white hover:bg-primary">{product?.sku}</Link>
                                                        </th>
                                                        <td scope="col" className="text-right py-2 content-start">${product?.subtotal}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <td colSpan="2" className="py-1 xl:py-2">
                                                    <hr className="border-gray-300" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="col" className="text-left font-semibold text-base py-2">Subtotal</th>
                                                <td scope="col" className="text-right py-2">${checkoutData?.sub_total}</td>
                                            </tr>
                                            {checkoutData?.products?.map((product, index) => (
                                                (product?.charges?.net_charge ? 
                                                    <tr key={product?.id}>
                                                        <th scope="col" className="text-left font-semibold text-base py-2 vertical-top">Shipping {index>0 ? index+1 : ''}</th>
                                                        <td scope="col" className="text-right py-3 text-sm">Fedex Ground : ${product?.charges?.net_charge} <br /> 
                                                            <p className="text-sm leading-5 text-gray-500">{product?.name}</p>
                                                        </td>
                                                    </tr> :
                                                    null
                                                )
                                            ))}
                                            
                                            {Number(checkoutData?.fuel_surcharge?.replace(/,/g, ""))>0 ? 
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Fuel Surcharge	</th>
                                                    <td scope="col" className="text-right py-2">+ ${checkoutData?.fuel_surcharge}</td>
                                                </tr> : null
                                            }
                                            {Number(checkoutData?.packing_handling_charges?.replace(/,/g, "")>0) ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Packing & Handling Charges	</th>
                                                    <td scope="col" className="text-right py-2 text-primary">+ ${checkoutData?.packing_handling_charges}</td>
                                                </tr> : null
                                            }
                                            {Number(checkoutData?.tariff?.replace(/,/g, "")>0) ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Tariff Charge</th>
                                                    <td scope="col" className="text-right py-2 text-primary">+ ${checkoutData?.tariff} ({checkoutData?.tariff_charge}%)</td>
                                                </tr> : null
                                            }
                                            {Number(checkoutData?.hazmat_charges?.replace(/,/g, "")>0) ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Hazmat Charges</th>
                                                    <td scope="col" className="text-right py-2 text-primary">+ ${checkoutData?.hazmat_charges}</td>
                                                </tr> : null
                                            }
                                            <tr>
                                                <th scope="col" className="text-left font-semibold text-base py-2">You Save</th>
                                                <td scope="col" className="text-right py-2 text-primary">- ${checkoutData?.user_discount}</td>
                                            </tr>
                                            {checkoutData?.coupon_discount != "0.00" ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Coupon Discount</th>
                                                    <td scope="col" className="text-right py-2 text-primary">- ${checkoutData?.coupon_discount}</td>
                                                </tr> : null
                                            }
                                            <tr>
                                                <th scope="col" className="text-left font-semibold text-base py-2">Total</th>
                                                <td scope="col" className="text-right py-2"><strong>${checkoutData?.total}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="py-1 my-3">
                                        <div className="flex items-start">
                                            <input id="residetal" type="checkbox" value="" className="w-4 h-4 mt-2 accent-primary rounded-sm" checked={shipping_residential} onChange={() => setSresident(!shipping_residential)} />
                                            <label htmlFor="residetal" className="ms-2 flex-1 text-sm font-medium text-justify cursor-pointer">Please Note that ‘Laboratory Disposable Products (LDP) DO NOT ship any chemicals to home / Residential address. It will be cancelled without Notice and issue a full refund to your account</label>
                                        </div>
                                        {billErrors?.resdetial && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.resdetial}</p>}
                                        <div className="flex items-start mt-4">
                                            <input id="terms" type="checkbox" value="" className="w-4 h-4 mt-2 accent-primary rounded-sm" checked={checkTerm} onChange={() => setCheckTerm(!checkTerm)} />
                                            <label htmlFor="terms" className="ms-2 flex-1 text-sm font-medium text-justify cursor-pointer">By placing an order, I am confirming that I understand that ‘Laboratory Disposable Products (LDP)'s products are not for human or animal use and are not shipped to residential address and have read and agree with the <Link href="/terms-conditions" className="text-primary font-semibold hover:text-secondary">terms and conditions</Link>.</label>
                                        </div>
                                        {billErrors?.checkTerm && <p className="text-sm font-semibold text-red-500 text-left mt-1">{billErrors?.checkTerm}</p>}
                                    </div>
                                    {checkoutData?.products?.length>0 &&
                                                !checkoutData?.products[0].charges?.net_charge && billErrors.fedexError &&
                                                <p className="text-sm font-semibold text-red-500 text-left mt-1">{checkoutData?.products[0].charges}</p>
                                    }
                                    <div className="py-3">
                                        <CardElement />
                                    </div>
                                    <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${isLoading ? "bg-primary/70" : "bg-primary"} mt-2 w-full cursor-pointer`} disabled={isLoading}> 
                                        {isLoading ? 
                                            <div role="status" className="flex gap-2 items-center justify-center">
                                                <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/></svg>
                                                {isLoading}
                                            </div> :
                                            <span className="relative z-1">
                                                <span className="relative z-1 flex items-center gap-2 justify-center">
                                                    Place Order 
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5" >
                                                        <path d="M18.5,14.5c.828,0,1.5,.672,1.5,1.5s-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5Zm4.5-4.5c-.553,0-1,.448-1,1v10c0,.552-.448,1-1,1H5c-1.654,0-3-1.346-3-3V9s0-.004,0-.005c.854,.64,1.903,1.005,2.999,1.005H13c.553,0,1-.448,1-1s-.447-1-1-1H5c-.856,0-1.653-.381-2.217-1.004,.549-.607,1.335-.996,2.217-.996h7c.553,0,1-.448,1-1s-.447-1-1-1H5C2.224,3.994,.02,6.304,0,9v10c0,2.757,2.243,5,5,5H21c1.654,0,3-1.346,3-3V11c0-.552-.447-1-1-1Zm-5.503-.615c.815,.815,2.148,.822,2.964,.009l2.236-2.177c.396-.385,.404-1.018,.02-1.414-.387-.396-1.02-.405-1.414-.019l-1.303,1.268V1c0-.552-.447-1-1-1s-1,.448-1,1V7.07l-1.297-1.281c-.394-.388-1.025-.385-1.415,.009-.388,.393-.384,1.026,.009,1.414l2.2,2.173Z" fill="currentColor" />
                                                    </svg>
                                                </span>
                                            </span>
                                        } 
                                    </button> 
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
