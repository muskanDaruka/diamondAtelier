"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  Row,
} from "@tanstack/react-table";
import React, { SetStateAction, useEffect, Dispatch } from "react";
import { RotatingLines } from "react-loader-spinner";

type PropsType<T> = {
  data: T[];
  fetchData?: any;
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
  width?: string;
  rowSelection?: RowSelectionState;
  setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;
  selectedRow?: (arg: Row<T>[]) => void;
};

function DynamicAdminTable<T>({
  data = [],
  columns,
  fetchData,
  isLoading,
  width,
  selectedRow,
  setRowSelection,
  rowSelection
}: PropsType<T>) {
  const table = useReactTable({
    data: data,
    columns,
    getRowId: (row: any) => row.id,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    state: {
      rowSelection
    },
    onRowSelectionChange: setRowSelection,
  });

  const rows = table.getRowModel()?.rows ?? [];

  useEffect(() => {
    selectedRow && selectedRow(table.getSelectedRowModel().flatRows);
  }, [rowSelection]);

  return (
    <>
      <div className={`overflow-auto h-[75vh]`}>
        <table className={`mx-auto ${`md:w-[98%] ${width}`}`}>
          <thead className="border sticky bg-custom-gradient top-[-1px] text-white">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="border text-sm text-center p-2 h-[30px] text-nowrap"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, idx) => (
                <tr
                  className={`border ${idx % 2 === 0 ? "bg-[#EEEEEE]" : ""}`}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border py-2 text-sm text-center"
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
              isLoading !== true &&
              <tr>
                <td colSpan={columns.length} className="text-center p-6">
                  <span className="absolute left-1/2">No data available</span>
                </td>
              </tr>
            )}
            {
              isLoading ? (
                <div className="absolute z-10 bottom-10 flex justify-center w-full h-[40px] mb-3 font-serif">
                  <RotatingLines
                    visible={true}
                    width="40"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    strokeColor="#2366c4"
                  />
                </div>
              ) : null
            }
          </tbody>
        </table>
      </div>

    </>
  );
}

export default DynamicAdminTable;
