// hooks/useCardLayout.ts
'use client';
import { useState, useEffect, useRef } from "react";

const useCardLayout = (threshold: number = 600) => {
  const [isRow, setIsRow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect.width > threshold) {
          setIsRow(true);
        } else {
          setIsRow(false);
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect(); // Usa disconnect para limpiar todas las observaciones
    };
  }, [threshold]);

  return { ref, isRow };
};

export default useCardLayout;