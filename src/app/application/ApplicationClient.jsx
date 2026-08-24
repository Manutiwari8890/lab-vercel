"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";


export default function ApplicationClient() {

    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRefs = useRef(
        Array.from({ length: 5 }, () => useRef(null))
    );
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setActiveIndex(Number(entry.target.dataset.index));
                    }
                });
            },
            { threshold: 0.5 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <section className="py-5 lg:py-10">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
                        <div className="img-area">
                            <img src="/assets/images/application.avif" alt="" className="w-full" />
                        </div>
                        <div className="text-left md:pl-5 xl:pl-15">
                            <h2 className="text-xl font-semibold uppercase text-dark page-title mb-2 lg:text-3xl lg:mb-5">Application</h2>
                            <h3 className="text-lg font-semibold leading-6 mb-3 lg:text-xl lg:leading-8"><span className="text-2xl text-secondary lg:text-4xl">Buy</span> Lab Products Based on Your Lab Application needs at Laboratory Disposable Products (LDP)</h3>
                            <p className="text-sm leading-7 text-gray-500 text-justify mb-3 lg:text-lg lg:leading-8">We comprehend how each laboratory is distinct in its ownership and serving application. This has driven us to offer a wide variety of lab products specific to the application including laboratory settings such as liquid handling, safety, cryogenic, microbiology, and sample preparation. At LDP, we take pride in ensuring maximum effectiveness and efficiency for every task through custom-tailored products that fit the specific conditions.</p>
                            <Link className="inline-block text-sm font-bold uppercase text-white btn btn-primary py-4 px-5 bg-primary mt-2" href="/product-category" ><span className="relative z-1">Shop Now</span></Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className="w-full bg-white h-[60px] relative z-1 clip-curve md:h-[50px] lg:h-[75px] xl:h-[100px]"></div>
            <section className="bg-[#020023] py-20 my-[-50px] min-h-[300px] lg:py-25">
                <div className="container px-3 mx-auto lg:px-5">
                    <h2 className="text-xl font-semibold uppercase text-white text-center mb-10 lg:text-2xl xl:3xl">Tailored Solutions for Diverse Laboratory Needs</h2>
                    <div className="grid grid-cols-9 gap-x-3 gap-y-4 md:gap-y-15 lg:gap-x-5" ref={sectionRefs.current[0]} data-index={0}>
                        <div className="col-span-8 pl-6 pt-6 md:col-span-4 md:pt-2 md:pl-0 md:pr-2 lg:pr-5 xl:pr-10">
                            <h4 className="text-white text-xl font-semibold mb-5 lg:text-2xl">Sample Preparation Products:</h4>
                            <p className="text-white text-sm text-justify leading-7 mb-5 md:mb-0 lg:text-base xl:text-lg xl:leading-8">Effective and precise sample preparation is the basis of successful outcomes in a laboratory. At LDP, our brands assist in maximizing accuracy and throughput with minimal errors through highly effective sample preparation products such as weighing boats and filter papers. Our products will help you no matter if you are preparing biological samples or conducting complicated chemical analyses since they are ensured to give dependable results every time.</p>
                        </div>
                        <div className="text-center relative -order-1 md:order-0">
                            <div className="bg-white w-[5px] h-full mx-auto mt-[15px]"></div>
                            <div className={`${activeIndex === 0 ? "bg-red-500" : "bg-primary"} w-[50px] h-[50px] absolute top-[14px] left-[14px] md:top-[12px] md:left-[-14%] lg:left-[12px] 2xl:left-[18%] xl:top-[15px] text-white text-center content-center text-2xl font-bold`}>1.</div>
                        </div>
                        <div className="col-span-9 img-area pl-[14px] md:col-span-4 md:py-5 xl:pr-5 ">
                            <img src="/assets/images/Sample-Preparation.avif" alt="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-9 gap-x-3 md:gap-y-4 md:gap-y-15 lg:gap-x-5" ref={sectionRefs.current[1]} data-index={1}>
                        <div className="col-span-9 img-area order-2 pl-[14px] md:pl-0 xl:pr-5 md:pb-5 md:pt-10 md:-order-1  md:col-span-4 xl:pt-20">
                            <img src="/assets/images/Liquid-handling-scaled.avif" alt="" />
                        </div>
                        <div className="text-center relative -order-1 md:order-0">
                            <div className="bg-white w-[5px] h-full mx-auto"></div>
                            <div className={`${activeIndex === 1 ? "bg-red-500" : "bg-primary"} w-[50px] h-[50px] absolute left-[14px] top-[40px] md:left-auto md:right-[-14%] lg:right-[12px] 2xl:right-[19%] xl:top-80px text-white text-center content-center text-2xl font-bold`}>2.</div>
                        </div>
                        <div className="col-span-8 pl-6 pt-12 md:pt-10 md:col-span-4 xl:pt-20 xl:pl-10">
                            <h4 className="text-white text-xl font-semibold mb-5 lg:text-2xl">Liquid Handling Products:</h4>
                            <p className="text-white text-sm text-justify leading-7 mb-8 md:mb-0 lg:text-base xl:text-lg xl:leading-8">The management of liquid substances is an important task in labs no matter the category. Our liquid handling lab products are crafted for both precision and ease of use, from multi-depth pipetting to delicate reagent pouring. Use devices like multichannel pipettors that ensure comfort without sacrificing precision. Check out our products to find out how all liquid handling processes can be carried out quickly and easily by incorporating these tools into your lab workflows.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-9 gap-x-3 md:gap-y-15 lg:gap-x-5" ref={sectionRefs.current[2]} data-index={2}>
                        <div className="col-span-8 pl-6 pt-12 mb-8 md:mb-3 md:pt-10 md:pl-0 xl:pr-10 md:col-span-4 xl:pt-20">
                            <h4 className="text-white text-xl font-semibold mb-5 lg:text-2xl">Microbiological Products:</h4>
                            <p className="text-white text-sm text-justify leading-7 lg:text-base xl:text-lg xl:leading-8">Microbiology laboratories often require different types of high-grade consumable materials that need to pass specific conditions. Our offerings include LDP culture tubes and Pasteur pipettes which are built to deliver dependable repeatable measurement results in completely varied microbiological tasks. Use our items for your quality control research because we offer unconditional compliance and quality.</p>
                        </div>
                        <div className="text-center relative -order-1 md:order-0">
                            <div className="bg-white w-[5px] h-full mx-auto "></div>
                            <div className={`${activeIndex === 2 ? "bg-red-500" : "bg-primary"} w-[50px] h-[50px] absolute top-[40px] left-[14px] md:top-[12px] md:left-[-14%] lg:left-[12px] 2xl:left-[18%] xl:top-[80px] text-white text-center content-center text-2xl font-bold`}>3.</div>
                        </div>
                        <div className="col-span-9 img-area pl-[14px] md:pb-5 md:pl-0 md:pt-10 md:col-span-4 xl:pr-5 xl:pt-20">
                            <img src="/assets/images/Microbiological.avif" alt="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-9 gap-x-3 md:gap-y-15 lg:gap-x-5" ref={sectionRefs.current[3]} data-index={3}>
                        <div className="col-span-9 img-area pl-[14px] md:pb-5 md:pl-0 md:pt-10 order-2 md:order-0 md:col-span-4 xl:pr-5 xl:pt-20">
                            <img src="/assets/images/Cryogenic.avif" alt="" />
                        </div>
                        <div className="text-center relative -order-1 md:order-0">
                            <div className="bg-white w-[5px] h-full mx-auto"></div>
                            <div className={`${activeIndex === 3 ? "bg-red-500" : "bg-primary"} w-[50px] h-[50px] absolute top-[40px] left-[14px] md:top-[40px] md:right-[12%] lg:right-[12px] 2xl:right-[19%] xl:top-[80px] text-white text-center content-center text-2xl font-bold`}>4.</div>
                        </div>
                        <div className="col-span-8 pt-10 pl-6 mb-8 md:mb-0 md:pl-2 md:col-span-4 xl:pr-10 xl:pt-20">
                            <h4 className="text-white text-xl font-semibold mb-5 lg:text-2xl">Cryogenic Equipment and Consumables:</h4>
                            <p className="text-white text-sm text-justify leading-7 lg:text-base xl:text-lg xl:leading-8">Use LDP when you require specialized lab equipment that delivers quality results under extreme temperatures. We have a line of cryogenic supplies that can endure rigorous temperature conditions while keeping your samples safe. Our handling tools and storage solutions are suitable for extremely low temperature test and storage conditions.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-9 gap-x-3 md:gap-y-15 lg:gap-x-5" ref={sectionRefs.current[4]} data-index={4}>
                        <div className="col-span-8 pt-10 pl-6 mb-8 md:pl-0 md:mb-0 md:col-span-4 xl:pr-10 xl:pt-20">
                            <h4 className="text-white text-xl font-semibold mb-5 lg:text-2xl">Securing Laboratory Productivity Through Safety Products:</h4>
                            <p className="text-white text-sm text-justify leading-7 lg:text-base xl:text-lg xl:leading-8">The work that happens in laboratories is both sensitive and intricate and needs to be accompanied by the right safety precautions. Here at LDP, we have a great selection of safety products, from personal protective equipment to corrective and preventive spill control kits. Such items are critical for LDP because they contribute towards the safe use of laboratories. By using the right safety gear, employees working in sensitive fields such as medicine will not only be protected while working but so will the sensitive machinery and experiments. With LDP, you will be able to put up a protective environment that enables trustworthy and healthy scientific activity.</p>
                        </div>
                        <div className="text-center relative -order-1 md:order-0">
                            <div className="bg-white w-[5px] h-full mx-auto "></div>
                            <div className={`${activeIndex === 4 ? "bg-red-500" : "bg-primary"} w-[50px] h-[50px] absolute top-[40px] left-[14px] md:top-[40px] md:left-[-10px] lg:left-[12px] 2xl:left-[18%] xl:top-[80px] text-white text-center content-center text-2xl font-bold`}>5.</div>
                        </div>
                        <div className="col-span-9 img-area pl-[14px] md:pl-0 md:pt-10 md:col-span-4 xl:pr-5 pb-5 xl:pt-20">
                            <img src="/assets/images/Safety.avif" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <div className="w-full bg-white h-[50px] relative z-1 clip-curve-reverse lg:h-[75px] xl:h-[100px]"></div>
            <section className="xl:pb-5">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-xl font-semibold uppercase text-dark page-title mb-10 mx-auto md:mb-15 md:text-3xl">Reasons to Select LDP Lab Products</h2>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex gap-5 items-start">
                            <div className="bg-primary text-white w-[75px] h-[75px] rounded-full text-center content-center lg:w-[100px] lg:h-[100px] xl:w-[125px] xl:h-[125px]">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1" className="w-[50px] h-[50px] m-auto xl:w-[75px] xl:h-[75px]"><path d="m23.99 19.048c-.039-.357-.2-.694-.454-.951l-3.593-3.593c-.013-.135-.008-.272-.039-.406-.12-.527.122-1.088.601-1.397.89-.569 1.486-1.621 1.469-2.7.016-1.084-.577-2.133-1.47-2.704-.479-.309-.72-.87-.601-1.396.122-.532.104-1.081-.054-1.63-.296-1.03-1.119-1.852-2.147-2.146-.547-.157-1.095-.175-1.628-.055-.523.121-1.087-.121-1.396-.6-.29-.448-.684-.812-1.171-1.083-.937-.519-2.1-.519-3.037 0-.488.271-.882.636-1.171 1.084-.309.479-.872.721-1.396.6-.533-.12-1.081-.102-1.628.055-1.029.295-1.852 1.117-2.147 2.147-.157.548-.176 1.096-.055 1.629.12.526-.121 1.087-.6 1.396-.892.57-1.485 1.619-1.469 2.7-.016 1.086.575 2.132 1.47 2.704.479.309.72.87.6 1.396-.032.14-.028.283-.04.425l-3.572 3.576c-.253.255-.414.592-.453.949-.096.873.536 1.661 1.409 1.758l1.598.177.176 1.583c.061.793.797 1.451 1.589 1.434.417 0 .826-.164 1.122-.467l4.188-4.193c.519.448 1.224.661 1.897.662.678 0 1.386-.218 1.907-.67l4.197 4.197c.299.307.709.472 1.127.472.789.016 1.526-.642 1.587-1.428l.176-1.59 1.598-.177c.873-.097 1.504-.885 1.409-1.757zm-18.799 3.782c-.155.16-.395.212-.613.134-.215-.074-.371-.274-.391-.502l-.265-2.385-2.393-.266c-.325-.036-.561-.33-.525-.655.015-.133.074-.259.167-.352l2.991-2.996c.315.99 1.111 1.779 2.112 2.065.548.157 1.097.177 1.628.055.586-.144 1.153.196 1.482.702l-4.193 4.199zm7.831-4.093c-.628.349-1.44.349-2.067 0-.343-.189-.617-.442-.816-.751-.442-.686-1.192-1.088-1.967-1.088-.547.029-1.064.211-1.623.014-.69-.197-1.263-.771-1.461-1.46-.11-.385-.124-.766-.041-1.132.212-.935-.203-1.922-1.033-2.458-.612-.395-1.024-1.109-1.012-1.864-.012-.75.402-1.468 1.012-1.86.831-.536 1.246-1.523 1.033-2.458-.083-.366-.069-.747.041-1.132.198-.69.771-1.263 1.461-1.461.385-.109.766-.123 1.131-.041.934.213 1.923-.202 2.458-1.033.199-.309.473-.562.815-.751.628-.349 1.439-.348 2.067 0 .342.19.617.443.816.751.535.831 1.522 1.243 2.458 1.033.366-.083.747-.069 1.131.041.69.197 1.264.771 1.462 1.46.11.385.124.766.04 1.132-.212.935.204 1.922 1.033 2.458.611.393 1.025 1.111 1.012 1.864.013.749-.403 1.469-1.012 1.86-.83.535-1.246 1.523-1.033 2.458.083.366.07.747-.041 1.131-.198.69-.772 1.264-1.462 1.461-.384.11-.765.123-1.131.041-.936-.21-1.923.203-2.458 1.033-.2.309-.474.562-.816.751zm9.449 1.074-2.393.266-.266 2.391c-.021.224-.179.425-.395.498-.215.075-.454.023-.613-.14l-4.204-4.204c.327-.505.898-.834 1.475-.693.532.12 1.08.103 1.628-.055 1.005-.288 1.805-1.082 2.118-2.078l3.007 3.007c.094.095.154.221.168.354.036.325-.2.618-.525.654zm-5.448-11.21.01-1.601h-4.042l.484-1.49c.036-.208.034-.389-.006-.536-.208-.761-.976-1.162-1.719-.856-.232.097-.42.282-.651.558l-1.887 2.324h-1.012c-.662 0-1.2.539-1.2 1.2v4.6c0 .662.539 1.2 1.2 1.2h7.707zm-9.023 4.199v-4.6c0-.11.09-.2.2-.2h.8v5h-.8c-.11 0-.2-.09-.2-.2zm2 .2v-5.384l2.072-2.584c.21-.197.488-.067.435.237l-.895 2.73h4.421v.449l-.94 4.551h-5.093z" fill="currentColor" /></svg>
                            </div>
                            <div className="pt-2 flex-1">
                                <h3 className="text-xl font-semibold mb-2 lg:text-2xl xl:text-3xl xl:mb-5">Quality and Compliance</h3>
                                <p className="text-base leading-6 text-gray-500 text-justify lg:text-lg lg:leading-8 xl:text-xl">From liquid handling to a variety of cryogenic supplies, all our lab products are designed and manufactured to meet the strictest industry standards to guarantee optimal performance and dependability in all your crucial laboratory processes.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 items-start ">
                            <div className="bg-primary text-white  w-[75px] h-[75px] rounded-full text-center content-center lg:w-[100px] lg:h-[100px] xl:w-[125px] xl:h-[125px]">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1" className="w-[50px] h-[50px] m-auto xl:w-[75px] xl:h-[75px]"><path d="M23.636,10.281l-1.197-2.236c-.439-.821-1.4-1.209-2.291-.92l-8.147,2.657L3.853,7.125c-.893-.29-1.852,.099-2.291,.92L.376,10.26c-.412,.685-.49,1.508-.213,2.258,.276,.75,.871,1.325,1.629,1.578l.21,.07-.006,3.621c0,1.941,1.235,3.658,3.077,4.272l4.862,1.621c.663,.221,1.359,.331,2.056,.331s1.393-.11,2.056-.331l4.866-1.622c1.843-.614,3.082-2.329,3.083-4.267v-3.625l.212-.071c.758-.253,1.353-.828,1.629-1.578,.277-.75,.199-1.573-.201-2.236ZM1.101,12.172c-.171-.464-.123-.973,.145-1.418l1.197-2.236c.164-.307,.48-.487,.813-.487,.095,0,.191,.015,.286,.046l7.719,2.517-1.972,3.635c-.387,.645-1.156,.931-1.867,.69l-5.313-1.771c-.469-.156-.836-.512-1.008-.975Zm10.384,10.816c-.419-.038-.833-.124-1.233-.258l-4.862-1.621c-1.433-.478-2.395-1.812-2.394-3.322l.005-3.288,4.104,1.368c.274,.091,.553,.135,.827,.135,.89,0,1.735-.463,2.225-1.279l1.334-2.457-.006,10.722Zm9.511-5.197c0,1.507-.965,2.84-2.399,3.317l-4.866,1.622c-.404,.135-.823,.221-1.246,.259l.006-10.758,1.362,2.51c.48,.802,1.323,1.261,2.212,1.261,.275,0,.555-.044,.829-.135l4.102-1.367v3.291Zm1.903-5.619c-.172,.463-.539,.818-1.008,.975l-5.313,1.771c-.715,.239-1.481-.047-1.856-.672l-1.982-3.653,7.719-2.517c.428-.141,.889,.048,1.1,.441l1.209,2.258c.256,.424,.304,.933,.133,1.396ZM4.759,5.851c-.193-.196-.191-.514,.006-.707L9.547,.437c.58-.582,1.532-.583,2.118,.003l1.885,1.885c.568-.508,1.515-.493,2.063,.055l2.754,2.753c.195,.195,.195,.512,0,.707-.195,.195-.512,.195-.707,0l-2.754-2.753c-.195-.195-.512-.195-.707,0l-4.349,4.27c-.098,.096-.225,.144-.351,.144-.13,0-.259-.05-.356-.149-.193-.197-.19-.514,.006-.707l3.686-3.619-1.878-1.878c-.195-.195-.512-.195-.707,0L5.466,5.856c-.098,.096-.224,.144-.351,.144-.129,0-.259-.05-.356-.149Z" fill="currentColor" /></svg>
                            </div>
                            <div className="pt-2 flex-1">
                                <h3 className="text-xl font-semibold mb-2 xl:text-3xl lg:text-2xl xl:mb-5">Wide Product Range</h3>
                                <p className="text-base leading-6 text-gray-500 text-justify lg:text-lg lg:leading-8 xl:text-xl">LDP offers a diverse catalog, at times even including odd-shaped lab products that might be hard to find. No matter if you are buying cryogenic equipment, microbiological supplies, or general lab safety equipment, we never compromise on quality.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 items-start ">
                            <div className="bg-primary text-white  w-[75px] h-[75px] rounded-full text-center content-center lg:w-[100px] lg:h-[100px] xl:w-[125px] xl:h-[125px]">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1" className="w-[50px] h-[50px] m-auto xl:w-[75px] xl:h-[75px]"><path d="m22.9 18.8c-1.166 1.556-2.545 2.935-4.101 4.101-.178.133-.422.133-.6 0-1.556-1.166-2.935-2.545-4.101-4.101-.165-.221-.12-.534.101-.7.22-.165.534-.12.7.101.903 1.204 1.947 2.289 3.1 3.253v-19.954c0-.276.224-.5.5-.5s.5.224.5.5v19.953c1.153-.963 2.197-2.049 3.1-3.253.167-.221.481-.265.7-.101.221.166.266.479.101.7zm-10.434 1.152c-.466.031-.953.048-1.466.048-6.477 0-9-2.523-9-9s2.523-9 9-9c1.75 0 3.173.181 4.349.554.267.082.545-.062.628-.325s-.062-.545-.325-.628c-1.276-.404-2.797-.601-4.651-.601-7.104 0-10.001 2.897-10.001 10s2.897 10 10 10c.536 0 1.047-.017 1.534-.05.275-.019.483-.257.465-.533-.018-.275-.255-.482-.533-.465zm-1.462-9.82c-.968 0-1.671-.634-1.671-1.508 0-.896.771-1.624 1.719-1.624.73 0 1.383.438 1.624 1.089.096.26.385.394.642.296.26-.096.392-.383.296-.642-.334-.905-1.153-1.55-2.113-1.705v-.538c0-.276-.224-.5-.5-.5s-.5.224-.5.5v.555c-1.235.247-2.167 1.305-2.167 2.569 0 1.43 1.148 2.508 2.671 2.508 1.066 0 1.934.868 1.934 1.935s-.867 1.934-1.934 1.934c-1.018 0-1.865-.794-1.93-1.808-.017-.274-.233-.495-.531-.467-.275.018-.484.255-.467.531.088 1.367 1.115 2.466 2.426 2.695l-.002.547c0 .276.222.501.498.502h.002c.275 0 .499-.223.5-.498l.002-.552c1.38-.238 2.435-1.437 2.435-2.883 0-1.618-1.316-2.935-2.934-2.935z" fill="currentColor" /></svg>
                            </div>
                            <div className="pt-2 flex-1">
                                <h3 className="text-xl font-semibold mb-2 lg:text-2xl xl:text-3xl xl:mb-5">Affordable Pricing</h3>
                                <p className="text-base leading-6 text-gray-500 text-justify lg:text-lg lg:leading-8 xl:text-xl">We work tirelessly at LDP to ensure that while you receive the tools necessary for your lab within budget, the value of our products remains uncompromised. This commitment extends to our pricing structures and every single one of our lab products.</p>
                            </div>
                        </div>
                        <div className="flex gap-5 items-start ">
                            <div className="bg-primary text-white  w-[75px] h-[75px] rounded-full text-center content-center lg:w-[100px] lg:h-[100px] xl:w-[125px] xl:h-[125px]">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 24 24" data-name="Layer 1" className="w-[50px] h-[50px] m-auto xl:w-[75px] xl:h-[75px]"><path d="m13.102,6.543l1.942-1.941c.294-.294.457-.686.457-1.102s-.162-.808-.457-1.102l-1.941-1.942c-.589-.589-1.615-.589-2.204,0h0l-1.942,1.941c-.294.294-.457.686-.457,1.102s.162.808.457,1.102l1.941,1.942c.172.172.378.299.602.375v1.62c-1.555.241-2.75,1.589-2.75,3.211s1.195,2.97,2.75,3.211v2.039h-.5c-1.103,0-2,.897-2,2v2c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2c0-1.103-.897-2-2-2h-.5v-2.039c1.555-.241,2.75-1.589,2.75-3.211s-1.195-2.97-2.75-3.211v-1.62c.224-.076.43-.202.602-.375Zm.898,12.457v2c0,.552-.449,1-1,1h-2c-.551,0-1-.448-1-1v-2c0-.552.449-1,1-1h2c.551,0,1,.448,1,1ZM9.664,3.894c-.105-.105-.164-.245-.164-.394s.058-.289.164-.395l1.942-1.942h0c.105-.105.245-.164.394-.164s.289.058.395.164l1.942,1.942c.105.105.164.245.164.394s-.058.289-.164.395l-1.942,1.942c-.21.211-.578.211-.789,0l-1.942-1.942Zm4.586,7.856c0,1.241-1.009,2.25-2.25,2.25s-2.25-1.009-2.25-2.25,1.009-2.25,2.25-2.25,2.25,1.009,2.25,2.25Zm-6.25,8.75c0,.5-.144.797-.439,1.093l-2.272,2.272c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l2.158-2.158h-3.239c-1.93,0-3.5-1.57-3.5-3.5v-3c0-1.93,1.57-3.5,3.5-3.5h3c.276,0,.5.224.5.5s-.224.5-.5.5h-3c-1.378,0-2.5,1.121-2.5,2.5v3c0,1.379,1.122,2.5,2.5,2.5h3.175l-2.146-2.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l2.325,2.325c.269.269.439.528.439,1.028ZM24,6.5v3c0,1.93-1.57,3.5-3.5,3.5h-3.239l2.157,2.158c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-2.272-2.272c-.283-.283-.439-.593-.439-1.093s.171-.76.439-1.028l2.325-2.325c.195-.195.512-.195.707,0s.195.512,0,.707l-2.146,2.146h3.175c1.378,0,2.5-1.122,2.5-2.5v-3c0-1.378-1.122-2.5-2.5-2.5h-3c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h3c1.93,0,3.5,1.57,3.5,3.5Z" fill="currentColor" /></svg>
                            </div>
                            <div className="pt-2 flex-1">
                                <h3 className="text-xl font-semibold mb-2 lg:text-2xl xl:text-3xl xl:mb-5">Streamlined Purchasing Process</h3>
                                <p className="text-base leading-6 text-gray-500 text-justify lg:text-lg lg:leading-8 xl:text-xl">Buying the most effective lab products shouldn’t be a hassle. For us at LDP, we want to ensure that every purchase is seamless and simple, allowing you to return to what is most important, your research and laboratory work.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10 xl:py-20">
                <div className="container px-3 mx-auto lg:px-5">
                    <h2 className="text-2xl font-semibold uppercase text-dark page-title mb-5 mx-auto md:mb-10 md:text-3xl">Conclusion</h2>
                    <p className="text-lg leading-8 text-gray-600 font-semibold text-center mb-10 md:text-xl">“ Whether you’re starting a new laboratory or trying to upgrade your current work, LDP is the company that will assist you with high-quality lab products or equipment according to your application requirements. Browse through our products and see the performance and quality LDP achieves. With LDP lab products, your lab will be transformed into a space where efficiency, accuracy, and dependability come standard. ”</p>
                    <div className="grid grid-cols-2 gap-3 gap-y-5 md:gap-y-10 md:gap-5 md:grid-cols-3 xl:grid-cols-4">
                        <div className="p-2 text-center">
                            <img src="/assets/images/Rack_icons.webp" alt="" className="w-[75px] mx-auto mb-2" />
                            <h4 className="text-lg font-semibold mb-2 md:text-xl">Cryogenic</h4>
                            <p className="text-base text-gray-500 leading-5 mb-2">Innovative solutions for cryogenic processes.</p>
                            <Link href="/application/cryogenic" className="inline-block text-xs font-bold uppercase text-white btn btn-primary py-3 px-4 bg-primary mt-2"><span className="relative z-1">Read More</span></Link>
                        </div>
                        <div className="p-2 text-center">
                            <img src="/assets/images/Plates_icon.webp" alt="" className="w-[75px] mx-auto mb-2" />
                            <h4 className="text-xl font-semibold mb-2">Sample Preparation</h4>
                            <p className="text-base text-gray-500 leading-5 mb-2">Precise sample prep tools for efficient lab workflows.</p>
                            <Link href="/application/sample-preparation" className="inline-block text-xs font-bold uppercase text-white btn btn-primary py-3 px-4 bg-primary mt-2"><span className="relative z-1">Read More</span></Link>
                        </div>
                        <div className="p-2 text-center">
                            <img src="/assets/images/Multi-Channel-Pipettor.avif" alt="" className="w-[75px] mx-auto mb-2" />
                            <h4 className="text-xl font-semibold mb-2">Liquid handling</h4>
                            <p className="text-base text-gray-500 leading-5 mb-2">Precise liquid handling tools for accurate, efficient lab workflows.</p>
                            <Link href="/application/liquid-handling" className="inline-block text-xs font-bold uppercase text-white btn btn-primary py-3 px-4 bg-primary mt-2"><span className="relative z-1">Read More</span></Link>
                        </div>
                        <div className="p-2 text-center">
                            <img src="/assets/images/Petri-dishes.avif" alt="" className="w-[75px] mx-auto mb-2" />
                            <h4 className="text-xl font-semibold mb-2">Microbiological</h4>
                            <p className="text-base text-gray-500 leading-5 mb-2">Advanced solutions for microbiological needs.</p>
                            <Link href="/application/microbiological" className="inline-block text-xs font-bold uppercase text-white btn btn-primary py-3 px-4 bg-primary mt-2"><span className="relative z-1">Read More</span></Link>
                        </div>
                        <div className="p-2 text-center">
                            <img src="/assets/images/Lab-coat.avif" alt="" className="w-[75px] mx-auto mb-2" />
                            <h4 className="text-xl font-semibold mb-2">Safety</h4>
                            <p className="text-base text-gray-500 leading-5 mb-2">Essential tools for cryogenic handling.</p>
                            <Link href="/application/safety" className="inline-block text-xs font-bold uppercase text-white btn btn-primary py-3 px-4 bg-primary mt-2"><span className="relative z-1">Read More</span></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

