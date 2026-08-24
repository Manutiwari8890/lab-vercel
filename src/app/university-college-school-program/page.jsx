"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import CanvasCaptcha from '@/components/CanvasCaptcha';

export default function Page() {
    const [captchaInput, setCaptchaInput] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [reloadCaptcha, setReloadCaptcha] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaInput !== captcha) {
            setReloadCaptcha(prev => prev + 1)
            setCaptchaInput("")
        }
    }

    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">University College School Program</h2>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:gap-15">
                        <div className="relative xl:pl-4 xl:pr-2">
                            <p className="text-base text-gray-500 text-justify mb-2 xl:mb-3">Partner with Us for Unbeatable Value! Our University College School Program (UCSP) offers discounted pricing on a wide range of laboratory supplies and equipment, tailored specifically for educational institutions.</p>
                            <p className="text-base text-gray-500 text-justify mb-6 md:mb-3 xl:mb-5">Ready to Save? Apply for Our University College School Program (UCSP) Today to Enroll and Start Enjoying Exceptional Discounts on offerings by Laboratory Disposable Products.</p>
                            <h3 className="text-2xl mx-auto font-semibold text-dark mb-4 md:mb-3 xl:mb-5">Apply Now</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4 gap-y-2 xl:gap-y-3">
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="fname" placeholder="Your First Name" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="lname" placeholder="Your Last Name" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                        <input type="email" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="email" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                        <input type="tel" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="tel" placeholder="Your Contact Number" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="company" className="text-left text-sm font-semibold inline-block w-full mb-2">Company Name</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="company" placeholder="Company Name" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="street" className="text-left text-sm font-semibold inline-block w-full mb-2">Street</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="street" placeholder="Street" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="city" className="text-left text-sm font-semibold inline-block w-full mb-2">City</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="city" placeholder="City Name" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="state" className="text-left text-sm font-semibold inline-block w-full mb-2">State</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="state" placeholder="State" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="zip" className="text-left text-sm font-semibold inline-block w-full mb-2">ZIP Code</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="zip" placeholder="ZIP Code" />
                                    </div>
                                    <div className="form-group mb-1 relative">
                                        <label htmlFor="comments" className="text-left text-sm font-semibold inline-block w-full mb-2">Comments</label>
                                        <textarea className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="comments" placeholder="Comments"></textarea>
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
                                <button className="text-sm font-bold uppercase text-white btn btn-primary py-4 px-5 bg-primary btn-scale-0 mt-2 w-full cursor-pointer">
                                    <span className="relative z-1 flex items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" className="w-4 h-4 mr-2 -rotate-90"><g><path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor"></path><path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor"></path></g></svg>
                                        Submit
                                    </span>
                                </button>
                            </form>
                        </div>
                        <div className="img-area -order-1 md:order-1">
                            <img src="/assets/images/universityProgram.jpg" className="w-full" alt="" />
                        </div>
                    </div>
                    <h2 className="text-2xl mx-auto font-semibold text-dark page-title mb-10 mt-15">Brands We Deal In</h2>
                    <div className="grid grid-cols-4 gap-5 md:grid-cols-5 lg:grid-cols-8">
                        <Link href={`/brand/accuris`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/Accuris-Inst-Logo-300x143.png" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/adam-equipment`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/adamequipment_brandlogo.jpg" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/ahlstrom-munksjo`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/Ahlstrom-Munksjo_brandlogo.jpg" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/amcor`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/Amcor_brandlogo.jpg" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/ansell`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/Ansell_brandlogo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/bd-med`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/BD_brandlogo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/bel-art`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/spbelart_brandlogo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/benchmark-scientific`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/benchmark_brandlogo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/bioplast`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/BioPlast_Distrubutor-Logo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/biotc-labware`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/biotc_brandlogo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/borosil`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/Borosil_brandlogo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/brandtech`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/BrandTech_Distrubutor-Logo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/celltreat-scientific`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/cellTreatScientific_brandlogo.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/chemier`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/ChemieR_logos.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/chlorax`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/clorox.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/axygen`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/CorningAxygen_Distrubutor.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/corning-biologics`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/CorningBiological.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/corning-falcon`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/CorningFalcon.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/corning-glass`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/CorningGlass.webp" className="group-hover:scale-105" />
                        </Link>
                        <Link href={`/brand/corning-gosselin`} className="group img-area border border-gray-300 p-3 grayscale-200 hover:border-primary hover:grayscale-0 content-center">
                            <img src="/assets/images/CorningGosselin.webp" className="group-hover:scale-105" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
