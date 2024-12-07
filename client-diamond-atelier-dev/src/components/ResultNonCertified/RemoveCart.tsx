"use client"
import { Row } from "@tanstack/react-table";
import React from "react";
import ResultBtn from "../common/ResultBtn";
import { IoMdCart } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  rows: Row<Fields>[];
  setCart: React.Dispatch<React.SetStateAction<Fields[]>>,
};

function RemoveCart({ rows, setCart }: RowData) {
  const router = useRouter();
  const item = {
    icon: <IoMdCart className="mx-auto" />,
    title: "Remove from cart",
  };

  const handleRemoveItem = () => {
    if (rows.length < 1) {
      toast.error("select atleast one row");
      return;
    }
    rows = rows.map((ele: any) => ele.original.PACKET_NO);
    let cart = JSON.parse(localStorage.getItem("cart") || `[]`);

    let newCart = cart.filter((item1: any) => !rows.includes(item1.PACKET_NO));

    localStorage.setItem("cart", JSON.stringify(newCart));

    toast.success("Item removed successfully");
    setCart(newCart);
  };

  return (
    <div>
      <ResultBtn
        key={item.title}
        icon={item.icon}
        title={item.title}
        onClick={handleRemoveItem}
      />
    </div>
  );
}

export default RemoveCart;

