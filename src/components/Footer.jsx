"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useToast } from "../context/ToastContext";
import { OverlayContext } from "../context/OverlayContext";
import CanvasCaptcha from "./CanvasCaptcha";
import Image from "next/image";

function Footer()
{
    const [isScroll, setIsScroll] = useState(false);
    const { showToast } = useToast();
    const { overlay, toggleOverlay } = useContext(OverlayContext);
    const [captchaInput, setCaptchaInput] = useState("");
    const [emailCaptcha, setEmailCaptcha] = useState("");
    const [reloadEmailCaptcha, setReloadEmailCaptcha] = useState(0);
    const [rcaptchaInput, setRcaptchaInput] = useState("");
    const [reportCaptcha, setReportCaptcha] = useState("");
    const [reloadRcaptcha, setReloadRcaptcha] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; 
            setIsScroll(scrollTop > 50);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])


    const handleScrollTopClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [contact, setContact] = useState(
        {
            name: "",
            tel: "",
            email: "",
            subject: "",
            message: "",
            type : "report"
        }
    )
    const [formError, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleContact = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = FormValidate(contact);
        setFormErrors(errors);

        if (Object.keys(errors).length <= 0) {
            setLoading(true);
            fetch(`${baseUrl}contact-us`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({...contact, "cf-turnstile-response" : captchaValue})
            }).then((response) => {
                return response.json().then((data) => ({
                    status: response.status,
                    body: data,
                }))
            }).then(({ status, body }) => {
                showToast(body.message, body.status ? "success" : "warning")
                setContact({
                    name: "",
                    email: "",
                    tel : "",
                    subject: "",
                    message: "",
                    type : "report"
                })
                toggleOverlay(null);
                setLoading(false);
            }).catch((err) => {
                showToast("Validation error: " + err.message, "error");
                setLoading(false);
            })
        }
    }

    const FormValidate = (val) => {
        const error = {}

        if (!val.name) {
            error.name = "Name is required."
        }
        if (!val.tel) {
            error.tel = "Contact Number is required."
        }
        if (!val.email) {
            error.email = "Email is required."
        }
        if (!val.subject) {
            error.subject = "Subject is required."
        }
        if (!val.message) {
            error.message = "Message is required."
        }
        if(rcaptchaInput !== reportCaptcha){
            error.captcha = "Captcha is required"
            setReloadRcaptcha(prev => prev+1)
            setRcaptchaInput("")
        }
        return error
    }

    const SendMail = async (e) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        e.preventDefault();
        if(captchaInput !== emailCaptcha){
            setReloadEmailCaptcha(prev => prev+1)
            return
        }
        if(email && regex.test(email)){
            try{
                setIsLoading(true);
                const response = await fetch(`${baseUrl}subscribe`, {
                    headers:{"Authorization" : `Bearer ${localStorage.getItem("token")}`,  "Content-Type": "application/json"},
                    method : "POST", 
                    body : JSON.stringify({
                        email : email
                    })
                })

                if(!response.ok){
                    throw new Error("Subscribe Fetch Failed");
                }

                const result = await response.json();
                if(result.status){
                    showToast(result?.message, "success")
                    setEmail("");
                    setCaptchaInput("")
                }else{
                    let msg = "";
                    if (typeof result.message === "string") {
                        msg = result.message;
                    }
                    else if (typeof result.message === "object" && result.message !== null) {
                        const firstErrorKey = Object.keys(result.message)[0];
                        if (firstErrorKey) {
                            msg = result.message[firstErrorKey][0];
                        }
                    }
                    showToast(msg, "warning")
                }
                
            }catch(err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }
        }
    }


    return (
        <>
            <footer className="border-t-2 border-primary bg-[#020023]">
                <div className="container px-2 mx-auto lg:px-5">
                    {overlay === "Report Problem" &&
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] max-w-[800px] bg-white max-h-screen p-4 md:p-8">
                            <h3 className="text-dark text-center font-semibold text-3xl mb-6">Leave us a Message</h3>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="name" className="text-left text-sm font-semibold inline-block w-full mb-2">Full Name</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${formError?.name ? "border-red-500" : "border-[#afafaf]"}`} id="name" name="name" placeholder="Your Full Name" value={contact.name} onChange={handleContact} />
                                        {formError?.name && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formError?.name}</p>}
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                        <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${formError?.email ? "border-red-500" : "border-[#afafaf]"}`} id="email" name="email" placeholder="Your Email" value={contact.email} onChange={handleContact} />
                                        {formError?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formError?.email}</p>}
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                        <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${formError?.tel ? "border-red-500" : "border-[#afafaf]"}`} id="tel" name="tel" placeholder="Your Contact Number" value={contact.tel} onChange={handleContact} />
                                        {formError?.tel && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formError?.tel}</p>}
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="subject" className="text-left text-sm font-semibold inline-block w-full mb-2">Subject</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${formError?.subject ? "border-red-500" : "border-[#afafaf]"}`} id="subject" name="subject" placeholder="Your Subject" value={contact.subject} onChange={handleContact} />
                                        {formError?.subject && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formError?.subject}</p>}
                                    </div>
                                    <div className="form-group mb-3 relative col-span-2">
                                        <label htmlFor="message" className="text-left text-sm font-semibold inline-block w-full mb-2">Message</label>
                                        <textarea className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${formError?.message ? "border-red-500" : "border-[#afafaf]"}`} id="message" name="message" placeholder="Your Message" value={contact.message} onChange={handleContact} ></textarea>
                                        {formError?.message && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formError?.message}</p>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="captchaReport" className="text-left text-sm font-semibold inline-block w-full mb-2">Enter Captcha Value</label>
                                        <input
                                            type="text"
                                            id="captchaReport"
                                            className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`}
                                            placeholder="Enter Captcha"
                                            value={rcaptchaInput}
                                            onChange={(e) => setRcaptchaInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group pt-8">
                                        <div className="w-max flex gap-2 w-full overflow-hidden">
                                            <CanvasCaptcha  reloadTrigger={reloadRcaptcha} onChange={setReportCaptcha} />
                                        </div>
                                    </div>
                                </div>
                                <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${loading ? "bg-primary/70" : "bg-primary"} mt-2 w-full cursor-pointer`} disabled={loading}>
                                    {loading ?
                                        <div role="status" className="flex gap-2 items-center justify-center">
                                            <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                            Please Wait...
                                        </div> :
                                        <span className="relative z-1 flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" className="w-4 h-4 mr-2 -rotate-90"><g><path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor"></path><path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor"></path></g></svg>
                                            Submit
                                        </span>
                                    }
                                </button>
                            </form>
                        </div>
                    }
                    <div className="grid grid-cols-2 gap-2 py-10 lg:grid-cols-4 xl:gap-5">
                        <div className="company-detail">
                            <Link href="/" className="inline-block mb-2 lg:mb-5">
                                <Image src="/assets/images/LDP_logo_white_blu_web.png" alt="Lab Disposable Products" width={150} height={75} className="w-[150px] h-auto"/>
                            </Link>
                            <ul>
                                <li className="mb-4">
                                    <Link href="tel:1-800-332-LAB1" className="text-xs font-semibold text-white flex items-center gap-2 group hover:text-white/80 lg:text-sm">
                                        <span className="bg-primary text-white inline-block w-[25px] h-[25px] text-center content-center text-xs flex-shrink-0 group-hover:bg-white group-hover:text-primary xl:w-[30px] xl:h-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" className="w-3 h-3 m-auto"><path d="M5,22a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V11a7,7,0,0,1,14,0v1a2,2,0,0,0-2,2v6H14a1,1,0,0,0,0,2h5a5,5,0,0,0,2-9.576V11A9,9,0,0,0,3,11v1.424A5,5,0,0,0,5,22Z" fill="currentColor" /></svg>
                                        </span>
                                        1-800-332-LAB1
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="tel:1-973-335-2966" className="text-xs font-semibold text-white flex items-center gap-2 group hover:text-white/80 lg:text-sm">
                                        <span className="bg-primary text-white inline-block w-[25px] h-[25px] text-center content-center text-xs flex-shrink-0 group-hover:bg-white group-hover:text-primary xl:w-[30px] xl:h-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-3 h-3 m-auto"><path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" fill="currentColor"></path></svg>
                                        </span>
                                        1-973-335-2966
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="mailto:sales@labdisposable.com" className="text-xs font-semibold text-white flex items-center gap-2 group hover:text-white/80 lg:text-sm">
                                        <span className="bg-primary text-white inline-block w-[25px] h-[25px] text-center content-center text-xs flex-shrink-0 group-hover:bg-white group-hover:text-primary xl:w-[30px] xl:h-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-3 h-3 m-auto"><path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" fill="currentColor"></path></svg>
                                        </span>
                                        sales@labdisposable.com
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link href="" className="text-xs font-semibold text-white flex items-center gap-2 group hover:text-white/80 lg:text-sm">
                                        <span className="bg-primary text-white inline-block w-[25px] h-[25px] text-center content-center text-xs flex-shrink-0 group-hover:bg-white group-hover:text-primary xl:w-[30px] xl:h-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-3 h-3 m-auto"><path d="M11.986,1.002C7.159,1.068,2.309,5.81,2.309,10.457c0,6.416,8.773,12.146,9.145,12.382,.472,.301,.942,.104,1.112-.012,.368-.252,9.021-6.25,9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm2.826,12.129c-.94,.94-1.865,1.4-2.817,1.4-.076,0-.152-.003-.229-.009-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758,0-5.624,1.867-1.866,3.758-1.865,5.625,0,1.865,1.867,1.865,3.759,0,5.624Z" fill="currentColor"></path><path d="M12.018,8.108c-.409,0-.85,.246-1.416,.812-1.196,1.196-.966,1.829,0,2.796,.518,.519,.949,.783,1.316,.812,.416,.045,.909-.24,1.479-.812,1.195-1.195,.966-1.829,0-2.796-.508-.509-.925-.812-1.379-.812Z" fill="currentColor"></path></svg>
                                        </span>
                                        16 Evesboro-Medford Road , Unit A1 Medford, NJ 08055
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-links pt-2">
                            <h3 className="text-sm font-semibold uppercase text-white page-title md:text-base xl:text-lg">About Us</h3>
                            <ul className="mt-5 lg:mt-10">
                                <li className="my-3 nav-item">
                                    <Link href="/about-us" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">About Us</Link>
                                </li>
                                <li className="my-3 nav-item">
                                    <Link href="/contact-us" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">Contact Us</Link>
                                </li>
                                <li className="my-3 nav-item">
                                    <Link href="/privacy-policy" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">Privacy Policy</Link>
                                </li>
                                <li className="my-3 nav-item">
                                    <Link href="/terms-conditions" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">Terms & Conditions</Link>
                                </li>
                                <li className="my-3 nav-item">
                                    <Link href="/returns-refund-policy" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">Returns & Refund Policy</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-links pt-2">
                            <h3 className="text-sm font-semibold uppercase text-white page-title md:text-base xl:text-lg">Resources</h3>
                            <ul className="mt-5 lg:mt-10">
                                <li className="my-3 nav-item">
                                    <Link href="/blog" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">Blog</Link>
                                </li>
                                <li className="my-3 nav-item">
                                    <Link href="/faq" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">FAQ</Link>
                                </li>
                                <li className="my-3">
                                    <button className="text-xs font-bold uppercase text-white btn btn-primary py-3 px-3 bg-primary mt-2 inline-block cursor-pointer" onClick={() => toggleOverlay("Report Problem")}><span className="relative z-1">Report a problem</span></button>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-links pt-2">
                            <h3 className="text-sm font-semibold uppercase text-white page-title md:text-base xl:text-lg">My Account</h3>
                            <ul className="my-5 lg:my-10">
                                <li className="my-3 nav-item">
                                    <Link href="/user/profile" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">My Account</Link>
                                </li>
                                <li className="my-3 nav-item">
                                    <Link href="/user/orders" className="text-xs font-semibold text-white uppercase py-1 inline-block relative hover:pl-4 w-full lg:text-sm">Track Your Order</Link>
                                </li>
                            </ul>
                            <h3 className="text-sm font-semibold uppercase text-white page-title md:text-base xl:text-lg mb-5 lg:mb-10">Subscribe to our Newsletter</h3>
                            <form onSubmit={(e) => SendMail(e)}>
                                <div className={`flex flex-col border-2 justify-between border-primary`}>
                                    <div className="form-group w-full">
                                        <input type="email" id="subscribe" placeholder="Enter Your Email" className="py-2 px-4 text-sm font-semibold text-white w-full h-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="flex pre-footer-captcha">
                                        <input
                                            type="text"
                                            id="captcha"
                                            className={`w-full py-2 px-4 border-t border-primary text-sm text-white font-semibold flex-1`}
                                            placeholder="Enter Captcha"
                                            value={captchaInput}
                                            onChange={(e) => setCaptchaInput(e.target.value)}
                                        />
                                        <div className="w-max flex gap-2 w-full overflow-hidden">
                                            <CanvasCaptcha  reloadTrigger={reloadEmailCaptcha} onChange={setEmailCaptcha} />
                                        </div>
                                    </div>
                                    
                                    <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-3 px-5 inline-block cursor-pointer group min-h-[44px] ${isLoading ? "bg-primary/70" : "bg-primary"} cursor-pointer`} disabled={isLoading}>
                                        {isLoading ?
                                            <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex gap-2 items-center mx-auto">
                                                <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                            </div> :
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" className="w-5 h-5 relative z-1 group-hover:scale-150 mx-auto"><path d="M1.77,6.215A2.433,2.433,0,0,0,0,8.611a2.474,2.474,0,0,0,.771,1.71L4,13.548V20h6.448l3.265,3.267a2.4,2.4,0,0,0,1.706.713,2.438,2.438,0,0,0,.618-.08,2.4,2.4,0,0,0,1.726-1.689L24-.016ZM3.533,8.856l13.209-3.7L7,14.9V12.326Zm11.6,11.6L11.675,17H9.1l9.734-9.741Z" fill="currentColor" /></svg>
                                        }
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
                <div className="py-6 border-t-1 border-gray-500/60">
                    <div className="container px-3 mx-auto md:px-5">
                        <div className="flex justify-between items-center flex-col gap-y-3 md:flex-row">
                            <ul className="flex gap-3">
                                <li>
                                    <Link className="inline-block text-white w-[25px] h-[25px] text-sm text-center content-center bg-primary hover:bg-white hover:text-primary hover:scale-110 lg:w-[35px] lg:h-[35px]" href="https://www.facebook.com/p/Laboratory-Disposable-Products-Inc-100063791415946/" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 m-auto"><path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" fill="currentColor"></path></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="inline-block text-white w-[25px] h-[25px] text-sm text-center content-center bg-primary hover:bg-white hover:text-primary hover:scale-110 lg:w-[35px] lg:h-[35px]" href="https://x.com/labdisposable?mx=2">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 24 24" className="w-4 h-4 m-auto"><path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" fill="currentColor"></path></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="inline-block text-white w-[25px] h-[25px] text-sm text-center content-center bg-primary hover:bg-white hover:text-primary hover:scale-110 lg:w-[35px] lg:h-[35px]" href="https://www.instagram.com/labdisposable/" >
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" className="w-4 h-4 m-auto"><g><path d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608   c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608   c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07   c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849   c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311   C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014   C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038   c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072   c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12   c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942   C15.668,0.014,15.259,0,12,0z" fill="currentColor"></path><path d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162   C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z" fill="currentColor"></path><circle cx="18.406" cy="5.594" r="1.44" fill="currentColor"></circle></g></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="inline-block text-white w-[25px] h-[25px] text-sm text-center content-center bg-primary hover:bg-white hover:text-primary hover:scale-110 lg:w-[35px] lg:h-[35px]" href="https://www.youtube.com/channel/UCJmu_W9O4L-L257SeczYUxw" >
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" className="w-4 h-4 m-auto" ><g id="XMLID_184_"><path d="M23.498,6.186c-0.276-1.039-1.089-1.858-2.122-2.136C19.505,3.546,12,3.546,12,3.546s-7.505,0-9.377,0.504   C1.591,4.328,0.778,5.146,0.502,6.186C0,8.07,0,12,0,12s0,3.93,0.502,5.814c0.276,1.039,1.089,1.858,2.122,2.136   C4.495,20.454,12,20.454,12,20.454s7.505,0,9.377-0.504c1.032-0.278,1.845-1.096,2.122-2.136C24,15.93,24,12,24,12   S24,8.07,23.498,6.186z M9.546,15.569V8.431L15.818,12L9.546,15.569z" fill="currentColor"></path></g></svg> 
                                    </Link>
                                </li>
                                <li>
                                    <Link className="inline-block text-white w-[25px] h-[25px] text-sm text-center content-center bg-primary hover:bg-white hover:text-primary hover:scale-110 lg:w-[35px] lg:h-[35px]" href="https://www.linkedin.com/company/laboratory-disposable-products/" >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 m-auto"><path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" fill="currentColor"></path></svg>
                                    </Link>
                                </li>
                            </ul>
                            <h6 className="text-xs font-semibold text-white flex items-center gap-1 lg:text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mb-[-3px]"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Z" fill="currentColor" /><path d="M12,19A7,7,0,1,1,16.95,7.05L15.536,8.464a5,5,0,1,0,0,7.072L16.95,16.95A6.983,6.983,0,0,1,12,19Z" fill="currentColor" /></g></svg>
                                Laboratory Disposable Products - All Rights Reserved 2025
                            </h6>
                        </div>
                    </div>
                    <button className={`w-[30px] h-[30px] text-center content-center fixed bottom-5 right-5 z-100 bg-primary btn-primary cursor-pointer transition-linear animate-bounce duration-500 ${isScroll ? "opacity-100 scale-100" : "opacity-0 scale-0"} lg:w-[50px] lg:h-[50px]`} onClick={() => handleScrollTopClick()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" className="m-auto relative z-1 w-[15px] h-[15px] lg:w-[20px] lg:h-[20px]"><path d="M9.38346 14.5459V3.01257L6.2768 6.11924L5.3328 5.1619L10.0501 0.443237L14.7688 5.1619L13.8248 6.12057L10.7168 3.01257V14.5459H9.38346ZM2.87146 19.1099C2.25724 19.1099 1.7448 18.9046 1.33413 18.4939C0.923463 18.0832 0.717686 17.5703 0.716797 16.9552V13.7246H2.05013V16.9552C2.05013 17.1606 2.13546 17.349 2.30613 17.5206C2.4768 17.6921 2.6648 17.7775 2.87013 17.7766H17.2301C17.4346 17.7766 17.6226 17.6912 17.7941 17.5206C17.9657 17.3499 18.051 17.1615 18.0501 16.9552V13.7246H19.3835V16.9552C19.3835 17.5695 19.1781 18.0819 18.7675 18.4926C18.3568 18.9032 17.8439 19.109 17.2288 19.1099H2.87146Z" fill="#fff"></path></svg>
                    </button>
                </div>
            </footer>
        </>
    )
}

export default Footer;