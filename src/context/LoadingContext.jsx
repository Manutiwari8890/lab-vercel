"use client"

import { useContext, createContext, useState } from "react";

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(0);

  const startLoading = () => {
    document.documentElement.style.overflowY = "hidden";
    document.body.style.overflowY = "hidden";

    setLoading((prev) => prev + 1);
  };

  const stopLoading = () => {
    setLoading((prev) => {
      const newCount = Math.max(prev - 1, 0);

      if (newCount === 0) {
        document.documentElement.style.overflowY = "auto";
        document.body.style.overflowY = "auto";
      }

      return newCount;
    });
  };

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
