"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

const ZoomImage = ({ src, alt = "Product Image", zoomLevel = 2.5, lensSize = 100 }) => {
  const containerRef = useRef(null);
  const [bgPos, setBgPos] = useState("50% 50%");
  const [showZoom, setShowZoom] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ top: 0, left: 0 });
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const { left, top, width: w, height: h } = rect;
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate zoom background position
    const xPct = (x / w) * 100;
    const yPct = (y / h) * 100;
    setBgPos(`${xPct}% ${yPct}%`);

    // Keep lens within image boundaries
    const lensX = Math.max(0, Math.min(x - lensSize / 2, w - lensSize));
    const lensY = Math.max(0, Math.min(y - lensSize / 2, h - lensSize));
    setLensPos({ x: lensX, y: lensY });

    // Set zoom window position to the right of the image
    setZoomCoords({
      top: top + window.scrollY,
      left: left + w + 20,
      width: w,
      height: h,
    });
  };

  const handleMouseEnter = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setShowZoom(true);
    setZoomCoords({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width + 20,
      width: rect.width,
      height: rect.height,
    });
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
    setBgPos("50% 50%");
  };

  return (
    <div className="relative w-full h-full">
      {/* Image Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          width={400}
          height={400}
          src={src}
          alt={alt}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Lens */}
        {showZoom && (
          <div
            className="absolute border-2 border-primary bg-primary/10  pointer-events-none hidden lg:block"
            style={{
              width: lensSize,
              height: lensSize,
              top: lensPos.y,
              left: lensPos.x,
            }}
          ></div>
        )}
      </div>

      {/* Zoom Preview */}
      {showZoom && (
        <div
          className="fixed z-50 overflow-hidden bg-white border border-gray-300 hidden lg:block"
          style={{
            top: `${zoomCoords.top}px`,
            left: `${zoomCoords.left}px`,
            width: zoomCoords.width,
            height: zoomCoords.height,
            backgroundImage: `url(${encodeURI(src)})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoomLevel * 100}% auto`,
            backgroundPosition: bgPos,
          }}
        ></div>
      )}
    </div>
  );
};

export default ZoomImage;
