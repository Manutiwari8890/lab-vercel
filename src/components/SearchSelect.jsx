"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function SearchSelect({ placeholder, value, data = [], onSelect, id, classes }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const selectedItem = data.find((item) => String(item.value) === String(value));
  const [current, setCurrent] = useState(value || placeholder);
  const inputRef = useRef(null);
  const filtered = data.filter((item) =>
    item.label.toLowerCase().includes(String(search || "").toLowerCase())
  );

  useEffect(() => {
      setCurrent(value)
  }, [value])

  const handleFocus = () => {
    setOpen(true);
  };

  const handleSelect = (item) => {
    if (onSelect) onSelect(item.value);
    setCurrent(item?.label);
    setOpen(false);
    inputRef.current?.blur();
  };

  const handleBlur = (e) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full" onBlur={handleBlur}>
      <input
        type="text"
        id={id}
        ref={inputRef}
        placeholder={current ?? placeholder}
        value={open ? search : ""}
        onFocus={handleFocus}
        onChange={(e) => setSearch(e.target.value)}
        className={classes}
      />

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          tabIndex={-1}
          className="absolute w-full bg-white shadow-md p-1 mt-1 z-50 max-h-[260px] overflow-y-auto"
        >
          {filtered.map((item) => (
            <div
              key={item?.value}
              tabIndex={0}
              className={`p-2 cursor-pointer text-sm font-semibold hover:bg-primary/90 hover:text-white ${current===item.label ? "bg-secondary/90 text-white" : ""}`}
              onMouseDown={(e) => e.preventDefault()} 
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-2 text-gray-400 text-sm">No results found</div>
          )}
        </motion.div>
      )}
    </div>
  );
}
