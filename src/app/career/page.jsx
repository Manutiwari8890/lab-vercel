"use client";
import { useState, useEffect } from 'react'
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
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:mb-10 md:text-3xl xl:mb-15">Career</h2>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:gap-15">
                        <div className="img-area">
                            <img src="/assets/images/career.webp" className="w-full" alt="" />
                        </div>
                        <div className="p-2 relative pt-18 xl:pl-4 xl:pt-20">
                            <span className="text-7xl font-bold text-dark/10 absolute top-[-1%] xl:text-8xl xl:top-[-3%]">01</span>
                            <h3 className="text-2xl content-center font-semibold text-primary mb-3 xl:mb-6"> Office Assistant</h3>
                            <p className="text-base text-gray-500 text-justify mb-5 xl:text-lg">Laboratory Disposable Products (LDP) is a small but fast growing company that needs a reliable, organized Office Assistant to manage the day-to-day administrative aspects of running the business. The successful applicant will have a positive attitude, a desire to work as efficiently as possible, and excellent client-facing communication skills. If you have worked in a fast-paced office in the past and you enjoy establishing your own organizational systems, we’re excited to talk with you. This job may include some overtime as well as occasional weekend work. We’re looking for someone who can operate effectively with little or no supervision and who can manage multiple tasks at once without becoming overwhelmed.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-2 xl:gap-4">
                                    <div className="form-group mb-1 relative xl:mb-3">
                                        <label htmlFor="fname" className="text-left text-sm font-semibold inline-block w-full mb-2">First Name</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="fname" placeholder="Your First Name" />
                                    </div>
                                    <div className="form-group mb-1 relative xl:mb-3">
                                        <label htmlFor="lname" className="text-left text-sm font-semibold inline-block w-full mb-2">Last Name</label>
                                        <input type="text" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="lname" placeholder="Your Last Name" />
                                    </div>
                                    <div className="form-group mb-1 relative xl:mb-3">
                                        <label htmlFor="email" className="text-left text-sm font-semibold inline-block w-full mb-2">Email</label>
                                        <input type="email" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="email" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group mb-1 relative xl:mb-3">
                                        <label htmlFor="tel" className="text-left text-sm font-semibold inline-block w-full mb-2">Contact Number</label>
                                        <input type="tel" className="w-full border border-[#afafaf] py-4 px-4 text-sm font-semibold focus:border-primary" id="tel" placeholder="Your Contact Number" />
                                    </div>
                                    <div className="flex items-center justify-center w-full col-span-2 mb-1 xl:mb-3">
                                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 hover:bg-gray-100 group">
                                            <div className="flex flex-col items-center justify-center pt-3 pb-3 xl:pt-5 xl:pb-6">
                                                <svg className="w-6 h-6 mb-2 text-gray-500 group-hover:text-primary xl:w-8 xl:h-8 xl:mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400 xl:mb-2"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" />
                                        </label>
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
                                    <span className="relative z-1 flex justify-center items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" className="w-4 h-4 mr-2 -rotate-90">
                                            <g>
                                                <path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor" />
                                                <path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor" />
                                            </g>
                                        </svg>
                                        Submit
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
