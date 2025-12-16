"use client";
import { Square, Columns3, LayoutGrid, Grid } from "lucide-react";
import { useState, useEffect } from "react";

interface GridColumnSelectorProps {
  gridCols: number;
  setGridCols: (cols: number) => void;
  columnOptions: number[];
}

const GridColumnSelector: React.FC<GridColumnSelectorProps> = ({
  gridCols,
  setGridCols,
  columnOptions,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0); // 0 на сервері
  const [availableColumns, setAvailableColumns] =
    useState<number[]>(columnOptions);

  useEffect(() => {
    const updateAvailableColumns = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width <= 768) {
        setAvailableColumns([1, 2]); // Для мобільних
      } else {
        setAvailableColumns([1, 2, 3, 4]); // Для великих екранів
      }
    };

    updateAvailableColumns(); // Початкове встановлення
    window.addEventListener("resize", updateAvailableColumns); // Слухаємо зміни ширини

    return () => {
      window.removeEventListener("resize", updateAvailableColumns);
    };
  }, []);

  return (
    <div className="flex gap-2">
      {availableColumns.map((cols) => (
        <button
          key={cols}
          onClick={() => setGridCols(cols)}
          className={`p-2 rounded-md border transition-all ${
            gridCols === cols
              ? "bg-blue-500 text-white border-blue-600"
              : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-slate-700"
          }`}
          title={`${cols} колонки`}
        >
          {cols === 1 && <Square size={18} />}
          {cols === 2 && <Columns3 size={18} />}
          {cols === 3 && <LayoutGrid size={18} />}
          {cols === 4 && <Grid size={18} />}
        </button>
      ))}
    </div>
  );
};

export default GridColumnSelector;
