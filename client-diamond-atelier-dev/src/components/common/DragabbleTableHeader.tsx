"use-client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { flexRender } from "@tanstack/react-table";
import { CSSProperties, useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

export const DraggableTableHeader = ({ header, index }: { header: any, index: number }) => {
  const [isClient, setIsClient] = useState(false);
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const columnWidths = [39, 65, 65];


  const stickyLeft = index < 4
    ? `${columnWidths.slice(0, index).reduce((sum, width) => sum + width, 0)}px`
    : undefined;

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: index < 4 ? "sticky" : "relative",
    left: stickyLeft,
    zIndex: index < 4 ? 5 : 1,
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: `calc(var(--header-${header?.id}-size) * 1px)`,
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <th
      key={header.id}
      className={`border border-2 border-white px-2 bg-blue-700 font-serif`}
      ref={setNodeRef}
      style={style}
    >
      {header.isPlaceholder ? null : (
        <div
          className={
            `${header.column.getCanSort() ? "cursor-pointer select-none" : ""} flex justify-center`
          }
          onClick={header.column.getToggleSortingHandler()}
          title={
            header.column.getCanSort()
              ? header.column.getNextSortingOrder() === "asc"
                ? "Sort ascending"
                : header.column.getNextSortingOrder() === "desc"
                  ? "Sort descending"
                  : "Clear sort"
              : undefined
          }
        >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {({
              asc: <FaSortUp className="h-5 ml-2"/>,
              desc: <FaSortDown className="h-5 ml-2"/>,
            }[header.column.getIsSorted() as string] ?? (header.column.columnDef.id == "checkbox" ? "" : <FaSort className="h-5 ml-2"/>))}
        </div>
      )}
      <div
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        className="absolute top-0 right-0 h-full w-[5px] hover:bg-gray-300 cursor-col-resize font-serif"
      ></div>
      <button
        className={`absolute left-0 bottom-0 h-full ${header.column.id === "checkbox" ? "w-[0]" : "w-[70%]"} cursor-move`}
        {...attributes}
        {...listeners}
      >
      </button>
    </th>
  );
};
