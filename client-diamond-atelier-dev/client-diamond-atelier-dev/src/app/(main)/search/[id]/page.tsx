"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/common/DynamicTable";
export const runtime = "edge";

const functions = [
  { icon: "material-symbols:pause", name: "Hold" },
  { icon: "material-symbols:equal", name: "Unhold" },
  { icon: "mdi:eye", name: "Show hold stone" },
  { icon: "mdi:cart", name: "Add to cart" },
  { icon: "mdi:eye", name: "Show calculation" },
  { icon: "mdi:calculator", name: "Compare stock" },
  { icon: "logos:whatsapp-icon", name: "Whatsapp" },
  { icon: "ic:baseline-email", name: "Email" },
  { icon: "mdi:download", name: " Download Stock" },
  { icon: "mdi:printer", name: "Print List" },
];
type DataRow = {
  checkbox?: boolean;
  status: string;
  grown: string;
  description: string;
  stockId: string;
  cut: string;
  clarity: string;
  video: string;
  pct: string;
  totalValue: string;
  shape: string;
  totalWeight: string;
  weight: string;
  color: string;
};

const Page = () => {
  const defaultData: DataRow[] = [
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
    {
      checkbox: false,
      status: "stock",
      grown: "HPHT",
      description: "SINGLE",
      stockId: "X-68-716",
      cut: "STEP",
      clarity: "VVS1",
      video: "YES",
      pct: "$ 2000.00",
      totalValue: "$ 2000.00",
      shape: "Flower",
      totalWeight: "1.21",
      weight: "1.21",
      color: "D",
    },
  ];
  const [data, setData] = useState(() => defaultData);
  const columns: ColumnDef<DataRow, any>[] = [
    {
      id: "checkbox",
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="form-checkbox"
          checked={row.original.checkbox || false}
          onChange={() => {
            const newData = [...data];
            newData[row.index].checkbox = !newData[row.index].checkbox;
            setData(newData);
          }}
        />
      ),
      header: "",
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "grown",
      header: "GROWN",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: "DESCRIPTION",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "stockId",
      header: "STOCK ID",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "cut",
      header: "CUT",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "clarity",
      header: "CLARITY",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "video",
      header: "VIDEO",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "pct",
      header: "P/CT",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "totalValue",
      header: "TOTAL VALUE",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "shape",
      header: "SHAPE",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "totalWeight",
      header: "TOTAL WEIGHT",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "weight",
      header: "1+1 WEIGHT",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "color",
      header: "TOTAL WEIGHT",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
  ];
  return (
    <>
      <div className="grid grid-cols-10 gap-0.5 text-center">
        {functions.map((i) => (
          <div key={i.name} className="bg-[#2366c3] text-white ">
            <div className="py-3 px-1 flex flex-col justify-center items-center space-y-2 cursor-pointer">
              <Icon icon={i.icon} className="size-5" />
              <span className="text-base">{i.name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Table data={data} columns={columns} headerText="" colorBlue={false} />
      </div>
    </>
  );
};

export default Page;
