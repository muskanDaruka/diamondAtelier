"use client"
import { Row } from "@tanstack/react-table";
import printJS from "print-js";
import React, { ReactNode } from "react";
import { ImPrinter } from "react-icons/im";
import ResultBtn from "../common/ResultBtn";
import toast from "react-hot-toast";

type Fields = {
  id:number;
  PACKET_NO: string;
  STOCK: string;
  PREFIX: string;
  SHAPE: string;
  WGT: number;
  TOT_WGT: number;
  LENGTH: number;
  WIDTH: number;
  COLOR: string;
  LAB: string;
  SALERATE: number;
  VALUE: number;
  RATIO: number;
  MM_N: string;
  DEPTH: number;
  CUT: string;
  LOCATION: string;
};

type RowData = {
  rows: Row<Fields>[];
};

type PropsType = {
  field: string;
  displayName: string;
  width: number;
};

const properties: PropsType[] = [
  { field: "PACKET_NO", displayName: "STOCK ID", width: 100 },
  { field: "STOCK", displayName: "Status", width: 90 },
  { field: "PREFIX", displayName: "Grown", width: 90 },
  { field: "SHAPE", displayName: "Shape", width: 90 },
  { field: "COLOR", displayName: "Color", width: 90 },
  { field: "RATIO", displayName: "Ratio", width: 40 },
  { field: "TOT_WGT", displayName: "Carat", width: 90 },
  { field: "LENGTH", displayName: "Length", width: 90 },
  { field: "WIDTH", displayName: "Width", width: 90 },
  {
    field: "SALERATE",
    displayName: "P/CT",
    width: 90,
},
{
    field: "VALUE",
    displayName: "TOTAL AMOUNT",
    width: 90,
},
  { field: "MM_N", displayName: "MM", width: 150 },
  // { field: "DEPTH", displayName: "Depth %", width: 80 },
  // { field: "Location", displayName: "Country", width: 100 },
];

const style = `
.print-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.print-section .print-row {
  margin-bottom: 10px;
}
.print-section .print-row span {
  display: inline-block;
  width: 100px;
  text-align: left;
}
`;

const item: { icon: ReactNode; title: string } = {
  icon: <ImPrinter className="mx-auto" />,
  title: "Print List",
};

function PrintSelectedRow({ rows }: RowData) {

  const printableData = rows.map((item: { original: Fields }) => item.original) || [];

  const transformedData = printableData.map(row => {
    const transformedRow: any = {};
    properties.forEach(prop => {
      transformedRow[prop.displayName] = row[prop.field as keyof Fields];
    });
    return transformedRow;
  });
  

  return (
    <ResultBtn
      key={item.title}
      icon={item.icon}
      title={item.title}
      onClick={() => {
        if (!rows?.length) {
          toast.error("Select at least one row");
          return;
        }
        printJS({
          printable: transformedData,
          type: "json",
          properties: properties.map(prop => ({ field: prop.displayName, displayName: prop.displayName })),
          style,
          maxWidth: 100,
          documentTitle:"Stock Detail"
        });
      }}
    />
  );
}

export default PrintSelectedRow;
