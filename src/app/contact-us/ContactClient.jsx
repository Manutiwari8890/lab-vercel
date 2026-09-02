"use client"

import Link from "next/link";
import { useState, useEffect, useContext  } from "react";
import { useToast } from "@/context/ToastContext";
import CanvasCaptcha from "@/components/CanvasCaptcha";

export default function ContactClient()
{
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);
    
    const {showToast} = useToast();
    const [contact, setContact] = useState(
        {
            name: "",
            tel: "",
            email: "",
            subject: "",
            message: "",
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



    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = FormValidate(contact);
        setFormErrors(errors);

        if (Object.keys(errors).length <= 0) {
            setLoading(true);
            fetch(`${baseUrl}contact-us`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({...contact, "cf-turnstile-response" : null})
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
                })
                setCaptchaInput("")
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
        if (captchaInput !== captcha) {
            error.captcha = "Captcha is required"
            setReloadCaptcha(prev => prev+1)
            setCaptchaInput("")
        }
        return error
    }
    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">Contact Us</h2>
                    <div className="grid grid-cols-1 gap-5 mb-10 md:grid-cols-3 xl:mb-20">
                        <div className="group bg-white shadow-sm px-4 py-8 text-center content-center hover:shadow-lg lg:px-10 hover:scale-102">
                            <div className="bg-primary text-center content-center rounded-full w-[100px] h-[100px] text-white text-4xl mx-auto group-hover:bg-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-9 h-9 m-auto"><path d="M11.986,1.002C7.159,1.068,2.309,5.81,2.309,10.457c0,6.416,8.773,12.146,9.145,12.382,.472,.301,.942,.104,1.112-.012,.368-.252,9.021-6.25,9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm2.826,12.129c-.94,.94-1.865,1.4-2.817,1.4-.076,0-.152-.003-.229-.009-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758,0-5.624,1.867-1.866,3.758-1.865,5.625,0,1.865,1.867,1.865,3.759,0,5.624Z" fill="currentColor"></path><path d="M12.018,8.108c-.409,0-.85,.246-1.416,.812-1.196,1.196-.966,1.829,0,2.796,.518,.519,.949,.783,1.316,.812,.416,.045,.909-.24,1.479-.812,1.195-1.195,.966-1.829,0-2.796-.508-.509-.925-.812-1.379-.812Z" fill="currentColor"></path></svg>
                            </div>
                            <h4 className="my-4 text-lg font-semibold lg:text-xl xl:text-2xl">Our Location</h4>
                            <p className="text-base font-medium">16 Evesboro-Medford Road , Unit A1 Medford, NJ 08055</p>
                        </div>
                        <div className="group bg-white shadow-sm px-4 py-8 text-center content-center hover:shadow-lg lg:px-10 hover:scale-102">
                            <div className="bg-primary text-center content-center rounded-full w-[100px] h-[100px] text-white text-4xl mx-auto group-hover:bg-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-9 h-9 m-auto"><path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" fill="currentColor"></path></svg>
                            </div>
                            <h4 className="my-4 text-lg font-semibold lg:text-xl xl:text-2xl">Our Email Address</h4>
                            <Link href="mailto:sales@labdisposable.com" className="text-base font-medium hover:text-secondary">sales@labdisposable.com</Link>
                        </div>
                        <div className="group bg-white shadow-sm px-4 py-8 text-center content-center hover:shadow-lg lg:px-10 hover:scale-102">
                            <div className="bg-primary text-center content-center rounded-full w-[100px] h-[100px] text-white text-4xl mx-auto group-hover:bg-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-9 h-9 m-auto"><path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" fill="currentColor"></path></svg>
                            </div>
                            <h4 className="my-4 text-lg font-semibold lg:text-xl xl:text-2xl">Contact Phone Number</h4>
                            <Link href="tel:1-973-335-2966" className="text-base font-medium mb-1 hover:text-secondary">1-973-335-2966</Link><br />
                            <Link href="tel:1-800-332-LAB1" className="text-base font-medium hover:text-secondary">1-800-332-LAB1</Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-y-10 gap-5 md:grid-cols-2 lg:gap-10">
                        <div className="w-full grayscale order-2 md:order-0">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9993.342811559152!2d-74.34792971438834!3d40.932078513879745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3042373aaac89%3A0x46e9007b6c2daff8!2sLaboratory%20Disposable%20Products%20Inc!5e0!3m2!1sen!2sin!4v1705084150080!5m2!1sen!2sin" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-[645px]"></iframe>
                        </div>
                        <div className="bg-[#FAFAFA] p-4 shadow-sm border-t-3 border-dark md:p-8">
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
                                        <textarea maxLength="200"  className={`w-full border py-4 px-4 text-sm font-semibold focus:border-primary ${formError?.message ? "border-red-500" : "border-[#afafaf]"}`} id="message" name="message" placeholder="Your Message" value={contact.message} onChange={handleContact} ></textarea>
                                        {formError?.message && <p className="text-sm font-semibold text-red-500 text-left mt-1">{formError?.message}</p>}
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
                                    <div className="form-group pt-8">
                                        <div className="w-max flex gap-2 w-full overflow-hidden">
                                            <CanvasCaptcha reloadTrigger={reloadCaptcha} onChange={setCaptcha} />
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
                    </div>
                </div>
            </section>
        </>
    )
}
