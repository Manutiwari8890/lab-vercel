"use client"
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { LoadingContext } from '@/context/LoadingContext';

export default function VarifyClient({uid, hash}) {
    const { startLoading, stopLoading } = useContext(LoadingContext);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [message, setMessage] = useState({
        type: true,
        value: "",
    })

    useEffect(() => {
        startLoading();
        const verfiyEmail = async () => {
            try {
                const response = await fetch(`${baseUrl}email/verify/${uid}/${hash}`);

                if (!response.ok) {
                    throw new Error("Verification Failed");
                }
                const result = await response.json();
                setMessage({
                    type: result.status,
                    value: result.message
                })
            } catch (err) {
                console.error(err)
            } finally {
                stopLoading();
            }
        }

        if (uid && hash) {
            verfiyEmail();
        }
    }, [])
    return (
        <>
            <section className="bg-[#FAFAFA] py-12 min-h-[55vh] xl:min-h-[80vh]">
                <div className="container px-2 mx-auto lg:px-5">
                    <div className="text-center content-center">
                        <h2 className="text-3xl font-semibold uppercase text-dark page-title text-center mb-10 mx-auto">Verify Email</h2>
                        <div className="bg-white shadow-lg px-10 py-5 max-w-[500px] min-h-[350px] mx-auto">
                            <div className={`${message?.type ? "bg-primary" : "bg-secondary"} w-30 h-30 rounded-full mx-auto content-center animate-focus mb-8`}>
                                {message?.type ?
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-15 h-15 m-auto animate-focus">
                                        <path d="m23.126,9.868h0l-2.151-2.154v-1.718c0-1.651-1.342-2.995-2.991-2.995h-1.716l-2.151-2.153c-1.131-1.131-3.101-1.131-4.231,0l-2.151,2.153h-1.716c-1.65,0-2.991,1.343-2.991,2.995v1.718l-2.152,2.154c-1.165,1.168-1.165,3.067,0,4.235l2.151,2.154v1.718c0,1.651,1.342,2.995,2.991,2.995h1.716l2.151,2.153c.565.565,1.317.877,2.116.877s1.55-.312,2.115-.877l2.151-2.153h1.716c1.65,0,2.991-1.343,2.991-2.995v-1.718l2.152-2.154c1.165-1.168,1.165-3.067,0-4.235Zm-4.922.343l-5.054,4.995c-.614.61-1.423.916-2.231.916s-1.613-.305-2.229-.913l-2.599-2.499c-.392-.389-.396-1.021-.007-1.414.39-.391,1.021-.396,1.415-.007l2.598,2.498c.453.449,1.19.45,1.644,0l5.055-4.996c.394-.39,1.026-.386,1.415.007s.385,1.025-.007,1.414Z" fill='white' />
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" className="w-15 h-15 m-auto"><path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm4.707,15.293-1.414,1.414L12,13.414,8.707,16.707,7.293,15.293,10.586,12,7.293,8.707,8.707,7.293,12,10.586l3.293-3.293,1.414,1.414L13.414,12Z" fill='white' /></svg>
                                }
                            </div>
                            <h4 className={`text-2xl font-semibold ${message?.type ? "text-green-600" : "text-red-600"} mb-10`}>{message?.type ? "Verified Successfully " : "Verification Failed"}</h4>
                            <Link href="/product-category" className="text-sm font-bold uppercase text-white btn btn-secondary py-4 px-5 bg-secondary btn-scale-0 mt-2 cursor-pointer inline-block w-max"> 
                                <span className="relative z-1 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-6 h-6 relative z-1 m-auto"><path d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z" fill="currentColor"></path></svg>
                                    Go To Shopping
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}