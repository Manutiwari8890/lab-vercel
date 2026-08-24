"use client";

import Link from "next/link";
import { useRouter, useParams, useSearchParams, usePathname} from "next/navigation";
import { Range } from "react-range";
import { useState, useRef, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { WishListContext } from "@/context/WishListContext";
import { CartContext } from "@/context/CartContext";
import { LoadingContext } from "@/context/LoadingContext";

export default function CategoryClient({initData}) {
    const [sortOpen, setSortOpen] = useState(false);
    const [sort, setSort] = useState();
    const sortRef = useRef(null);
    const pathname = usePathname()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [read, setRead] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { wishList, fetchWishList } = useContext(WishListContext);
    const { getRecentViewed } = useContext(CartContext);
    const router = useRouter();
    const [range, setRange] = useState([0, 1]); // min, max
    const params = useParams();
    let [ category, subCategory, childrenCat, child ] =  params?.slug || []
    const slug = child || childrenCat || subCategory || category || "";
    const [categories, setCategory] = useState(initData?.categories?.data);
    const [products, setProducts] = useState();
    const [brands, setBrands] = useState([]);
    const [filter, setFilter] = useState(false);
    const [catPro, setCatePro] = useState([]);
    const [meta, setMeta] = useState({});
    const [recent, setRecent] = useState([]);
    const [initPrice, setinitPrice] = useState({
        min: 0,
        max: 1
    });

    const searchParams = useSearchParams();
    const filterBrand = searchParams.get('brand');
    const alphabet = searchParams.get('alphabet');
    const page = searchParams.get("page");
    const [openToggle, setOpenToggle] = useState(null);
    const [catDetails, setCatDetails] = useState(initData?.categoryDetails?.data);


    useEffect(() => {
        setSort("");
    }, [pathname]);

    const appliedFilters = {
        brand: searchParams.get("brand"),
        price_min: searchParams.get("price_min"),
        price_max: searchParams.get("price_max"),
    };
    const clearFilter = (filterKey) => {
        const params = new URLSearchParams(searchParams);
        params.delete(filterKey);
        if (filterKey === "price_min" || filterKey === "price_max") {
            params.delete("price_min");
            params.delete("price_max");
        }
        router.push(`?${params.toString()}`);
    };

    const clearAllFilters = () => {
        router.push(window.location.pathname);
    };
    const toggleCat = (id, parent = null, isParent = false, children = []) => {

        setOpenToggle((prev) => {
            if (isParent) {
                if (prev === id) {
                    return null;
                }

                if (children.includes(prev)) {
                    return null;
                }
                return id;
            } else {
                if (prev === id) {
                    return parent || null;
                }

                return id;
            }
        });
    };

    const { startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        startLoading();
        const fetchCategory = async () => {
            try {
                const response = await fetch(`${baseUrl}categories`);
                if (!response.ok) {
                    throw new Error("Category Fetch failed")
                }
                const res = await response.json();
                setCategory(res.data);
                stopLoading();
            } catch (err) {
                console.error(err)
            }
        }
        fetchCategory();
    },
        []);

    useEffect(() => {
        const getCatDetails = async () => {
            startLoading();
            try {
                const response = await fetch(`${baseUrl}categories/${slug}`);
                if (!response.ok) {
                    throw new Error("Category Details Fetch Failed !");
                }

                let result = await response.json();
                setCatDetails(result.data);
            } catch (err) {
                console.error(err)
            } finally {
                stopLoading();
            }
        }

        if (slug) {
            getCatDetails();
        }
    }, [slug])


    useEffect(() => {
        if (!categories || categories?.length === 0) return;

        const fetchProducts = async () => {
            setFilter(false);
            document.documentElement.style.overflow = "auto";
            startLoading();
            try {
                // Build URL with only necessary params
                const params = new URLSearchParams();
                const minPrice = searchParams.get("price_min");
                const maxPrice = searchParams.get("price_max");
                const sort_by = searchParams.get('sort_by');
                const alphabet = searchParams.get('alphabet');
                if (slug) params.set("category", slug);
                if (filterBrand) params.set("brand", filterBrand);
                if (alphabet) params.set("alphabet", alphabet);
                if (minPrice && maxPrice) {
                    params.set("price_min", minPrice);
                    params.set("price_max", maxPrice);
                }
                if (sort_by) { params.set("sort_by", sort_by) }
                if (page) { params.set("page", page) }
                if (!slug) { params.set("size", 20) }
                const url = `${baseUrl}products?${params.toString()}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch product data");
                const data = await response.json();

                let minP = Infinity,
                    maxP = -Infinity,
                    brands = [],
                    brandSet = new Set();
                await fetchWishList();
                setProducts(data.data);
                setBrands(data.brands);
                setMeta(data.meta);
                setinitPrice({ min: data?.meta?.min_price, max: data?.meta?.max_price });
                setRange([searchParams?.get("price_min") || data?.meta?.min_price, searchParams?.get("price_max") || data?.meta?.max_price])

                const [rec, childrenList] = await Promise.all([
                    getRecentViewed(),
                    findCategoryChildren(categories, slug)
                ]);
                if (rec) {
                    setRecent(rec)
                }
                setCatePro(childrenList || []);
            } catch (err) {
                console.error(err);
            } finally {
                stopLoading();
            }
        };

        fetchProducts();

    }, [slug, filterBrand, alphabet, searchParams.toString(), categories?.length, page]);


    const [searchText, setSearchText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        router.push(`/search?s=${searchText}`, { state: { value: searchText } });
    }

    function findCategoryChildren(categories, slug) {
        if (!slug) {
            return categories;
        }

        for (const cat of categories) {
            if (cat?.slug === slug) {
                return cat?.children_recursive || [];
            }
            if (cat?.children_recursive && cat?.children_recursive?.length > 0) {
                const found = findCategoryChildren(cat?.children_recursive, slug);
                if (found) return found;
            }
        }
        return null;
    }

    const updateQuery = (newParams) => {
        const params = new URLSearchParams(searchParams);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === undefined || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const applyPriceFilter = () => {
        updateQuery({ price_min: range[0], price_max: range[1], page: null });
    };

    const applyBrand = (brand) => {
        updateQuery({ brand });
    };

    const applyAlphabet = (alphabet) => {
        updateQuery({ alphabet });
    };

    const handlePage = (page) => {
        updateQuery({ page });
    };

    const handleSort = (sort_by) => {
        setSortOpen(false);
        setSort(sort_by);
        updateQuery({ sort_by });
    };


    const [breadcrumb, setBreadcrumb] = useState([]);

    useEffect(() => {
        if (categories?.length) {
            const getCategoryPath = () => {
                let path = [];

                if (!categories?.length) return path;

                const cat = categories?.find(c => c.slug === category);
                if (cat) {
                    path.push({ name: cat?.name, slug: cat?.slug });

                    const sub = cat?.children_recursive.find(sc => sc.slug === subCategory);
                    if (sub) {
                        path.push({ name: sub?.name, slug: `${cat?.slug}/${sub?.slug}` });

                        const child = sub.children_recursive.find(cc => cc?.slug === childrenCat);
                        if (child) {
                            path.push({
                                name: child.name,
                                slug: `${cat?.slug}/${sub.slug}/${child.slug}`
                            });
                        }
                    }

                    return path;
                }

                for (let parent of categories) {
                    const sub = parent.children_recursive.find(sc => sc.slug === category);
                    if (sub) {
                        path.push({ name: parent.name, slug: parent.slug });
                        path.push({ name: sub.name, slug: `${parent.slug}/${sub.slug}` });
                        return path;
                    }
                }

                for (let parent of categories) {
                    for (let sub of parent.children_recursive) {
                        const child = sub.children_recursive.find(cc => cc.slug === category);
                        if (child) {
                            path.push({ name: parent.name, slug: parent.slug });
                            path.push({ name: sub.name, slug: `${parent.slug}/${sub.slug}` });
                            path.push({
                                name: child.name,
                                slug: `${parent.slug}/${sub.slug}/${child.slug}`
                            });
                            return path;
                        }
                    }
                }

                return path;
            };


            setBreadcrumb(getCategoryPath());
        }
    }, [categories, category, subCategory, childrenCat]);

    return (
        <>
            <section className="py-10 bg-[#F4F8FB]">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="grid grid-cols-10 gap-5 xl:gap-6">
                        <div className={`col-span-3 mobile-filter ${filter ? "active" : ""}`}>
                            <div className="mb-5 py-4 flex justify-between lg:hidden">
                                <h4 className="text-xl font-semibold">Filter Products</h4>
                                <button className="text-xl font-semibold text-primary"
                                    onClick={() => {
                                        setFilter(false);
                                        document.documentElement.style.overflow = "auto";
                                    }} aria-label="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-7 h-7 relative z-1"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                                </button>
                            </div>
                            <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6">
                                <h2 className="text-xl font-semibold uppercase text-dark page-title mb-3 xl:mb-5">Search</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex justify-between border border-[#E4DFDF]">
                                        <input type="text" className="px-2 py-2 text-base font-semibold" placeholder="search ..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                                        <button className="text-primary px-3 cursor-pointer hover:text-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" xmlSpace="preserve" className="w-4 h-4"><g><path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" fill="currentColor"></path></g></svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6 category-sidebar">
                                <h2 className="text-xl font-semibold uppercase text-dark page-title mb-3 xl:mb-5">Category</h2>
                                <ul>
                                    {categories?.length && categories.map(cat => (
                                        <li className={`my-1 ${(cat?.children_recursive?.length > 0) ? 'has-children' : ''} ${((openToggle === cat?.id)) ? 'active' : ''}`} key={cat?.id}>
                                            <div className="flex justify-between items-center gap-4 group">
                                                <Link href={`/product-category/${cat?.slug}`} className={`text-sm font-semibold py-2 flex justify-between w-full group-hover:text-primary xl:text-sm max-w-[calc(100%-41px)] ${((category === cat?.slug)) ? 'text-primary' : 'text-dark'}`}>{cat?.name} </Link>
                                                {cat?.children_recursive?.length > 0 ?
                                                    <button className={`text-xs w-[25px] h-[25px] cursor-pointer group-hover:bg-primary group-hover:text-white ${openToggle === cat?.id ? "text-white bg-primary" : "bg-[#efeff0]"}`} onClick={() => toggleCat(cat?.id, null, true, cat?.children_recursive.map(c => c.id))} aria-label="Dropdown Toggle">
                                                        {openToggle === cat?.id ? 
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" /></svg> :
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" /></svg>                                                        
                                                        }
                                                    </button> : ""
                                                }
                                            </div>
                                            {cat?.children_recursive && cat?.children_recursive?.length > 0 && (
                                                <ul className="border-l-[1.5px] border-[#cfcfcf] pl-5 sub-list">
                                                    {cat?.children_recursive.map((child) => (
                                                        (child.products_count > 0 &&
                                                            <li className={`my-1 ${(child?.children_recursive?.length > 0) ? 'has-children' : ''} ${((openToggle === child.id)) ? 'active' : ''}`} key={child.id}>
                                                                <div className="flex justify-between items-center gap-4 group">
                                                                    <Link href={`/product-category/${cat?.slug}/${child.slug}`} className={`text-sm font-semibold py-2 flex justify-between w-full group-hover:text-primary xl:text-sm max-w-[calc(100%-41px)] ${((subCategory === child.slug)) ? 'text-primary' : 'text-dark'}`}>{child.name} {/*(child.products_count > 0) ? <span>({child.products_count})</span> : ''*/}</Link>
                                                                    {child.children_recursive?.length ?
                                                                        <button className={`text-xs w-[25px] h-[25px] cursor-pointer group-hover:bg-primary group-hover:text-white ${openToggle === child.id ? "text-white bg-primary" : "bg-[#efeff0]"}`} onClick={() => toggleCat(child.id, cat?.id)} aria-label="Dropdown Toggle">
                                                                            {openToggle === child?.id ? 
                                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" /></svg> :
                                                                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" /></svg>                                                        
                                                                            }
                                                                        </button> : ""
                                                                    }
                                                                </div>
                                                                {child.children_recursive && child.children_recursive?.length > 0 && (
                                                                    <ul className="border-l-[1.5px] border-[#cfcfcf] pl-5 sub-list">
                                                                        {child.children_recursive.map((value) => (
                                                                            (value.products_count ?
                                                                                <li className={`my-1 ${(value.children_recursive.length > 0) ? ' has-children' : ''} ${((openToggle === value.id)) ? 'active' : ''}`} key={value.id}>
                                                                                    <div className="flex justify-between items-center gap-4 group">
                                                                                        <Link href={`/product-category/${cat?.slug}/${child.slug}/${value.slug}`} className={`text-xs font-semibold py-2 flex justify-between w-full group-hover:text-primary xl:text-sm max-w-[calc(100%-41px)] ${((childrenCat === value.slug)) ? 'text-primary' : 'text-dark'}`}>{value.name} {/*(value.products_count > 0) ? <span>({value.products_count})</span> : ''*/}</Link>
                                                                                        {value.children_recursive?.length ?
                                                                                            <button className={`text-xs w-[25px] h-[25px] cursor-pointer group-hover:bg-primary group-hover:text-white ${openToggle === value.id ? "text-white bg-primary" : "bg-[#efeff0]"}`} onClick={() => toggleCat(value.id, child.id)} aria-label="Dropdown Toggle">
                                                                                                {openToggle === value?.id ? 
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" /></svg> :
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" /></svg>                                                        
                                                                                                }
                                                                                            </button> : ""
                                                                                        }
                                                                                    </div>
                                                                                    {value.children_recursive && value.children_recursive?.length > 0 && (
                                                                                        <ul className="border-l-[1.5px] border-[#cfcfcf] pl-5 sub-list">
                                                                                            {value.children_recursive.map((final) => (
                                                                                                (final.products_count ?
                                                                                                    <li className="my-1" key={final.id}>
                                                                                                        <div className="flex justify-between items-center gap-4 group">
                                                                                                            <Link href={`/product-category/${cat?.slug}/${child.slug}/${value.slug}/${final.slug}`} className="text-sm font-semibold text-dark py-2 flex justify-between w-full group-hover:text-primary xl:text-sm max-w-[calc(100%-41px)]">{final.name} {/*(final.products_count > 0) ? <span>({final.products_count})</span> : ''*/}</Link>
                                                                                                        </div>
                                                                                                    </li> : ""
                                                                                                )
                                                                                            ))}

                                                                                        </ul>
                                                                                    )}
                                                                                </li> : ""
                                                                            )
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </li>
                                                        )
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {(catPro?.length < 1) ?
                                <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6">
                                    <h2 className="text-xl font-semibold uppercase text-dark page-title mb-8 xl:mb-10">Price</h2>
                                    <Range
                                        values={range}
                                        step={0.1}
                                        min={initPrice?.min}
                                        max={initPrice?.max}
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
                                                        className={`absolute -top-8 px-2 py-1 text-xs font-semibold text-white rounded-md transition-all duration-100 transition-linear
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
                                        <h4 className="text-base font-semibold">${initPrice?.min} - ${initPrice?.max}</h4>
                                        <button className="bg-secondary py-2 px-5 text-white font-semibold cursor-pointer hover:bg-primary" onClick={() => applyPriceFilter()}>Filter</button>
                                    </div>
                                </div> : ""
                            }
                            {(catPro?.length < 1) && (
                                <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6">
                                    <h2 className="text-xl font-semibold uppercase text-dark page-title mb-3 xl:mb-5">Brands</h2>
                                    <ul>
                                        {brands.map((brand) => (
                                            <li className="my-1" key={brand.id}>
                                                <button className="text-sm font-semibold text-dark text-left py-1 inline-block w-full relative add-link leading-5 hover:text-primary cursor-pointer hover:pl-3 xl:text-base" onClick={() => applyBrand(brand.slug)} aria-label="Filter Brand">{brand.name}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {(recent && recent?.length > 0) ?
                                <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6">
                                    <h2 className="text-xl font-semibold uppercase text-dark page-title mb-3 xl:mb-5">Recently Viewed</h2>
                                    <ul>
                                        {recent?.map((rec) => (
                                            <li className="my-1" key={rec?.id}>
                                                <Link href={`/product/${rec?.slug}`} className="text-sm font-semibold text-dark py-1 inline-block w-full relative add-link leading-5 hover:text-primary hover:pl-3 xl:text-base">{rec?.name}</Link>
                                            </li>
                                        ))}

                                    </ul>
                                </div> : ""
                            }

                        </div>
                        <div className="col-span-10 lg:col-span-7">
                            <button className="lg:hidden flex items-center mb-5 text-base font-semibold"
                                onClick={() => {
                                    setFilter(true);
                                    document.documentElement.style.overflow = "hidden";
                                }
                                } aria-label="Toggle Filter"
                            >
                                <div className="bg-secondary text-white w-10 h-10 rounded-full content-center mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="mx-auto w-6 h-6">
                                        <path d="m18,5.92c0-2.162-1.758-3.92-3.92-3.92H3.92C1.758,2,0,3.758,0,5.92c0,.935.335,1.841.944,2.551l5.056,5.899v3.63c0,.315.148.611.4.8l4,3c.177.132.388.2.6.2.152,0,.306-.035.447-.105.339-.169.553-.516.553-.895v-6.63l5.056-5.899c.609-.71.944-1.616.944-2.551Zm-2.462,1.25l-5.297,6.18c-.155.181-.241.412-.241.651v5l-2-1.5v-3.5c0-.239-.085-.47-.241-.651L2.462,7.169c-.298-.348-.462-.792-.462-1.25,0-1.059.861-1.92,1.92-1.92h10.16c1.059,0,1.92.861,1.92,1.92,0,.458-.164.902-.462,1.25Zm8.462,12.831c0,.552-.448,1-1,1h-8c-.552,0-1-.448-1-1s.448-1,1-1h8c.552,0,1,.448,1,1Zm0-4c0,.552-.448,1-1,1h-8c-.552,0-1-.448-1-1s.448-1,1-1h8c.552,0,1,.448,1,1Zm-6-5h5c.552,0,1,.448,1,1s-.448,1-1,1h-5c-.552,0-1-.448-1-1s.448-1,1-1Z" fill="currentColor" />
                                    </svg>
                                </div>
                                More Products 
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 ml-1 mt-1"><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" fill="currentColor"></path></svg>
                            </button>
                            <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <h5 className="text-xs font-semibold md:text-sm xl:text-base">Sort By : </h5>
                                    <div className="border border-[#cfcfcf] w-[135px] relative text-xs font-semibold z-2 md:text-sm md:w-[155px] xl:w-[175px]" ref={sortRef}>
                                        <button className="px-3 py-3 flex justify-between w-full items-center cursor-pointer" onClick={() => setSortOpen(!sortOpen)}>
                                            {sort === "" ? "Default Sorting" : sort === "price_high_low" ? "Price : High To Low" : sort === "price_low_high" ? "Price : Low To High" : sort === "a_to_z" ? "Name : A To Z" : sort === "z_to_a" ? "Name : Z To A" : ""}
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className={`w-5 h-5 ${sortOpen ? "-rotate-180" : ""}`}><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" fill="currentColor"></path></svg>
                                        </button>
                                        <AnimatePresence mode="wait">
                                            {sortOpen &&
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    viewport={{ once: true, amount: 0.2 }}
                                                    className="absolute top-full left-0 bg-white w-full z-0 border border-[#cfcfcf]"
                                                >
                                                    <button className={`px-3 py-2 cursor-pointer w-full text-left ${sort === "" && "bg-primary text-white"} hover:bg-primary hover:text-white`} onClick={() => handleSort("")}>Default Sorting</button>
                                                    <button className={`px-3 py-2 cursor-pointer w-full text-left ${sort === "price_high_low" && "bg-primary text-white"} hover:bg-primary hover:text-white`} onClick={() => handleSort("price_high_low")}>Price : High To Low </button>
                                                    <button className={`px-3 py-2 cursor-pointer w-full text-left ${sort === "price_low_high" && "bg-primary text-white"} hover:bg-primary hover:text-white`} onClick={() => handleSort("price_low_high")}>Price : Low To High </button>
                                                    <button className={`px-3 py-2 cursor-pointer w-full text-left ${sort === "a_to_z" && "bg-primary text-white"} hover:bg-primary hover:text-white`} onClick={() => handleSort("a_to_z")}>Name : A To Z </button>
                                                    <button className={`px-3 py-2 cursor-pointer w-full text-left ${sort === "z_to_a" && "bg-primary text-white"} hover:bg-primary hover:text-white`} onClick={() => handleSort("z_to_a")}>Name : Z To A </button>
                                                </motion.div>
                                            }
                                        </AnimatePresence>
                                    </div>
                                    {(meta && catPro?.length < 1) ?
                                        <h5 className="text-xs font-semibold md:text-sm xl:text-base">Showing {(20 * (meta?.current_page - 1)) + 1}-{products?.length + (20 * (meta?.current_page - 1))} of {meta?.total} Results</h5> : ""
                                    }
                                </div>
                                {(appliedFilters?.brand || appliedFilters?.price_min) &&
                                    <div className="mt-4 flex gap-4 items-center">
                                        {appliedFilters.brand && (
                                            <div className="text-left w-max content-center">
                                                <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 text-white"><b>Brand</b> : {appliedFilters.brand}</span>
                                                <button onClick={() => clearFilter("brand")} className="text-sm font-semibol cursor-pointer hover:text-primary ml-1" aria-label="Clear Filter">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-4 h-4"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                                                </button>
                                            </div>
                                        )}
                                        {appliedFilters.price_min && appliedFilters.price_max && (
                                            <div className="text-left w-max">
                                                <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-400 via-green-400 to-green-400 text-white"><b>Price : </b>${appliedFilters.price_min} - ${appliedFilters.price_max}</span>
                                                <button onClick={() => clearFilter("price_min")} className="text-sm font-semibol cursor-pointer hover:text-primary ml-1" aria-label="Remove Filter">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-4 h-4"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor"></path></svg>
                                                </button>
                                            </div>
                                        )}
                                        {(appliedFilters.brand || appliedFilters.price_min) && (
                                            <button className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white cursor-pointer" onClick={clearAllFilters} aria-label="Remove Filter">
                                                Clear All
                                            </button>
                                        )}
                                    </div>
                                }
                            </div>
                            {catDetails?.description &&
                                <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6">
                                    <div className={` gap-5 mb-5 ${!read ? "before-bokeh h-[275px]" : "h-auto"} overflow-hidden transition-all duration-300 relative`}>
                                        {catDetails?.image_url &&
                                            <div className="img-area group overflow-hidden category-float-image">
                                                <img src={catDetails?.image_url} alt={catDetails?.name} className="max-w-[90%] mx-auto" />
                                            </div>
                                        }
                                        <div className={`text-area server-data category-float-content`}>
                                            <div dangerouslySetInnerHTML={{ __html: catDetails?.description }} className={`text-lg leading-8`}></div>                                            
                                        </div>
                                    </div>
                                    <button className={`${read ? "bg-secondary" : "bg-primary"} text-white font-semibold px-2 py-2 flex gap-1 items-center cursor-pointer hover:bg-secondary`}
                                        onClick={() => {
                                            if (read) window.scrollTo({ top: 100, left: 0, behavior: "smooth" });
                                            setRead(!read)
                                        }}
                                    >Read {read ? "Less" : "More"}
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className={`w-5 h-5 ${read ? "rotate-180" : null} ml-1`}><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" fill="currentColor"></path></svg>
                                    </button>
                                </div>
                            }
                            {catPro?.length == 0 && products?.length > 0 &&
                                <div className="bg-[#fff] shadow-sm  p-4 px-5 mb-5 xl:mb-6">
                                <div className="grid grid-cols-13 gap-3">
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'A' ? "text-primary" : ""}`} onClick={() => applyAlphabet('A')} >A</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'B' ? "text-primary" : ""}`} onClick={() => applyAlphabet('B')} >B</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'C' ? "text-primary" : ""}`} onClick={() => applyAlphabet('C')} >C</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'D' ? "text-primary" : ""}`} onClick={() => applyAlphabet('D')} >D</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'E' ? "text-primary" : ""}`} onClick={() => applyAlphabet('E')} >E</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'F' ? "text-primary" : ""}`} onClick={() => applyAlphabet('F')} >F</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'G' ? "text-primary" : ""}`} onClick={() => applyAlphabet('G')} >G</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'H' ? "text-primary" : ""}`} onClick={() => applyAlphabet('H')} >H</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'I' ? "text-primary" : ""}`} onClick={() => applyAlphabet('I')} >I</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'J' ? "text-primary" : ""}`} onClick={() => applyAlphabet('J')} >J</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'K' ? "text-primary" : ""}`} onClick={() => applyAlphabet('K')} >K</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'L' ? "text-primary" : ""}`} onClick={() => applyAlphabet('L')} >L</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'M' ? "text-primary" : ""}`} onClick={() => applyAlphabet('M')} >M</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'N' ? "text-primary" : ""}`} onClick={() => applyAlphabet('N')} >N</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'O' ? "text-primary" : ""}`} onClick={() => applyAlphabet('O')} >O</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'P' ? "text-primary" : ""}`} onClick={() => applyAlphabet('P')} >P</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'Q' ? "text-primary" : ""}`} onClick={() => applyAlphabet('Q')} >Q</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'R' ? "text-primary" : ""}`} onClick={() => applyAlphabet('R')} >R</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'S' ? "text-primary" : ""}`} onClick={() => applyAlphabet('S')} >S</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'T' ? "text-primary" : ""}`} onClick={() => applyAlphabet('T')} >T</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'U' ? "text-primary" : ""}`} onClick={() => applyAlphabet('U')} >U</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'V' ? "text-primary" : ""}`} onClick={() => applyAlphabet('V')} >V</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'W' ? "text-primary" : ""}`} onClick={() => applyAlphabet('W')} >W</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'X' ? "text-primary" : ""}`} onClick={() => applyAlphabet('X')} >X</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'Y' ? "text-primary" : ""}`} onClick={() => applyAlphabet('Y')} >Y</button>
                                    <button className={`text-lg font-semibold px-2 cursor-pointer hover:text-primary ${alphabet === 'Z' ? "text-primary" : ""}`} onClick={() => applyAlphabet('Z')} >Z</button>
                                </div>
                            </div>
                            }
                            
                            <nav className="flex px-5 py-4 bg-[#fff] shadow-sm mb-5 xl:mb-6" aria-label="Breadcrumb">
                                <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                    <li className="inline-flex items-center">
                                        <Link href="/" className="inline-flex items-center text-base font-medium text-dark hover:text-primary">
                                            <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                            </svg>
                                            Home
                                        </Link>
                                    </li>
                                    {breadcrumb.map((b, i) => (
                                        <li key={i}>
                                            <div className="flex items-center">
                                                <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                </svg>
                                                {b.slug == slug ?
                                                    <span className="ms-1 text-base font-medium text-gray-500 md:ms-2 dark:text-gray-400">{b.name}</span> :
                                                    <Link href={`/product-category/${b.slug}`} className="ms-1 text-base font-medium text-dark hover:text-primary md:ms-2">{b.name}</Link>
                                                }
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                            {(catPro && catPro?.length > 0) ?
                                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
                                    {catPro?.map(cats => (
                                        (cats?.products_count > 0 &&
                                            <CategoryCard key={cats?.id} url={`/product-category/${cats.slug}`} image={cats.image_url} title={cats?.name} productCount={cats?.products_count} countShow={false} />
                                        )
                                    ))}
                                </div> :
                                (products && products?.length > 0) && (
                                    <>
                                        <div className="mt-5">
                                            <AnimatePresence mode="wait">
                                                {products?.map(pro => (
                                                    <ProductCard value={pro} key={pro?.id} />
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                        <div className="mt-10 flex justify-center items-center gap-3 flex-wrap xl:mt-15">
                                            <button className={`text-base font-semibold px-2 py-1 ${meta?.current_page < 2 ? "text-dark/80 cursor-default hover:text-dark/80" : "hover:text-primary cursor-pointer"}`}
                                                disabled={meta?.current_page < 2}
                                                onClick={() => handlePage(meta?.current_page - 1)}
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
                                                            onClick={() => handlePage(page)}
                                                            aria-label={`Page ${page}`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                });
                                            })()}
                                            <button className={`text-base font-semibold px-2 py-1 ${meta?.current_page >= meta?.last_page ? "text-dark/80 cursor-default hover:text-dark/80" : "hover:text-primary cursor-pointer"}`}
                                                disabled={meta?.current_page >= meta?.last_page}
                                                onClick={() => handlePage(meta?.current_page + 1)}
                                                aria-label="Next"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
