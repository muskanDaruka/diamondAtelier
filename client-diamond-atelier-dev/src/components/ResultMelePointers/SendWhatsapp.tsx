"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import ResultBtn from '../common/ResultBtn';
import { Row } from '@tanstack/react-table';
import toast from "react-hot-toast";
import NotificationModal from '../common/NotificationModal';
import phone from 'phone';

const item: { icon: ReactNode, title: string } = { icon: <FaWhatsapp className="mx-auto" />, title: "Whatsapp" }

type Column = {
  field: string,
  headerName: string,
  width?: number
}

type Fields = {
  id:number;
  PACKET_NO: string;
  PREFIX: string;
  STOCK: string;
  COLOR: string;
  LENGTH: number;
  WIDTH: number;
  SHAPE: string;
  SIZE_N: string;
  SALERATE: number;
  PURITY: string;
  TOT_WGT: number;
  MM_N: string;
  WGT: number;
};

type RowData = {
  rows: Row<Fields>[]
}

const column: Column[] = [
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
    field: "TOT_WGT",
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
    field: "SALERATE",
    headerName: "P/CT",
    width: 90,
},

];

function SendWhatsapp({ rows }: RowData) {
  const [open, setOpen] = useState(false);
  const [sellerNo,setSellerNo] = useState<null | string>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("userType"));
  }, []);
  
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
        if (userRole === "BUYER") {
          const encodedValue = encodeURIComponent(formattedData);
          if (sellerNo) {
            window.open(`https://wa.me/${sellerNo}?text=${encodedValue}`, "_blank");
            return;
          }
        } else {
          setOpen(true);
        }
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  useEffect(()=>{
    const number = phone(localStorage.getItem("seller_mobile_no")||"");
    setSellerNo(number.phoneNumber)
  },[])

  return (
    <>
      <NotificationModal
        open={open}
        handleClose={() => setOpen(false)}
        msg={
          "Stone Details is copied Now go to Whatsapp and press ctrl + v to paste the details"
        }
      />
      <div className="relative group">
        <ResultBtn
          key={item.title}
          icon={item.icon}
          title={item.title}
        />
        <div className="absolute text-white hidden group-hover:flex flex-col z-50 w-full">
          <button onClick={handleCopy} className="border-0 m-1 bg-[#2366C4]">Copy Data</button>
        </div>
      </div>
    </>
  );
}

export default SendWhatsapp;
