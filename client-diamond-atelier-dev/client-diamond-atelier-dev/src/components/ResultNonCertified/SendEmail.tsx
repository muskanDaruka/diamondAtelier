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
    id: number;
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
    { field: "PACKET_NO", headerName: "STOCK ID", width: 90 },
    { field: "STOCK", headerName: "Status", width: 90 },
    { field: "PREFIX", headerName: "Grown", width: 90 },
    { field: "SHAPE", headerName: "Shape", width: 90 },
    { field: "TOT_WGT", headerName: "Carat", width: 90 },
    { field: "COLOR", headerName: "Color", width: 90 },
    { field: "LENGTH", headerName: "Length", width: 90 },
    { field: "WIDTH", headerName: "Width", width: 90 },
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
    { field: "RATIO", headerName: "Ratio", width: 40 },
    { field: "MM_N", headerName: "MM", width: 130 },
    { field: "DEPTH", headerName: "Depth %", width: 80 },
    { field: "LOCATION", headerName: "Location", width: 100 },
];

function SendEmail({ rows }: RowData) {
    const [open, setOpen] = useState(false);
    const handleCopy = (value: string) => {
        if (!rows?.length) {
            toast.error("Select at least one row");
        }
        else {
            const keysToExcludeIfWihoutPrice = ['SALERATE', 'VALUE', 'DISC_PER', 'RATE'];
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
                handleClose={() => setOpen(false)}
                msg={
                    "Shape Detail is copied Now go to E-mail and press ctrl + v to paste the details"
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
