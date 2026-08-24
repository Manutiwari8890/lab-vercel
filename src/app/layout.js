"use client"

import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import Providers from "./providers";
import Script from "next/script";
import { useEffect, useContext } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    const disableActions = (e) => {
      e.preventDefault();
    };

    document.addEventListener("copy", disableActions);
    document.addEventListener("cut", disableActions);

    return () => {
      document.removeEventListener("copy", disableActions);
      document.removeEventListener("cut", disableActions);
    };
  }, []);


  return (
    <html
      lang="en"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shLaboratoryortcut icon" href="/assets/images/labdisposable.png" type="image/x-icon" />
        <Script type="text/javascript">
          {`(function(c,l,a,r,i,t,y){
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "v4y70ewxd2");`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <>
            <Header />
            <CartSidebar />
            {children}
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  );
}
