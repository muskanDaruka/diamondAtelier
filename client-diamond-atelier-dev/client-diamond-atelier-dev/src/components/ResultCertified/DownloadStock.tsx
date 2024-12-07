import React from "react";
import toast from "react-hot-toast";
import { MdFileDownload } from "react-icons/md";
import downloadExcel from "@/helpers/DownloadExcel";
import ResultBtn from "../common/ResultBtn";
import { Row } from "@tanstack/react-table";

type Column = {
  field: string,
  headerName: string,
  width: number
}

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
  SUPPLIER_NAME?: string;
  INW_DATE?: string;
  NAME?: string;
  MEMO_DATE?: string;
  MEMO_NO?: string;
  SELLER_NAME?: string;
  COST_DISC_PER?: string;
  COST_RATE?: string;
  COST_VALUE?: string;
  PAGENO: number | string;
};

type RowData = {
  rows: Row<Fields>[]
}


const column: Column[] = [
  { field: "PACKET_NO", headerName: "STOCK ID", width: 90 },
  {
    field: "STONE_STAGE",
    headerName: "Status",
    width: 90,
  },
  {
    field: "PREFIX",
    headerName: "Grown",
    width: 90,
  },
  {
    field: "SHAPE",
    headerName: "Shape",
    width: 90,
  },
  {
    field: "WGT",
    headerName: "Carat",
    width: 90,
  },
  {
    field: "COLOR",
    headerName: "Color",
    width: 90,
  },
  {
    field: "PURITY",
    headerName: "Clarity",
    width: 90,
  },
  {
    field: "VIDEO_PATH",
    headerName: "Video",
    width: 90,
  },
  {
    field: "LAB",
    headerName: "Lab",
    width: 90,
  },
  {
    field: "RATE",
    headerName: "Rap",
    width: 90,
  },
  {
    field: "DISC_PER",
    headerName: "Discount %",
    width: 90,
  },
  {
    field: "NET_RATE",
    headerName: "Per Carat Price",
    width: 150,
  },
  {
    field: "NET_VALUE",
    headerName: "Total Value",
    width: 100,
  },
  {
    field: "RATIO",
    headerName: "Ratio",
    width: 40,
  },
  {
    field: "MEASUREMENT",
    headerName: "Measurement",
    width: 130,
  },
  {
    field: "TABLE_PER",
    headerName: "Table %",
    width: 100,
  },
  {
    field: "DEPTH_PER",
    headerName: "Depth %",
    width: 80,
  },
  {
    field: "CUT",
    headerName: "Cut",
    width: 90,
  },
  {
    field: "POLISH",
    headerName: "Pol",
    width: 90,
  },
  {
    field: "SYMM",
    headerName: "Sym",
    width: 90,
  },
  {
    field: "REPORT_NO",
    headerName: "Certificate",
    width: 120,
  },
  {
    field: "LOCATION",
    headerName: "Country",
    width: 100,
  },
];

const item = { icon: <MdFileDownload className="mx-auto" />, title: "Download Stock" }


function DownloadStock({ rows }: RowData) {

  const handleDownload = (value: string) => {
    if (!rows?.length) {
      toast.error("select atleast one row")
      return;
    }
    const keysToExcludeIfWihoutPrice = [ "NET_RATE", "NET_VALUE", "DISC_PER", 'RATE'];

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
