"use client";
import Link from "next/link";
import Quantity from "@/components/Quantity";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import { LoadingContext } from "@/context/LoadingContext";
import { OverlayContext } from "@/context/OverlayContext";
import { useToast } from "@/context/ToastContext";
import CanvasCaptcha from "@/components/CanvasCaptcha";

export default function Page() {
    const { overlay, toggleOverlay } = useContext(OverlayContext);
    const { cartItems, cartDetail, removeFromCart, getCartTotal, getItemTotal, updateCartItemQuantity } = useContext(CartContext)
    const { user, logout, isLoggedIn, login } = useContext(AuthContext);
    const { showToast } = useToast();
    const [cartData, setCartData] = useState({});
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);
    const [loadingButton, setLoadingButton] = useState(null);
    const { startLoading, stopLoading } = useContext(LoadingContext)
    const [passTogle, setPassToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleRemove = async (id) => {
        setLoadingButton(id);
        let res = await removeFromCart(id)
        if (res) {
            setLoadingButton(null)
        }
    }

    const handleQuantity = async (id, qty) => {
        setLoadingButton(id);
        let res = await updateCartItemQuantity(id, qty)
        if (res) {
            setLoadingButton(null)
        }
    }

    useEffect(() => {
        startLoading();
        const fetchCartDetail = async () => {
            const data = await cartDetail()
            setCartData(data);
            stopLoading();
        }
        fetchCartDetail();
    }, [cartItems])


    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = {
            email,
            password,
            guest_token: localStorage.getItem("guest_key_token"),
        };
        const errors = validate(regobj);
        setFormErrors(errors);
        const raw = JSON.stringify(regobj);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw,
        };

        if (Object.keys(errors)?.length === 0) {
            setIsLoading(true);
            login(requestOptions, false).then((res) => {
                if (res) {
                    let msg = "";
                    if (typeof res.message === "string") {
                        msg = res.message;
                    }
                    else if (typeof res.message === "object" && res.message !== null) {
                        const firstErrorKey = Object.keys(res.message)[0];
                        if (firstErrorKey) {
                            msg = res.message[firstErrorKey][0];
                        }
                    }
                    setCaptchaInput("")
                    setReloadCaptcha(prev => prev+1)
                    showToast(msg, res.status ? "success" : "warning")
                    setIsLoading(false);
                    if (res.status) {
                        toggleOverlay(null);
                    }
                }
            });
        } else {
            setIsLoading(false);
        }
    }

    const validate = (val) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!val.email) {
            errors.email = "Email is required !"
        } else if (!regex.test(val.email)) {
            errors.email = "Email is not valid"
        }
        if (!val.password) {
            errors.password = "Password is required !"
        }
        if (captchaInput !== captcha) {
            setReloadCaptcha(prev => prev + 1)
            setCaptchaInput("")
            errors.captcha = "captcha is required"
        }
        return errors
    }


    return (
        <>
            <section className="py-10 bg-[#F4F8FB]">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">Shipping Cart</h2>
                    {overlay === "Login Overlay" &&
                        <div className="bg-white shadow-lg px-5 py-5 max-w-[700px] mx-auto fixed z-99999 top-10 left-1/2 -translate-x-1/2">
                            <div className="text-center mb-5">
                                <img src="/assets/images/lab-logo.png" alt="" className="w-[100px] mx-auto" />
                            </div>
                            <form onSubmit={(e) => handlesubmit(e)}>
                                <div className="form-group mb-3 relative">
                                    <label htmlFor="username" className="text-left text-sm font-semibold inline-block w-full mb-2">Email Address</label>
                                    <input type="email" className={`peer w-full border border-[#E4DFDF] py-4 pr-4 pl-12 text-sm font-semibold focus:border-primary ${formErrors?.email ? "border-red-500" : "border-[#E4DFDF]"}`} id="username" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none" className={`absolute top-[48px] left-[4%] peer-focus:text-primary transition-colors duration-200 ${formErrors?.email ? "text-red-500" : "text-[#807A7A]"}`}>
                                        <path d="M15.6578 6.85916L11.6786 10.063C10.9255 10.6534 9.86992 10.6534 9.11687 10.063L5.10352 6.85916" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.9749 1.67123H14.7701C16.0383 1.68545 17.2453 2.22157 18.1101 3.15471C18.9749 4.08786 19.4219 5.33659 19.3471 6.61007V12.6999C19.4219 13.9734 18.9749 15.2221 18.1101 16.1552C17.2453 17.0884 16.0383 17.6245 14.7701 17.6387H5.9749C3.25094 17.6387 1.41504 15.4227 1.41504 12.6999V6.61007C1.41504 3.88726 3.25094 1.67123 5.9749 1.67123Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    {formErrors?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formErrors?.email}</p>}
                                </div>
                                <div className="form-group mb-3 relative">
                                    <label htmlFor="password" className="text-left text-sm font-semibold inline-block w-full mb-2">Password</label>
                                    <input type={`${passTogle ? "text" : "password"}`} className={`peer w-full border py-4 pr-12 pl-12 text-sm font-semibold focus:border-primary ${formErrors?.password ? "border-red-500" : "border-[#E4DFDF]"}`} id="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none" className={`absolute top-[48px] left-[4%] peer-focus:text-primary transition-colors duration-200 ${formErrors?.email ? "text-red-500" : "text-[#807A7A]"}`}>
                                        <path d="M12.8702 7.54742V5.5445C12.8702 3.20014 10.969 1.29891 8.62465 1.29891C6.28029 1.28865 4.37159 3.18055 4.36133 5.52584V5.5445V7.54742" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.1794 18.5572H5.0512C3.09772 18.5572 1.51367 16.9741 1.51367 15.0197V11.0185C1.51367 9.06411 3.09772 7.48099 5.0512 7.48099H12.1794C14.1329 7.48099 15.717 9.06411 15.717 11.0185V15.0197C15.717 16.9741 14.1329 18.5572 12.1794 18.5572Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M8.61586 11.9832V14.0552" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="absolute top-[50px] right-[4%] cursor-pointer text-[#3333337a]"
                                        onClick={() => setPassToggle(!passTogle)}
                                    >
                                        {passTogle ?
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" id="Outline" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor"></path></g></svg>
                                        }
                                    </span>
                                    {formErrors?.password && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formErrors?.password}</p>}
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label htmlFor="captchaReport" className="text-left text-sm font-semibold inline-block w-full mb-2">Enter Captcha Value</label>
                                    <input
                                        type="text"
                                        id="captchaReport"
                                        className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`}
                                        placeholder="Enter Captcha"
                                        value={captchaInput}
                                        onChange={(e) => setCaptchaInput(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-6">
                                    <div className="w-max flex gap-2 w-full overflow-hidden">
                                        <CanvasCaptcha reloadTrigger={reloadCaptcha} onChange={setCaptcha} />
                                    </div>
                                </div>
                                <div className="flex justify-between mb-6">
                                    <div className="content-center">
                                        <input type="checkbox" id="remember" className="mr-2 accent-primary w-4 h-4" />
                                        <label htmlFor="remember" className="text-sm font-semibold">Remember Me</label>
                                    </div>
                                    <Link href="/forgot-password" className="text-sm font-semibold hover:text-primary">Forgot Password ?</Link>
                                </div>
                                <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${isLoading ? "bg-primary/70" : "bg-primary"} mt-2 w-full cursor-pointer`} disabled={isLoading}>
                                    {isLoading ?
                                        <div role="status" className="flex gap-2 items-center justify-center">
                                            <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                            Please Wait...
                                        </div> :
                                        <span className="relative z-1 flex gap-2 items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24,5.5v13c0,3.03-2.47,5.5-5.5,5.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c1.38,0,2.5-1.12,2.5-2.5V5.5c0-1.38-1.12-2.5-2.5-2.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c3.03,0,5.5,2.47,5.5,5.5Zm-6,6.5c0-.94-.36-1.81-1-2.45l-4.41-4.59c-.58-.6-1.52-.62-2.12-.04-.6,.57-.62,1.52-.04,2.12l3.33,3.46H1.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5H13.75l-3.33,3.46c-.57,.6-.56,1.55,.04,2.12,.29,.28,.67,.42,1.04,.42,.39,0,.79-.15,1.08-.46l4.39-4.56c.66-.66,1.03-1.54,1.03-2.48Z" fill="currentColor" /></svg>
                                            Login
                                        </span>
                                    }
                                </button>
                            </form>
                            <div className="relative text-center my-4">
                                <div className="w-full h-[1px] bg-[#E4DFDF] absolute top-[55%] right-0"></div>
                                <span className="bg-white text-sm font-bold relative z-1 px-2">OR</span>
                            </div>
                            <p className="text-base font-semibold">Don't have an account ? <Link href="/register" className="text-secondary ml-2 hover:text-primary">Register</Link></p>
                        </div>
                    }

                    {cartItems?.length > 0 ?
                        <div className="grid grid-cols-10 gap-5 xl:gap-6">
                            <div className="col-span-10 lg:col-span-7">
                                <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-6 overflow-x-scroll md:overflow-x-hidden">
                                    <table className="w-max max-w-[767px] text-base font-semibold text-dark md:w-full md:max-w-[100%]">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th scope="col" className="font-semibold py-2 text-left">IMAGE</th>
                                                <th scope="col" className="font-semibold py-2">PRODUCT	</th>
                                                <th scope="col" className="font-semibold py-2">PRICE</th>
                                                <th scope="col" className="font-semibold py-2">QUANTITY</th>
                                                <th scope="col" className="font-semibold py-2">SUBTOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-base">
                                            {cartItems.map((item) => (
                                                <tr className="border-b border-gray-300" key={item?.id}>
                                                    <td className="py-3">
                                                        <Link href={`/product/${item?.slug}`} className="inline-block w-[75px] p-3 border border-gray-300 group hover:border-primary">
                                                            <img src={item.image_url ? item.image_url : "/assets/images/placeholder.jpg"} alt="" className="w-full group-hover:scale-110" />
                                                        </Link>
                                                    </td>
                                                    <td className="py-3 w-[30%]">
                                                        <Link href={`/product/${item?.slug}`} className="text-base font-semibold hover:text-primary">{item.name}</Link>
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        ${isLoggedIn ? item.discounted_price : item.price}
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        <Quantity quantity={item?.quantity} setQuantity={(newQty) => handleQuantity(item.id, newQty)} width={true} />
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        ${((isLoggedIn ? item.discounted_price : item.price) * item.quantity).toFixed(2)}
                                                    </td>
                                                    <td className="py-3 text-right">
                                                        <button className="p-1 bg-[#efeff0] text-xs cursor-pointer hover:bg-secondary hover:text-white" onClick={() => handleRemove(item.id)} aria-label="Remove Cart Item">
                                                            {loadingButton === item.id ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="animate-spin w-4 h-4"><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM272 528C272 501.5 293.5 480 320 480C346.5 480 368 501.5 368 528C368 554.5 346.5 576 320 576C293.5 576 272 554.5 272 528zM112 272C138.5 272 160 293.5 160 320C160 346.5 138.5 368 112 368C85.5 368 64 346.5 64 320C64 293.5 85.5 272 112 272zM480 320C480 293.5 501.5 272 528 272C554.5 272 576 293.5 576 320C576 346.5 554.5 368 528 368C501.5 368 480 346.5 480 320zM139 433.1C157.8 414.3 188.1 414.3 206.9 433.1C225.7 451.9 225.7 482.2 206.9 501C188.1 519.8 157.8 519.8 139 501C120.2 482.2 120.2 451.9 139 433.1zM139 139C157.8 120.2 188.1 120.2 206.9 139C225.7 157.8 225.7 188.1 206.9 206.9C188.1 225.7 157.8 225.7 139 206.9C120.2 188.1 120.2 157.8 139 139zM501 433.1C519.8 451.9 519.8 482.2 501 501C482.2 519.8 451.9 519.8 433.1 501C414.3 482.2 414.3 451.9 433.1 433.1C451.9 414.3 482.2 414.3 501 433.1z" fill="currentColor" /></svg> :
                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-4 h-4 relative z-1" ><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor" /></svg>
                                                            }
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}


                                        </tbody>
                                    </table>
                                </div>
                                <Link href="/product-category" className="text-sm font-bold inline-block text-center text-white btn btn-secondary py-4 px-5 bg-secondary btn-scale-0">
                                    <span className="relative z-1 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                                        Continue Shopping
                                    </span>
                                </Link>
                            </div>
                            <div className="col-span-10 md:col-span-5 lg:col-span-3">
                                <div className="bg-[#fff] shadow-sm  py-4 px-5 mb-3 xl:mb-6">
                                    <h2 className="text-xl font-semibold text-dark page-title mb-3 xl:mb-5">Cart Totals</h2>
                                    <table className="w-full text-sm font-semibold text-dark mb-3 xl:mb-5 xl:text-base">
                                        <tbody>
                                            <tr>
                                                <th scope="col" className="text-left font-semibold text-base py-2">Subtotal</th>
                                                <td scope="col" className="text-right py-2">${cartData?.sub_total}</td>
                                            </tr>
                                            <tr>
                                                <th scope="col" className="text-left font-semibold text-base py-2">Shipping</th>
                                                <td scope="col" className="text-right py-2">Calculate Shipping</td>
                                            </tr>
                                            {Number(cartData?.hazmat_charges?.replace(/,/g, "")) > 0 ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Hazmat Charges</th>
                                                    <td scope="col" className="text-right py-2">+ ${cartData?.hazmat_charges}</td>
                                                </tr> : ""
                                            }
                                            {Number(cartData?.tariff?.replace(/,/g, "")) > 0 ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Tariff Surcharge</th>
                                                    <td scope="col" className="text-right py-2">+ ${cartData?.tariff} ({cartData?.tariff_charge}%)</td>
                                                </tr> : ""
                                            }
                                            {Number(cartData?.fuel_surcharge) ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Fuel Surcharge	</th>
                                                    <td scope="col" className="text-right py-2">+ ${cartData?.fuel_surcharge}</td>
                                                </tr> : ""
                                            }
                                            {Number(cartData?.packing_handling_charges?.replace(/,/g, "") > 0) ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">Packing & Handling Charges</th>
                                                    <td scope="col" className="text-right py-2 text-secondary">+ ${cartData?.packing_handling_charges}</td>
                                                </tr> : ""
                                            }
                                            {Number(cartData?.user_discount?.replace(/,/g, "") > 0) ?
                                                <tr>
                                                    <th scope="col" className="text-left font-semibold text-base py-2">You Save</th>
                                                    <td scope="col" className="text-right py-2 text-secondary"> ${cartData?.user_discount}</td>
                                                </tr> : ""
                                            }
                                            <tr>
                                                <th scope="col" className="text-left font-semibold text-base py-2">Total</th>
                                                <td scope="col" className="text-right py-2">${cartData?.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {!isLoggedIn ?
                                        <button className="text-sm font-bold text-center uppercase text-white btn btn-primary py-4 px-5 bg-primary btn-scale-0 mt-2 w-full cursor-pointer" type="button" onClick={() => {
                                            toggleOverlay("Login Overlay");
                                        }
                                        } aria-label="Login">
                                            <span className="relative z-1 flex gap-2 items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24,5.5v13c0,3.03-2.47,5.5-5.5,5.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c1.38,0,2.5-1.12,2.5-2.5V5.5c0-1.38-1.12-2.5-2.5-2.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c3.03,0,5.5,2.47,5.5,5.5Zm-6,6.5c0-.94-.36-1.81-1-2.45l-4.41-4.59c-.58-.6-1.52-.62-2.12-.04-.6,.57-.62,1.52-.04,2.12l3.33,3.46H1.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5H13.75l-3.33,3.46c-.57,.6-.56,1.55,.04,2.12,.29,.28,.67,.42,1.04,.42,.39,0,.79-.15,1.08-.46l4.39-4.56c.66-.66,1.03-1.54,1.03-2.48Z" fill="currentColor" /></svg>
                                                Login
                                            </span>
                                        </button> :
                                        <Link href="/checkout" className="text-sm font-bold inline-block text-center uppercase text-white btn btn-primary py-4 px-5 bg-primary btn-scale-0 mt-2 w-full"><span className="relative z-1">Proceed To Checkout</span></Link>
                                    }
                                </div>
                            </div>
                        </div> :
                        <div className="w-full m-auto text-center">
                            <div className="text-center content-center m-auto min-h-[50vh]">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="150px" width="150px" version="1.1" id="Capa_1" viewBox="0 0 231.523 231.523" xmlSpace="preserve" className="mx-auto"><g><path d="M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231   l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z"></path><path d="M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468   c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468   C147.235,148.377,150.23,152.062,154.351,152.488z"></path><path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221   c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523   c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215   C104.494,212.835,100.808,216.523,96.278,216.523z"></path><path d="M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221   c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523   c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215   C181.937,212.835,178.251,216.523,173.719,216.523z"></path><path d="M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876   c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046   c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z    M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z"></path><path d="M105.556,52.851c1.464,1.463,3.383,2.195,5.302,2.195c1.92,0,3.84-0.733,5.305-2.198c2.928-2.93,2.927-7.679-0.003-10.607   L92.573,18.665c-2.93-2.928-7.678-2.927-10.607,0.002c-2.928,2.93-2.927,7.679,0.002,10.607L105.556,52.851z"></path><path d="M159.174,55.045c1.92,0,3.841-0.733,5.306-2.199l23.552-23.573c2.928-2.93,2.925-7.679-0.005-10.606   c-2.93-2.928-7.679-2.925-10.606,0.005l-23.552,23.573c-2.928,2.93-2.925,7.679,0.005,10.607   C155.338,54.314,157.256,55.045,159.174,55.045z"></path><path d="M135.006,48.311c0.001,0,0.001,0,0.002,0c4.141,0,7.499-3.357,7.5-7.498l0.008-33.311c0.001-4.142-3.356-7.501-7.498-7.502   c-0.001,0-0.001,0-0.001,0c-4.142,0-7.5,3.357-7.501,7.498l-0.008,33.311C127.507,44.951,130.864,48.31,135.006,48.311z"></path></g></svg>
                                <Link href="/product-category" className="text-sm font-bold inline-block text-center text-white btn btn-secondary py-4 px-5 bg-secondary btn-scale-0 mt-10 m-auto">
                                    <span className="relative z-1 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                                        Continue Shopping
                                    </span>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}
