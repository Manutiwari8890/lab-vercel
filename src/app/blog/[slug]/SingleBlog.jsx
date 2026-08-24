"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SingleBlog({initData}) {
    const [blogDetial, setBlogDetail] = useState(initData);
    return (
        <>
            <section className="py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:gap-10">
                        <div className="col-span-1">
                            <div className="relative">
                                <div className="blog-img sticky top-[95px]">
                                    <Image src={blogDetial?.image_url} alt={blogDetial?.title} width={350} height={350} className="w-full h-auto mb-5" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="flex justify-between gap-5 items-start border-b-1 border-gray-300 pb-3 mb-3 flex-col-reverse md:gap-15 md:flex-row xl:pb-5 xl:mb-5">
                                <div className="text-left flex-1">
                                    <h2 className="text-xl leading-8 font-semibold mb-2 xl:text-3xl xl:leading-11 xl:mb-4">{blogDetial?.title}</h2>
                                    <p className="text-lg text-gray-500 font-semibold">On {new Date(blogDetial?.updated_at)?.toLocaleDateString("en-GB", {
                                        "weekday": "long",
                                        "month": "long",
                                        "day": "2-digit",
                                        "year": "numeric"
                                    })}</p>
                                </div>
                                <div className="text-right">
                                    <Link href="/blog" className="text-xs font-bold uppercase text-white btn btn-primary py-3 px-5 bg-primary mt-2 inline-block">
                                        <span className="relative z-1 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 relative z-1 m-auto"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor"></path></svg>
                                            Back
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <ul className="flex items-center gap-3 ">
                                <li className="font-medium text-lg xl:text-xl">Share : </li>
                                <li>
                                    <a className="inline-block text-primary w-[30px] h-[30px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110 xl:w-[40px] xl:h-[40px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto"><path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" fill="currentColor"></path></svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="inline-block text-primary w-[30px] h-[30px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110 xl:w-[40px] xl:h-[40px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" data-name="Capa 1" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" fill="currentColor"></path></svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="inline-block text-primary w-[30px] h-[30px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110 xl:w-[40px] xl:h-[40px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" className="w-5 h-5 m-auto"><g><path d="M12,2.162c3.204,0,3.584,0.012,4.849,0.07c1.308,0.06,2.655,0.358,3.608,1.311c0.962,0.962,1.251,2.296,1.311,3.608   c0.058,1.265,0.07,1.645,0.07,4.849c0,3.204-0.012,3.584-0.07,4.849c-0.059,1.301-0.364,2.661-1.311,3.608   c-0.962,0.962-2.295,1.251-3.608,1.311c-1.265,0.058-1.645,0.07-4.849,0.07s-3.584-0.012-4.849-0.07   c-1.291-0.059-2.669-0.371-3.608-1.311c-0.957-0.957-1.251-2.304-1.311-3.608c-0.058-1.265-0.07-1.645-0.07-4.849   c0-3.204,0.012-3.584,0.07-4.849c0.059-1.296,0.367-2.664,1.311-3.608c0.96-0.96,2.299-1.251,3.608-1.311   C8.416,2.174,8.796,2.162,12,2.162 M12,0C8.741,0,8.332,0.014,7.052,0.072C5.197,0.157,3.355,0.673,2.014,2.014   C0.668,3.36,0.157,5.198,0.072,7.052C0.014,8.332,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.085,1.853,0.603,3.7,1.942,5.038   c1.345,1.345,3.186,1.857,5.038,1.942C8.332,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072   c1.854-0.085,3.698-0.602,5.038-1.942c1.347-1.347,1.857-3.184,1.942-5.038C23.986,15.668,24,15.259,24,12   c0-3.259-0.014-3.668-0.072-4.948c-0.085-1.855-0.602-3.698-1.942-5.038c-1.343-1.343-3.189-1.858-5.038-1.942   C15.668,0.014,15.259,0,12,0z" fill="currentColor"></path><path d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.162,6.162,6.162s6.162-2.759,6.162-6.162   C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z" fill="currentColor"></path><circle cx="18.406" cy="5.594" r="1.44" fill="currentColor"></circle></g></svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="inline-block text-primary w-[30px] h-[30px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110 xl:w-[40px] xl:h-[40px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve" className="w-5 h-5 m-auto"><g id="XMLID_184_"><path d="M23.498,6.186c-0.276-1.039-1.089-1.858-2.122-2.136C19.505,3.546,12,3.546,12,3.546s-7.505,0-9.377,0.504   C1.591,4.328,0.778,5.146,0.502,6.186C0,8.07,0,12,0,12s0,3.93,0.502,5.814c0.276,1.039,1.089,1.858,2.122,2.136   C4.495,20.454,12,20.454,12,20.454s7.505,0,9.377-0.504c1.032-0.278,1.845-1.096,2.122-2.136C24,15.93,24,12,24,12   S24,8.07,23.498,6.186z M9.546,15.569V8.431L15.818,12L9.546,15.569z" fill="currentColor"></path></g></svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="inline-block text-primary w-[30px] h-[30px] text-sm text-center content-center border-1 border-primary hover:bg-primary hover:text-white hover:scale-110 xl:w-[40px] xl:h-[40px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 m-auto"><path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" fill="currentColor"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="py-2 server-data mt-4 md:mt-0 xl:py-4">
                        <div dangerouslySetInnerHTML={{ __html: blogDetial?.content }}></div>
                    </div>
                </div>
            </section>
        </>
    )
}
