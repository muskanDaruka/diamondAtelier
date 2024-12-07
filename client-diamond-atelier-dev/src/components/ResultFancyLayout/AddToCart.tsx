import ResultBtn from '@/components/common/ResultBtn'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { IoMdCart } from 'react-icons/io'
import { HiShoppingCart } from "react-icons/hi2";
import { Row } from '@tanstack/react-table'
import { addToCartApi } from '@/redux/Cart/addCart'
import { useAppDispatch } from '@/redux/ReduxHook'
import { getCartDataApi } from '@/redux/Cart/getCartData'

const item = { icon: <IoMdCart className="mx-auto" />, title: "Add to cart" }

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
  rows: Row<Fields>[]
}

function AddToCart({ rows }: RowData) {

  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const handleCart = () => {
    if (rows.length > 1) {
      toast.error("You can add only one item at a time");
      return;
    }

    let mappedRow = rows.map((it: any) => it.original);

    if (rows.length > 0) {
      dispatch(addToCartApi({
        "packetno": mappedRow[0].PACKET_NO,
        "cartstatus": "PENDING",
        "username": localStorage.getItem("username") || "",
        "isactive": 1
      })).then(()=>{
        dispatch(
          getCartDataApi({ 
            username: localStorage.getItem("username") || "",
            isactive: 1,
            is_own_list:true
          })
        );
      });
    }
  };

  return (
    <div className="relative group">
      <ResultBtn
        key={item.title}
        icon={item.icon}
        title={item.title}
        onClick={handleCart}
      />
    </div>
  )
}

export default AddToCart
