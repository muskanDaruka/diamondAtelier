"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  headerText?: string;
  colorBlue?: boolean;
  rowSelection?: RowSelectionState;
  setRowSelection?:  Dispatch<SetStateAction<RowSelectionState>>;
  selectedRow?: (arg: Row<T>[]) => void;
}

const Table = <T extends { checkbox?: boolean }>({
  data = [],
  columns = [],
  headerText = "",
  colorBlue = false,
  rowSelection,
  setRowSelection,
  selectedRow
}: TableProps<T>) => {
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const table = useReactTable({
    data: data,
    columns,
    getRowId:(row:any) => row.id,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    state: {
      rowSelection
    },
    onRowSelectionChange: setRowSelection,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
    if (focusedRowIndex === null) return;

    switch (event.key) {
      case 'ArrowDown':
        if (focusedRowIndex < table.getRowModel().rows.length - 1) {
          setFocusedRowIndex(focusedRowIndex + 1);
        }
        break;
      case 'ArrowUp':
        if (focusedRowIndex > 0) {
          setFocusedRowIndex(focusedRowIndex - 1);
        }
        break;
      case 'Enter':
      case 'Escape':
        setFocusedRowIndex(null);
        break;
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      if (focusedRowIndex !== null && tableRef.current) {
        const rowElement = tableRef.current.querySelector(`[data-rowindex="${focusedRowIndex}"]`)as HTMLElement; ;
        rowElement?.focus();
      }
    };

    handleFocus();
  }, [focusedRowIndex]);

  useEffect(() => {
    const handleFocus = () => {
      if (tableRef.current && focusedRowIndex !== null) {
        const row = tableRef.current.querySelector(`[data-rowindex="${focusedRowIndex}"]`);
        row?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    };

    handleFocus();
  }, [focusedRowIndex]);

  useEffect(() => {
    selectedRow && selectedRow(table.getSelectedRowModel().flatRows);
  }, [rowSelection]);

  return (
    <div>
      <p className="text-center font-serif font-extrabold mb-5 text-sm">{headerText}</p>
      <div
        className="overflow-auto rounded-md max-h-[455px]"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        ref={tableRef}
      >
        <table className="min-w-full divide-y font-serif divide-gray-200 bg-white border">
          <thead className={`font-serif ${colorBlue ? "bg-[#2366c3] " : "bg-[#f0f0f0]"} sticky top-0`}>
            {table.getHeaderGroups().length > 0 ? (
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-6 py-1 text-center font-serif text-sm font-extrabold border border-gray-200 ${
                        colorBlue ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={columns.length} className="text-center font-serif py-2">
                  No Data Available
                </th>
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-gray-200 font-serif text-center">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer border font-serif ${
                    row?.getIsSelected && 
                    row?.getIsSelected()
                      ? "bg-[#2366c3] text-white font-extrabold"
                      : i % 2 === 0
                      ? "bg-[#f0f0f0] border-gray-300"
                      : "bg-[#d1d1d0] border-gray-300"
                  }`}
                  data-rowindex={i}
                  tabIndex={0}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-6 py-1 font-serif whitespace-nowrap text-sm font-medium border border-gray-200`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center font-serif py-2">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
