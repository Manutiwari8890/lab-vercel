"use client"

import { AnimatePresence, motion } from "framer-motion";
import ZoomImage from "@/components/ZoomImage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Quantity from "@/components/Quantity";
import { useState, useRef, useEffect, useContext } from "react";
import { Star } from "lucide-react";
import { LoadingContext } from "@/context/LoadingContext";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import { WishListContext } from "@/context/WishListContext";
import { OverlayContext } from "@/context/OverlayContext";
import Turnstile from "react-turnstile";
import { useToast } from "@/context/ToastContext";
import Image from "next/image";

export default function ProductClient({ initialData }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { startLoading, stopLoading } = useContext(LoadingContext)
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const { cartItems, addToCart, recentlyViewed } = useContext(CartContext)
    const { showToast } = useToast();
    const { toggleWishlist, getWishList, wishlistLoadingIds, fetchWishList, wishList } = useContext(WishListContext);
    const { overlay, toggleOverlay } = useContext(OverlayContext);
    const [captchaKey, setCaptchaKey] = useState(Date.now());
    const turnstileRef = useRef(null);
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Description');
    let { slug } = useParams()
    const [data, setData] = useState(initialData);
    const [reviews, setReviews] = useState([]);
    const [lowest, setLowest] = useState([0, 0]);
    const [encodedUrl, setEncodedUrl] = useState("");
    const [encodedTitle, setEncodedTitle] = useState("");
    const [encodedImage, setEncodedImage] = useState("");
    const [bfname, setBfname] = useState("");
    const [blname, setBlname] = useState("");
    const [bemail, setBemail] = useState("");
    const [bnumber, setBnumber] = useState("");
    const [bcompany, setBcompany] = useState("");
    const [blocation, setBlocation] = useState("");
    const [bmessage, setBmessage] = useState("");
    const [equantity, setEquantity] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [bulkErrors, setBulkErrors] = useState(null);
    const [bulkLoading, setBulkLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(null);
    const [rmessage, setRmessage] = useState(false);

    function normalizeSlug(slug) {
        let encoded = encodeURIComponent(slug);
        encoded = encoded.replace(/%2D/g, "-");
        return encoded.toLowerCase();
    }

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const checkWishlist = (id) => {
        return wishList.some(item => item.id === id);
    }

    const handleQuantityChange = (Id, value) => {
        setQuantity((prev) => ({
            ...prev,
            [Id]: value >= 1 ? value : 0,
        }));
    };

    const handleAddToCart = async (id, qty, variation_id = null) => {
        const currentKey = id || variation_id; // store locally
        setLoadingButton(currentKey);
        const product = { ...data, quantity: qty, variation_id };
        const res = await addToCart(product);

        if (res) {
            toggleOverlay("cart Sidebar")
            setLoadingButton(null);
        }
    };


    useEffect(() => {
        const getDetails = async () => {
            startLoading()
            try {
                const res = await fetch(`${baseUrl}products/${normalizeSlug(slug)}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) {
                    throw new Error("Review Fetch Failed");
                }
                const result = await res.json();
                if (result.status) {
                    setData(result.data)
                    recentlyViewed(result.data)
                    if (result.data.variations) {
                        const minSell = result?.data?.variations
                            .map(v => Number(v["sell_price"])).filter(price => price > 0)
                            .reduce((pre, next) => Math.min(pre, next), Infinity);

                        const minDiscount = result?.data?.variations
                            .map(v => Number(v["discounted_price"])).filter(price => price > 0)
                            .reduce((pre, next) => Math.min(pre, next), Infinity);

                        setLowest([minSell, minDiscount])
                        setEncodedTitle(result.data.name)
                        setEncodedUrl(`https://labdisposable.vercel.app/product/${result.data.name}`)
                        setEncodedImage(result.data.image_url);
                    }
                } else {
                    router.push('/404')
                }
            } catch (err) {
                console.error(err)
            } finally {
                stopLoading(false)
            }
        }
        getDetails();
    }, [slug]);


    useEffect(() => {
        if (navRef.current) {
            const activeBtn = navRef.current.querySelector(
                `button[data-tab="${activeTab}"]`
            );
            if (activeBtn) {
                setLineStyle({
                    left: activeBtn.offsetLeft,
                    width: activeBtn.offsetWidth,
                });
            }
        }
    }, [activeTab]);


    const handleHover = (e) => {
        const button = e.target;
        const nav = navRef.current;
        if (button && nav) {
            const { offsetLeft, offsetWidth } = button;
            setLineStyle({
                left: offsetLeft,
                width: offsetWidth,
            });
        }
    };

    const handleLeave = () => {
        if (navRef.current) {
            const activeBtn = navRef.current.querySelector(
                `button[data-tab="${activeTab}"]`
            );
            if (activeBtn) {
                setLineStyle({
                    left: activeBtn.offsetLeft,
                    width: activeBtn.offsetWidth,
                });
            }
        }
    };

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [ratingMes, setRatingMes] = useState("");
    const [rerror, setRerror] = useState(null);
    const [revLoad, setRevLoad] = useState(false)

    useEffect(() => {
        const getReview = async () => {
            try {
                const res = await fetch(`${baseUrl}products/${data?.id}/reviews?per_page=5`);
                if (!res.ok) {
                    throw new Error("Review Fetch Failed");
                }
                const result = await res.json();
                if (result.status) {
                    setReviews(result.data)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (data?.id) {
            getReview();
        }

    }, [rmessage, data]);

    const handleBulk = (e) => {
        e.preventDefault();
        let regobj = {
            product_id: data.id,
            first_name: bfname,
            last_name: blname,
            contact_no: bnumber,
            email: bemail,
            company: bcompany,
            location: blocation,
            message: bmessage,
            quantity : Number(equantity),
            "cf-turnstile-response" : captchaValue
        };

        let errors = validate(regobj)
        setBulkErrors(errors);
        if(Object.keys(errors).length === 0){
            setBulkLoading(true);
            fetch(`${baseUrl}bulk-inquiry`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((response) => {
                return response.json().then((data) => ({
                    status: response.status,
                    body: data,
                }))
            }).then(({ status, body }) => {
                let msg = "";
                if (typeof body.message === "string") {
                    msg = body.message;
                }
                else if (typeof body.message === "object" && body.message !== null) {
                    const firstErrorKey = Object.keys(body.message)[0];
                    if (firstErrorKey) {
                        msg = body.message[firstErrorKey][0];
                    }
                }
                setCaptchaKey(Date.now());
                showToast(msg, body.status ? "success" : "warning")

                setBfname("");
                setBlname("");
                setBemail("");
                setBnumber("");
                setBcompany("");
                setBlocation("");
                setBmessage("");
                setEquantity("");
                setBulkLoading(false);
            }).catch((err) => {
                showToast(err?.message, "error")
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ratingMes) {
            setRerror({
                type: false,
                value: "Message Required !"
            })
            return;
        }
        setRerror(null)
        setRevLoad(true);
        const ratData = {
            product_id: data?.id,
            rating: rating,
            description: ratingMes
        }
        try {
            const response = await fetch(`${baseUrl}reviews`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                body: JSON.stringify(ratData)
            });
            if (!response.ok) {
                throw new Error("Rating Fetched Failed");
            }
            const result = await response.json();
            showToast(result.message, result.status ? "success" : "warning")
            setRmessage(pre => !pre)
        } catch (err) {
            console.error(err)
        } finally {
            setRevLoad(false);
        }
    };


    const validate = (val) => {
        const errors = {};
        if(!val.first_name){
            errors.fname = "First Name is required !"
        }
        if(!val.last_name){
            errors.lname = "Last Name is required !"
        }
        if(!val.contact_no){
            errors.contact_no = "Contact Number is required !"
        }
        if(!val.email){
            errors.email = "Email is required !"
        }
        if(!val.company){
            errors.company = "Company is required !"
        }
        if(!val.location){
            errors.location = "Location is required !"
        }
        if(!val.message){
            errors.message = "Message is required !"
        }
        if(!val.quantity){
            errors.quantity = "Quantity is required !"
        }
        if(!val["cf-turnstile-response"]){
            errors.captcha = "Please select the captcha"
        }
        return errors
    }

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: data?.name,
        image: [
            data?.image_url
        ],
        description: data?.short_description || data?.name,
        brand: {
            "@type": "Brand",
            name: data?.brands?.[0]?.name
        },
        offers: {
            "@type": "Offer",
            price: data?.discounted_price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
        }
    };



    return (
        <>
            <section className="py-5 md:py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    {overlay == "Inquiry Now" &&
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] max-w-[800px] bg-white max-h-screen p-4 w-full h-auto overflow-auto">
                            <form onSubmit={(e) => handleBulk(e)}>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-2">
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.fname ? "border-red-500" : "border-[#afafaf]"}`} id="fname" placeholder="Your First Name" value={bfname} onChange={(e) => setBfname(e.target.value)} />
                                        {bulkErrors?.fname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.fname}</p>}
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.lname ? "border-red-500" : "border-[#afafaf]"}`} id="lname" placeholder="Your Last Name" value={blname} onChange={(e) => setBlname(e.target.value)} />
                                        {bulkErrors?.lname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.lname}</p>}
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                        <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.email ? "border-red-500" : "border-[#afafaf]"}`} id="email" placeholder="Your Email" value={bemail} onChange={(e) => setBemail(e.target.value)} />
                                        {bulkErrors?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.email}</p>}
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                        <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.contact_no ? "border-red-500" : "border-[#afafaf]"}`} id="tel" placeholder="Your Contact Number" value={bnumber} onChange={(e) => setBnumber(e.target.value)} />
                                        {bulkErrors?.contact_no && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.contact_no}</p>}
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="company" className="text-left text-sm font-semibold inline-block w-full mb-2">Company</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.company ? "border-red-500" : "border-[#afafaf]"}`} id="company" placeholder="Your Company Name" value={bcompany} onChange={(e) => setBcompany(e.target.value)} />
                                        {bulkErrors?.company && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.company}</p>}
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="location" className="text-left text-sm font-semibold inline-block w-full mb-2">Location</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.location ? "border-red-500" : "border-[#afafaf]"}`} id="location" placeholder="Location" value={blocation} onChange={(e) => setBlocation(e.target.value)} />
                                        {bulkErrors?.location && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.location}</p>}
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="quantity" className="text-left text-sm font-semibold inline-block w-full mb-2">Quantity</label>
                                        <input type="number" className={`w-full border py-4 px-4 text-sm font-semibold appearance-none focus:border-primary ${bulkErrors?.message ? "border-red-500" : "border-[#afafaf]"}`} id="quantity" placeholder="Quantity" value={equantity} onChange={(e) => setEquantity(e.target.value)} />
                                        {bulkErrors?.quantity && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.quantity}</p>}
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="message" className="text-left text-sm font-semibold inline-block w-full mb-2">Message</label>
                                        <textarea maxLength="200" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.message ? "border-red-500" : "border-[#afafaf]"}`} id="message" placeholder="Your Message" onChange={(e) => setBmessage(e.target.value)} defaultValue={bmessage}></textarea>
                                        {bulkErrors?.message && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <Turnstile
                                            key={captchaKey}
                                            ref={turnstileRef}
                                            sitekey="0x4AAAAAACEPK8k1LXHKe5b8"
                                            onVerify={handleCaptchaChange}
                                            onExpire={() => setCaptchaValue(null)}
                                            className="text-left"
                                        />
                                        {bulkErrors?.captcha && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.captcha}</p>}
                                    </div>
                                </div>
                                <button className={`w-full text-sm font-bold text-center uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${bulkLoading ? "bg-primary/70" : "bg-primary"} mt-2 cursor-pointer md:w-max`} disabled={bulkLoading}>
                                    {bulkLoading ?
                                        <div role="status" className="flex gap-2 items-center justify-center">
                                            <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                            Please Wait...
                                        </div> :
                                        <span className="relative z-1 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" className="w-5 h-5"><path d="M1.77,6.215A2.433,2.433,0,0,0,0,8.611a2.474,2.474,0,0,0,.771,1.71L4,13.548V20h6.448l3.265,3.267a2.4,2.4,0,0,0,1.706.713,2.438,2.438,0,0,0,.618-.08,2.4,2.4,0,0,0,1.726-1.689L24-.016ZM3.533,8.856l13.209-3.7L7,14.9V12.326Zm11.6,11.6L11.675,17H9.1l9.734-9.741Z" fill="currentColor"></path></svg>
                                            Submit
                                        </span>
                                    }
                                </button>
                            </form>
                        </div>
                    }
                    
                    <div className="grid grid-cols-10 gap-5 mb-10 lg:gap-10 xl:mb-15">
                        <div className="col-span-10 md:col-span-4 lg:col-span-3">
                            <div className="w-full border border-gray-300 p-2 overflow-hidden">
                                <ZoomImage src={data?.image_url ? data?.image_url : "/assets/images/placeholder.jpg"} alt={data?.name || "Product Image"}/>
                            </div>
                        </div>
                        <div className="col-span-10 md:col-span-6 lg:col-span-7">
                            <p className="text-lg font-semibold text-primary lg:text-xl">{data?.sku}</p>
                            <div className="flex justify-between items-start flex-col md:flex-row">
                                <div className="text-left mt-1 w-full lg:w-4/5">
                                    <h1 className="text-[22px] font-semibold mb-4 md:text-[28px] lg:text-[36px]">{data?.name}</h1>
                                    {(data?.variations.length > 1) ?
                                        <>
                                            {isLoggedIn ?
                                                <>
                                                    <h6 className="text-lg font-bold lg:text-2xl"><del className="text-black">${lowest[0]} - ${data?.variations[data?.variations.length - 1].price}</del></h6>
                                                    <h6 className="text-lg font-bold text-green-600 lg:text-2xl">${lowest[1]} - ${data?.variations[data?.variations.length - 1].discounted_price}</h6>
                                                </> :
                                                <>
                                                    <h6 className="text-lg font-bold text-green-600 lg:text-2xl">${lowest[0]} - ${data?.variations[data?.variations.length - 1].price}</h6>
                                                </>
                                            }
                                        </> :
                                        <>
                                            {(Number(data?.price) > 0) ?
                                                (
                                                    (isLoggedIn && (data?.price != data?.discounted_price)) ?
                                                        <>
                                                            <h6 className="text-lg font-bold text-green-600 lg:text-2xl"><del className="text-black">${data?.price}</del> ${data?.discounted_price}</h6>
                                                        </> :
                                                        <h6 className="text-lg font-bold text-green-600 lg:text-2xl">${data?.price}</h6>
                                                ) :
                                                ''
                                            } 
                                        </>
                                    }
                                </div>
                                {data?.brands?.[0] &&
                                    <Link href={`/brand/${data?.brands?.[0]?.slug}`} className="img-area inline-block w-[100px] p-3 border border-gray-300 group hover:border-primary mt-3 lg:mt-0 lg:w-[150px]">
                                        <Image src={data?.brands?.[0]?.image_url} alt={data?.brands?.[0]?.name} width={100} height={60} className="w-full h-auto group-hover:scale-110" />
                                    </Link>
                                }
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: data?.short_description }} className="mt-4 product-desc short-desc"></div>
                            <div className="border-b border-gray-300 pb-5 mb-5">
                                <div className="mt-5 lg:mt-10">
                                    <Quantity quantity={quantity[data?.id] || 1} setQuantity={(val) => handleQuantityChange(data?.id, val)} label={true} />
                                    <div className="flex gap-6 mt-6 items-center">
                                        {data?.price > 0 ?
                                            <>
                                                <button className={`w-max text-base font-bold text-white btn btn-primary py-3 px-4 mt-2 w-full cursor-pointer ${loadingButton === data?.id ? "bg-primary/70 disabled" : "bg-primary"}`} onClick={() => handleAddToCart(data?.id, quantity[data?.id] || 0)}>
                                                    {loadingButton === data?.id ?
                                                        <div role="status" className="flex gap-2 items-center justify-center">
                                                            <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/></svg>
                                                            Please Wait...
                                                        </div>
                                                        :
                                                        <span className="relative z-1 flex items-center justify-between gap-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5"><path d="M23,19H21V17a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V21h2a1,1,0,0,0,0-2Z" fill="currentColor" /><path d="M21,6H18A6,6,0,0,0,6,6H3A3,3,0,0,0,0,9V19a5.006,5.006,0,0,0,5,5h9a1,1,0,0,0,0-2H5a3,3,0,0,1-3-3V9A1,1,0,0,1,3,8H6v2a1,1,0,0,0,2,0V8h8v2a1,1,0,0,0,2,0V8h3a1,1,0,0,1,1,1v5a1,1,0,0,0,2,0V9A3,3,0,0,0,21,6ZM8,6a4,4,0,0,1,8,0Z" fill="currentColor" /></svg>
                                                            Add To Cart
                                                        </span>
                                                    }
                                                </button>
                                                <button className={`text-base rounded-full font-bold btn btn-secondary btn-scale-0 mt-2 w-[45px] h-[45px] cursor-pointer ${wishlistLoadingIds.includes(data?.id) ? "bg-secondary/70 disabled" : "bg-secondary" } text-white`} onClick={() => toggleWishlist(data?.id)} disabled={wishlistLoadingIds.includes(data?.id)} aria-label="Toggle Wishlist">
                                                    {wishlistLoadingIds.includes(data?.id) ? (
                                                        <div role="status" className="flex gap-2 items-center justify-center">
                                                            <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                                        </div>
                                                    ) : (
                                                        checkWishlist(data?.id) ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto relative z-1"><path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z" fill="currentColor"></path></svg> :
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto relative z-1" ><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z" fill="currentColor"></path></svg>
                                                    )}
                                                </button>
                                            </> :
                                            <button className="w-max text-base font-bold text-white bg-primary btn btn-primary py-3 px-4 mt-2 w-full cursor-pointer" onClick={() => {
                                                document.documentElement.style.overflow = "hidden";
                                                toggleOverlay("Inquiry Now")
                                            }} aria-label="Inquiry"><span className="relative z-1">Inquiry Now</span></button>

                                        }
                                        
                                    </div>
                                </div>

                                {/* <table className="mt-10 w-full text-xl xl:text-2xl">
                                    <thead>
                                        <tr className="border-b border-gray-300">
                                            <th className="font-semibold py-4 text-left">Catalogue</th>
                                            <th className="font-semibold py-4 text-left">Size</th>
                                            <th className="font-semibold py-4 text-left">Price</th>
                                            <th className="font-semibold py-4 text-left">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-300">
                                            <td className="py-4 text-xl font-semibold">
                                                LC9903-1L	
                                            </td>
                                            <td className="py-4 text-xl font-semibold">
                                                1L
                                            </td>
                                            <td className="py-4 text-xl font-semibold">
                                                <h6 className="text-lg font-bold text-green-600 xl:text-2xl"><del className="text-dark">$154.37</del> $369.97</h6>
                                            </td>
                                            <td className="py-4">
                                                <Quantity quantity={quantity} setQuantity={setQuantity} />
                                            </td>
                                            <td className="text-right py-4">
                                                <button className="w-max text-base font-bold text-white btn btn-primary py-3 px-4 bg-primary w-full cursor-pointer"><span className="relative z-1"><i className="bi bi-bag-plus text-xl mr-2"></i>Add To Cart</span></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 text-xl font-semibold">
                                                LC9903-1L	
                                            </td>
                                            <td className="py-4 text-xl font-semibold">
                                                1L
                                            </td>
                                            <td className="py-4 text-xl font-semibold">
                                                <h6 className="text-lg font-bold text-green-600 xl:text-2xl"><del className="text-dark">$154.37</del> $369.97</h6>
                                            </td>
                                            <td className="py-4">
                                                <Quantity quantity={quantity} setQuantity={setQuantity} />
                                            </td>
                                            <td className="text-right py-4">
                                                <button className="w-max text-base font-bold text-white btn btn-primary py-3 px-4 bg-primary w-full cursor-pointer"><span className="relative z-1"><i className="bi bi-bag-plus text-xl mr-2"></i>Add To Cart</span></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> */}
                            </div>
                            <div className="text-dark py-5">
                                <ul className="flex items-center gap-3 mb-6">
                                    <li className="font-medium text-xl">Share : </li>
                                    <li>
                                        <Link className="inline-block text-primary w-[40px] h-[40px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto"><path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" fill="currentColor"></path></svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="inline-block text-primary w-[40px] h-[40px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" >
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" fill="currentColor"></path></svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="inline-block text-primary w-[40px] h-[40px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110" href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`} target="_blank" rel="noopener noreferrer" >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto"><path d="M568 320C568 457 457 568 320 568C294.4 568 269.8 564.1 246.6 556.9C256.7 540.4 271.8 513.4 277.4 491.9C280.4 480.3 292.8 432.9 292.8 432.9C300.9 448.3 324.5 461.4 349.6 461.4C424.4 461.4 478.3 392.6 478.3 307.1C478.3 225.2 411.4 163.9 325.4 163.9C218.4 163.9 161.5 235.7 161.5 314C161.5 350.4 180.9 395.7 211.8 410.1C216.5 412.3 219 411.3 220.1 406.8C220.9 403.4 225.1 386.5 227 378.7C227.6 376.2 227.3 374 225.3 371.6C215.2 359.1 207 336.3 207 315C207 260.3 248.4 207.4 319 207.4C379.9 207.4 422.6 248.9 422.6 308.3C422.6 375.4 388.7 421.9 344.6 421.9C320.3 421.9 302 401.8 307.9 377.1C314.9 347.6 328.4 315.8 328.4 294.5C328.4 275.5 318.2 259.6 297 259.6C272.1 259.6 252.1 285.3 252.1 319.8C252.1 341.8 259.5 356.6 259.5 356.6C259.5 356.6 235 460.4 230.5 479.8C225.5 501.2 227.5 531.4 229.6 551C137.4 514.9 72 425.1 72 320C72 183 183 72 320 72C457 72 568 183 568 320z" fill="currentColor"></path></svg>                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="inline-block text-primary w-[40px] h-[40px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110" href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto"><path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" fill="currentColor"></path></svg>                                       
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="flex items-center gap-1 flex-wrap lg:gap-3">
                                    <li className="text-lg font-semibold lg:text-xl">Category : </li>
                                    {data?.categories.map((cat, index) => (
                                        <li className="text-base font-medium text-gray-500 hover:text-primary lg:text-lg" key={cat?.id}>
                                            <Link href={`/product-category/${cat?.slug}`} key={cat.id}>{cat.name}{(data.categories.length > index + 1) ? ' , ' : ''}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <nav
                            ref={navRef}
                            className="tabs flex gap-2 content-center justify-between border-b border-gray-300 relative mb-6 md:gap-5 lg:gap-10 md:justify-start"
                            onMouseLeave={handleLeave}
                        >
                            {["Description", "Additional Info", "Reviews", "Bulk Inquiry"].map(
                                (tab, index) => (
                                    <button
                                        key={index}
                                        data-tab={tab}
                                        onMouseEnter={handleHover}
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative text-sm uppercase font-semibold text-${(tab === activeTab) ? "primary" : "dark"} cursor-pointer pb-4 hover:text-blue md:text-lg lg:text-xl`}
                                    >
                                        {tab}
                                    </button>
                                )
                            )}
                            <div
                                className="absolute bottom-[-2px] h-[2px] bg-primary transition-all "
                                style={{
                                    left: `${lineStyle.left}px`,
                                    width: `${lineStyle.width}px`,
                                }}
                            />
                        </nav>
                        <AnimatePresence mode="wait">
                            {activeTab === "Description" && (
                                <motion.div
                                    key="Description"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="server-data p-2"
                                >
                                    <div dangerouslySetInnerHTML={{ __html: data?.description }} className="mt-4"></div>
                                </motion.div>
                            )}
                            {activeTab === "Additional Info" && (
                                <motion.div
                                    key="Additional Info"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-2"
                                >
                                    <table className="w-1/2">
                                        <tbody className="text-lg font-semibold ">
                                            {data?.additional_info &&
                                            Object.entries(JSON.parse(data?.additional_info))?.map((info) => (
                                                (info[0]!=="product_id" && info[1] &&
                                                    <tr key={info[0]}>
                                                        <th className="text-left py-2">{info[0]}</th> 
                                                        <td className="py-2 text-primary">{info[1]}</td>
                                                    </tr>
                                                ) 
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                            {activeTab === "Reviews" && (
                                <motion.div
                                    key="Reviews"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-2"
                                >
                                    <div className="w-full">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-3 lg:mb-5">Reviews ({reviews?.length})</h2>
                                        <div className="grid grid-cols-5 gap-5 border-b-1 pb-2 mb-2 border-gray-300 md:pb-5 md:mb-5 lg:mb-10 xl:gap-15">
                                            <div className="col-span-5 md:col-span-2">
                                                {isLoggedIn ?
                                                    <>
                                                        <div className="flex mb-3 lg:mb-5">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <motion.button
                                                                    key={star}
                                                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onMouseEnter={() => setHover(star)}
                                                                    onMouseLeave={() => setHover(0)}
                                                                    onClick={() => setRating(star)}
                                                                    className="mx-1 focus:outline-none"
                                                                >
                                                                    <Star
                                                                        size={28}
                                                                        className={`${star <= (hover || rating)
                                                                            ? "text-primary fill-primary"
                                                                            : "text-gray-300"
                                                                            } transition-colors duration-200 cursor-pointer`}
                                                                    />
                                                                </motion.button>
                                                            ))}
                                                        </div>
                                                        <textarea
                                                            maxLength="200"
                                                            placeholder="Write your review..."
                                                            value={ratingMes}
                                                            onChange={(e) => setRatingMes(e.target.value)}
                                                            className={`w-full border text-lg font-semibold p-3 text-gray-800 mb-4 resize-none focus:border-primary ${rerror ? "border-red-500 " : "border-gray-200 "}`}
                                                            rows="4"
                                                        />
                                                        <motion.button
                                                            whileTap={{ scale: 0.95 }}
                                                            className={`text-white px-6 py-3 text-base font-semibold btn btn-secondary cursor-pointer ${revLoad ? "bg-secondary/70" : "bg-secondary"}`}
                                                            onClick={handleSubmit}
                                                            disabled={revLoad}
                                                        >
                                                            {revLoad ? 
                                                                <div role="status" className="flex gap-2 items-center justify-center">
                                                                    <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/></svg>
                                                                    Please Wait...
                                                                </div> :
                                                                <span className="relative z-1 flex items-center gap-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" className="w-5 h-5"><path d="M1.77,6.215A2.433,2.433,0,0,0,0,8.611a2.474,2.474,0,0,0,.771,1.71L4,13.548V20h6.448l3.265,3.267a2.4,2.4,0,0,0,1.706.713,2.438,2.438,0,0,0,.618-.08,2.4,2.4,0,0,0,1.726-1.689L24-.016ZM3.533,8.856l13.209-3.7L7,14.9V12.326Zm11.6,11.6L11.675,17H9.1l9.734-9.741Z" fill="currentColor"></path></svg>
                                                                    Submit Review
                                                                </span>
                                                            } 
                                                        </motion.button>
                                                    </> : 
                                                    <p className="text-base font-semibold">Please <Link href="/login" className="text-primary hover:text-secondary">Login</Link></p>
                                                }
                                            </div>
                                            <div className="flex flex-col gap-5 h-max col-span-5 md:flex-row md:col-span-3">
                                                <div className="border-r border-gray-300 pr-5 text-left md:text-center xl:pr-10">
                                                    <h5 className="text-6xl font-semibold xl:text-7xl">4.0</h5>
                                                    <div className="mt-3 mb-2 flex gap-1">
                                                        <Star
                                                            size={18}
                                                            className="text-primary fill-primary transition-colors duration-200"
                                                        />
                                                        <Star
                                                            size={18}
                                                            className="text-primary fill-primary transition-colors duration-200"
                                                        />
                                                        <Star
                                                            size={18}
                                                            className="text-primary fill-primary transition-colors duration-200"
                                                        />
                                                        <Star
                                                            size={18}
                                                            className="text-primary fill-primary transition-colors duration-200"
                                                        />
                                                        <Star
                                                            size={18}
                                                            className="text-gray-300  transition-colors duration-200"
                                                        />
                                                    </div>
                                                    <p className="text-lg text-gray-500 font-semibold">{reviews?.length} Ratings</p>
                                                </div>
                                                <div className="w-full xl:pl-5">
                                                    <div className="flex gap-5 items-center mb-1">
                                                        <div className="relative bg-gray-200 rounded-full w-full h-3 flex-1">
                                                            <motion.div
                                                                className="absolute top-0 left-0 h-3 bg-primary rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `30%` }}
                                                                transition={{
                                                                    duration: 1.2,
                                                                    ease: "easeInOut",
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="text-lg text-gray-600 content-center font-semibold md:w-[45%]"><b className="text-dark font-bold text-xl mr-3">5.0</b> 2 reviews</p>
                                                    </div>
                                                    <div className="flex gap-5 items-center mb-1">
                                                        <div className="relative bg-gray-200 rounded-full w-full h-3 flex-1">
                                                            <motion.div
                                                                className="absolute top-0 left-0 h-3 bg-primary rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `60%` }}
                                                                transition={{
                                                                    duration: 1.2,
                                                                    ease: "easeInOut",
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="text-lg text-gray-600 content-center font-semibold md:w-[45%]"><b className="text-dark font-bold text-xl mr-3">4.0</b> 1 reviews</p>
                                                    </div>
                                                    <div className="flex gap-5 items-center mb-1">
                                                        <div className="relative bg-gray-200 rounded-full w-full h-3 flex-1">
                                                            <motion.div
                                                                className="absolute top-0 left-0 h-3 bg-primary rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `80%` }}
                                                                transition={{
                                                                    duration: 1.2,
                                                                    ease: "easeInOut",
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="text-lg text-gray-600 content-center font-semibold md:w-[45%]"><b className="text-dark font-bold text-xl mr-3">4.0</b> 1 reviews</p>
                                                    </div>
                                                    <div className="flex gap-5 items-center mb-1">
                                                        <div className="relative bg-gray-200 rounded-full w-full h-3 flex-1">
                                                            <motion.div
                                                                className="absolute top-0 left-0 h-3 bg-primary rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `50%` }}
                                                                transition={{
                                                                    duration: 1.2,
                                                                    ease: "easeInOut",
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="text-lg text-gray-600 content-center font-semibold md:w-[45%]"><b className="text-dark font-bold text-xl mr-3">3.0</b> 1 reviews</p>
                                                    </div>
                                                    <div className="flex gap-5 items-center mb-1">
                                                        <div className="relative bg-gray-200 rounded-full w-full h-3 flex-1">
                                                            <motion.div
                                                                className="absolute top-0 left-0 h-3 bg-primary rounded-full"
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `20%` }}
                                                                transition={{
                                                                    duration: 1.2,
                                                                    ease: "easeInOut",
                                                                }}
                                                            />
                                                        </div>
                                                        <p className="text-lg text-gray-600 content-center font-semibold md:w-[45%]"><b className="text-dark font-bold text-xl mr-3">1.0</b> {reviews?.length} reviews</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/2 mt-5 xl:mt-10 xl:w-1/3">
                                            {reviews?.length > 0 && (
                                                    reviews?.map((rev) => (
                                                        <div className="py-5 border-b border-gray-300 mb-2" key={rev?.id}>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <Image src="/assets/images/user.webp" alt="user" width={50} height={50} className="w-[50px] h-[50px] rounded-full" />
                                                                    <h5 className="text-xl font-semibold text-dark">{rev?.user?.name}</h5>
                                                                    <p className="text-base text-gray-500 font-semibold">( {new Date(rev?.updated_at).toLocaleDateString('en-IN',{
                                                                            "weekday" : "short",
                                                                            "day" : "2-digit",
                                                                            "month" : "long",
                                                                            "year" : "numeric"
                                                                        })} )
                                                                    </p>
                                                                </div>
                                                                <div className="flex gap-1 text-secondary">
                                                                    <Star
                                                                        size={14}
                                                                        className="text-primary fill-primary transition-colors duration-200"
                                                                    />
                                                                    <Star
                                                                        size={14}
                                                                        className="text-primary fill-primary transition-colors duration-200"
                                                                    />
                                                                    <Star
                                                                        size={14}
                                                                        className="text-primary fill-primary transition-colors duration-200"
                                                                    />
                                                                    <Star
                                                                        size={14}
                                                                        className="text-primary fill-primary transition-colors duration-200"
                                                                    />
                                                                    <Star
                                                                        size={14}
                                                                        className="text-gray-300  transition-colors duration-200"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <p className="text-xl font-semibold text-gray-500 pl-15">test</p>
                                                        </div>
                                                    ))
                                                )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {activeTab === "Bulk Inquiry" && (
                                <motion.div
                                    key="Bulk Inquiry"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="p-2"
                                >
                                    <div className="md:w-3/4">
                                        <form onSubmit={(e) => handleBulk(e)}>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 xl:gap-y-4">
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.fname ? "border-red-500" : "border-[#afafaf]"}`} id="fname" placeholder="Your First Name" value={bfname} onChange={(e) => setBfname(e.target.value)} />
                                                    {bulkErrors?.fname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.fname}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.lname ? "border-red-500" : "border-[#afafaf]"}`} id="lname" placeholder="Your Last Name" value={blname} onChange={(e) => setBlname(e.target.value)}  />
                                                    {bulkErrors?.lname && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.lname}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                                    <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.email ? "border-red-500" : "border-[#afafaf]"}`} id="email" placeholder="Your Email" value={bemail} onChange={(e) => setBemail(e.target.value)}  />
                                                    {bulkErrors?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.email}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                                    <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.contact_no ? "border-red-500" : "border-[#afafaf]"}`} id="tel" placeholder="Your Contact Number" value={bnumber} onChange={(e) => setBnumber(e.target.value)}  />
                                                    {bulkErrors?.contact_no && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.contact_no}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="company" className="text-left text-sm font-semibold inline-block w-full mb-2">Company</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.company ? "border-red-500" : "border-[#afafaf]"}`} id="company" placeholder="Your Company Name" value={bcompany} onChange={(e) => setBcompany(e.target.value)}  />
                                                    {bulkErrors?.company && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.company}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="location" className="text-left text-sm font-semibold inline-block w-full mb-2">Location</label>
                                                    <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.location ? "border-red-500" : "border-[#afafaf]"}`} id="location" placeholder="Location" value={blocation} onChange={(e) => setBlocation(e.target.value)}  />
                                                    {bulkErrors?.location && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.location}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="quantity" className="text-left text-sm font-semibold inline-block w-full mb-2">Quantity</label>
                                                    <input type="number" className={`w-full border py-4 px-4 text-sm font-semibold appearance-none focus:border-primary ${bulkErrors?.message ? "border-red-500" : "border-[#afafaf]"}`} id="quantity" placeholder="Quantity" value={equantity} onChange={(e) => setEquantity(e.target.value)}  />
                                                    {bulkErrors?.quantity && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.quantity}</p>}
                                                </div>
                                                <div className="form-group mb-3 relative">
                                                    <label htmlFor="message" className="text-left text-sm font-semibold inline-block w-full mb-2">Message</label>
                                                    <textarea maxLength="200" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${bulkErrors?.message ? "border-red-500" : "border-[#afafaf]"}`} id="message" placeholder="Your Message" onChange={(e) => setBmessage(e.target.value)} defaultValue={bmessage}></textarea>
                                                    {bulkErrors?.message && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.message}</p>}
                                                </div>
                                                <div className="form-group">
                                                    <Turnstile
                                                        key={captchaKey}
                                                        ref={turnstileRef}
                                                        sitekey="0x4AAAAAACEPK8k1LXHKe5b8"
                                                        onVerify={handleCaptchaChange}
                                                        onExpire={() => setCaptchaValue(null)}
                                                        className="text-left"    
                                                    />
                                                    {bulkErrors?.captcha && <p className="text-sm font-semibold text-red-500 text-left mt-1">{bulkErrors?.captcha}</p>}
                                                </div>
                                            </div>
                                            <button className={`w-full text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${bulkLoading ? "bg-primary/70" : "bg-primary"} mt-2 cursor-pointer md:w-max`} disabled={bulkLoading}> 
                                                {bulkLoading ? 
                                                    <div role="status" className="flex gap-2 items-center justify-center">
                                                        <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/></svg>
                                                        Please Wait...
                                                    </div> :
                                                    <span className="relative z-1 flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" className="w-5 h-5"><path d="M1.77,6.215A2.433,2.433,0,0,0,0,8.611a2.474,2.474,0,0,0,.771,1.71L4,13.548V20h6.448l3.265,3.267a2.4,2.4,0,0,0,1.706.713,2.438,2.438,0,0,0,.618-.08,2.4,2.4,0,0,0,1.726-1.689L24-.016ZM3.533,8.856l13.209-3.7L7,14.9V12.326Zm11.6,11.6L11.675,17H9.1l9.734-9.741Z" fill="currentColor"></path></svg>
                                                        Submit
                                                    </span>
                                                } 
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold uppercase text-dark page-title mb-5 lg:mb-10 lg:text-2xl xl:mb-15">Related Products</h2>
                        <AnimatePresence mode="wait">
                            <div className="grid grid-cols-2 gap-10 lg:grid-cols-3 xl:grid-cols-4">
                                {data?.relatedProducts?.length > 0 &&
                                    data?.relatedProducts?.map((product) => (
                                        <motion.div
                                            key={product?.id}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            className="h-full"
                                        >
                                            <Link href={`/product/${product?.slug}`} className="bg-white shadow-sm py-5 px-5 flex flex-col justify-between w-full h-full group overflow-hidden relative">
                                                <div className="absolute w-0 h-0 border-primary top-0 left-0 group-hover:border-t-2 group-hover:border-l-2 group-hover:w-[50%] group-hover:h-[50%]"></div>
                                                <div className="absolute w-0 h-0 border-primary bottom-0 right-0 group-hover:border-b-2 group-hover:border-r-2 group-hover:w-[50%] group-hover:h-[50%]"></div>
                                                <div className="absolute bottom-[-4px] right-0 opacity-0 w-max text-center visibility-hidden z-10 origin-bottom-right scale-0 group-hover:opacity-100 group-hover:scale-100">
                                                    <p className="text-white bg-primary inline-block w-[50px] h-[50px] text-center content-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg>
                                                    </p>
                                                </div>
                                                <div className="img-area overflow-hidden p-2 mb-2">
                                                    <Image src={product?.image_url ? product?.image_url : "/assets/images/placeholder.jpg"} alt={product?.name} width={200} height={200} className="m-auto max-w-3/4 w-auto max-h-70 h-auto object-cover group-hover:scale-110" />
                                                </div>
                                                <div className="text-bottom">
                                                    <h3 className="text-base font-semibold mb-2 break-words">{product?.name}</h3>
                                                    <p className="bg-primary/15 text-center text-xs font-semibold py-1 px-3 rounded-full text-dark w-max my-2">{product?.sku}</p>
                                                    <p className="text-base font-bold text-green-600">
                                                        {Number(product?.discounted_price) === 0 ? <span className="text-[#00c97a]">Inquiry Now</span> : <> {isLoggedIn && <del className="text-sm mr-1 text-black">${product?.price}</del>} <span className="text-green-600">${product?.discounted_price} </span></> }
                                                    </p>
                                                </div>
                                                
                                            </Link>
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </>
    )
}

