"use client";

import { useEffect, useRef, useState } from "react";

const CHARACTERS =
  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateCaptcha = (length = 6) => {
  let result = "";

  for (let i = 0; i < length; i++) {
    result +=
      CHARACTERS[
        Math.floor(
          Math.random() * CHARACTERS.length
        )
      ];
  }

  return result;
};

export default function CanvasCaptcha({
  length = 5,
  onChange,
  reloadTrigger
}) {
  const canvasRef = useRef(null);

  const [captcha, setCaptcha] = useState("");

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 40;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Background
    ctx.fillStyle = "#003b5c";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // White random polygon
    ctx.fillStyle = "#ffffff";

    ctx.beginPath();

    ctx.moveTo(0, 8);

    ctx.lineTo(
      canvas.width * 0.35,
      0
    );

    ctx.lineTo(
      canvas.width * 0.75,
      15
    );

    ctx.lineTo(
      canvas.width * 0.65,
      canvas.height
    );

    ctx.lineTo(
      0,
      canvas.height * 0.7
    );

    ctx.closePath();

    ctx.fill();

    // Random lines
    for (let i = 0; i < 12; i++) {
      ctx.strokeStyle = `rgba(
        ${Math.random() * 255},
        ${Math.random() * 255},
        ${Math.random() * 255},
        0.5
      )`;

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.moveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );

      ctx.lineTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );

      ctx.stroke();
    }

    // Characters
    [...text].forEach((char, index) => {
      ctx.save();

      const x = 20 + index * 35;
      const y = 35;

      ctx.translate(x, y);

      ctx.rotate(
        (Math.random() - 0.5) * 0.6
      );

      ctx.font =
        "bold 32px Arial";

      ctx.fillStyle = "#001f3f";

      ctx.fillText(char, 0, 0);

      ctx.restore();
    });

    // Wave line
    ctx.strokeStyle =
      "rgba(255,255,255,.8)";
    ctx.lineWidth = 2;

    ctx.beginPath();

    for (
      let x = 0;
      x < canvas.width;
      x++
    ) {
      const y =
        30 +
        Math.sin(x * 0.08) * 8;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    // Noise dots
    for (let i = 0; i < 250; i++) {
      ctx.fillStyle =
        Math.random() > 0.5
          ? "rgba(0,0,0,.3)"
          : "rgba(255,255,255,.3)";

      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        1
      );
    }
  };

  const reloadCaptcha = () => {
    const code =
      generateCaptcha(length);

    setCaptcha(code);

    drawCaptcha(code);

    onChange?.(code);
  };

  useEffect(() => {
    reloadCaptcha();
  }, [reloadTrigger]);

  useEffect(() => {
    reloadCaptcha();
  }, []);

  return (
    <div className="flex">
      <canvas
        ref={canvasRef}
        className="border"
      />

      <button
        type="button"
        onClick={reloadCaptcha}
        className="px-3 bg-white text-primary hover:bg-gray-100 leading-4 text-2xl cursor-pointer"
      >
        ↻
      </button>
    </div>
  );
}