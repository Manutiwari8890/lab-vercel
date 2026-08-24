"use client";

import { useEffect, useContext } from "react";
import { LoadingContext } from "../Context/LoadingContext";

export default function FallbackLoader() {
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    startLoading();

    return () => {
      stopLoading();
    };
  }, []);

  return null;
}
