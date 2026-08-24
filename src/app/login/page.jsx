"use client"

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import CanvasCaptcha from "@/components/CanvasCaptcha";

export default function Page() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { user, logout, isLoggedIn, login } = useContext(AuthContext);
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);
    const [tcaptchaInput, setTcaptchaInput] = useState("");
    const [tcaptcha, setTcaptcha] = useState("");
    const [reloadTcaptcha, setReloadTcaptcha] = useState(0);
    const { showToast } = useToast();
    const [passTogle, setPassToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [hasProblem, setHasProblem] = useState(false);
    const [pname, setPname] = useState("");
    const [pemail, setPemail] = useState("");
    const [pphone, setPphone] = useState("");
    const [promessage, setPromessage] = useState("");
    const [pLoading, setPloading] = useState(false);
    const [pMessage, setPMessage] = useState({
        type: false,
        value: ""
    });
    
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

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            login(requestOptions, true).then((res) => {
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
                    setCaptchaInput("");
                    setReloadCaptcha(prev => prev+1)                       
                    showToast(msg, res.status ? "success" : "warning")
                    setIsLoading(false);
                }
            });
        } else {
            setIsLoading(false);
        }
    }

    const handleProblemSubmit = async (e) => {
        e.preventDefault();
        let regobj = {
            name: pname,
            email: pemail,
            phone: pphone,
            message: promessage,
        };


        const raw = JSON.stringify(regobj);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw,
        };
        if (tcaptchaInput == tcaptcha) {
            setPloading(true);
            try {
                const response = await fetch(`${baseUrl}login-enquiry`, requestOptions);
                if (!response.ok) {
                    throw new Error("Failed !")
                }
                const result = await response.json()
                setPMessage({
                    type: result.status,
                    value: result.message
                })
            } catch (err) {
                console.log(err)
            } finally {
                setPloading(false);
                setReloadTcaptcha(prev => prev+1)
                setTcaptchaInput("")
            }
        } else {
            setReloadTcaptcha(prev => prev+1)
            setTcaptchaInput("")
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
            errors.captcha = "Captcha is required"
            setReloadCaptcha(prev => prev+1)
            setCaptchaInput("")
        }
        return errors
    }

    return (
        <>
            <section className="bg-[#FAFAFA] py-12 min-h-[55vh] xl:min-h-[80vh]">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="text-center content-center">
                        <h2 className="text-3xl font-semibold uppercase text-dark page-title text-center mb-10 mx-auto">Login</h2>
                        <div className="bg-white shadow-lg px-10 py-5 max-w-[500px] mx-auto">
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
                                <div className="form-group mb-6 relative">
                                    <label htmlFor="password" className="text-left text-sm font-semibold inline-block w-full mb-2">Password</label>
                                    <input type={`${passTogle ? "text" : "password"}`} className={`peer w-full border py-4 pr-12 pl-12 text-sm font-semibold focus:border-primary ${formErrors?.password ? "border-red-500" : "border-[#E4DFDF]"}`} id="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none" className={`absolute top-[48px] left-[4%] peer-focus:text-primary transition-colors duration-200 ${formErrors?.email ? "text-red-500" : "text-[#807A7A]"}`}>
                                        <path d="M12.8702 7.54742V5.5445C12.8702 3.20014 10.969 1.29891 8.62465 1.29891C6.28029 1.28865 4.37159 3.18055 4.36133 5.52584V5.5445V7.54742" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.1794 18.5572H5.0512C3.09772 18.5572 1.51367 16.9741 1.51367 15.0197V11.0185C1.51367 9.06411 3.09772 7.48099 5.0512 7.48099H12.1794C14.1329 7.48099 15.717 9.06411 15.717 11.0185V15.0197C15.717 16.9741 14.1329 18.5572 12.1794 18.5572Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M8.61586 11.9832V14.0552" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="absolute top-[50px] right-[4%] cursor-pointer text-[#807A7A]"
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
                        <div className="mt-15">
                            <h4 className="text-3xl font-semibold text-dark page-title text-center mb-10 mx-auto">We’ve recently updated our website.</h4>
                            <p className="text-lg font-semibold text-primary">If your account was created before January 2026, please reset your
                                <br />password to ensure a seamless experience.</p>
                            <p className="text-lg mt-2 font-semibold text-red-700 leading-6">If you are experiencing any issues with login or sign-up, please
                                <br />contact us using the form below. Our support team will assist you promptly.</p>
                            <button className="text-sm font-bold uppercase text-white bg-primary cursor-pointer btn btn-primary btn-scale-0 py-4 px-5 mt-10" onClick={() => setHasProblem(pre => !pre)}><span className="relative z-1">{!hasProblem ? "Open Form" : "X"}</span></button>
                        </div>
                        {hasProblem &&
                            <div className="form-wrapper mt-10 bg-white shadow-lg px-10 py-5 max-w-[500px] mx-auto">
                                <form onSubmit={handleProblemSubmit}>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="name" className="text-left text-sm font-semibold inline-block w-full mb-2">Full Name</label>
                                        <input type="text" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="name" name="name" placeholder="Your Full Name" value={pname} onChange={(e) => setPname(e.target.value)} required={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                        <input type="email" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="email" name="email" placeholder="Your Email" value={pemail} onChange={(e) => setPemail(e.target.value)} required={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                        <input type="tel" className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`} id="tel" name="tel" placeholder="Your Contact Number" value={pphone} onChange={(e) => setPphone(e.target.value)} required={true} />
                                    </div>
                                    <div className="form-group mb-3 relative">
                                        <label htmlFor="subject" className="text-left text-sm font-semibold inline-block w-full mb-2">Please Describe Your Issue</label>
                                        <textarea maxlength="200" name="subject" id="subject" className="w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]" onChange={(e) => setPromessage(e.target.value)} defaultValue={promessage} required={true}></textarea>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="captchaReport" className="text-left text-sm font-semibold inline-block w-full mb-2">Enter Captcha Value</label>
                                        <input
                                            type="text"
                                            id="captchaReport"
                                            className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary border-[#afafaf]`}
                                            placeholder="Enter Captcha"
                                            value={tcaptchaInput}
                                            onChange={(e) => setTcaptchaInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-6">
                                        <div className="w-max flex gap-2 w-full overflow-hidden">
                                            <CanvasCaptcha reloadTrigger={reloadTcaptcha} onChange={setTcaptcha} />
                                        </div>
                                    </div>
                                    
                                    <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${pLoading ? "bg-primary/70" : "bg-primary"} mt-2 w-full cursor-pointer`} disabled={pLoading}>
                                        {pLoading ?
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
                                    {pMessage.value && 
                                        <div className='message mt-4'>
                                            <p className={` text-base font-semibold ${pMessage.type ? "text-green-500" : "text-red-500"}`}>{pMessage.value}</p>
                                        </div>
                                    }
                                </form>

                            </div>
                        }

                    </div>
                </div>
            </section>
        </>
    )
}
