"use client"
import { useState, useEffect, useRef } from "react";
import Turnstile from "react-turnstile";
import { useToast } from "@/context/ToastContext";
import { useParams } from "next/navigation";

export default function Page(){
    const { showToast } =  useToast();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [captchaKey, setCaptchaKey] = useState(Date.now());
    const turnstileRef = useRef(null);
    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const [token, setToken] = useState();
    const [passTogle, setPassToggle] = useState([false, false]);

    let { key } = useParams();
    useEffect(() => {
        if (key) {
            setToken(key);
        }
    }, [key]);

    const handlesubmit = (e) => {
        e.preventDefault();

        let regobj = {
            token,
            password,
            password_confirmation: confirmPassword,
            "cf-turnstile-response" : captchaValue,
        };
        setFormErrors(validate(regobj));

        const raw = JSON.stringify(regobj);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw,
        };


        if (Object.keys(formErrors).length === 0) {
            setIsLoading(true);
            fetch(`${baseUrl}reset-password`, requestOptions)
                .then((response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                })
                .then(({ status, body }) => {
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
                })
                .catch((error) => {
                    setIsLoading(false);
                });
        }
    }

    const validate = (val) => {
        const errors = {}

        if (!val.password) {
            errors.password = "Password is required !"
        }
        if (!val.password_confirmation) {
            errors.password_confirmation = "Confirm Password is required !"
        } else if (val.password !== val.password_confirmation) {
            errors.password_confirmation = "Confirm Password does not match !"
        }
        if(!val["cf-turnstile-response"]){
            errors.captcha = "Please select the captcha"
        }
        return errors
    }


    return (
        <>
            <section className="bg-[#FAFAFA] py-12 min-h-[55vh] xl:min-h-[80vh]">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="text-center content-center">
                        <h2 className="text-3xl font-semibold uppercase text-dark page-title text-center mb-10 mx-auto">Reset Password</h2>
                        <div className="bg-white shadow-lg px-10 py-5 max-w-[500px] mx-auto">
                            <div className="text-center mb-5">
                                <img src="/assets/images/lab-logo.png" alt="" className="w-[100px] mx-auto" />
                            </div>
                            <form onSubmit={(e) => handlesubmit(e)}>
                                <div className="form-group mb-3 relative">
                                    <label htmlFor="password" className="text-left text-sm font-semibold inline-block w-full mb-2">Password</label>
                                    <input type={`${passTogle[0] ? "text" : "password"}`} className={`peer w-full border py-4 pr-12 pl-12 text-sm font-semibold focus:border-primary ${formErrors?.password ? "border-red-500" : "border-[#E4DFDF]"}`} id="password" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none" className={`absolute top-[48px] left-[4%] peer-focus:text-primary transition-colors duration-200 ${formErrors?.password ? "text-red-500" : "text-[#807A7A]"}`}>
                                        <path d="M12.8702 7.54742V5.5445C12.8702 3.20014 10.969 1.29891 8.62465 1.29891C6.28029 1.28865 4.37159 3.18055 4.36133 5.52584V5.5445V7.54742" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.1794 18.5572H5.0512C3.09772 18.5572 1.51367 16.9741 1.51367 15.0197V11.0185C1.51367 9.06411 3.09772 7.48099 5.0512 7.48099H12.1794C14.1329 7.48099 15.717 9.06411 15.717 11.0185V15.0197C15.717 16.9741 14.1329 18.5572 12.1794 18.5572Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M8.61586 11.9832V14.0552" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="absolute top-[50px] right-[4%] cursor-pointer text-[#3333337a]" 
                                        onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 0 ? !val : val))
                                        )}
                                    >
                                        {passTogle[0] ?
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" id="Outline" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor"></path></g></svg>
                                        }
                                    </span>
                                    {formErrors?.password && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formErrors?.password}</p>}
                                </div>
                                <div className="form-group mb-3 relative">
                                    <label htmlFor="cpassword" className="text-left text-sm font-semibold inline-block w-full mb-2">Confirm Password</label>
                                    <input type={`${passTogle[1] ? "text" : "password"}`} className={`peer w-full border py-4 pr-12 pl-12 text-sm font-semibold focus:border-primary ${formErrors?.password_confirmation ? "border-red-500" : "border-[#E4DFDF]"}`} id="cpassword" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none" className={`absolute top-[48px] left-[4%] peer-focus:text-primary transition-colors duration-200 ${formErrors?.password_confirmation ? "text-red-500" : "text-[#807A7A]"}`}>
                                        <path d="M12.8702 7.54742V5.5445C12.8702 3.20014 10.969 1.29891 8.62465 1.29891C6.28029 1.28865 4.37159 3.18055 4.36133 5.52584V5.5445V7.54742" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12.1794 18.5572H5.0512C3.09772 18.5572 1.51367 16.9741 1.51367 15.0197V11.0185C1.51367 9.06411 3.09772 7.48099 5.0512 7.48099H12.1794C14.1329 7.48099 15.717 9.06411 15.717 11.0185V15.0197C15.717 16.9741 14.1329 18.5572 12.1794 18.5572Z" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M8.61586 11.9832V14.0552" stroke="currentColor" strokeWidth="1.52655" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="absolute top-[50px] right-[4%] cursor-pointer text-[#3333337a]"
                                        onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 1 ? !val : val))
                                        )}
                                    >
                                        {passTogle[1] ?
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" id="Outline" fill="currentColor"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><g id="_01_align_center" data-name="01 align center" fill="currentColor"><path d="M23.821,11.181v0a15.736,15.736,0,0,0-4.145-5.44l3.032-3.032L21.293,1.293,18,4.583A11.783,11.783,0,0,0,12,3C4.5,3,1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64,15.736,15.736,0,0,0,4.145,5.44L1.293,21.293l1.414,1.414L6,19.417A11.783,11.783,0,0,0,12,21c7.5,0,10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM2,12.011C2.75,10.366,5.693,5,12,5a9.847,9.847,0,0,1,4.518,1.068L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92L5.754,16.832A13.647,13.647,0,0,1,2,12.011ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm3,7a9.847,9.847,0,0,1-4.518-1.068l1.765-1.765a4.992,4.992,0,0,0,6.92-6.92l2.078-2.078A13.584,13.584,0,0,1,22,12C21.236,13.657,18.292,19,12,19Z" fill="currentColor"></path></g></svg>
                                        }
                                    </span>
                                    {formErrors?.password_confirmation && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formErrors?.password_confirmation}</p>}
                                </div>
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
                                        <span className="relative z-1 flex gap-2 items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-4 h-4"><path d="M24,5.5v13c0,3.03-2.47,5.5-5.5,5.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c1.38,0,2.5-1.12,2.5-2.5V5.5c0-1.38-1.12-2.5-2.5-2.5h-2c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h2c3.03,0,5.5,2.47,5.5,5.5Zm-6,6.5c0-.94-.36-1.81-1-2.45l-4.41-4.59c-.58-.6-1.52-.62-2.12-.04-.6,.57-.62,1.52-.04,2.12l3.33,3.46H1.5c-.83,0-1.5,.67-1.5,1.5s.67,1.5,1.5,1.5H13.75l-3.33,3.46c-.57,.6-.56,1.55,.04,2.12,.29,.28,.67,.42,1.04,.42,.39,0,.79-.15,1.08-.46l4.39-4.56c.66-.66,1.03-1.54,1.03-2.48Z" fill="currentColor" /></svg>
                                             Reset
                                        </span>
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
