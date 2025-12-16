// "use client";
// import React, { useRef } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
//   useReactTable,
//   ColumnDef,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Button } from "../ui/button";

// interface DataTableProps<TData> {
//   columns: ColumnDef<TData>[];
//   data: TData[];
//   pageSize?: number;
// }

// export function DataTable<TData>({
//   columns,
//   data,
//   pageSize = 10,
// }: DataTableProps<TData>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: { pagination: { pageIndex: 0, pageSize } },
//   });

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   // 🎡 Прокрутка колесом — горизонтально, якщо є Shift
//   const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
//     if (e.deltaY !== 0 && scrollRef.current) {
//       scrollRef.current.scrollLeft += e.deltaY;
//       e.preventDefault();
//     }
//   };

//   // 🖱️ Drag-to-scroll (натисни і потягни)
//   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//     isDragging.current = true;
//     startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
//     scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
//   };

//   const handleMouseLeave = () => (isDragging.current = false);
//   const handleMouseUp = () => (isDragging.current = false);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDragging.current || !scrollRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     const walk = (x - startX.current) * 1.5; // чутливість
//     scrollRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   return (
//     <div className="rounded-md border shadow-sm bg-white dark:bg-slate-800">
//       {/* Горизонтальний скрол з drag-to-scroll */}
//       <div
//         ref={scrollRef}
//         onWheel={handleWheel}
//         onMouseDown={handleMouseDown}
//         onMouseLeave={handleMouseLeave}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//         className="overflow-x-auto cursor-grab active:cursor-grabbing select-none"
//       >
//         <Table className="w-full min-w-[800px] border-collapse">
//           <TableHeader className="bg-gray-100 dark:bg-slate-700">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow
//                 key={headerGroup.id}
//                 className="border-b border-gray-200 dark:border-slate-600"
//               >
//                 {headerGroup.headers.map((header) => (
//                   <TableHead
//                     key={header.id}
//                     className="text-left text-sm font-semibold px-4 py-2 border-r border-gray-200 dark:border-slate-600 last:border-r-0"
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row, rowIndex) => (
//                 <TableRow
//                   key={row.id}
//                   className={`border-b  border-gray-200 dark:border-slate-600 ${
//                     rowIndex % 2 === 0 ? "bg-gray-50 dark:bg-slate-800" : ""
//                   } hover:bg-gray-100 dark:hover:bg-slate-700 transition`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell
//                       key={cell.id}
//                       className="px-4 py-2 text-xs border-r border-gray-200 dark:border-slate-600 last:border-r-0"
//                     >
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="text-center py-6 text-muted-foreground"
//                 >
//                   Немає даних
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Пагінація */}
//       {table.getPageCount() > 1 && (
//         <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-slate-700 text-sm">
//           <div>
//             Сторінка{" "}
//             <span className="font-semibold">
//               {table.getState().pagination.pageIndex + 1}
//             </span>{" "}
//             з {table.getPageCount()}
//           </div>
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Назад
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Вперед
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useRef } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  /** Кількість сторінок, яку повертає бекенд */
  pageCount?: number;
  /** Поточна сторінка (1-based index) */
  currentPage?: number;
  /** Callback при зміні сторінки */
  onPageChange?: (page: number) => void;
  /** Кількість рядків на сторінці */
  pageSize?: number;
  /** Якщо дані ще вантажаться */
  isLoading?: boolean;
}

export function DataTable<TData>({
  columns,
  data,
  pageCount = 1,
  currentPage = 1,
  onPageChange,
  pageSize = 10,
  isLoading = false,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true, // 🧠 важливо — керована пагінація
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize,
      },
    },
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 🎡 Прокрутка колесом — горизонтально
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  // 🖱️ Drag-to-scroll
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const handleMouseLeave = () => (isDragging.current = false);
  const handleMouseUp = () => (isDragging.current = false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="rounded-md border shadow-sm bg-white dark:bg-slate-800">
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
      >
        <Table className="w-full min-w-[800px] border-collapse overflow-x-auto scrollbar-thin">
          <TableHeader className="bg-gray-100 dark:bg-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-200 dark:border-slate-600"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-left text-sm font-semibold px-4 py-2 border-r border-gray-200 dark:border-slate-600 last:border-r-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="scrollbar-thin ">
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 text-muted-foreground"
                >
                  Завантаження...
                </TableCell>
              </TableRow>
            ) : data.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  className={`border-b border-gray-200 dark:border-slate-600 ${
                    rowIndex % 2 === 0 ? "bg-gray-50 dark:bg-slate-800" : ""
                  } hover:bg-gray-100 dark:hover:bg-slate-700 transition`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-2 text-xs border-r border-gray-200 dark:border-slate-600 last:border-r-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 text-muted-foreground"
                >
                  Немає даних
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 🔽 Пагінація */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-slate-700 text-sm">
          <div>
            Сторінка <b>{currentPage}</b> з {pageCount}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Назад
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === pageCount}
            >
              Вперед
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
