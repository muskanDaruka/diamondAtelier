"use client";
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

function SendEmail({ rows }: RowData) {
    const [open, setOpen] = useState(false)
    const handleCopy = () => {
        if (!rows?.length) {
            toast.error("Select at least one row");
        }
        else {
            const formattedData = rows.map(({ original }: { original: any }) => {
                return column
                    .map(col => `${col.headerName}: ${original[col.field]}`)
                    .join('\n');
            }).join("\n\n");

            navigator.clipboard.writeText(formattedData).then(() => {
                alert('Data copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    };

    return (
        <>
        <NotificationModal
        open={open}
        handleClose={()=>setOpen(false)}
        msg={
          "Layout Details is copied Now go to E-mail and press ctrl + v to paste the details"
        }
      />
        <div className="relative group">
            <ResultBtn
                key={item.title}
                icon={item.icon}
                title={item.title}
                onClick={handleCopy}
            />
        </div>
        </>
    );
}

export default SendEmail;
