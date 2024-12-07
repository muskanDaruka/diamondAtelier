"use client"
import React, { ReactNode, useState } from 'react';
import ResultBtn from '../common/ResultBtn';
import { Row } from '@tanstack/react-table';
import { MdOutlineEmail } from 'react-icons/md';
import toast from 'react-hot-toast';
import NotificationModal from '../common/NotificationModal';

const item: { icon: ReactNode, title: string } = { icon: <MdOutlineEmail className="mx-auto" />, title: "E-mail" }

type Column = {
  field: string,
  headerName: string,
  width?: number
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
  { field: "STONE_STAGE", headerName: "Status", width: 90 },
  { field: "PREFIX", headerName: "Grown", width: 90 },
  { field: "SHAPE", headerName: "Shape", width: 90 },
  { field: "WGT", headerName: "Carat", width: 90 },
  { field: "COLOR", headerName: "Color", width: 90 },
  { field: "PURITY", headerName: "Clarity", width: 90 },
  { field: "VIDEO_PATH", headerName: "Video", width: 90 },
  { field: "LAB", headerName: "Lab", width: 90 },
  { field: "RATE", headerName: "Rap", width: 90 },
  { field: "DISC_PER", headerName: "Discount %", width: 90 },
  { field: "NET_RATE", headerName: "Per Carat Price", width: 150 },
  { field: "NET_VALUE", headerName: "Total Value", width: 100 },
  { field: "RATIO", headerName: "Ratio", width: 40 },
  { field: "MEASUREMENT", headerName: "Measurement", width: 130 },
  { field: "TABLE_PER", headerName: "Table %", width: 100 },
  { field: "DEPTH_PER", headerName: "Depth %", width: 80 },
  { field: "CUT", headerName: "Cut", width: 90 },
  { field: "POLISH", headerName: "Pol", width: 90 },
  { field: "SYMM", headerName: "Sym", width: 90 },
  { field: "REPORT_NO", headerName: "Certificate", width: 120 },
  { field: "LOCATION", headerName: "Country", width: 100 },
];


function SendEmail({ rows }: RowData) {
  const [open, setOpen] = useState(false);
  const handleCopy = (value: string) => {
    if (!rows?.length) {
      toast.error("Select at least one row");
    }
    else {
      const keysToExcludeIfWihoutPrice = ['NET_RATE', 'NET_VALUE', 'DISC_PER','RATE'];

      const formattedData = rows.map(({ original }: { original: any }) => {
        if (value === "without_price") {
          return column
            .filter(col => !keysToExcludeIfWihoutPrice.includes(col.field))
            .map(col => `${col.headerName}: ${original[col.field]}`).join('\n');
        }

        if (value === "with_price") {
          return column
            .map(col => `${col.headerName}: ${original[col.field]}`)
            .join('\n');
        }
      }).join("\n\n");

      navigator.clipboard.writeText(formattedData).then(() => {
        setOpen(true)
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  return (
    <>
      <NotificationModal
        open={open}
        handleClose={() => setOpen(false)}
        msg={
          "Stone Detail is copied Now go to E-mail and press ctrl + v to paste the details"
        }
      />
      <div className="relative group">
        <ResultBtn
          key={item.title}
          icon={item.icon}
          title={item.title}
        />
        <div className="absolute text-white hidden group-hover:flex flex-col z-50 w-full bg-white">
          <button onClick={() => handleCopy("with_price")} className="border border-black m-1 bg-[#2366C4]">With Price</button>
          <button onClick={() => handleCopy("without_price")} className="border border-black m-1 bg-[#2366C4]">Without Price</button>
        </div>
      </div>
    </>

  );
}

export default SendEmail;
