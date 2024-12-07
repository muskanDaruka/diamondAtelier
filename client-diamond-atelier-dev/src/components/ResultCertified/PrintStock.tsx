"use client"
import { Row } from "@tanstack/react-table";
import printJS from "print-js";
import React, { ReactNode } from "react";
import { ImPrinter } from "react-icons/im";
import ResultBtn from "../common/ResultBtn";
import toast from "react-hot-toast";

type Fields = {
  PACKET_NO: string;
  STONE_STAGE: string;
  PREFIX: string;
  SHAPE: string;
  WGT: number;
  COLOR: string;
  PURITY: string;
  VIDEO_PATH: string;
  LAB: string;
  RATE: number;
  DISC_PER: number;
  NET_RATE: number;
  NET_VALUE: number;
  RATIO: number;
  MEASUREMENT: string;
  TABLE_PER: number;
  DEPTH_PER: number;
  CUT: string;
  POLISH: string;
  SYMM: string;
  REPORT_NO: string;
  LOCATION: string;
  SUPPLIER_NAME?:string;
  INW_DATE?:string;
  NAME?:string;
  MEMO_DATE?:string;
  MEMO_NO?:string;
  SELLER_NAME?:string;
  COST_DISC_PER?:string;
  COST_RATE?:string;
  COST_VALUE?:string;
  PAGENO: number | string;
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
  { field: "STONE_STAGE", displayName: "Status", width: 90 },
  { field: "PREFIX", displayName: "Grown", width: 90 },
  { field: "SHAPE", displayName: "Shape", width: 90 },
  { field: "WGT", displayName: "Carat", width: 90 },
  { field: "COLOR", displayName: "Color", width: 90 },
  { field: "PURITY", displayName: "Clarity", width: 90 },
  { field: "LAB", displayName: "Lab", width: 90 },
  { field: "RATE", displayName: "Rap", width: 90 },
  { field: "DISC_PER", displayName: "Discount %", width: 90 },
  { field: "NET_RATE", displayName: "Per Carat Price", width: 150 },
  { field: "NET_VALUE", displayName: "Total Value", width: 100 },
  { field: "RATIO", displayName: "Ratio", width: 40 },
  { field: "MEASUREMENT", displayName: "Measurement", width: 150 },
  { field: "TABLE_PER", displayName: "Table %", width: 100 },
  { field: "DEPTH_PER", displayName: "Depth %", width: 80 },
  { field: "CUT", displayName: "Cut", width: 90 },
  { field: "POLISH", displayName: "Pol", width: 90 },
  { field: "SYMM", displayName: "Sym", width: 90 },
  { field: "REPORT_NO", displayName: "Certificate", width: 120 },
  { field: "LOCATION", displayName: "Country", width: 100 },
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
