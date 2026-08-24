"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Turnstile from "react-turnstile";
import { useToast } from "@/context/ToastContext";

export default function Page(){
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const {showToast} = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [captchaKey, setCaptchaKey] = useState(Date.now());
    const turnstileRef = useRef(null);
    const [email, setEmail] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handlesubmit = (e) => {
            e.preventDefault();

            let regobj = {
                email : email, 
                "cf-turnstile-response" : captchaValue,
            };
    
            const formErrors = validate(regobj);
            setFormErrors(formErrors);

            if(Object.keys(formErrors).length === 0)
            {
                setIsLoading(true);
                fetch(`${baseUrl}forgot-password`, {
                    method:"POST",
                    headers:{'content-type' : 'application/json'},
                    body:JSON.stringify(regobj)
                }).then((response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                }).then(({ status, body })=>{
                    let msg= "";
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
                    setIsLoading(false);
                }).catch((err)=>{
                    setIsLoading(false);
                    setMessage("Validation error: " + err.message);
                })
            }
        }
    
        const validate = (val) => {
            const errors = {}
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
            if(!val.email){
                errors.email = "Email is required !"
            }else if(!regex.test(val.email)){
                errors.email = "Email is not valid"
            }
            if (!val["cf-turnstile-response"]) {
                errors.captcha = "Please select the captcha"
            }
            return errors
        }
    return (
        <>
            <section className="bg-[#FAFAFA] py-12 min-h-[56vh] xl:min-h-[80vh]">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="text-center content-center">
                        <h2 className="text-3xl font-semibold uppercase text-dark page-title text-center mb-10 mx-auto">Forgot Password</h2>
                        <div className="bg-white shadow-lg px-10 py-5 max-w-[500px] mx-auto">
                            <div className="text-center mb-5">
                                <img src="/assets/images/lab-logo.png" alt="" className="w-[100px] mx-auto" />
                            </div>
                            <form onSubmit={(e) => handlesubmit(e)}>
                                <div className="form-group mb-3 relative">
                                    <label htmlFor="username" className="text-left text-sm font-semibold inline-block w-full mb-2">Email Address</label>
                                    <input type="email" className={`peer w-full border py-4 pr-4 pl-12 text-sm font-semibold focus:border-primary ${formErrors?.email ? "border-red-500" : "border-[#E4DFDF]"}`} id="username" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none" className={`absolute top-[59%] left-[4%] peer-focus:text-primary transition-colors duration-200 ${formErrors?.email ? "text-red-500" : "text-[#807A7A]"}`}>
                                        <path d="M15.6578 6.85916L11.6786 10.063C10.9255 10.6534 9.86992 10.6534 9.11687 10.063L5.10352 6.85916" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.9749 1.67123H14.7701C16.0383 1.68545 17.2453 2.22157 18.1101 3.15471C18.9749 4.08786 19.4219 5.33659 19.3471 6.61007V12.6999C19.4219 13.9734 18.9749 15.2221 18.1101 16.1552C17.2453 17.0884 16.0383 17.6245 14.7701 17.6387H5.9749C3.25094 17.6387 1.41504 15.4227 1.41504 12.6999V6.61007C1.41504 3.88726 3.25094 1.67123 5.9749 1.67123Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                                {formErrors?.email && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formErrors?.email}</p>}
                                <Turnstile
                                    key={captchaKey}
                                    ref={turnstileRef}
                                    sitekey="0x4AAAAAACEPK8k1LXHKe5b8"
                                    onVerify={handleCaptchaChange}
                                    onExpire={() => setCaptchaValue(null)}
                                    className="text-left"
                                />
                                {formErrors?.captcha && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formErrors?.captcha}</p>}
                                <button className={`text-sm font-bold uppercase text-white btn btn-primary btn-scale-0 py-4 px-5 ${isLoading ? "bg-primary/70" : "bg-primary"} mt-2 w-full cursor-pointer`} disabled={isLoading}>
                                    {isLoading ?
                                        <div role="status" className="flex gap-2 items-center justify-center">
                                            <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg>
                                            Please Wait...
                                        </div> :
                                        <span className="relative z-1 flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24,5.5v13c0,3.03-2.47,5.5-5.5,5.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c1.38,0,2.5-1.12,2.5-2.5V5.5c0-1.38-1.12-2.5-2.5-2.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c3.03,0,5.5,2.47,5.5,5.5Zm-6,6.5c0-.94-.36-1.81-1-2.45l-4.41-4.59c-.58-.6-1.52-.62-2.12-.04-.6,.57-.62,1.52-.04,2.12l3.33,3.46H1.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5H13.75l-3.33,3.46c-.57,.6-.56,1.55,.04,2.12,.29,.28,.67,.42,1.04,.42,.39,0,.79-.15,1.08-.46l4.39-4.56c.66-.66,1.03-1.54,1.03-2.48Z" fill="currentColor" /></svg>
                                            Submit
                                        </span>
                                    }
                                </button>
                            </form>
                            <div className="relative text-center my-4">
                                <div className="w-full h-[1px] bg-[#E4DFDF] absolute top-[55%] right-0"></div>
                                <span className="bg-white text-sm font-bold relative z-1 px-2">OR</span>
                            </div>
                            <p className="text-base font-semibold">Already have password ? <Link href="/login" className="text-secondary ml-2 hover:text-primary">Login</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
