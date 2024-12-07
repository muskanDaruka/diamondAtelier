import ResultBtn from '@/components/common/ResultBtn';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { IoMdCart } from 'react-icons/io';
import { Row } from '@tanstack/react-table';
import { useAppDispatch } from '@/redux/ReduxHook';
import { addToCartApi } from '@/redux/Cart/addCart';
import { getCartDataApi } from '@/redux/Cart/getCartData';

const item = { icon: <IoMdCart className="mx-auto" />, title: "Add to cart" }

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
  rows: Row<Fields>[];
  customClass?:string;
}

function CertifiedCart({ rows, customClass }: RowData ) {
  const { push } = useRouter()
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
        customClass={customClass}
      />
    </div>
  )
}

export default CertifiedCart
