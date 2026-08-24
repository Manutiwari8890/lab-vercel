"use client"
import { useState, useEffect, useContext } from "react";
import BrandCard from "@/components/BrandCard";
import { LoadingContext } from "@/context/LoadingContext";

export default function SupplierClient(){
    const [brands, setBrands] = useState([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { startLoading, stopLoading } = useContext(LoadingContext)


    useEffect(() => {
        const fetchBrand = async () => {
            startLoading();
            try{
                const response = await fetch(`${baseUrl}brands?per_page=150`);
                if(!response.ok){
                    throw new Error("Brands Fetch Failed");
                }
                const result = await response.json();
                setBrands(result?.data)
            }catch(err){
                console.log(err)
            }finally{
                stopLoading()
            }
        }

        fetchBrand();
    }, []);

    return (
        <>
            <section className="py-10">
                <div className="container px-3 mx-auto md:px-5">
                    <h2 className="text-2xl mx-auto font-semibold uppercase text-dark page-title mb-5 md:text-3xl md:mb-10 xl:mb-15">Suppliers</h2>
                    <p className="text-base text-justify leading-7 mb-8">Laboratory Disposable Products (LDP) provides a wide range of laboratory consumables obtained from reputable manufacturers and distributors globally. Laboratory Disposable Products (LDP) offers various laboratory needs, covering products from suppliers such as Corning, Globe Scientific, Kimberly-Clark, Kimble, Labnet and many more. It emphasizes customer satisfaction and aims to be a dependable source for laboratory supplies. Shop Laboratory Consumables from Laboratory Disposable Products (LDP).Customers are encouraged to visit the Laboratory Disposable Products (LDP) website regularly for updates on new manufacturers and suppliers to add new products to their inventory.</p>
                    <div className="grid grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-6">
                        {brands?.length>0 &&
                            brands?.map((brand) => (
                                <BrandCard brand={brand} key={brand?.id} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
