"use client";

import Link from "next/link";
import Image from "next/image";

function ApplicationCard({data}){
    return (
        <>
            <Link href={data?.url} className="relative group">
                <div className="img-area overflow-hidden">
                    <Image src={`/assets/images/${data?.image}`} alt={data?.title} width={400} height={300} className="w-full h-auto group-hover:scale-105" />
                </div>
                <div className="flex gap-4 py-4 items-start group-hover:pt-3">
                    <div className="text-left flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{data?.title}</h3>
                        <p className="truncate-multi-line text-sm font-semibold text-white/80">{data?.excerpt}</p>
                    </div>
                    <span className="text-lg text-white font-semibold inline-block w-10 h-10 text-center content-center bg-primary group-hover:bg-white group-hover:text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-6 h-6 m-auto" ><path d="M18,12h0a2,2,0,0,0-.59-1.4l-4.29-4.3a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L15,11H5a1,1,0,0,0,0,2H15l-3.29,3.29a1,1,0,0,0,1.41,1.42l4.29-4.3A2,2,0,0,0,18,12Z" fill="currentColor" /></svg>
                    </span>
                </div>
            </Link>
        </>
    )
}

export default ApplicationCard;