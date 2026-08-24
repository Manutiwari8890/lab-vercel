"use client";

import { useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { LoadingContext } from "../context/LoadingContext";
import Link from "next/link";

const shootConfetti = () => {
  const duration = 1800;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
      colors: ["#ff4349", "#18df61ff", "#2336b3", "#fad815ff"],
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
      colors: ["#ff4349", "#18df61ff", "#2336b3", "#fad815ff"],
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  };

  frame();
};

const LaunchPopup = ({ isOpen, onClose }) => {
  const {loading} = useContext(LoadingContext);
  useEffect(() => {
    if (isOpen && !loading) {
      shootConfetti();
    }
  }, [isOpen, loading]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative bg-white p-8 w-[90%] max-w-md text-center shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 text-gray-500 cursor-pointer hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-7 h-7 relative z-1" ><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" fill="currentColor" /></svg>
            </button>

            <h1 className="text-3xl font-bold text-primary mb-3">
              Up To 10% OFF
            </h1>
            <p className="text-gray-600 mb-6">
                Laboratory Disposable offers DISCOUNT up to 10 % on many products to account holders. Please create your account today to avails the offer.
            </p>

            <Link
              href="/register"
              className="inline-block px-6 py-3 bg-primary text-white btn btn-primary"
            >
              <span className="relative z-1">
                Register Now 
              </span>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LaunchPopup;
