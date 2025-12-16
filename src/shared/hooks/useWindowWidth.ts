// src/shared/hooks/useWindowWidth.ts
"use client";

import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // виставляємо початкове значення
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // одразу виміряти
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
