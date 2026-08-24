"use client"
import { createContext, useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";

export const OverlayContext = createContext();

export const OverlayProvider = ({children}) => {
  const pathname = usePathname()
  const [overlay, setOverlay] = useState(null);
  function toggleOverlay(value){
    value ? setOverlay(value) : setOverlay(null);
  }

    useEffect(() => {
      overlay ? toggleOverlay(null) : null ;
    }, [pathname])


  useEffect(() => {
    document.documentElement.style.overflowY = overlay ? "hidden" : "";
  }, [overlay]);


    return (
        <OverlayContext.Provider
        value={{overlay, toggleOverlay}}
        >
            {children}
        </OverlayContext.Provider>
    )
}