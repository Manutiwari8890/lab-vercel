"use client"

import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";
import { AnimatePresence } from "framer-motion";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Show new toast
  const showToast = useCallback((message, type = "success") => {
    setToasts((prev) => {
      const newToast = { id: Date.now(), message, type };
      const updated = [...prev, newToast];
      if (updated.length > 5) updated.shift(); // limit to 5
      return updated;
    });
  }, []);

  // Hide toast
  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] space-y-3">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => hideToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error(
            "useToast() must be used inside <ToastProvider>"
        );
    }

    return context;
};