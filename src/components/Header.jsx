"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { OverlayContext } from "../context/OverlayContext";
import { useContext, useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { LoadingContext } from "../context/LoadingContext";
import Loader from "./Loader";
import Image from "next/image";


function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { loading, startLoading, stopLoading } = useContext(LoadingContext);
    const [menus, setMenus] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const { overlay, toggleOverlay } = useContext(OverlayContext);
    const {user, logout, isLoggedIn } = useContext(AuthContext);
    const [isScroll, setIsScroll] = useState(false);
    const [scrollPercent, setScrollPercent] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);
    const { getTotalItem, fetchCartFromApi, isCartOpen } = useContext(CartContext)
    const [accountMenu, setAccountMenu] = useState(false);
    const navRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const menuRef = useRef(null);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const token = user?.access_token;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname])


    const toggleMenu = (id) => {
        if (navRef.current) {
        navRef.current.scrollTo({
            top: 0,
            behavior: "smooth", // smooth scrolling
        });
        }
        setActiveMenuId(activeMenuId === id ? null : id);
    };
    useEffect(() => {
    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setActiveMenuId(null); // close menu if clicked outside
        }
        }
        if (activeMenuId) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeMenuId]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolledPercent = (scrollTop / docHeight) * 100;
            setAccountMenu(false);
            setSearchOpen(false);
            setIsScroll(scrollTop > 50);
            setScrollPercent(scrolledPercent.toFixed(1));
        }
 
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    useEffect(() => {
        setAccountMenu(false);
        setOpenMenu(false);
        setSearchOpen(false);
        setActiveMenuId(null);
        setIsFocused(false);
    }, [pathname])

    function handleSearch(e) {
        e.preventDefault();
        router.push(`/search?s=${searchText}`, { state: { value: searchText } });
        setSearchText("");
    }

    useEffect(() => {
        startLoading();
        fetch(`${baseUrl}get-front-category`, {
            method : "GET",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if(!data?.isLogin){
                localStorage.removeItem("token")
            }
            const filter = data.data.header.map((men) => {
                const fil = men.children_recursive_front.map((f) => {
                    let sm = [];

                    if (f.children_recursive && f.children_recursive.length) {
                        sm = f.children_recursive.map(s => s); 
                    }

                    return [f, ...sm]; 
                });

                men.children_recursive_front = fil.flat();  return men
            });

            setMenus(filter); 
            stopLoading();
        })
        .catch(error => {
            console.error('Error fetching menu data:', error);
        });
        
    }, []);


    useEffect(() => {
        if (!searchText) {
            setCategory([]);
            setProducts([]);
            setBrands([]);
            return;
        }

        const delay = setTimeout(() => {
            handleSuggestions();
        }, 500);
        return () => clearTimeout(delay);
    }, [searchText]);



    const handleSuggestions = async () => {
        if(searchText){
            setSearchLoading(true);
            try {
                const response = await fetch(`${baseUrl}suggestions?search=${searchText}`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error("Suggestions Failse")
                }

                const result = await response.json();
                setCategory(result.data.categories);
                setProducts(result.data.products);
                setBrands(result.data.brands);
                setSearchLoading(false);
            } catch (err) {
                console.log(err)
            }
        }else{
            setCategory([])
            setProducts([])
            setBrands([])
        }
    }


    return (
        <>
            {loading ? <Loader key="route-loader" /> : null}
            <header>
                {isFocused && (
                    <div
                        className="fixed inset-0 bg-black/40 z-80 transition-opacity duration-300"
                        onClick={() => {
                            document.documentElement.style.overflowY = "auto";
                            setIsFocused(false);
                        }}
                    ></div>
                )}
                <nav className="bg-primary border-b-2 border-primary">
                    <div className="container mx-auto px-0 xl:px-5">
                        <div className="grid grid-cols-1 items-center xl:gap-2 xl:grid-cols-8">
                            <div className="col-span-2">
                                <marquee behavior="smooth" direction="left" className="text-white relative text-sm font-semibold mt-2 xl:text-base">Attention: If you are experiencing any checkout issues, please call 1-973-335-2966 | We are currently updating the price listed on our website.</marquee>
                            </div>
                            <div className={`col-span-3 w-full my-0 border-primary z-90 fixed top-0 left-0 ${searchOpen ? "-translate-x-0" : "-translate-x-[110%]"} xl:translate-x-[0]  xl:relative xl:my-2 xl:block`}>
                                <form className="w-full bg-white"onSubmit={(e) => handleSearch(e)}>
                                    <div className="flex gap-1 justify-between">
                                        <input type="text" id="search" className="text-[#1E1E1E] w-full text-sm py-2 px-3 font-medium placeholder:text-[#1E1E1E]/80" placeholder="Type Name, Catalog or CAS Number"
                                            value={searchText} 
                                            onChange={(e) => 
                                                setSearchText(e.target.value)
                                            }
                                            onFocus={() => {
                                                setIsFocused(true);
                                                document.documentElement.style.overflowY = "hidden";
                                            }}
                                        />
                                        <button className="p-2 cursor-pointer"
                                            type="button"
                                            onClick={() => {
                                                setSearchOpen(false)
                                                setIsFocused(false)
                                                setSearchText("")
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 relative z-1"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                                        </button>
                                        <button className="text-base text-white font-bold px-4 py-3 cursor-pointer bg-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" xmlSpace="preserve" className="w-4 h-4"><g><path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" fill="currentColor"></path></g></svg>
                                        </button>
                                    </div>
                                </form>
                                <AnimatePresence mode="wait">
                                    {isFocused &&
                                        <motion.div
                                            whileInView={{ opacity: 1, minHeight: "150px", height: "min-content", y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            variants={{
                                                initial: { opacity: 0, minHeight: 0, height: 0, y: -10 },
                                                animate: { opacity: 1, minHeight: "150px", height: "min-content", y: 0 },
                                                exit: { opacity: 0, minHeight: 0, height: 0, y: -10 },
                                            }}
                                            className="bg-white p-3 absolute top-11 w-full max-h-[50vh] border border-gray-300 overflow-auto"
                                        >
                                            <h4 className="text-sm font-semibold text-dark mb-2">Find Products by name, product code, or CAS number.</h4>
                                            {searchLoading ?
                                                <div role="status" className="animate-pulse">
                                                    <div className="w-full grid grid-cols-7 gap-5 items-start my-4">
                                                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                        <div className="text-center col-span-3">
                                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                                        </div>
                                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                        <div className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto"></div>
                                                    </div>
                                                    <div className="w-full grid grid-cols-7 gap-5 items-start my-4">
                                                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                        <div className="text-center col-span-3">
                                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                                        </div>
                                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                        <div className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto"></div>
                                                    </div>
                                                    <div className="w-full grid grid-cols-7 gap-5 items-start my-4">
                                                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                        <div className="text-center col-span-3">
                                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                                        </div>
                                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                        <div className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto"></div>
                                                    </div>
                                                    <div className="w-full grid grid-cols-7 gap-5 items-start my-4">
                                                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                        <div className="text-center col-span-3">
                                                            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                                                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2"></div>
                                                        </div>
                                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                                        <div className="w-8 h-8 bg-gray-200 rounded-full dark:bg-gray-700 mx-auto"></div>
                                                    </div>
                                                    <span className="sr-only">Loading...</span>
                                                </div> :
                                                <>
                                                    {
                                                        products.map(pro => (
                                                            <motion.div
                                                                key={pro?.id}
                                                                initial={{ opacity: 0, y: 50 }}
                                                                whileInView={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                viewport={{ once: true, amount: 0.2 }}
                                                                className="grid grid-cols-3 gap-2 items-center bg-white shadow-sm px-2 py-2 mb-5 lg:grid-cols-5 xl:gap-2"
                                                            >
                                                                <div className="text-left">
                                                                    <Link href={`/product/${pro?.slug}`} className="bg-primary/15 text-center text-[8px] font-semibold py-1 px-2 rounded-full text-dark">{pro?.sku}</Link>
                                                                </div>
                                                                <div className="text-left col-span-3 -order-1 py-2 lg:py-0 lg:order-0 lg:col-span-2">
                                                                    <h2><Link href={`/product/${pro?.slug}`} className="text-sm font-semibold text-dark hover:text-primary">{pro?.name}</Link></h2>
                                                                </div>
                                                                <div className="text-center">
                                                                    <Link href={`/product/${pro?.slug}`} className="text-base font-semibold hover:text-primary xl:text-base">{Number(pro?.discounted_price) === 0 ? <span className="text-[#00c97a]">Inquiry Now</span> : <> {isLoggedIn && <del className="text-sm mr-1">${pro?.price}</del>} <span className="text-[#00c97a]">${pro?.discounted_price} </span></> }</Link>
                                                                </div>
                                                                <div className="text-right">
                                                                    <Link href={`/product/${pro?.slug}`} className="text-white bg-primary btn-primary text-base inline-block w-8 h-8 text-center content-center mr-2 hover:bg-secondary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-4 h-4 m-auto relative z-1"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z" fill="currentColor"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" fill="currentColor"></path></svg>
                                                                    </Link>
                                                                </div>
                                                            </motion.div>
                                                        ))
                                                    }
                                                    {category?.length > 0 &&
                                                        <>
                                                            <h6 className="my-2 text-base font-semibold">Categories : </h6>
                                                            <div className=" flex flex-wrap gap-2">
                                                                {
                                                                    category?.map(cat => (
                                                                        <Link href={`/product-category/${cat?.slug}`} key={cat?.id} className="text-sm font-semibold hover:text-primary">{cat?.name} | </Link>
                                                                    ))
                                                                }
                                                            </div>
                                                        </>
                                                    }
                                                    {brands?.length > 0 &&
                                                        <>
                                                            <h6 className="mt-4 mb-2 text-base font-semibold">Brands : </h6>
                                                            <div className=" flex flex-wrap gap-2">
                                                                {
                                                                    brands?.map(brand => (
                                                                        <Link href={`/brand/${brand?.slug}`} key={brand?.id} className="text-sm font-semibold hover:text-primary">{brand?.name} | </Link>
                                                                    ))
                                                                }
                                                            </div>
                                                        </>
                                                    }  
                                                </>
                                                
                                            }       
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            <div className="col-span-3">
                                <ul className="flex justify-center items-center gap-3 xl:justify-end">
                                    <li>
                                        <Link href="/about-us" className="text-white inline-block text-xs font-semibold py-5 px-1 border-t-2 border-transparent hover:border-white">ABOUT US</Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" className="text-white inline-block text-xs font-semibold py-5 px-1 border-t-2 border-transparent hover:border-white">BLOG</Link>
                                    </li>
                                    <li>
                                        <Link href="/faq" className="text-white inline-block text-xs font-semibold py-5 px-1 border-t-2 border-transparent hover:border-white">FAQ</Link>
                                    </li>
                                    <li>
                                        <Link href="/career" className="text-white inline-block text-xs font-semibold py-5 px-1 border-t-2 border-transparent hover:border-white">CAREER</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact-us" className="text-white inline-block text-xs font-semibold py-5 px-1 border-t-2 border-transparent hover:border-white">CONTACT</Link>
                                    </li>
                                    <li>
                                        <a href="https://technicaldoc.com/" target="_blank" rel="noopener" className="text-xs font-bold uppercase text-white btn btn-secondary py-3 px-3 bg-secondary inline-block cursor-pointer"><span className="relative z-1">FIND SDS & COA</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <nav className={`w-full bg-white shadow-sm main-nav min-h-[80px] content-center ${isScroll ? "sticky-wrapper" : "relative"} z-70`} ref={navRef}>
                    <div className="container px-2 mx-auto lg:px-5">
                        <div className="flex gap-2 items-center justify-between">
                            <Link className="mr-6" href="/">
                                <Image src="/assets/images/lab-logo.png" alt="Labdisposable" width={120} height={70} className="w-[120px] h-auto" />
                            </Link>
                            <ul className={`gap-1 w-full bg-white fixed z-10000 top-0 left-0 h-screen overflow-y-auto px-4 py-6 block md:z-1000  lg:p-0 xl:w-auto xl:flex xl:justify-center xl:relative xl:h-max xl:overflow-y-visible transition-all transition-ease-in-out duration-300 ${!openMenu ? "-translate-y-[100%]" : ""} xl:translate-y-0`}>
                                <li className="lg:hidden mb-4">
                                    <div className="flex justify-between items-start">
                                        <Link href="/">
                                            <Image src="/assets/images/lab-logo.png" alt="Lab Disposable Products" width={100} height={60} className="w-[100px] h-auto" />
                                        </Link>
                                        <button className="text-secondary text-xl font-semibold py-2"
                                            onClick={() => {
                                                document.documentElement.style.overflowY = "auto";
                                                setOpenMenu(!openMenu)
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-7 h-7 relative z-1" ><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor" /></svg>
                                        </button>
                                    </div>
                                </li>
                                {menus && menus.map(menu => (
                                    <li className={`relative nav-item group py-2 lg:py-4 content-center ${menu?.children_recursive_front && menu?.children_recursive_front.length ? 'has-children' : ''} ${activeMenuId === menu.id ? "active" : ""}`} key={menu?.id}>
                                        <Link href={`/product-category/${menu?.slug}`} aria-label={menu?.name} className="nav-link w-[calc(100%-40px)] text-sm font-semibold uppercase text-dark px-1 py-3 lg:flex lg:items-center lg:py-4 lg:w-max hover:text-primary">
                                            {menu.name} 
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 group-hover:rotate-180"><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" fill="currentColor" /></svg>
                                        </Link>
                                        <button className={`text-xs w-[25px] h-[25px] float-inline-end ml-auto cursor-pointer group-hover:bg-primary group-hover:text-white ${activeMenuId === menu.id ? "text-white bg-primary" : "bg-[#efeff0]"} lg:hidden`} aria-label="Dropdown Toggle" onClick={() => toggleMenu(menu?.id)}>
                                            {activeMenuId === menu.id ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" /></svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" /></svg>
                                            }
                                        </button>
                                        {menu?.children_recursive_front && menu?.children_recursive_front.length > 0 && (
                                            <div className={`bg-white shadow-sm px-4 py-2 lg:py-4 lg:absolute top-[100%] left-auto w-max sub-menu ${activeMenuId === menu.id ? 'open' : ''}`}>
                                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-2 lg:min-w-[900px]">
                                                    {Array.from({ length: 5 }).map((_, i) => {
                                                        const chunkSize = Math.ceil(menu?.children_recursive_front.length / 5);
                                                        const start = i * chunkSize;
                                                        const end = start + chunkSize;
                                                        const chunk = menu?.children_recursive_front.slice(start, end);
                                                        return (
                                                            <ul className="px-1 lg:max-w-[175px]" key={i}>
                                                                {chunk.map(child => (
                                                                    <li className="my-[2px] nav-item" key={child?.id}>
                                                                        <Link href={`/product-category/${menu?.slug}/${child?.slug}`} aria-label={child?.name} className="nav-link block w-full text-sm font-semibold text-dark/90 inline-block py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">{child?.name}</Link>
                                                                    </li>                                                        
                                                                ))}
                                                            </ul>
                                                            );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}
                                <li className="relative nav-item group py-2 lg:py-4">
                                    <Link href="/special-offer" className="nav-link text-sm font-semibold uppercase text-dark inline-block px-1 py-3 lg:py-4 hover:text-primary">Special Offer</Link>
                                </li>
                                <li className="relative nav-item group py-2 lg:py-4">
                                    <Link href="/" className="nav-link text-sm font-semibold uppercase text-dark px-1 py-3 lg:flex lg:items-center lg:py-4 hover:text-primary">
                                        Programs 
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 group-hover:rotate-180"><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" fill="currentColor" /></svg>
                                    </Link>
                                    <button className={`text-xs w-[25px] h-[25px] float-inline-end ml-auto cursor-pointer group-hover:bg-primary group-hover:text-white ${activeMenuId === "Programs" ? "text-white bg-primary" : "bg-[#efeff0]"} lg:hidden`} aria-label="Dropdown Toggle" onClick={() => toggleMenu("Programs")} >
                                        {activeMenuId === "Programs" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" /></svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" /></svg>
                                        }
                                    </button>
                                    <div className={`bg-white shadow-sm px-4 py-4 lg:absolute top-[100%] left-auto w-max sub-menu ${activeMenuId === "Programs" ? 'open' : ''}`}>
                                        <div className="grid grid-cols-1 gap-2 min-w-[220px]">
                                            <ul className="px-1">
                                                <li className="my-2 nav-item">
                                                    <Link href="/auto-shipment-program" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">Auto Shipment Program</Link>
                                                </li>
                                                <li className="my-2 nav-item">
                                                    <Link href="/referral-reword" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">Referrals & Reward Program</Link>
                                                </li>
                                                <li className="my-2 nav-item">
                                                    <Link href="/university-college-school-program" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">University Program</Link>
                                                </li>
                                                <li className="my-2 nav-item">
                                                    <Link href="/new-lab-start-up-program" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">New Lab Start-up Program</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="relative nav-item group py-2 lg:py-4">
                                    <Link href="/suppliers" className="nav-link text-sm font-semibold uppercase text-dark inline-block px-1 py-3 lg:py-4 hover:text-primary">shop by supplier</Link>
                                </li>
                                <li className="relative nav-item group py-2 lg:py-4">
                                    <Link href="/application" className="nav-link text-sm font-semibold uppercase text-dark px-1 py-3 lg:flex lg:items-center lg:py-4 hover:text-primary">
                                        application
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 group-hover:rotate-180"><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" fill="currentColor" /></svg> 
                                    </Link>
                                    <button className={`text-xs w-[25px] h-[25px] float-inline-end ml-auto cursor-pointer group-hover:bg-primary group-hover:text-white ${activeMenuId === "Application" ? "text-white bg-primary" : "bg-[#efeff0]"} lg:hidden`} aria-label="Dropdown Toggle" onClick={() => toggleMenu("Application")} >
                                        {activeMenuId === "Application" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" /></svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" /></svg>
                                        }
                                    </button>
                                    <div className={`bg-white shadow-sm px-4 py-4 lg:absolute top-[100%] left-auto w-max sub-menu ${activeMenuId === "Application" ? 'open' : ''}`}>
                                        <div className="grid grid-cols-1 gap-2 min-w-[220px]">
                                            <ul className="px-1">
                                                <li className="my-2 nav-item">
                                                    <Link href="/application/cryogenic" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">Cryogenic</Link>
                                                </li>
                                                <li className="my-2 nav-item">
                                                    <Link href="/application/sample-preparation" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">Sample Preparation</Link>
                                                </li>
                                                <li className="my-2 nav-item">
                                                    <Link href="/application/liquid-handling" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">Liquid handling</Link>
                                                </li>
                                                <li className="my-2 nav-item">
                                                    <Link href="/application/microbiological" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">Microbiological</Link>
                                                </li>
                                                <li className="my-2 nav-item">
                                                    <Link href="/application/safety" className="nav-link block w-full text-sm font-semibold text-dark/90 py-1 pr-4 relative overflow-hidden hover:text-primary hover:pl-3">Safety</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="py-4 md:hidden">
                                    {isLoggedIn ?
                                        <div className="relative group accountMenu">
                                            <button className={`w-full text-sm font-semibold border-2 border-primary text-primary bg-white px-3 py-2 cursor-pointer flex items-center ${accountMenu ? "active" : ""} group-hover:border-black group-hover:text-black`}
                                                onClick={() => {
                                                    if (navRef.current) {
                                                    navRef.current.scrollTo({
                                                        top: 0,
                                                        behavior: "smooth", 
                                                    })
                                                    }
                                                    setAccountMenu(!accountMenu)
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                                                    <path d="M17.5,24c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5,6.5,2.916,6.5,6.5-2.916,6.5-6.5,6.5Zm0-11c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5,4.5-2.019,4.5-4.5-2.019-4.5-4.5-4.5Zm.999,6.354l1.886-1.833c.396-.385,.405-1.018,.021-1.414-.385-.395-1.018-.406-1.414-.02l-1.892,1.838c-.099,.1-.262,.1-.362,0l-.876-.858c-.395-.386-1.027-.379-1.414,.016s-.38,1.027,.015,1.414l.876,.858c.437,.428,1.01,.641,1.582,.641s1.146-.215,1.579-.643Zm-9.499-7.354c-3.309,0-6-2.691-6-6S5.691,0,9,0s6,2.691,6,6-2.691,6-6,6Zm0-10c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4ZM2,23c0-3.524,2.633-6.511,6.124-6.946,.548-.068,.937-.568,.869-1.116s-.574-.931-1.116-.868C3.386,14.629,0,18.469,0,23c0,.553,.448,1,1,1s1-.447,1-1Z" fill="currentColor" />
                                                </svg>
                                                My Account
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className={`w-5 h-5 mt-1 ${accountMenu ? 'rotate-180' : ''}`}><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" fill="currentColor"></path></svg>
                                            </button>
                                            <div className={`w-full absolute top-[100%] left-0 bg-white shadow-lg z-10000 submenu ${accountMenu ? "active" : ""}`}>
                                                <Link href="/user/account" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M23.9,11.437A12,12,0,0,0,0,13a11.878,11.878,0,0,0,3.759,8.712A4.84,4.84,0,0,0,7.113,23H16.88a4.994,4.994,0,0,0,3.509-1.429A11.944,11.944,0,0,0,23.9,11.437Zm-4.909,8.7A3,3,0,0,1,16.88,21H7.113a2.862,2.862,0,0,1-1.981-.741A9.9,9.9,0,0,1,2,13,10.014,10.014,0,0,1,5.338,5.543,9.881,9.881,0,0,1,11.986,3a10.553,10.553,0,0,1,1.174.066,9.994,9.994,0,0,1,5.831,17.076ZM7.807,17.285a1,1,0,0,1-1.4,1.43A8,8,0,0,1,12,5a8.072,8.072,0,0,1,1.143.081,1,1,0,0,1,.847,1.133.989.989,0,0,1-1.133.848,6,6,0,0,0-5.05,10.223Zm12.112-5.428A8.072,8.072,0,0,1,20,13a7.931,7.931,0,0,1-2.408,5.716,1,1,0,0,1-1.4-1.432,5.98,5.98,0,0,0,1.744-5.141,1,1,0,0,1,1.981-.286Zm-5.993.631a2.033,2.033,0,1,1-1.414-1.414l3.781-3.781a1,1,0,1,1,1.414,1.414Z" fill="currentColor" /></svg>
                                                    Dashboard
                                                </Link>
                                                <Link href="/user/profile" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                                                        <path d="M17.5,24c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5,6.5,2.916,6.5,6.5-2.916,6.5-6.5,6.5Zm0-11c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5,4.5-2.019,4.5-4.5-2.019-4.5-4.5-4.5Zm.999,6.354l1.886-1.833c.396-.385,.405-1.018,.021-1.414-.385-.395-1.018-.406-1.414-.02l-1.892,1.838c-.099,.1-.262,.1-.362,0l-.876-.858c-.395-.386-1.027-.379-1.414,.016s-.38,1.027,.015,1.414l.876,.858c.437,.428,1.01,.641,1.582,.641s1.146-.215,1.579-.643Zm-9.499-7.354c-3.309,0-6-2.691-6-6S5.691,0,9,0s6,2.691,6,6-2.691,6-6,6Zm0-10c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4ZM2,23c0-3.524,2.633-6.511,6.124-6.946,.548-.068,.937-.568,.869-1.116s-.574-.931-1.116-.868C3.386,14.629,0,18.469,0,23c0,.553,.448,1,1,1s1-.447,1-1Z" fill="currentColor" />
                                                    </svg>
                                                    Profile
                                                </Link>
                                                <Link href="/user/company" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                                                        <path d="m14,12v-7c0-1.654-1.346-3-3-3h-6c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h6c.553,0,1,.447,1,1s-.447,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h6c2.757,0,5,2.243,5,5v7c0,.553-.447,1-1,1s-1-.447-1-1Zm-8,1h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm-5,4h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1ZM6,5h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm-5,4h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm12.969,13.751c-.56-2.174-2.649-3.751-4.969-3.751s-4.409,1.577-4.969,3.751c-.138.534.185,1.08.72,1.218.53.137,1.08-.185,1.218-.72.33-1.282,1.633-2.249,3.031-2.249s2.701.967,3.031,2.249c.116.451.522.751.968.751.083,0,.167-.01.25-.031.535-.138.857-.684.72-1.218Zm-4.969-4.751c1.379,0,2.5-1.121,2.5-2.5s-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5,1.121,2.5,2.5,2.5Z" fill="currentColor" />
                                                    </svg>
                                                    Corporate Account
                                                </Link>
                                                <Link href="/user/orders" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                                                        <path d="M9,22c0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2,2,.895,2,2Zm8-2c-1.105,0-2,.895-2,2s.895,2,2,2,2-.895,2-2-.895-2-2-2ZM5.419,13l-.941-8h5.591c.087-.699,.262-1.369,.518-2H4.242l-.041-.351c-.178-1.511-1.459-2.649-2.979-2.649H0V2H1.222c.507,0,.934,.38,.993,.884l1.584,13.467c.178,1.511,1.459,2.649,2.979,2.649h13.222v-2H6.778c-.507,0-.934-.38-.993-.884l-.131-1.116H21.835l.363-2H5.419ZM24,6c0,3.309-2.691,6-6,6s-6-2.691-6-6S14.691,0,18,0s6,2.691,6,6Zm-2,0c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Zm-3-3h-2v3.414l2.293,2.293,1.414-1.414-1.707-1.707V3Z" fill="currentColor" />
                                                    </svg>
                                                    My Order List
                                                </Link>
                                                <Link href="/user/address" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M24,9.724V19a5.006,5.006,0,0,1-5,5H18a1,1,0,0,1,0-2h1a3,3,0,0,0,3-3V9.724a3,3,0,0,0-1.322-2.487l-7-4.723a2.979,2.979,0,0,0-3.356,0l-7,4.723A3,3,0,0,0,2,9.724V19a3,3,0,0,0,3,3H6a1,1,0,0,1,0,2H5a5.006,5.006,0,0,1-5-5V9.724A4.993,4.993,0,0,1,2.2,5.579L9.2.855a4.981,4.981,0,0,1,5.594,0l7,4.724A5,5,0,0,1,24,9.724Zm-5,5.283a6.952,6.952,0,0,1-2.05,4.949l-3.515,3.438a2.063,2.063,0,0,1-2.87,0l-3.507-3.43A7,7,0,1,1,19,15.007Zm-2,0a5,5,0,1,0-8.536,3.535l3.5,3.422,3.58-3.43A4.958,4.958,0,0,0,17,15.007ZM15,15a3,3,0,1,1-3-3A3,3,0,0,1,15,15Z" fill="currentColor" /></svg>
                                                    Addresses
                                                </Link>
                                                <Link href="/user/wishlist" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" fill="currentColor" /></svg>
                                                    Wishlist
                                                </Link>
                                                <button className="text-dark w-full text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white cursor-pointer"
                                                    onClick={() => {
                                                        logout(); 
                                                        setAccountMenu(!accountMenu);
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="m8 0c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm-3.5 4h6.5v2h-6.5c-1.379 0-2.5 1.122-2.5 2.5v5.5h-2v-5.5c0-2.481 2.019-4.5 4.5-4.5zm11.5 8h2v2h-2c-1.654 0-3-1.346-3-3v-6c0-1.654 1.346-3 3-3h2v2h-2c-.552 0-1 .449-1 1v6c0 .551.448 1 1 1zm8-3.941c0 .548-.24 1.07-.658 1.432l-2.681 2.362-1.322-1.5 1.535-1.354h-3.874v-2h3.74l-1.401-1.235 1.322-1.5 2.688 2.37c.411.355.651.877.651 1.425z" fill="currentColor" /></svg>
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                        
                                        :
                                        <Link className="text-sm font-bold text-white btn btn-primary py-3 px-5 mt-4 bg-primary btn-scale-0 inline-block text-center w-full lg:w-max" href="/login"><span className="relative z-1">Login/Signup</span></Link>
                                    }
                                </li>
                            </ul>
                            <div className="w-max flex gap-2 items-center">
                                {isLoggedIn ?
                                    <div className="relative group accountMenu hidden md:block">
                                        <button className={`text-sm font-semibold border-2 border-primary text-primary bg-white px-3 py-2 cursor-pointer flex items-center ${accountMenu ? "active" : ""} group-hover:border-black group-hover:text-black`}
                                            onClick={() => {
                                                if (navRef.current) {
                                                navRef.current.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth", 
                                                })
                                                }
                                                setAccountMenu(!accountMenu)
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                                                <path d="M17.5,24c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5,6.5,2.916,6.5,6.5-2.916,6.5-6.5,6.5Zm0-11c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5,4.5-2.019,4.5-4.5-2.019-4.5-4.5-4.5Zm.999,6.354l1.886-1.833c.396-.385,.405-1.018,.021-1.414-.385-.395-1.018-.406-1.414-.02l-1.892,1.838c-.099,.1-.262,.1-.362,0l-.876-.858c-.395-.386-1.027-.379-1.414,.016s-.38,1.027,.015,1.414l.876,.858c.437,.428,1.01,.641,1.582,.641s1.146-.215,1.579-.643Zm-9.499-7.354c-3.309,0-6-2.691-6-6S5.691,0,9,0s6,2.691,6,6-2.691,6-6,6Zm0-10c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4ZM2,23c0-3.524,2.633-6.511,6.124-6.946,.548-.068,.937-.568,.869-1.116s-.574-.931-1.116-.868C3.386,14.629,0,18.469,0,23c0,.553,.448,1,1,1s1-.447,1-1Z" fill="currentColor" />
                                            </svg>
                                            My Account
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className={`w-5 h-5 mt-1 ${accountMenu ? 'rotate-180' : ''}`}><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" fill="currentColor"></path></svg>
                                        </button>
                                        <div className={`absolute top-[100%] right-0 bg-white w-max shadow-lg z-10000 submenu ${accountMenu ? "active" : ""}`}>
                                            <Link href="/user/account" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M23.9,11.437A12,12,0,0,0,0,13a11.878,11.878,0,0,0,3.759,8.712A4.84,4.84,0,0,0,7.113,23H16.88a4.994,4.994,0,0,0,3.509-1.429A11.944,11.944,0,0,0,23.9,11.437Zm-4.909,8.7A3,3,0,0,1,16.88,21H7.113a2.862,2.862,0,0,1-1.981-.741A9.9,9.9,0,0,1,2,13,10.014,10.014,0,0,1,5.338,5.543,9.881,9.881,0,0,1,11.986,3a10.553,10.553,0,0,1,1.174.066,9.994,9.994,0,0,1,5.831,17.076ZM7.807,17.285a1,1,0,0,1-1.4,1.43A8,8,0,0,1,12,5a8.072,8.072,0,0,1,1.143.081,1,1,0,0,1,.847,1.133.989.989,0,0,1-1.133.848,6,6,0,0,0-5.05,10.223Zm12.112-5.428A8.072,8.072,0,0,1,20,13a7.931,7.931,0,0,1-2.408,5.716,1,1,0,0,1-1.4-1.432,5.98,5.98,0,0,0,1.744-5.141,1,1,0,0,1,1.981-.286Zm-5.993.631a2.033,2.033,0,1,1-1.414-1.414l3.781-3.781a1,1,0,1,1,1.414,1.414Z" fill="currentColor" /></svg>
                                                Dashboard
                                            </Link>
                                            <Link href="/user/profile" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                                                    <path d="M17.5,24c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5,6.5,2.916,6.5,6.5-2.916,6.5-6.5,6.5Zm0-11c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5,4.5-2.019,4.5-4.5-2.019-4.5-4.5-4.5Zm.999,6.354l1.886-1.833c.396-.385,.405-1.018,.021-1.414-.385-.395-1.018-.406-1.414-.02l-1.892,1.838c-.099,.1-.262,.1-.362,0l-.876-.858c-.395-.386-1.027-.379-1.414,.016s-.38,1.027,.015,1.414l.876,.858c.437,.428,1.01,.641,1.582,.641s1.146-.215,1.579-.643Zm-9.499-7.354c-3.309,0-6-2.691-6-6S5.691,0,9,0s6,2.691,6,6-2.691,6-6,6Zm0-10c-2.206,0-4,1.794-4,4s1.794,4,4,4,4-1.794,4-4-1.794-4-4-4ZM2,23c0-3.524,2.633-6.511,6.124-6.946,.548-.068,.937-.568,.869-1.116s-.574-.931-1.116-.868C3.386,14.629,0,18.469,0,23c0,.553,.448,1,1,1s1-.447,1-1Z" fill="currentColor" />
                                                </svg>
                                                Profile
                                            </Link>
                                            <Link href="/user/company" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                                                    <path d="m14,12v-7c0-1.654-1.346-3-3-3h-6c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h6c.553,0,1,.447,1,1s-.447,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h6c2.757,0,5,2.243,5,5v7c0,.553-.447,1-1,1s-1-.447-1-1Zm-8,1h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm-5,4h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1ZM6,5h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm-5,4h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm5,0h-1c-.553,0-1,.447-1,1s.447,1,1,1h1c.553,0,1-.447,1-1s-.447-1-1-1Zm12.969,13.751c-.56-2.174-2.649-3.751-4.969-3.751s-4.409,1.577-4.969,3.751c-.138.534.185,1.08.72,1.218.53.137,1.08-.185,1.218-.72.33-1.282,1.633-2.249,3.031-2.249s2.701.967,3.031,2.249c.116.451.522.751.968.751.083,0,.167-.01.25-.031.535-.138.857-.684.72-1.218Zm-4.969-4.751c1.379,0,2.5-1.121,2.5-2.5s-1.121-2.5-2.5-2.5-2.5,1.121-2.5,2.5,1.121,2.5,2.5,2.5Z" fill="currentColor" />
                                                </svg>
                                                Corporate Account
                                            </Link>
                                            <Link href="/user/orders" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18">
                                                    <path d="M9,22c0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2,2,.895,2,2Zm8-2c-1.105,0-2,.895-2,2s.895,2,2,2,2-.895,2-2-.895-2-2-2ZM5.419,13l-.941-8h5.591c.087-.699,.262-1.369,.518-2H4.242l-.041-.351c-.178-1.511-1.459-2.649-2.979-2.649H0V2H1.222c.507,0,.934,.38,.993,.884l1.584,13.467c.178,1.511,1.459,2.649,2.979,2.649h13.222v-2H6.778c-.507,0-.934-.38-.993-.884l-.131-1.116H21.835l.363-2H5.419ZM24,6c0,3.309-2.691,6-6,6s-6-2.691-6-6S14.691,0,18,0s6,2.691,6,6Zm-2,0c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Zm-3-3h-2v3.414l2.293,2.293,1.414-1.414-1.707-1.707V3Z" fill="currentColor" />
                                                </svg>
                                                My Order List
                                            </Link>
                                            <Link href="/user/address" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M24,9.724V19a5.006,5.006,0,0,1-5,5H18a1,1,0,0,1,0-2h1a3,3,0,0,0,3-3V9.724a3,3,0,0,0-1.322-2.487l-7-4.723a2.979,2.979,0,0,0-3.356,0l-7,4.723A3,3,0,0,0,2,9.724V19a3,3,0,0,0,3,3H6a1,1,0,0,1,0,2H5a5.006,5.006,0,0,1-5-5V9.724A4.993,4.993,0,0,1,2.2,5.579L9.2.855a4.981,4.981,0,0,1,5.594,0l7,4.724A5,5,0,0,1,24,9.724Zm-5,5.283a6.952,6.952,0,0,1-2.05,4.949l-3.515,3.438a2.063,2.063,0,0,1-2.87,0l-3.507-3.43A7,7,0,1,1,19,15.007Zm-2,0a5,5,0,1,0-8.536,3.535l3.5,3.422,3.58-3.43A4.958,4.958,0,0,0,17,15.007ZM15,15a3,3,0,1,1-3-3A3,3,0,0,1,15,15Z" fill="currentColor" /></svg>
                                                Addresses
                                            </Link>
                                            <Link href="/user/wishlist" className="text-dark text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" fill="currentColor" /></svg>
                                                Wishlist
                                            </Link>
                                            <button className="text-dark w-full text-base font-semibold flex gap-2 items-center py-3 px-6 border-b border-gray-300 hover:bg-primary hover:text-white cursor-pointer"
                                                onClick={() => {
                                                    logout(); 
                                                    setAccountMenu(!accountMenu);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" className="mr-2" dataname="Layer 1" viewBox="0 0 24 24" width="18" height="18"><path d="m8 0c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm-3.5 4h6.5v2h-6.5c-1.379 0-2.5 1.122-2.5 2.5v5.5h-2v-5.5c0-2.481 2.019-4.5 4.5-4.5zm11.5 8h2v2h-2c-1.654 0-3-1.346-3-3v-6c0-1.654 1.346-3 3-3h2v2h-2c-.552 0-1 .449-1 1v6c0 .551.448 1 1 1zm8-3.941c0 .548-.24 1.07-.658 1.432l-2.681 2.362-1.322-1.5 1.535-1.354h-3.874v-2h3.74l-1.401-1.235 1.322-1.5 2.688 2.37c.411.355.651.877.651 1.425z" fill="currentColor" /></svg>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                    
                                    :
                                    <Link className="text-sm font-bold text-white btn btn-primary py-3 px-5 bg-primary hidden md:block" href="/login"><span className="relative z-1">Login/Signup</span></Link>
                                }
                                <button className="text-base font-bold p-2 cursor-pointer hover:text-primary xl:hidden"
                                    onClick={() => setSearchOpen(!searchOpen)}
                                >
                                    {searchOpen ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 relative z-1" ><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor" /></svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" xmlSpace="preserve" className="w-5 h-5"><g><path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" fill="currentColor"></path></g></svg>
                                    }
                                </button>
                                <button className="group text-2xl p-3 cursor-pointer font-bold cursor-pointer relative hover:text-primary" onClick={() => toggleOverlay("cart Sidebar")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-7 h-7"><path d="M23.43,4.92c-.48-.58-1.18-.92-1.93-.92H6.49l-.26-1.84c-.17-1.23-1.23-2.16-2.48-2.16h-1.26c-.28,0-.5,.22-.5,.5s.22,.5,.5,.5h1.26c.75,0,1.38,.56,1.49,1.29l1.78,12.83c.31,2.21,2.22,3.88,4.46,3.88h8.02c.28,0,.5-.22,.5-.5s-.22-.5-.5-.5H11.48c-1.73,0-3.22-1.29-3.46-3h10.64c2.14,0,3.99-1.52,4.41-3.62l.88-4.39c.15-.74-.04-1.49-.52-2.08Zm-.46,1.88l-.88,4.39c-.33,1.63-1.77,2.81-3.43,2.81H7.88l-1.25-9h14.87c.45,0,.87,.2,1.16,.55,.29,.35,.4,.8,.31,1.25Zm-13.97,13.21c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm0,3c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1Zm9-3c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm0,3c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1ZM0,5.5c0-.28,.22-.5,.5-.5H3.04c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5H.5c-.28,0-.5-.22-.5-.5Zm0,4c0-.28,.22-.5,.5-.5H3.5c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5H.5c-.28,0-.5-.22-.5-.5Zm5,4c0,.28-.22,.5-.5,.5H.5c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5H4.5c.28,0,.5,.22,.5,.5Z" fill="currentColor" /></svg>                                    
                                        <p className="text-[10px] bg-primary text-white rounded-full inline-block w-[18px] h-[18px] rounded-full text-center content-center absolute top-[8px] right-[2px] group-hover:bg-secondary">{getTotalItem()}</p>
                                </button>
                                <button className="group text-2xl w-[40px] h-[40px] p-2 cursor-pointer content-center cursor-pointer relative ml-2 block xl:hidden border-2 border-primary rounded-full hover:border-dark" 
                                    onClick={() => {
                                        document.documentElement.style.overflowY = "hidden";
                                        setSearchOpen(false)
                                        setOpenMenu(!openMenu)
                                    }}
                                >
                                    <div className="w-full h-[2px] bg-primary group-hover:bg-dark"></div>
                                    <div className="w-[80%] h-[2px] bg-primary my-[5px] ml-auto group-hover:bg-dark  group-hover:w-full"></div>
                                    <div className="w-full h-[2px] bg-primary group-hover:bg-dark"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute h-[2px] bg-primary left-0 bottom-0 transition-linear duration-300 z-1001" style={{ width: `${scrollPercent}%` }}></div>
                </nav>
                {overlay &&
                    <div className={`overlay w-full h-screen opacity-full fixed  bg-black/60 top-0 transition-300 left-[0%] z-100 backdrop-blur-[2px]`} onClick={() => toggleOverlay(false)}>
                        <button className="absolute top-5 right-5 cursor-pointer p-1 text-white" onClick={() => toggleOverlay(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-9 h-9 relative z-1"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                        </button>
                    </div>
                }
            </header>
        </>
    )
}

export default Header;