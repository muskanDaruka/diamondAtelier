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
  COLOR: string;
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
  rows: Row<Fields>[]
}

const column: Column[] = [
  {
    field: "PACKET_NO",
    headerName: "STOCK ID",
    width: 90,
  },
  {
    field: "STOCK",
    headerName: "STATUS",
    width: 90,
  },
  {
    field: "TOT_WGT",
    headerName: "Carat",
    width: 90,
  },
  {
    field: "LENGTH",
    headerName: "Length",
    width: 90,
  },
  {
    field: "RATIO",
    headerName: "Ratio",
    width: 40,
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
{
    field: "VALUE",
    headerName: "TOTAL AMOUNT",
    width: 90,
},
  {
    field: "COLOR",
    headerName: "Color",
    width: 90,
  },
  {
    field: "PREFIX",
    headerName: "Grown",
    width: 90,
  },
  {
    field: "MM_N",
    headerName: "Measurement",
    width: 130,
  },
  {
    field: "SHAPE",
    headerName: "Shape",
    width: 90,
  },
];

const item = { icon: <MdFileDownload className="mx-auto" />, title: "Download Stock" }

function DownloadStock({ rows }: RowData) {

  const handleDownload = (value: string) => {
    if (!rows?.length) {
      toast.error("select atleast one row")
      return;
    }
    const keysToExcludeIfWihoutPrice = ["SALERATE", "VALUE", "DISC_PER",'RATE'];

    const formattedData = rows.map((row: any): Fields | undefined => {
      if (value == "without_price") {
        let newRow: any = {};
        column
          .filter((col: Column) => !keysToExcludeIfWihoutPrice.includes(col.field))
          .map((col: Column) => {
            newRow[col.headerName] = row.original[col.field];
          });
        return newRow;
      }

      if (value == "with_price") {
        let newRow: any = {};
        column.map((col: Column) => {
          newRow[col.headerName] = row.original[col.field];
        });
        return newRow;
      }
    });
    downloadExcel(formattedData);
  };

  return (
    <div className="relative group">
      <ResultBtn
        key={item.title}
        icon={item.icon}
        title={item.title}
      />
      <div className="absolute text-white hidden group-hover:flex flex-col z-50 w-full bg-white">
        <button
          onClick={() => handleDownload("with_price")}
          className="border border-black m-1 bg-[#2366C4]"
        >
          With Price
        </button>
        <button
          onClick={() => handleDownload("without_price")}
          className="border border-black m-1 bg-[#2366C4]"
        >
          Without Price
        </button>
      </div>
    </div>
  );
}

export default DownloadStock;
