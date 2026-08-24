"use client";

import Link from "next/link";
import Image from "next/image";

function BrandCard({brand}){
    return (
        <>
            <Link href={`/brand/${brand?.slug}`} className="group img-area border border-gray-300 p-3 content-center grayscale-200 hover:border-primary hover:grayscale-0 text-center content-center">
                <Image src={brand?.image_url} alt={brand?.name} width={150} height={75}  className="max-w-25 h-auto group-hover:scale-105 xl:max-w-35 m-auto" />
            </Link>
        </>
    )
}

export default BrandCard;