import { useState, useEffect } from "react";

/**
 * Хук для керування кількістю колонок у сітці з підтримкою Local Storage
 * та автоматичним оновленням при зміні ширини екрану, але з пріоритетом для налаштувань користувача.
 * @param {string} storageKey - Ключ для збереження значення в Local Storage.
 * @param {number} defaultValue - Початкове значення кількості колонок.
 * @returns {[number, (cols: number) => void, string, number[]]} - Пара значення, функції для зміни, класу сітки та масиву опцій колонок.
 */

export const useGridColumns = (
  storageKey: string,
  defaultValue: number = 3
): [number, (cols: number) => void, string, number[]] => {
  const [gridCols, setGridCols] = useState<number>(defaultValue);
  const [windowWidth, setWindowWidth] = useState<number>(0); // 0 на сервері

  // Load the saved value from localStorage when the component mounts
  useEffect(() => {
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue) {
      setGridCols(Number(savedValue));
    }

    // Ініціалізація ширини вікна тільки на клієнті
    setWindowWidth(window.innerWidth);
  }, [storageKey]);

  const gridClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[gridCols] || "grid-cols-3";

  const columnOptions = [1, 2, 3, 4];

  // Update grid columns based on screen width and respect user preference
  useEffect(() => {
    if (windowWidth === 0) return; // чекати поки windowWidth не ініціалізується

    const updateGridColumns = () => {
      if (window.innerWidth <= 768) {
        setGridCols(1);
      } else {
        const savedValue = localStorage.getItem(storageKey);
        if (savedValue) {
          const savedCols = Number(savedValue);
          setGridCols(savedCols >= 1 ? savedCols : 2);
        } else {
          setGridCols(defaultValue);
        }
      }

      setWindowWidth(window.innerWidth);
    };

    updateGridColumns();
    window.addEventListener("resize", updateGridColumns);
    return () => window.removeEventListener("resize", updateGridColumns);
  }, [storageKey, defaultValue, windowWidth]);

  // Save the current gridCols to localStorage whenever it changes
  useEffect(() => {
    if (windowWidth > 768) {
      localStorage.setItem(storageKey, String(gridCols));
    }
  }, [gridCols, storageKey, windowWidth]);

  return [gridCols, setGridCols, gridClass, columnOptions];
};
