"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Quantity({ quantity, setQuantity, label, width }) {
    const [type, setType] = useState(null)
    const handleIncrement = () => {
        if (quantity < 10) {
            const qty = quantity + 1;
            setQuantity(qty);
        }
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            const qty = quantity - 1;
            setQuantity(qty);
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault();
    };

    return (
        <div className={`${width ? "w-max" : null} flex items-center m-auto`}>
            <button className="text-xs font-semibold bg-primary text-white cursor-pointer w-[25px] h-[25px] hover:bg-dark lg:w-[30px] lg:h-[30px]" onClick={handleDecrement} aria-label="Decrease Number">
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" /></svg>
            </button>
            <div className="relative w-[40px] h-[30px] flex justify-center items-center overflow-hidden xl:w-[60px]">
                <AnimatePresence mode="wait">
                    <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute text-xl font-semibold"
                    >
                        {quantity}
                    </motion.span>
                </AnimatePresence>
            </div>
            <button className="text-xs font-semibold bg-primary text-white cursor-pointer w-[30px] h-[30px] hover:bg-dark" onClick={handleIncrement} aria-label="Increase Number">
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" className="w-5 h-5 m-auto"><path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" fill="currentColor" /></svg>
            </button>
            {label && <h5 className='text-2xl font-semibold ml-5'>Quantity</h5>}
        </div>
    )
}

export default Quantity;