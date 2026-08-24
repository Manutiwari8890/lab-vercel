import { Suspense } from "react";
import VerifyClient from "./VerifyClient";
import Loader from "@/components/Loader";

export default async function Page({ searchParams }) {
    const {uid, hash} = await searchParams;
    return (
        <Suspense fallback={<Loader />}>
            <VerifyClient
                uid={uid}
                hash={hash}
            />
        </Suspense>
    );
}