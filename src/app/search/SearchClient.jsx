"use client"

import { AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect, useContext } from "react";
import { WishListContext } from "@/context/WishListContext";
import { useSearchParams, useRouter } from "next/navigation";
import { LoadingContext } from "@/context/LoadingContext";
import Link from "next/link";
import { Range } from "react-range";

export default function SearchClient(){
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const router = useRouter()    
    const [initPrice, setinitPrice] = useState({
        min: 0,
        max: 1
    });
    const [range, setRange] = useState([0, 1]); // min, max
    const { startLoading, stopLoading } = useContext(LoadingContext);
    const { wishList } = useContext(WishListContext);
    const [brandLoad, setBrandLoad] = useState(false);
    const searchParams = useSearchParams();
    const searchValue = searchParams.get('s');
    const [meta, setMeta] = useState(null);
    const [page, setPage] = useState(1);

    const value = searchValue || ''; 
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const num = searchParams.get("page");
        const fetchProduct = async () => {
            startLoading();
            try {
                const response = await fetch(`${baseUrl}products-search?name=${value}${num ? `&page=${num}` : ""}${searchParams?.get("price_min") ? `&price_min=${searchParams?.get("price_min")}&price_max=${searchParams?.get("price_max")}` : ""}${searchParams?.get("brand") ? `&brand=${searchParams?.get("brand")}` : ""}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProducts(data.data);
                setMeta(data.meta)
                setinitPrice({min : data?.meta?.min_price, max : data?.meta?.max_price});
                setRange([searchParams.get("price_min") || data?.meta?.min_price, searchParams.get("price_max") || data?.meta?.max_price])
                stopLoading();
            } catch (err) {
                console.error(err.message);
            }
        };
    
        if (value) { 
            fetchProduct();
        }
    }, [value, searchParams]); 
    
    function checkWishlist(id){
        return wishList.some(item => item.id === id);
    }

    const applyFilter = (p = null, b = null) => {
        const pageFilter = p || searchParams.get("page") || 1;
        const brand = b || searchParams.get("brand");
        if (p) {
            setPage(pageFilter);
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set("s", searchValue || "");
        params.set("price_min", range[0]);
        params.set("price_max", range[1]);
        params.set("page", pageFilter);
        if (brand != null) {
            params.set("brand", brand);
        } else {
            params.delete("brand");
        }
        router.push(`?${params.toString()}`);
    };

    const removeFilter = (key) => {
        let para = {
            s: searchParams.get("s"),
            price_min: range[0],
            price_max: range[1],
            page: searchParams.get("page"),
            brand: searchParams.get("brand"),
        };

        if (key === "all") {
            para = {
                s: searchParams.get("s"),
                page: searchParams.get("page"),
            };
        }
        if (key === "brand") {
            delete para.brand;
        }
        if (key === "price") {
            delete para.price_min;
            delete para.price_max;
        }
        const params = new URLSearchParams();
        Object.entries(para).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== "") {
                params.set(key, String(value));
            }
        });
        router.replace(`?${params.toString()}`);
    };



    return (
        <>
            <section className="bg-[#F4F8FB] py-12 min-h-[55vh] xl:min-h-[70vh] ">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="text-center content-center h-full">
                        <h2 className="text-2xl font-semibold uppercase text-dark page-title text-center mb-10 mx-auto md:text-3xl">Search Results For : “ {value} ”</h2>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="pr-2">
                                {meta?.filter_brands?.length > 0 &&
                                    <div className="bg-[#fff] shadow-sm text-left p-4 px-5 mb-5 xl:mb-6">
                                        <h2 className="text-xl font-semibold uppercase text-dark page-title mb-3 xl:mb-5">Brands</h2>
                                        <ul className={`${brandLoad ? "max-h-500" : "max-h-48"} overflow-hidden`}>
                                            {meta?.filter_brands?.map((brand) => (
                                                <li className="my-2" key={brand.id}>
                                                    <button className="text-sm font-semibold text-dark text-left py-1 inline-block w-full relative add-link leading-5 hover:text-primary cursor-pointer hover:pl-3 xl:text-base" onClick={() => applyFilter(null, brand.slug)} aria-label="Filter Brand">{brand.name}</button>
                                                </li>
                                            ))}
                                        </ul>
                                        <button className="mt-3 px-2 py-1 text-white bg-primary cursor-pointer font-medium" onClick={() => {setBrandLoad(prev => !prev); window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}}>{brandLoad ? "Close" : "Load more"}</button>
                                    </div>
                                }
                                <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6">
                                    <h2 className="text-xl font-semibold uppercase text-dark page-title mb-8 xl:mb-10">Price</h2>
                                    <Range
                                        values={range}
                                        step={0.1}
                                        min={meta?.min_price}
                                        max={meta?.max_price}
                                        onChange={(vals) => setRange(vals)}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                className="h-2 w-full rounded-full bg-gray-200 mb-5 xl:mb-8"
                                                style={{
                                                    background: `linear-gradient(to right, 
                                                                    #e5e7eb ${((range[0] - initPrice?.min) / (initPrice?.max - initPrice?.min)) * 100}%, 
                                                                    #2336b3 ${((range[0] - initPrice?.min) / (initPrice?.max - initPrice?.min)) * 100}%, 
                                                                    #2336b3 ${((range[1] - initPrice?.min) / (initPrice?.max - initPrice?.min)) * 100}%, 
                                                                    #e5e7eb ${((range[1] - initPrice?.min) / (initPrice?.max - initPrice?.min)) * 100}%)`,
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props, index, isDragged }) => {
                                            const { key, ...rest } = props;
                                            return (
                                                <div
                                                    key={key}
                                                    {...rest}
                                                    className="relative flex items-center justify-center focus:outline-none"
                                                >
                                                    <div
                                                        className={`absolute -top-8 px-2 py-1 text-xs font-semibold text-white rounded-md transition-all transition-linear duration-100
                                                            }`}
                                                        style={{ backgroundColor: "#2336b3" }}
                                                    >
                                                        ${range[index].toLocaleString()}
                                                    </div>
                                                    <div
                                                        className={`h-5 w-5 bg-white border-2 border-primary shadow-md ${isDragged ? "scale-110 border-[#2336b3]" : ""} transition-transform duration-150`}
                                                    />
                                                </div>
                                            );
                                        }}
                                    />
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-base font-semibold">${meta?.min_price} - ${meta?.max_price}</h4>
                                        <button className="bg-secondary py-2 px-5 text-white font-semibold cursor-pointer hover:bg-primary" onClick={() => applyFilter()}>Filter</button>
                                    </div>
                                </div>
                            </div>
                            {products?.length>0 ? 
                                <div className="col-span-3">
                                    <div className="bg-[#fff] shadow-sm flex gap-4  p-4 px-5 mb-5 xl:mb-6">
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {(meta) ?
                                                <h5 className="text-xs font-semibold md:text-sm xl:text-base">Showing {(20 * (meta?.current_page - 1)) + 1}-{products?.length + (20 * (meta?.current_page - 1))} of {meta?.total} Results</h5> : ""
                                            }
                                        </div>
                                        {(searchParams.get("brand") || searchParams.get("price_min")) &&
                                            <div className="flex gap-4 items-center">
                                                {searchParams.get("brand") && (
                                                    <div className="text-left w-max content-center">
                                                        <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white"><b>Brand</b> : {searchParams.get("brand")}</span>
                                                        <button onClick={() => removeFilter("brand")} className="text-sm font-semibol cursor-pointer hover:text-primary ml-1" aria-label="Clear Filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-4 h-4"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                                                        </button>
                                                    </div>
                                                )}
                                                {searchParams.get("price_min") && searchParams.get("price_max") && (
                                                    <div className="text-left w-max">
                                                        <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-400 via-green-400 to-green-400 text-white"><b>Price : </b>${searchParams.get("price_min")} - ${searchParams.get("price_max")}</span>
                                                        <button onClick={() => removeFilter("price")} className="text-sm font-semibol cursor-pointer hover:text-primary ml-1" aria-label="Remove Filter">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-4 h-4"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                                                        </button>
                                                    </div>
                                                )}
                                                {(searchParams.get("brand") || searchParams.get("price_min")) && (
                                                    <button className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white cursor-pointer" aria-label="Remove Filter" onClick={() => removeFilter("all")}>
                                                        Clear All
                                                    </button>
                                                )}
                                            </div>
                                        }
                                    </div>
                                    <AnimatePresence mode="wait">
                                        {products.map(pro => (
                                            <ProductCard key={pro?.id} value={pro} />                                
                                        ))}
                                    </AnimatePresence>
                                    <div className="mt-10 flex justify-center items-center gap-3 xl:mt-15">
                                        <button className="text-base font-semibold px-2 py-1 cursor-pointer hover:text-primary"
                                            disabled={meta?.current_page < 2}
                                            onClick={() => applyFilter(meta?.current_page - 1, null)}
                                            aria-label="Previous"
                                        >
                                            Previous
                                        </button>
                                            {(() => {
                                                const totalPages = Number(meta?.last_page) || 0;
                                                const currentPage = Number(meta?.current_page) || 1;
                                                const windowSize = 10;
                                                let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                                                let end = start + windowSize - 1;

                                                if (end > totalPages) {
                                                    end = totalPages;
                                                    start = Math.max(1, end - windowSize + 1);
                                                }

                                                return [...Array(end - start + 1)].map((_, i) => {
                                                    const page = start + i;
                                                    return (
                                                        <button
                                                            key={page}
                                                            className={`text-base font-semibold px-2 py-1 cursor-pointer shadow-sm w-[35px] h-[35px] hover:bg-primary hover:text-white ${currentPage === page ? "bg-primary text-white" : "bg-white"}`}
                                                            onClick={() => applyFilter(page, null)}
                                                            aria-label={`Page ${page}`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                });
                                            })()}
                                        <button className="text-base font-semibold px-2 py-1 cursor-pointer hover:text-primary"
                                            disabled={meta?.current_page >= meta?.last_page}
                                            onClick={() => applyFilter(meta?.current_page + 1, null)}
                                            aria-label="Next"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div> :
                                <div className=" col-span-3 text-center content-center h-full">
                                    <h4 className="text-3xl font-semibold text-primary mt-5 flex justify-center items-center gap-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-25 h-25">
                                            <path d="m23.854,23.146l-6.443-6.443c1.607-1.775,2.596-4.12,2.596-6.697C20.006,4.492,15.52.006,10.006.006S.006,4.492.006,10.006s4.486,10,10,10c2.577,0,4.922-.988,6.697-2.596l6.443,6.443c.098.098.226.146.354.146s.256-.049.354-.146c.195-.195.195-.512,0-.707Zm-13.848-4.141c-4.962,0-9-4.038-9-9S5.043,1.006,10.006,1.006s9,4.038,9,9-4.037,9-9,9Zm4.848-12.152l-1.146,1.146,1.146,1.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-1.146-1.146-1.146,1.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l1.146-1.146-1.146-1.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l1.146,1.146,1.146-1.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm-9.354,3.146c-.128,0-.256-.049-.354-.146-.195-.195-.195-.512,0-.707l1.146-1.146-1.146-1.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l1.146,1.146,1.146-1.146c.195-.195.512-.195.707,0s.195.512,0,.707l-1.146,1.146,1.146,1.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-1.146-1.146-1.146,1.146c-.098.098-.226.146-.354.146Zm8.949,4.953c-.093.159-.261.248-.432.248-.086,0-.173-.022-.252-.068-2.569-1.501-4.957-1.503-7.532,0-.237.14-.544.06-.684-.18-.139-.238-.059-.544.18-.684,2.884-1.684,5.661-1.683,8.54,0,.238.139.319.445.18.684Z" fill="currentColor" />
                                        </svg>
                                        Product Not Found
                                    </h4>
                                </div>
                            }
                        </div>
                        
                    </div>
                    {(meta?.categories?.length>0 || meta?.brands?.length>0) &&
                        <div className="w-full mx-auto md:w-3/4 mt-6 bg-white shadow-sm p-6">
                            {meta?.categories?.length>0 &&
                                <>
                                    <h4 className="text-2xl font-semibold mb-4">Categories</h4>
                                    <div className="flex flex-wrap gap-x-6 gap-y-4 mb-8">
                                        {meta?.categories?.map(cat => (
                                            <Link href={`/product-category/${cat?.slug}`} className="text-base font-semibold hover:text-primary" key={cat?.id}><span className="inline-block w-2 h-2 bg-primary/80 rounded-full mr-2"></span>{cat?.name}</Link>
                                        ))}
                                    </div>
                                </>
                            }
                            {meta?.brands?.length>0 &&
                                <>
                                    <h4 className="text-2xl font-semibold mb-4">Brands</h4>
                                    <div className="flex flex-wrap gap-x-6 gap-y-4">
                                        {meta?.brands?.map(brand => (
                                            <Link href={`/brand/${brand?.slug}`} className="text-base font-semibold hover:text-primary" key={brand?.id}><span className="inline-block w-2 h-2 bg-primary/80 rounded-full mr-2"></span>{brand?.name}</Link>
                                        ))}
                                    </div>
                                </>
                            }
                        </div>
                    }
                    
                </div>
            </section>
        </>
    )
}
