"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

const icons = {
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
  ),
};

const toasterBg = {
  success: "bg-green-100 border-green-200",
  error: "bg-red-100 border-red-200",
  warning: "bg-orange-100 border-orange-200",
};


const colors = {
  success: "text-green-500 bg-white",
  error: "text-secondary bg-white",
  warning: "text-orange-500 bg-white",
};

const textColor = {
    success: "text-green-700",
    error: "text-red-700",
    warning: "text-orange-700",
}

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      layout
      className={`flex items-center w-full max-w-xs px-2 py-2 mb-3 ${textColor[type]} ${toasterBg[type]} rounded-lg shadow-md border `}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-full ${colors[type]}`}
      >
        {icons[type]}
      </div>
      <div className="ms-3 text-sm font-medium">{message}</div>
      <button
        onClick={onClose}
        className={`ms-auto -mx-1.5 -my-1.5 bg-transparent ${textColor[type]} rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 text-sm cursor-pointer`}
      >
        ✕
      </button>
    </motion.div>
  );
};

export default Toast;
