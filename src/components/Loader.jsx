"use client";

function Loader(){
    return(
        <>
            <section className="loader w-full h-full content-center bg-white fixed top-0 right-0 z-9999">
                <div className="w-[50px] h-[50px] border-5 border-primary border-l-white rounded-full animate-spin m-auto"></div>
            </section>
        </>
    )
}

export default Loader;