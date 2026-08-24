"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CategoryCard from "../components/CategoryCard";
import { useRef, useState, useEffect, useContext } from "react";
import Link from "next/link";
import BlogCard from "../components/BlogCard";
import BrandCard from "../components/BrandCard";
import { AnimatePresence, motion } from "framer-motion";
import ApplicationCard from "../components/ApplicationCard";
import SearchSelect from "../components/SearchSelect";
import { LoadingContext } from "@/context/LoadingContext";
import LaunchPopup from "../components/LaunchPopup";

export default function Index() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { startLoading, stopLoading } = useContext(LoadingContext)
    const ConSlideRef = useRef(null);
    const EqSlideRef = useRef(null);
    const ReSlideRef = useRef(null);
    const [brands, setBrands] = useState([]);
    const [index, setIndex] = useState(0);
    const [frontProducts, setFrontProducts] = useState([]);

    const slides = [
        {
            image: "/assets/images/scientific-research.jpg",
            tag: "LABORATORY DISPOSABLE",
            title: "Your Trusted Scientific Partner for Over 40 Years",
        },
        {
            image: "/assets/images/The-traditional-clinical-labs-evolve-scaled.webp",
            tag: "RESEARCH SOLUTIONS",
            title: "Innovative Technology for Modern Scientists",
        },
        {
            image: "/assets/images/Shutterstock_1910778964-scaled.webp",
            tag: "QUALITY ASSURANCE",
            title: "High-Quality Lab Products You Can Trust",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % slides.length);
    };

    const applications = [
        { title: "Sample Preparation", image: "Sample-Preparation.avif", excerpt: "Effective and precise sample preparation is the basis of successful outcomes in a laboratory.", url: "/application/sample-preparation" },
        { title: "Liquid Handling", image: "Liquid-handling-scaled.avif", excerpt: "The management of liquid substances is an important task in labs no matter the category.", url: "/application/liquid-handling" },
        { title: "Microbiological", image: "Microbiological.avif", excerpt: "Microbiology laboratories often require different types of high-grade consumable materials that need to pass specific conditions.", url: "/application/microbiological" },
        { title: "Cryogenic", image: "Cryogenic.avif", excerpt: "Use LDP when you require specialized lab equipment that delivers quality results under extreme temperatures.", url: "/application/cryogenic" },
        { title: "Safety", image: "Safety.avif", excerpt: "The work that happens in laboratories is both sensitive and intricate and needs to be accompanied by the right safety precautions.", url: "/application/safety" }
    ]

    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState(null);
    const [fcategories, setFcategory] = useState([]);
    const [fcatSlug, setFcatSlug] = useState("");
    const [fsubCategories, setFsubCategory] = useState([]);
    const [fsubCatSlug, setFsubCatSlug] = useState("");
    const [fproducts, setFproducts] = useState([]);
    const [fslug, setFslug] = useState("");
    const fbuttonLink = fslug ? `/product/${fslug}` : (fsubCatSlug ? `/product-category/${fcatSlug}/${fsubCatSlug}` : (fcatSlug ? `/product-category/${fcatSlug}` : ''));
    const [topBrands, setTopBrands] = useState([]);
    const [blogs, setBlogs] = useState([]);



    const [activeTab, setActiveTab] = useState("");
    const activeTabData = topBrands[0]?.children_recursive?.find(
        tab => tab.id === activeTab
    );
    const itemsToRender = activeTabData?.children_recursive || topBrands[0]?.children_recursive || [];

    useEffect(() => {
        const fetchFrontCat = async () => {
            startLoading();
            try{
                const response = await fetch(`${baseUrl}categories`);
                if(!response.ok){
                    throw new Error("Front Category Fetch Failed")
                }
                const res = await response.json();
                setTopBrands(brands);
                setFcategory(res['data']);
            }catch(err){
                console.error(err)
            }finally{
                stopLoading();
            }
        }
        fetchFrontCat();        
        }, 
    []);

    useEffect(() => {
        const fetchBrands = async () => {
            startLoading();
            try {
                const response = await fetch(`${baseUrl}brands?per_page=150`);
                if (!response.ok) {
                    throw new Error("Brands Fetch Failed")
                }
                const res = await response.json();
                setBrands(res.data);
            } catch (err) {
                console.error(err)
            } finally {
                stopLoading();
            }
        }
        fetchBrands();
    },
        []);

    useEffect(() => {   
        const fetchSubCategory = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${baseUrl}categories/${fcatSlug}`); // Example API endpoint
                if (!response.ok) {
                  throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setFsubCategory(data.data?.children_recursive);
              } catch (err) {
                console.error(err.message);
              }finally{
                setIsLoading(false);
              }
        };

        if (fcatSlug) { 
            fetchSubCategory();
        }
    }, [fcatSlug]); 


    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${baseUrl}products?category=${fsubCatSlug || fcatSlug }`); // Example API endpoint
                if (!response.ok) {
                  throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setFproducts(data.data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };


        if (fcatSlug || fsubCatSlug) { 
              fetchProduct();
        }
    }, [fcatSlug, fsubCatSlug]);


    useEffect(() => {
        const homeProduct = async () => {
            startLoading();
            try {
                const response = await fetch(`${baseUrl}get-home-category`); // Example API endpoint
                if (!response.ok) {
                  throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setFrontProducts(data['data'])
            } catch (err) {
                console.error(err.message);
            }finally{
                stopLoading();
            }
        };

        homeProduct();
        }, 
    []);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${baseUrl}latest-blogs`); // Example API endpoint
                if (!response.ok) {
                  throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setBlogs(data['data'])
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchBlog();
        }, 
    []);


    const categoryOptions = [
    { value: "", label: "All Category" },
    ...(fcategories || []).map(category => ({
        value: category.slug,
        label: category.name,
    }))
    ];
    const subCategoryOptions = [
    { value: "", label: "All Sub Category" },
    ...(fsubCategories || []).map(sub => ({ value: sub.slug, label: sub.name })),
    ];

    const productOptions = [
    { value: "", label: "All Products" },
    ...(fproducts || []).map(prod => ({ value: prod.slug, label: prod.name })),
    ];

     const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const launched = localStorage.getItem("siteLaunched");
        if (!launched) {
        setShowPopup(true);
        localStorage.setItem("siteLaunched", "true");
        }
    }, []);
    return (
        <>
            <LaunchPopup
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
            />
            <section className="py-8 min-h-[40vh] bg-center bg-cover banner relative 2xl:min-h-[80vh]" style={{ backgroundImage: `url(${slides[index].image})` }}>
                <div className="container px-2 lg:px-5 mx-auto relative z-1">
                    <div className="grid grid-cols-6 gap-5 lg:gap-15">
                        <div className="bg-white h-full p-5 col-span-6 order-2 md:order-0 md:col-span-3 lg:col-span-2">
                            <h3 className="text-xl font-semibold text-dark uppercase mb-5">Search Products</h3>
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="category" className="text-base font-semibold mb-2 inline-block">Category</label>
                                    <SearchSelect
                                        classes="py-3 px-4 border-2 border-gray-300 font-semibold text-base w-full placeholder:text-black/80 focus:border-primary xl:py-3.5 xl:text-lg"
                                        placeholder="All Category"
                                        id="category"
                                        value={fcatSlug}
                                        data={categoryOptions}
                                        onSelect={(cat) => {
                                            setFcatSlug(cat);
                                        }}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="subcategory" className="text-base font-semibold mb-2 inline-block">Sub Category</label>
                                    <SearchSelect
                                        classes="py-2 px-4 border-2 border-gray-300 font-semibold text-base w-full placeholder:text-black/80 focus:border-primary xl:py-3.5 xl:text-lg"
                                        placeholder="All Sub Category"
                                        id="subcategory"
                                        value={fsubCatSlug}
                                        data={subCategoryOptions}
                                        onSelect={(cat) => {
                                            setFsubCatSlug(cat);
                                        }}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="products" className="text-base font-semibold mb-2 inline-block">Products</label>
                                    <SearchSelect
                                        classes="py-3 px-4 border-2 border-gray-300 font-semibold text-base w-full placeholder:text-black/80 focus:border-primary xl:py-3.5 xl:text-lg"
                                        placeholder="All Products"
                                        id="products"
                                        value={fslug}
                                        data={productOptions}
                                        onSelect={(cat) => {
                                            setFslug(cat);
                                        }}
                                    />
                                </div>
                                <Link href={fbuttonLink} className={`text-sm font-bold uppercase text-white btn btn-primary inline-block text-center btn-scale-0 py-4 px-5 ${isLoading ? "bg-primary/70 disabled" : "bg-primary"} mt-2 w-full cursor-pointer`} disabled={isLoading}> 
                                    {isLoading ? 
                                        <div role="status" className="flex gap-2 items-center justify-center">
                                            <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#ffffffbf"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/></svg>
                                            Please Wait...
                                        </div> :
                                        <span className="relative z-1 flex items-center justify-center gap-2">
                                            Search 
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" xmlSpace="preserve" className="w-4 h-4"><g><path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" fill="currentColor"></path></g></svg>
                                        </span>
                                    } 
                                </Link>
                            </form>
                        </div>
                        <div className="col-span-6 md:col-span-3 lg:col-span-4">
                            <div className="flex flex-col justify-between h-full">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ duration: 0.6 }}
                                        variants={{
                                            initial: { opacity: 0 },
                                            animate: { opacity: 1 },
                                            exit: { opacity: 0 },
                                        }}
                                        className="max-w-2xl 2xl:max-w-4xl"
                                    >
                                        <motion.div
                                            variants={{
                                                initial: { opacity: 0, y: -40 },
                                                animate: { opacity: 1, y: 0 },
                                                exit: { opacity: 0, y: -40 },
                                            }}
                                            transition={{ duration: 0.6 }}
                                            className="inline-block bg-secondary text-white text-sm font-bold mb-3 breadcrumb-text py-2 px-2 md:mb-5 lg:py-3 lg:px-4 2xl:text-xl"
                                        >
                                            {slides[index].tag}
                                        </motion.div>
                                        <motion.h1
                                            variants={{
                                                initial: { opacity: 0, y: 40 },
                                                animate: { opacity: 1, y: 0 },
                                                exit: { opacity: 0, y: 40 },
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="text-4xl text-white font-bold leading-11 mb-5 md:mb-10 lg:text-5xl lg:leading-15 2xl:text-7xl 2xl:leading-20"
                                        >
                                            {slides[index].title}
                                        </motion.h1>
                                        <motion.div
                                            variants={{
                                                initial: { opacity: 0, y: 40 },
                                                animate: { opacity: 1, y: 0 },
                                                exit: { opacity: 0, y: 40 },
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="flex gap-5 mb-5 md:mb-0"
                                        >
                                            <Link href="/product-category" className="text-sm font-bold text-primary btn btn-primary py-3 px-5 bg-white hover:text-white">
                                                <span className="relative z-1 flex items-center gap-1">
                                                    Shop Now 
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="currentColor"></path></svg>
                                                </span>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                                <div className="py-2">
                                    <button className="text-lg font-bold text-center content-center text-white btn btn-primary bg-primary cursor-pointer w-13 h-13 mr-5" onClick={() => prevSlide()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-8 h-8 relative z-1 m-auto"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                                    </button>
                                    <button className="text-lg font-bold text-center content-center text-white btn btn-primary bg-primary cursor-pointer w-13 h-13" onClick={() => nextSlide()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" className="w-8 h-8 relative z-1 m-auto"><path xmlns="http://www.w3.org/2000/svg" d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" fill="currentColor" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {false &&
                <section className="py-8 mb-8 bg-[#F4F8FB]">
                    <div className="container px-2 mx-auto lg:px-5">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-2xl font-semibold text-dark page-title text-center">Top Category</h2>
                            <Link className="text-sm font-bold text-white btn btn-primary py-3 px-5 bg-primary" href="/product-category" >
                                <span className="relative z-1 flex items-center gap-2">
                                    View More 
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5"><path d="M13.1,19a1,1,0,0,1-.7-1.71L17,12.71a1,1,0,0,0,0-1.42L12.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0L18.4,9.88a3,3,0,0,1,0,4.24l-4.59,4.59A1,1,0,0,1,13.1,19Z" fill="currentColor"></path><path d="M6.1,19a1,1,0,0,1-.7-1.71L10.69,12,5.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l6,6a1,1,0,0,1,0,1.42l-6,6A1,1,0,0,1,6.1,19Z" fill="currentColor"></path></svg>
                                </span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
                            <Link className="bg-white p-5 group shadow-sm " href="/suppliers">
                                <div className="w-30 h-30 border-dashed border-3 border-primary text-center content-center mx-auto mb-5">
                                    <div className="w-25 h-25 bg-primary mx-auto content-center group-hover:bg-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve" className="w-15 h-15 text-white mx-auto group-hover:scale-[1.2]"><g><path d="M426.405 237.742V146.85a41.864 41.864 0 0 0-10.456-27.679l-45.89-52.07h-52.077l-13.179 14.954M281.615 108.364l-9.524 10.807a41.925 41.925 0 0 0-3.975 5.323" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><path d="M305.551 185.217v-33.178a8 8 0 0 1 8-8h60.939a8 8 0 0 1 8 8v33.178h-76.939zM305.551 185.217h76.939v52.525h-76.939zM85.437 181v56.742h182.68V94c0-13.807-11.193-25-25-25h-132.68c-13.807 0-25 11.193-25 25v52" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><circle cx="212.33" cy="130.962" r="16.025" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><circle cx="141.223" cy="130.962" r="16.025" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><circle cx="141.223" cy="192.116" r="16.025" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><circle cx="212.33" cy="192.116" r="16.025" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><path d="M353.233 504.5h90.891c5.523 0 10-4.477 10-10V319.171h0" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><path d="M454.124 408H395a3 3 0 0 0-3 3v44a3 3 0 0 0 3 3h59.124v-50zM56.19 319.171h0V494.5c0 5.523 4.477 10 10 10h288.056V237.742" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><path d="M122.693 410c8.601 33.668 39.131 58.562 75.478 58.562 43.023 0 77.901-34.877 77.901-77.901 0-32.019-19.324-59.514-46.94-71.49H167.21c-22.988 9.969-40.218 30.696-45.352 55.829" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /><path d="M236.738 375.304h-20.094a3.116 3.116 0 0 1-3.116-3.116v-20.094a3.116 3.116 0 0 0-3.116-3.116H185.93a3.116 3.116 0 0 0-3.116 3.116v20.094a3.116 3.116 0 0 1-3.116 3.116h-20.094a3.116 3.116 0 0 0-3.116 3.116v24.482a3.116 3.116 0 0 0 3.116 3.116h20.094a3.116 3.116 0 0 1 3.116 3.116v20.094a3.116 3.116 0 0 0 3.116 3.116h24.482a3.116 3.116 0 0 0 3.116-3.116v-20.094a3.116 3.116 0 0 1 3.116-3.116h20.094a3.116 3.116 0 0 0 3.116-3.116V378.42a3.116 3.116 0 0 0-3.116-3.116zM484.165 319.171h-85.66a10 10 0 0 1-9.067-5.782l-35.192-75.647h94.776a8 8 0 0 1 7.254 4.626l32.423 69.694c1.542 3.314-.878 7.109-4.534 7.109zM311.7 319.171H27.834c-3.615 0-6.035-3.718-4.572-7.023l30.82-69.643a8 8 0 0 1 7.316-4.762h292.848l-33.402 75.476a9.999 9.999 0 0 1-9.144 5.952zM305.551 61.682V18.336c0-5.985 4.852-10.836 10.836-10.836h55.266c5.985 0 10.836 4.852 10.836 10.836v43.346a5.418 5.418 0 0 1-5.418 5.418h-66.102a5.418 5.418 0 0 1-5.418-5.418z" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" data-original="#000000" opacity="1" /></g></svg>
                                    </div>
                                </div>
                                <h3 className="text-base font-semibold leading-5 text-center text-dark mb-1 lg:text-lg xl:text-xl">Brands</h3>
                                <h5 className="text-sm font-semibold text-center text-gray-500 xl:text-base">91+</h5>
                            </Link>
                            <Link className="bg-white p-5 group shadow-sm " href="/product-category/consumable">
                                <div className="w-30 h-30 border-dashed border-3 border-primary text-center content-center mx-auto mb-5">
                                    <div className="w-25 h-25 bg-primary mx-auto content-center group-hover:bg-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 64 64"
                                            className="text-white w-15 h-15 fill-current m-auto group-hover:scale-[1.2]"
                                        >
                                            <path
                                                d="M46 15c1.7 0 3 1.4 3 3 0 .6.4 1 1 1s1-.4 1-1c0-2.8-2.2-5-5-5-.6 0-1 .4-1 1s.4 1 1 1zM19.6 25H18c-.6 0-1 .4-1 1s.4 1 1 1h1.6c.6 0 1-.4 1-1s-.4-1-1-1zM38 37h-2.4l3.3-6.6c.2-.4.1-.9-.2-1.2s-.8-.3-1.2-.1l-12 8c-.4.2-.5.7-.4 1.1s.5.7 1 .7h2.4l-3.3 6.6c-.2.4-.1.9.2 1.2s1 .2 1.2.1l4.4-2.9c.5-.3.6-.9.3-1.4s-.9-.6-1.4-.3l-1.2.8 2.3-4.6c.5-1.8-1.6-1.4-1.6-1.4l6.1-4.1-2.3 4.6c-.5 1.8 1.6 1.4 1.6 1.4l-1.3.8c-.5.3-.6.9-.3 1.4s.9.6 1.4.3l4-2.7c.4-.2.5-.7.4-1.1s-.6-.6-1-.6zM40 15h2c.6 0 1-.4 1-1s-.4-1-1-1h-2c-.6 0-1 .4-1 1s.4 1 1 1zM16 45h-1v-1c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1zM62 61h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1z"
                                            />
                                            <path
                                                d="M56 61h-4.3c2-1.6 3.3-4.2 3.3-7V18c0-4.6-3.5-8.4-8-8.9V4c0-1.7-1.3-3-3-3H20c-1.7 0-3 1.3-3 3v5.1c-4.5.5-8 4.3-8 8.9v36c0 2.8 1.3 5.3 3.3 7H10c-.6 0-1 .4-1 1s.4 1 1 1h27.3c.6 0 1-.4 1-1s-.4-1-1-1H18c-3.8 0-7-3.1-7-7v-3h42v3c0 3.8-3.1 7-7 7h-5c-.6 0-1 .4-1 1s.4 1 1 1h15c.6 0 1-.4 1-1s-.4-1-1-1zM43 3h1c.6 0 1 .4 1 1v5h-2zm-4 0h2v6h-2zm-4 0h2v6h-2zm-4 0h2v6h-2zm-4 0h2v6h-2zm-4 0h2v6h-2zm-4 1c0-.6.4-1 1-1h1v6h-2zm-8 45V27h3c.6 0 1-.4 1-1s-.4-1-1-1h-3v-7c0-3.8 3.1-7 7-7h28c3.8 0 7 3.1 7 7v7H23.6c-.6 0-1 .4-1 1s.4 1 1 1H53v22zM6 61H2c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-base font-semibold leading-5 text-center text-dark mb-1 lg:text-lg xl:text-xl">Consumables & Supply</h3>
                                <h5 className="text-sm font-semibold text-center text-gray-500 xl:text-base">50,000+ Products</h5>
                            </Link>
                            <Link className="bg-white p-5 group shadow-sm " href="/product-category/equipment">
                                <div className="w-30 h-30 border-dashed border-3 border-primary text-center content-center mx-auto mb-5">
                                    <div className="w-25 h-25 bg-primary mx-auto content-center group-hover:bg-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className="w-15 h-15 text-white mx-auto group-hover:scale-[1.2]"><g><defs><clipPath id="a" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" stroke="#ffffff" opacity="1" data-original="#000000" /></clipPath></defs><g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0v-319.63c0-3.391 2.75-6.141 6.13-6.141H234.2" transform="translate(46.48 405.75)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0v57.61c0 3.39 2.75 6.14 6.13 6.14h301.9c3.39 0 6.14-2.75 6.14-6.14v-283" transform="translate(46.48 440.75)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h27.283c1.042 0 1.886.845 1.886 1.886v27.283a2.83 2.83 0 0 0 2.83 2.829h27.768a2.83 2.83 0 0 0 2.83-2.829V1.886C62.597.845 63.441 0 64.483 0h27.283a2.829 2.829 0 0 0 2.829-2.829v-27.769a2.829 2.829 0 0 0-2.829-2.829H64.483a1.885 1.885 0 0 1-1.886-1.886v-27.284a2.83 2.83 0 0 0-2.83-2.829H31.999a2.83 2.83 0 0 0-2.83 2.829v27.284a1.885 1.885 0 0 1-1.886 1.886H0a2.83 2.83 0 0 0-2.829 2.829v27.769A2.83 2.83 0 0 0 0 0Z" transform="translate(157.68 435.709)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0v-23.169a5 5 0 0 0-5-5h-191.47a5 5 0 0 0-5 5V0a5 5 0 0 0 5 5H-5a5 5 0 0 0 5-5Z" transform="translate(304.298 311.784)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h-13.493" transform="translate(287.58 240.787)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h-67.299" transform="translate(186.845 240.787)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h-13.493" transform="translate(287.58 197.397)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h-67.299" transform="translate(186.845 197.397)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h-13.493" transform="translate(287.58 154.006)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h-67.299" transform="translate(186.845 154.006)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0v-33.169" transform="translate(203.563 316.784)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0-41.573-72.008" transform="translate(425.589 137.81)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0-2.474-4.284C-15.809-27.381-45.343-35.295-68.438-21.96-91.535-8.625-99.449 20.908-86.114 44.005l61.289 106.157" transform="translate(366.773 35.938)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0 25.562 44.275c4.561 7.899 14.661 10.605 22.559 6.044l44.652-25.78c7.899-4.56 10.605-14.659 6.045-22.559L73.256-42.294" transform="translate(364.487 213.147)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h111.521" transform="translate(299.294 112.219)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0 93.889-54.207c6.84-3.948 15.585-1.606 19.534 5.234l3.047 5.278c3.948 6.84 1.605 15.585-5.235 19.534L17.347 30.045c-6.839 3.949-15.585 1.605-19.534-5.233l-3.046-5.279C-9.183 12.694-6.839 3.948 0 0Z" transform="translate(336.824 189.058)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /></g></g></svg>
                                    </div>
                                </div>
                                <h3 className="text-base font-semibold leading-5 text-center text-dark mb-1 lg:text-lg xl:text-xl">Lab Equipment</h3>
                                <h5 className="text-sm font-semibold text-center text-gray-500 xl:text-base">8000+ Products</h5>
                            </Link>
                            <Link className="bg-white p-5 group shadow-sm " href="/product-category/reagent-chemical">
                                <div className="w-30 h-30 border-dashed border-3 border-primary text-center content-center mx-auto mb-5">
                                    <div className="w-25 h-25 bg-primary mx-auto content-center group-hover:bg-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 682.667 682.667" xmlSpace="preserve" className="w-15 h-15 mx-auto group-hover:scale-[1.2]"><g><defs><clipPath id="a" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" stroke="#ffffff" opacity="1" data-original="#000000" /></clipPath></defs><path d="m0 0 25.937-5.019" transform="matrix(1.33333 0 0 -1.33333 378.402 140.566)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0-11.6-107.36" transform="matrix(1.33333 0 0 -1.33333 573.12 178.294)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0-33.788 6.55" transform="matrix(1.33333 0 0 -1.33333 573.121 178.298)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0v34.083h-33.307l-16.355-9.215" transform="translate(227.648 454.411)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0 5.584 28.752c.567 2.893-1.36 5.756-4.252 6.295L-80.39 50.898c-2.891.567-5.726-1.361-6.293-4.253l-5.612-28.753" transform="translate(415.441 448.003)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h23.357C32.286 0 39.6-7.316 39.6-16.276v-16.248h-55.842v16.248C-16.242-7.316-8.929 0 0 0Z" transform="translate(215.969 454.411)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0c6.43 17.57 24.91 24.2 43.2 20.19 11.9-2.02 67.55-12.68 77.58-14.72 10.09-1.84 65.68-12.76 77.5-15.34 19.42-3.26 34.699-17.55 32.29-37.85L214.95-180.6" transform="translate(248.54 451.52)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0-9.638 19.508C32.201 48.091 24.689 68.535 48.67 80.274c23.925 11.91 35.547-6.522 83.679 9.301l13.946-28.27c10.034-20.331 8.702-42.392.226-61.305" transform="translate(82.288 270.922)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0c19.048 20.501 18.595 36.749 37.615 46.078 24.35 12.108 31.407-9.216 80.39 6.861" transform="translate(114.036 270.922)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0c-2.806 3.885-5.386 8.167-7.682 12.845-12.586 25.492 16.498 39.84 29.083 14.348l3.743-7.599" transform="translate(47.507 270.837)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0c13.663 32.184 27.581 68.989 8.107 108.46-12.784 25.946-42.378 11.342-29.593-14.603l3.827-7.741" transform="translate(230.964 276.281)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0-36.14-150.68" transform="translate(368.22 457.22)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0v57.42c0 5.927 4.847 10.747 10.743 10.747h84.302c5.895 0 10.743-4.82 10.743-10.747V-82.798" transform="translate(174.754 353.72)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0h-207.467c-2.579 0-5.725-2.07-7.029-4.65l-33.449-65.615c-1.276-2.552-.255-4.651 2.296-4.651h202.846c2.551 0 5.698 2.099 7.001 4.651z" transform="translate(255.994 270.922)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="m0 0-74.04-.028c-2.552 0-5.727 2.098-7.03 4.65l-35.801 70.265H90.623c2.551 0 5.697-2.07 7.002-4.65l33.448-65.615c1.304-2.552.255-4.65-2.296-4.65L34.64 0" transform="translate(372.865 196.035)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0v89.122m452.633 0V-89.15c0-2.58-2.126-4.735-4.735-4.735H4.733C2.126-93.885 0-91.73 0-89.15v54.5" transform="translate(29.678 106.885)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /><path d="M0 0v-257.922" transform="translate(255.994 270.922)" fill="none" stroke="#ffffff" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeDasharray="none" strokeOpacity="" data-original="#000000" opacity="1" /></g></g></svg>                                </div>
                                </div>
                                <h3 className="text-base font-semibold leading-5 text-center text-dark mb-1 lg:text-lg xl:text-xl">Lab Reagents</h3>
                                <h5 className="text-sm font-semibold text-center text-gray-500 xl:text-base">29,000+ Products</h5>
                            </Link>
                        </div>
                    </div>
                </section>
            }
            
            <section className="pt-6 xl:pt-8">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-semibold text-dark page-title text-center md:text-2xl">Shop By Suppliers</h2>
                        <Link className="text-sm font-bold text-white btn btn-primary py-3 px-5 bg-primary" href="/suppliers" >
                            <span className="relative z-1 flex items-center gap-2">
                                View More 
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5"><path d="M13.1,19a1,1,0,0,1-.7-1.71L17,12.71a1,1,0,0,0,0-1.42L12.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0L18.4,9.88a3,3,0,0,1,0,4.24l-4.59,4.59A1,1,0,0,1,13.1,19Z" fill="currentColor"></path><path d="M6.1,19a1,1,0,0,1-.7-1.71L10.69,12,5.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l6,6a1,1,0,0,1,0,1.42l-6,6A1,1,0,0,1,6.1,19Z" fill="currentColor"></path></svg>
                            </span>
                        </Link>
                    </div>
                    <div className="slider relative overflow-hidden">
                        <div className="absolute bg-gradient-to-r from-white to-transprante top-0 left-0 w-5 h-full z-1"></div>
                        <div className="slider-track w-max flex gap-2">
                            {brands?.length > 0 &&
                                brands?.map((brand) => (
                                    <BrandCard brand={brand} key={brand?.id} />
                                ))
                            }
                        </div>
                        <div className="absolute bg-gradient-to-l from-white to-transprante top-0 right-0 w-5 h-full z-1"></div>
                    </div>
                </div>
            </section>
            <div className="w-full bg-white h-[50px] relative z-1 clip-curve md:h-[75px] xl:h-[100px]"></div>
            <section className="bg-[#020023] py-25 my-[-50px] ">
                <div className="container px-3 mx-auto lg:px-5">
                    <h2 className="text-xl font-semibold uppercase text-white text-center mb-10 md:text-2xl xl:text-3xl">Discover Products by Category </h2>
                    <div className="px-5 application-swiper xl:px-10">
                        <Swiper
                            modules={[Navigation, Autoplay, Pagination]}
                            spaceBetween={40}
                            loop={true}
                            grabCursor={true}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                480: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="category-slider"
                        >
                            {applications.map((app, index) => (
                                <SwiperSlide key={index}>
                                    <ApplicationCard data={app} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>
            </section>
            <div className="w-full bg-white h-[75px] relative z-1 clip-curve-reverse xl:h-[100px]"></div>
            <section className="py-6 xl:py-8">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="relative">
                        <div className="flex justify-between mb-5 items-start">
                            <div className="text-left flex-1">
                                <Link href="/product-category/consumable" className="text-xl font-semibold text-dark page-title hover:text-primary mb-3 block break-words md:text-2xl">Buy Laboratory Consumables</Link>
                                <p className="text-sm font-semibold text-gray-500 md:text-base xl:text-lg">Shop a wide range of laboratory consumables from various brands, often with competitive pricing.</p>
                            </div>
                            <div className="text-right">
                                <button onClick={() => EqSlideRef.current.slidePrev()} className="cursor-pointer bg-primary text-white w-9 h-9 text-center content-center ml-2 btn btn-primary md:w-11 md:h-11"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-7 h-7 relative z-1 m-auto"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                                </button>
                                <button onClick={() => EqSlideRef.current.slideNext()} className="cursor-pointer bg-primary text-white w-9 h-9 text-center content-center ml-2 btn btn-primary md:w-11 md:h-11"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" className="w-7 h-7 relative z-1 m-auto"><path xmlns="http://www.w3.org/2000/svg" d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" fill="currentColor" /></svg>
                                </button>
                            </div>
                        </div>
                        {frontProducts?.home1?.length &&
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                onSwiper={(swiper) => {
                                    EqSlideRef.current = swiper;
                                }}
                                spaceBetween={20}
                                loop={true}
                                grabCursor={true}
                                slidesPerView={2}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                    1200: { slidesPerView: 5 },
                                }}
                                className="category-slider"
                            >
                                {frontProducts?.home1?.map((cat) => (
                                    <SwiperSlide key={cat?.id}>
                                        <CategoryCard url={`/product-category/${cat?.slug}`} image={cat?.image_url} title={cat?.name} productCount={cat?.products_count} countShow={false} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }    
                    </div>
                </div>
            </section>
            <section className="py-4 xl:py-8">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="relative">
                        <div className="flex justify-between mb-5 items-start">
                            <div className="text-left flex-1">
                                <Link href="/product-category/equipment" className="text-xl font-semibold text-dark page-title hover:text-primary mb-3 block break-words md:text-2xl">Buy Laboratory Equipment</Link>
                                <p className="text-sm font-semibold text-gray-500 lg:text-base xl:text-lg">Offers a wide range of laboratory equipment and instruments with best price.</p>
                            </div>
                            <div className="text-right">
                                <button onClick={() => ReSlideRef.current.slidePrev()} className="cursor-pointer bg-primary text-white w-9 h-9 text-center content-center ml-2 btn btn-primary md:w-11 md:h-11">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-7 h-7 relative z-1 m-auto"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                                </button>
                                <button onClick={() => ReSlideRef.current.slideNext()} className="cursor-pointer bg-primary text-white w-9 h-9 text-center content-center ml-2 btn btn-primary md:w-11 md:h-11"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" className="w-7 h-7 relative z-1 m-auto"><path xmlns="http://www.w3.org/2000/svg" d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" fill="currentColor" /></svg>    
                                </button>
                            </div>
                        </div>
                        {frontProducts?.home2?.length &&
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                onSwiper={(swiper) => {
                                    ReSlideRef.current = swiper;
                                }}
                                spaceBetween={20}
                                loop={true}
                                slidesPerView={2}
                                grabCursor={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                    1200: { slidesPerView: 5 },
                                }}
                                className="category-slider"
                            >
                                {frontProducts?.home2?.map((cat) => (
                                    <SwiperSlide key={cat?.id}>
                                        <CategoryCard url={`/product-category/${cat?.slug}`} image={cat?.image_url} title={cat?.name} productCount={cat?.products_count} countShow={false} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }
                    </div>
                </div>
            </section>
            <section className="pb-6 xl:pb-8">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="relative">
                        <div className="flex justify-between mb-5 items-start">
                            <div className="text-left flex-1">
                                <Link href="/product-category/reagent-chemical" className="text-xl font-semibold text-dark page-title hover:text-primary mb-3 block break-words md:text-2xl">Buy High Quality Lab Reagent</Link>
                                <p className="text-sm font-semibold text-gray-500 md:text-base xl:text-lg">Purchase high-quality lab reagents to ensure purity, reliability, and suitability for your experiments.</p>
                            </div>
                            <div className="text-right">
                                <button onClick={() => ConSlideRef.current.slidePrev()} className="cursor-pointer bg-primary text-white w-9 h-9 text-center content-center ml-2 btn btn-primary md:w-11 md:h-11"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-7 h-7 relative z-1 m-auto"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor" /></svg>
                                </button>
                                <button onClick={() => ConSlideRef.current.slideNext()} className="cursor-pointer bg-primary text-white w-9 h-9 text-center content-center ml-2 btn btn-primary md:w-11 md:h-11"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" className="w-7 h-7 relative z-1 m-auto"><path xmlns="http://www.w3.org/2000/svg" d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" fill="currentColor" /></svg>
                                </button>
                            </div>
                        </div>
                        {frontProducts?.home3?.length &&
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                onSwiper={(swiper) => {
                                    ConSlideRef.current = swiper;
                                }}
                                spaceBetween={20}
                                loop={true}
                                slidesPerView={2}
                                grabCursor={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                    1200: { slidesPerView: 5 },
                                }}
                                className="category-slider"
                            >
                                {frontProducts?.home3?.map((cat) => (
                                    <SwiperSlide key={cat?.id}>
                                        <CategoryCard url={`/product-category/${cat?.slug}`} image={cat?.image_url} title={cat?.name} productCount={cat?.products_count} countShow={false} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        }
                    </div>
                </div>
            </section>
            
            <section className="my-4 py-5 bg-[#020023] xl:my-8">
                <div className="container px-3 mx-auto lg:px-5">
                        <div className="grid grid-cols-2 gap-3 gap-y-8 md:grid-cols-4 xl:gap-4">
                            <div className="flex gap-3 xl:gap-5 md:flex-col items-center lg:flex-row">
                                <div className="bg-primary text-white w-14 h-14 text-center content-center relative xl:w-18 xl:h-18">
                                    <div className="absolute w-3 h-3 border-t-2 border-l-2 border-white top-[5px] left-[5px] animate-focus xl:w-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-t-2 border-r-2 border-white top-[5px] right-[5px] animate-focus xl:w-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-b-2 border-l-2 border-white bottom-[5px] left-[5px] animate-focus xl:w-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-b-2 border-r-2 border-white bottom-[5px] right-[5px] animate-focus xl:w-5 xl:h-5"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-6 h-6 mx-auto xl:w-8 xl:h-8">
                                        <path d="m19.5,6h-2.5v-.5c0-2.481-2.019-4.5-4.5-4.5-.276,0-.5.224-.5.5s.224.5.5.5c1.93,0,3.5,1.57,3.5,3.5v12.5H3.5c-1.379,0-2.5-1.122-2.5-2.5v-4c0-.276-.224-.5-.5-.5s-.5.224-.5.5v4c0,1.496.944,2.776,2.268,3.276-.176.384-.268.798-.268,1.224,0,1.654,1.346,3,3,3s3-1.346,3-3c0-.344-.06-.681-.176-1h8.352c-.116.319-.176.656-.176,1,0,1.654,1.346,3,3,3s3-1.346,3-3c0-.426-.092-.84-.268-1.224,1.324-.5,2.268-1.78,2.268-3.276v-5c0-2.481-2.019-4.5-4.5-4.5Zm0,1c1.93,0,3.5,1.57,3.5,3.5v1.5h-6v-5h2.5Zm-12.5,13c0,1.103-.897,2-2,2s-2-.897-2-2c0-.355.097-.698.281-1.007.072.005.145.007.219.007h3.223c.182.307.277.648.277,1Zm14,0c0,1.103-.897,2-2,2s-2-.897-2-2c0-.352.095-.693.277-1h3.223c.073,0,.146-.003.219-.007.185.309.281.652.281,1.007Zm-.5-2h-3.5v-5h6v2.5c0,1.378-1.121,2.5-2.5,2.5ZM5.146,5.854c-.094-.094-.146-.221-.146-.354v-2c0-.276.224-.5.5-.5s.5.224.5.5v1.793l.854.854c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-1-1Zm.354,5.146c3.032,0,5.5-2.467,5.5-5.5S8.532,0,5.5,0,0,2.467,0,5.5s2.468,5.5,5.5,5.5Zm0-10c2.481,0,4.5,2.019,4.5,4.5s-2.019,4.5-4.5,4.5S1,7.981,1,5.5,3.019,1,5.5,1Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <h4 className="text-sm font-semibold text-white mb-1 leading-4 md:text-center lg:text-left xl:text-lg xl:leading-5">Always delivering on time</h4>
                                    <p className="text-xs font-semibold text-white/80 md:text-center lg:text-left xl:text-base">On-time. Every order.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-5 md:flex-col items-center lg:flex-row">
                                <div className="bg-primary text-white w-14 h-14 text-center content-center relative xl:w-18 xl:h-18">
                                    <div className="absolute w-3 h-3 border-t-2 border-l-2 border-white top-[5px] left-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-t-2 border-r-2 border-white top-[5px] right-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-b-2 border-l-2 border-white bottom-[5px] left-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-b-2 border-r-2 border-white bottom-[5px] right-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-6 h-6 mx-auto xl:W-8 xl:h-8">
                                        <path d="m24 22.25v1.25c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1.25c0-1.792-1.458-3.25-3.25-3.25s-3.25 1.458-3.25 3.25v1.25c-.013.263-.184.5-.499.5-.279 0-.432-.18-.491-.4-.306-1.507-1.782-2.6-3.51-2.6s-3.204 1.093-3.51 2.6c-.06.227-.256.387-.49.4-.267-.007-.487-.231-.5-.5v-1.25c0-1.792-1.458-3.25-3.25-3.25s-3.25 1.458-3.25 3.25v1.25c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1.25c0-2.344 1.907-4.25 4.25-4.25 2.113 0 3.857 1.555 4.182 3.578.844-.966 2.135-1.578 3.568-1.578s2.724.612 3.568 1.578c.325-2.023 2.068-3.578 4.182-3.578 2.344 0 4.25 1.906 4.25 4.25zm-22-7.75c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5-1.122 2.5-2.5 2.5-2.5-1.121-2.5-2.5zm1 0c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zm9-.5c1.379 0 2.5 1.121 2.5 2.5s-1.121 2.5-2.5 2.5-2.5-1.121-2.5-2.5 1.122-2.5 2.5-2.5zm0 1c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5zm5-.5c0-1.379 1.121-2.5 2.5-2.5s2.5 1.121 2.5 2.5-1.121 2.5-2.5 2.5-2.5-1.121-2.5-2.5zm1 0c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zm-6-6.5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-3c-.551 0-1 .448-1 1s.449 1 1 1 1-.448 1-1-.449-1-1-1zm0 7c-.827 0-1.5-.673-1.5-1.5v-.271c-.515-.18-.989-.446-1.396-.786l-.224.132c-.344.203-.747.262-1.137.158-.388-.101-.713-.347-.917-.691-.203-.346-.259-.749-.159-1.138.101-.388.347-.713.692-.916l.233-.137c-.064-.3-.094-.576-.094-.851s.03-.551.094-.85l-.233-.137c-.713-.42-.953-1.341-.534-2.054.42-.713 1.34-.952 2.054-.533l.223.131c.408-.34.881-.606 1.396-.786v-.271c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5v.271c.515.18.988.446 1.396.786l.223-.131c.712-.419 1.634-.179 2.053.533.419.713.18 1.634-.533 2.053l-.233.138c.064.299.094.575.094.85s-.03.551-.094.851l.234.138c.345.202.59.527.691.915s.044.792-.159 1.138c-.203.345-.528.591-.917.691-.387.104-.791.045-1.137-.159l-.223-.131c-.407.34-.881.606-1.396.786v.271c0 .827-.673 1.5-1.5 1.5zm-2.832-3.675c.129 0 .258.05.354.146.429.431.983.742 1.603.902.221.058.375.257.375.484v.642c0 .275.224.5.5.5s.5-.225.5-.5v-.642c0-.228.154-.427.375-.484.62-.16 1.174-.472 1.603-.902.162-.16.411-.191.607-.078l.541.317c.227.142.553.058.685-.177.141-.228.058-.553-.177-.684l-.557-.328c-.196-.115-.29-.349-.227-.567.103-.361.151-.665.151-.955s-.048-.594-.151-.955c-.062-.219.031-.452.228-.568l.556-.326c.237-.14.317-.447.177-.685-.131-.234-.456-.319-.684-.178l-.541.318c-.195.116-.446.083-.607-.078-.43-.431-.984-.743-1.603-.903-.221-.057-.375-.256-.375-.484v-.642c0-.276-.224-.5-.5-.5s-.5.224-.5.5v.642c0 .228-.154.427-.375.484-.619.16-1.173.473-1.603.903-.161.161-.412.194-.607.078l-.541-.318c-.237-.14-.544-.06-.685.178-.139.237-.06.544.179.685l.555.325c.197.115.291.35.228.568-.103.361-.151.665-.151.955s.048.594.151.955c.062.219-.031.452-.228.567l-.556.327c-.234.132-.319.455-.178.684.132.236.454.319.685.179l.542-.318c.079-.046.166-.068.253-.068z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <h4 className="text-sm font-semibold text-white mb-1 leading-4 md:text-center lg:text-left xl:text-lg xl:leading-5">Dedicated Account Manager</h4>
                                    <p className="text-xs font-semibold text-white/80 md:text-center lg:text-left xl:text-base">Your single point of contact</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-5 md:flex-col items-center lg:flex-row">
                                <div className="bg-primary text-white w-14 h-14 text-center content-center relative xl:w-18 xl:h-18">
                                    <div className="absolute w-3 h-3 border-t-2 border-l-2 border-white top-[5px] left-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-t-2 border-r-2 border-white top-[5px] right-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-b-2 border-l-2 border-white bottom-[5px] left-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-b-2 border-r-2 border-white bottom-[5px] right-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-6 h-6 mx-auto xl:W-8 xl:h-8">
                                        <path d="M12,24c-1.539,0-2.99-.676-3.982-1.854-.095-.113-.219-.165-.376-.155-1.528,.127-3.039-.417-4.127-1.505-1.088-1.088-1.637-2.592-1.505-4.127,.013-.147-.043-.281-.155-.375-1.179-.993-1.854-2.445-1.854-3.983s.676-2.99,1.854-3.982c.113-.095,.169-.229,.156-.376-.132-1.535,.417-3.039,1.505-4.127,1.087-1.087,2.584-1.638,4.127-1.505,.145,.012,.281-.042,.376-.155,.992-1.179,2.443-1.854,3.982-1.854s2.99,.676,3.982,1.854c.096,.113,.22,.165,.376,.155,1.521-.134,3.039,.417,4.127,1.505,1.088,1.088,1.637,2.592,1.505,4.127-.013,.147,.043,.281,.155,.375,1.179,.993,1.854,2.445,1.854,3.983s-.676,2.99-1.854,3.982c-.113,.095-.169,.229-.156,.376,.132,1.535-.417,3.039-1.505,4.127-1.087,1.087-2.582,1.64-4.127,1.505-.144-.008-.281,.043-.376,.155-.992,1.179-2.443,1.854-3.982,1.854Zm-4.314-3.012c.425,0,.819,.183,1.098,.514,.801,.952,1.974,1.498,3.217,1.498s2.416-.546,3.217-1.498c.306-.364,.757-.554,1.228-.508,1.241,.105,2.455-.337,3.334-1.216s1.322-2.094,1.216-3.335c-.04-.474,.145-.92,.509-1.226,.951-.802,1.497-1.975,1.497-3.217s-.546-2.416-1.498-3.218c-.363-.305-.548-.752-.508-1.226,.106-1.241-.337-2.456-1.216-3.335-.88-.879-2.103-1.323-3.334-1.216-.48,.04-.921-.144-1.228-.508-.801-.952-1.974-1.498-3.217-1.498s-2.416,.546-3.217,1.498c-.307,.364-.762,.547-1.228,.508-1.243-.107-2.455,.337-3.334,1.216-.879,.879-1.322,2.094-1.216,3.335,.04,.474-.145,.92-.509,1.226-.951,.802-1.497,1.975-1.497,3.217s.546,2.416,1.498,3.218c.363,.305,.548,.752,.508,1.226-.106,1.241,.337,2.456,1.216,3.335s2.099,1.318,3.334,1.216c.044-.004,.087-.006,.13-.006Zm1.314-12.988c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm6,6c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Zm-5.084,2.277l5-7.5c.153-.23,.091-.54-.139-.693-.228-.152-.539-.091-.693,.139l-5,7.5c-.153,.23-.091,.54,.139,.693,.085,.057,.182,.084,.277,.084,.161,0,.319-.078,.416-.223Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <h4 className="text-sm font-semibold text-white mb-1 leading-4 md:text-center lg:text-left xl:text-lg xl:leading-5">Exclusive Offers & Deals</h4>
                                    <p className="text-xs font-semibold text-white/80 md:text-center lg:text-left xl:text-base">Special pricing for you</p>
                                </div>
                            </div>
                            <div className="flex gap-3 xl:gap-5 md:flex-col items-center lg:flex-row">
                                <div className="bg-primary text-white w-14 h-14 text-center content-center relative xl:w-18 xl:h-18">
                                    <div className="absolute w-3 h-3 border-t-2 border-l-2 border-white top-[5px] left-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-t-2 border-r-2 border-white top-[5px] right-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-b-2 border-l-2 border-white bottom-[5px] left-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <div className="absolute w-3 h-3 border-b-2 border-r-2 border-white bottom-[5px] right-[5px] animate-focus xl:W-5 xl:h-5"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-6 h-6 mx-auto xl:W-8 xl:h-8">
                                        <path d="m8 9c0 .971.121 1.724.369 2.303.109.253-.008.548-.262.657-.247.108-.547-.006-.656-.262-.304-.706-.451-1.588-.451-2.697 0-3.505 1.495-5 5-5s5 1.495 5 5c0 .586-.043 1.121-.127 1.589-.05.272-.313.451-.581.403-.271-.049-.452-.309-.403-.581.074-.409.111-.884.111-1.411 0-2.953-1.047-4-4-4s-4 1.047-4 4zm4 7c-5.143 0-7.517 1.931-7.933 6.454-.025.275.177.519.452.544.273.021.519-.177.544-.452.367-3.991 2.312-5.546 6.937-5.546s6.57 1.555 6.937 5.546c.025.277.273.478.544.452.275-.025.478-.269.452-.544-.417-4.523-2.79-6.454-7.933-6.454zm-8-6.5v-.5c0-5.607 2.393-8 8-8s8 2.393 8 8c0 3.318-1.514 5-4.5 5h-3.5c-1.346 0-2-.654-2-2s.654-2 2-2 2 .654 2 2c0 .395-.063.723-.177 1h1.677c2.421 0 3.5-1.233 3.5-4 0-5.103-1.897-7-7-7s-7 1.897-7 7v.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5zm8 3.5c.794 0 1-.206 1-1s-.206-1-1-1-1 .206-1 1 .206 1 1 1z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <h4 className="text-sm font-semibold text-white mb-1 leading-4 md:text-center lg:text-left xl:text-lg xl:text-leading-5">Exceptional Customer Service</h4>
                                    <p className="text-xs font-semibold text-white/80 md:text-center lg:text-left xl:text-base">Support you can trust</p>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
            <section className="py-4 xl:py-8">
                <div className="container px-2 mx-auto lg:px-5">
                    <h2 className="text-xl font-semibold text-dark page-title text-center mx-auto mb-10 md:text-2xl">Knowledge Center</h2>
                    <div className="grid grid-cols-1 gap-8 mb-10 xl:mb-15 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AnimatePresence>
                            {blogs?.length>0 &&
                                blogs?.slice(0, 4)?.map((blog) => (
                                    <BlogCard key={blog?.id} data={blog} />
                                ))
                            }
                        </AnimatePresence>
                    </div>
                    <div className="text-center">
                        <Link href="/blog" className="text-sm font-bold text-white btn btn-primary py-3 px-5 bg-primary inline-block w-max">
                            <span className="relative z-1 flex items-center gap-2">
                                View More 
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5"><path d="M13.1,19a1,1,0,0,1-.7-1.71L17,12.71a1,1,0,0,0,0-1.42L12.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0L18.4,9.88a3,3,0,0,1,0,4.24l-4.59,4.59A1,1,0,0,1,13.1,19Z" fill="currentColor"></path><path d="M6.1,19a1,1,0,0,1-.7-1.71L10.69,12,5.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l6,6a1,1,0,0,1,0,1.42l-6,6A1,1,0,0,1,6.1,19Z" fill="currentColor"></path></svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
