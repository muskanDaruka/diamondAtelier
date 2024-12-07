import MemoDetails from "@/components/ResultFancyLayout/MemoDetails";
import { ApproxPiece, SizeInCent } from "@/helpers/CalculationFancy";
import { Tooltip } from "@mui/material";
import { ColumnDef, isRowSelected, SortingFn} from "@tanstack/react-table";
import Link from "next/link";
import moment from 'moment';
import { useEffect, useState } from "react";
import { IoMdVideocam } from "react-icons/io";
import { RiVipDiamondFill } from "react-icons/ri";

type Fields = {
  STOCK?: string;
  PREFIX?: string;
  DESCRIPTION?: string;
  PACKET_NO?: string;
  STONE_STAGE?: string;
  SHAPE?: string;
  LENGTH?: number;
  WIDTH?: number;
  WIDTH_1?:number;
  HEIGHT?:number;
  COLOR?: string;
  TOT_WGT?: number;
  WGT?: number;
  PURITY?: string;
  VIDEO_PATH?: string;
  LAB?: string;
  RATE?: number;
  DISC_PER?: number;
  SIZE_N?:string;
  SALERATE?: number;
  VALUE?: number;
  RATIO?: number;
  MEASUREMENT?: string;
  MM_N?: string;
  TABLE_PER?: number;
  DEPTH?: number;
  CUT?: string;
  POLISH?: string;
  SYMM?: string;
  REPORT_NO?: string;
  LOCATION?: string;
  SUPPLIER_NAME?: string;
  INW_DATE?: string;
  NAME?: string;
  MEMO_DATE?: string;
  MEMO_NO?: string;
  SELLER_NAME?: string;
  COST_DISC_PER?: string;
  COST_RATE?: string;
  COST_VALUE?: string;
  SrNo?:number;
  No_of_stock_per_carat?: number;
  no_of_piece?: string;
  wholesale_price?: string;
  medium_price?: string;
  retail_price?: string;
  PAGENO?: number | string;
  Approx_Amount?: string;
  approx_weight?: string;
  OIC?: string;
  piece_per_carat?: string;
  P_Ct?: string;
  CARAT?: string;
  CENT?: string;
};

export const superAdminColumn: ColumnDef<Fields, any>[] = [
  {
    id: "checkbox",
    size: 50,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
      <input
        type="checkbox"
        className="form-checkbox w-4 h-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
      </div>
    ),
    header: ({ table }) => (
      <div className="flex justify-center items-center">
      <input
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
        type="checkbox"
        className="form-checkbox w-4 h-4"
      />
      </div>
    ),
  },
  {
    id:"SrNo",
    accessorKey: "SrNo",
    header: "Sr.No.",
    size:60,
    cell:(info) => <span>{info.row.index + 1}</span>
  },
  {
    id: "STOCK",
    accessorKey: "STOCK",
    header: "Status",
    size: 100,
    cell: (info) => {
      const value = info.getValue();
      let content = null;
      let label = "";
      const handleClick = (e:any) => {
        e.stopPropagation(); 
      };
      switch (value) {
        case "A":
          label = "Stock";
          content = (
            <div className="grid grid-cols-4 w-full" onClick={handleClick}>
              <div className="col-span-1 flex justify-center items-center">
                <RiVipDiamondFill size={"11px"} className="text-green-500" />
              </div>
              <div className="col-span-3">
                <span className="text-black">{label}</span>
              </div>
            </div>
          );
          break;
        case "M":
          label = "Memo";
          content = (
            <div className="grid grid-cols-4 w-full" onClick={handleClick}>
              <div className="col-span-1 flex justify-center items-center">
                <RiVipDiamondFill size={"11px"} className="text-red-500" />
              </div>
              <div className="col-span-3">
                <span className="text-black">{label}</span>
              </div>
            </div>
          );
          break;
          case "H":
          label = "Hold";
          content = (
            <div className="grid grid-cols-4 w-full" onClick={handleClick}>
              <div className="col-span-1 flex justify-center items-center">
                <RiVipDiamondFill size={"11px"} className="text-yellow-500" />
              </div>
              <div
                className="col-span-3 relative group"
              >
                <Tooltip title="This Stone is on temporary hold. For more details, please contact the salesperson." placement="bottom" arrow>
                  <span className="text-black">{label}</span>
                </Tooltip>
              </div>
            </div>
          );
          break;
        case "B":
          label = "Stock / Memo";
          content = (
            <div className="grid grid-cols-4 w-full" onClick={handleClick}>
              <div className="col-span-1 flex justify-center items-center">
                <RiVipDiamondFill size={"11px"} className="text-blue-500" />
              </div>
              <div className="col-span-3">
                <span className="text-black">{label}</span>
              </div>
            </div>
          );
          break;
        default:
          content = (
            <div className="grid grid-cols-4 w-full" onClick={handleClick}>
              <div className="col-span-1 flex justify-center items-center">
                <RiVipDiamondFill size={"11px"} className="text-gray-500" />
              </div>
              <div className="col-span-3">
                <span className="text-black">{value}</span>
              </div>
            </div>
          );
      }
      return content;
    },
  },
  {
    id: "PREFIX",
    accessorKey: "PREFIX",
    header: "Grown",
    size: 80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  }, 
  {
    id: "PACKET_NO",
    accessorKey: "PACKET_NO",
    header: "STOCK ID",
    size: 80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id: "SHAPE",
    accessorKey: "SHAPE",
    header: "Shape",
    size: 80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id: "TOT_WGT",
    accessorKey: "TOT_WGT",
    header: "In Stock Ct",
    size: 100,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id: "COLOR",
    accessorKey: "COLOR",
    header: "Color",
    size: 80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id: "PURITY",
    accessorKey: "PURITY",
    header: "Clarity",
    size: 80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  // {
  //   id: "SIZE_N",
  //   accessorKey: "SIZE_N",
  //   header: "SIZE IN (CARAT)",
  //   size:100,
  //   cell: (info) => <span>{info.getValue() ? info.getValue() : "-"}</span>,
  // },
  // {
  //   id: "Size_CENT",
  //   accessorKey: "SIZE_N",
  //   header: "SIZE IN (CENT)",
  //   size:100,
  //   cell: (info) => <span>{info.getValue() ? SizeInCent(info.getValue()) : "-"}</span>,
  // },
  {
    id: "LENGTH",
    accessorKey: "LENGTH",
    header: "Length",
    size:90,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id: "WIDTH",
    accessorKey: "WIDTH",
    header: "Width",
    size:90,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id: "DEPTH",
    accessorKey: "DEPTH",
    header: "Height",
    size:90,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  // {
  //   id: "CUT",
  //   accessorKey: "CUT",
  //   header: "Cut",
  //   size: 80,
  //   cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  // },
  // {
  //   id: "DEPTH",
  //   accessorKey: "DEPTH",
  //   header: "Depth",
  //   size: 100,
  //   cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  // },
  {
    id: "RATIO",
    accessorKey: "RATIO",
    header: "Ratio",
    size: 80,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id: "MM_N",
    accessorKey: "MM_N",
    header: "Measurement",
    size: 100,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue().split("*").join("-")}` : "-"}`}</span>,
  },
  {
    id: "SALERATE",
    accessorKey: "SALERATE",
    header: "P/Ct",
    size: 120,
    cell: (info) => <span>{`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id: "VALUE",
    accessorKey: "VALUE",
    header: "Total Amount",
    size: 120,
    cell: (info) => <span>{`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  
  
 
  {
    id: "LOCATION",
    accessorKey: "LOCATION",
    header: "Location",
    size: 80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id: "MEMO_DATE",
    accessorKey: "MEMO_DATE",
    header: "Memo Date",
    size: 120,
    cell: (info) => <span>{`${info.getValue() ? `${moment(info.getValue()).format('MM-DD-YYYY')}` : "-"}`}</span>,
  },
  {
    id: "MEMO_NO",
    accessorKey: "MEMO_NO",
    header: "Memo No",
    size: 120,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  }, 
  {
    id: "NAME",
    accessorKey: "NAME",
    header: "Memo Party Name",
    size: 150,
    cell: (info) => <span className='text-nowrap'>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  
  {
    id: "SELLER_NAME",
    accessorKey: "SELLER_NAME",
    header: "Seller Name",
    size: 150,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
];

