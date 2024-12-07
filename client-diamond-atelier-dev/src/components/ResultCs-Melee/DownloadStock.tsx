import React from "react";
import toast from "react-hot-toast";
import { MdFileDownload } from "react-icons/md";
import downloadExcel from "@/helpers/DownloadExcelFancy";
import ResultBtn from "../common/ResultBtn";
import { Row } from "@tanstack/react-table";

type Column = {
  field: string,
  headerName: string,
  width: number
}

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

const column: Column[] = [
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

const item = { icon: <MdFileDownload className="mx-auto" />, title: "Download Stock" }

function DownloadStock({ rows }: RowData) {

  const handleDownload = () => {
    if (!rows?.length) {
      toast.error("select atleast one row")
      return;
    }

    const formattedData = rows.map((row: any): Fields => {
      let newRow: any = {};
      column
        .forEach((col: Column) => {
          newRow[col.headerName] = row.original[col.field];
        });
      return newRow;
    });
    downloadExcel(formattedData);
  };

  return (
    <div className="relative group">
      <ResultBtn
        key={item.title}
        icon={item.icon}
        title={item.title}
        onClick={handleDownload}
      />
    </div>
  );
}

export default DownloadStock;
