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
  FANCY_COLOR: string;
  INTENSITY: string;
  PURITY: string;
  TOT_WGT: number;
  LENGTH: number;
  WIDTH: number;
  SALERATE: number;
  VALUE: number;
  DEPTH: number;
  RATIO: number;
  PREFIX: string;
  SHAPE: string;
  MM_N: string;
  LOCATION: string;
}

type RowData = {
rows:Row<Fields>[]
}

type PropsType = {
  field: string;
  headerName: string;
  width: number;
};

const properties: PropsType[] = [
    {
        field: "PACKET_NO",
        headerName: "STOCK ID",
        width: 90,
    },
    {
      field: "PREFIX",
      headerName: "Grown",
      width: 90,
  },
  {
    field: "FANCY_COLOR",
    headerName: "Color",
    width: 90,
},
{
  field: "INTENSITY",
  headerName: "Color-Intensity",
  width: 90,
},
{
  field: "PURITY",
  headerName: "Clarity",
  width: 90,
},
    {
        field: "SHAPE",
        headerName: "Shape",
        width: 90,
    },
    {
      field: "TOT_WGT",
      headerName: "Weight",
      width: 90,
  },
  {
      field: "LENGTH",
      headerName: "Length",
      width: 90,
  },
  {
      field: "WIDTH",
      headerName: "Width",
      width: 90,
  },
  {
    field: "SALERATE",
    headerName: "P/CT",
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
      transformedRow[prop.headerName] = row[prop.field as keyof Fields];
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
      properties: properties.map(prop => ({ field: prop.headerName, displayName: prop.headerName })),
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
