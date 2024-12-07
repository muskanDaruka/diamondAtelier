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
  TOT_WGT: number;
  LENGTH: number;
  WIDTH: number;
  PREFIX: string;
  RATIO: number;
  SALERATE: number;
  DEPTH: number;
  COLOR: string;
  SHAPE: string;
  LOCATION: string;
  MM_N: string;
  No_of_stock_per_carat: number;
  no_of_piece: string;
};

type RowData = {
rows:Row<Fields>[]
}

type PropsType = {
  field: string;
  displayName: string;
  width: number;
};

const properties: PropsType[] = [
      {
        field: "TOT_WGT",
        displayName: "Weight",
        width: 90,
      },
      {
        field: "LENGTH",
        displayName: "Length",
        width: 90,
      },
      {
        field: "WIDTH",
        displayName: "Width",
        width: 90,
      },
      {
        field: "PREFIX",
        displayName: "Grown",
        width: 90,
      },
      {
        field: "SHAPE",
        displayName: "Shape",
        width: 90,
      },
      {
        field: "SALERATE",
        displayName: "P/CT",
        width: 90,
    },
   
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
  const handlePrint = () => {
    if (rows.length === 0) {
      toast.error("Select atleast one row");
      return;
    }

    printJS({
      printable: transformedData,
      type: "json",
      properties: properties.map(prop => ({ field: prop.displayName, displayName: prop.displayName })),
      style,
      maxWidth: 100,
    });
  };
  return (
    <ResultBtn
      key={item.title}
      icon={item.icon}
      title={item.title}
      onClick={handlePrint}
    />
  );
}

export default PrintSelectedRow;
