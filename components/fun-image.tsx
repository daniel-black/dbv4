"use client";

import { useRef, useState } from "react";
// @ts-expect-error: canvas-confetti is not typed
import confetti from "canvas-confetti";

export function FunImage() {
  const [isFun, setIsFun] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleFun = () => {
    if (!isFun && buttonRef.current !== null) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const x = (buttonRect.left + buttonRect.width / 2) / window.innerWidth;
      const y = (buttonRect.top + buttonRect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x, y },
        colors: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#ff00ff",
          "#00ffff",
        ],
      });
    }

    setIsFun(!isFun);
  };

  return (
    <div className="min-w-fit min-h-full relative">
      <img
        src="/dan.png"
        alt="Dan Black"
        className={`border block max-h-fit rounded-r-full ${
          isFun ? "grayscale" : ""
        }`}
        width={300}
        height={437}
      />
      <div
        className={`text-9xl absolute top-5 left-18 -rotate-6 ${
          isFun ? "" : "hidden"
        }`}
      >
        🎩
      </div>
      <div
        className={`text-9xl absolute top-35 left-21 -rotate-6 ${
          isFun ? "" : "hidden"
        }`}
      >
        🕶️
      </div>
      <button
        ref={buttonRef}
        onClick={toggleFun}
        className="mt-0 text-xs text-muted underline"
      >
        {isFun ? "Fun mode" : "Normal mode"}
      </button>
    </div>
  );
}
