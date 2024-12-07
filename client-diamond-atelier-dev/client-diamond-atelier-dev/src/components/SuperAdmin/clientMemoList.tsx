"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { RootState } from "@/redux/combineReducer";
import { ColumnDef, } from "@tanstack/react-table";
import DynamicAdminTable from "@/components/common/DynamicAdminTable";
import { Row, RowSelectionState } from "@tanstack/react-table";
import { IoMdVideocam } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { RiVipDiamondFill } from "react-icons/ri";
import { getAllMemoApi } from "@/redux/memo/getMemoData";
import CustomPagination from "../common/CustomPagination";

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
  ROW_NO?:number;
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

function ClientMemoList() {
  const { data, isLoading }: any = useAppSelector(
    (store: RootState) => store?.getAllMemoReducer
  );
  const params = useSearchParams();
  const [rows, setRow] = useState<Row<Fields>[]>([]);
  const { back } = useRouter();
  const dispatch = useAppDispatch();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [page, setPage] = useState<number>(1);

  const column: ColumnDef<Fields, any>[] = [
    {
      id: "ROW_NO",
      accessorKey: "ROW_NO",
      header: "Sr.No.",
      size: 60,
      cell: (info) => <span>{info.getValue()}</span>
    },
    {
      id: "MEMO_PARTY_NAME",
      accessorKey: "NAME",
      header: "Memo Party Name",
      cell: (info) => <span className='text-nowrap'>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      id: "MEMO_SELLER_NAME",
      accessorKey: "SELLER_NAME",
      header: "Memo Seller Name",
      size: 100,
      cell: (info) => <span className='text-nowrap'>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "PACKET_NO",
      header: "STOCK ID",
      cell: (info) => <span className="text-nowrap">{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
      enableResizing: true
    },
    {
      id: "STONE_STAGE",
      accessorKey: "STONE_STAGE",
      header: "Status",
      size: 150,
      cell: (info) => {
        const value = info.getValue();
        let content = null;
        switch (value) {
          case "Stock":
            content = (
              <div className="grid grid-cols-4 w-full">
                <div className="col-span-1 flex justify-center items-center">
                  <RiVipDiamondFill size={"10px"} className="text-green-500" />
                </div>
                <div className="col-span-3">
                  <span className="text-black">{value}</span>
                </div>
              </div>
            );
            break;
          case "Memo":
            content = (
              <div className="grid grid-cols-4 flex items-center justify-center">
                <div className="col-span-1 flex justify-center items-center">
                  <RiVipDiamondFill size={"10px"} className="text-orange-500" />
                </div>
                <div className="col-span-3">
                  <span className="text-black">{value}</span>
                </div>
              </div>
            );
            break;
          case "Hold":
            content = (
              <div className="grid grid-cols-4 flex items-center justify-center">
                <div className="col-span-1 flex justify-center items-center">
                  <RiVipDiamondFill size={"11px"} className="text-yellow-500" />
                </div>
                <div
                  className="col-span-3 relative group"
                >
                  <span className="text-black">{value}</span>
                </div>
              </div>
            );
            break;
          default:
            content = (
              <div className="grid grid-cols-4 flex items-center justify-center">
                <div className="col-span-1 flex justify-center items-center">
                  <RiVipDiamondFill size={"10px"} className="text-gray-500" />
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
      accessorKey: "PREFIX",
      header: "Grown",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "SHAPE",
      header: "Shape",
      size: 100,
      cell: (info) => <span className="text-nowrap">{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "WGT",
      header: "Carat",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "COLOR",
      header: "Color",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "PURITY",
      header: "Clarity",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "VIDEO_PATH",
      header: "Video",
      cell: (info) => {
        const videoUrl = info.getValue();
        return (
          <span
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {videoUrl ? (
              <Link target="_blank" href={videoUrl}>
                <IoMdVideocam size={"20px"} className="mx-auto" />
              </Link>
            ) : (
              <IoMdVideocam size={"20px"} className="mx-auto text-gray-400" />
            )}
          </span>
        );
      },
    },
    {
      accessorKey: "LAB",
      header: "Lab",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "RATE",
      header: "Rap",
      size: 100,
      cell: (info) => <span>{`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
    },
    {
      accessorKey: "DISC_PER",
      header: "Disc %",
      size: 100,
      cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}%` : "-"}`}</span>,
    },
    {
      accessorKey: "NET_RATE",
      header: "P/CT",
      size: 100,
      cell: (info) => <span>{`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
    },
    {
      accessorKey: "NET_VALUE",
      header: "Total Value",
      size: 100,
      cell: (info) => <span>{`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
    },
    {
      accessorKey: "RATIO",
      header: "Ratio",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "MEASUREMENT",
      header: "Measurement",
      cell: (info) => <span className="text-nowrap">{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "TABLE_PER",
      header: "Table %",
      cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
    },
    {
      accessorKey: "DEPTH_PER",
      header: "Depth %",
      cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
    },
    {
      accessorKey: "CUT",
      header: "Cut",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "POLISH",
      header: "Pol",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "SYMM",
      header: "Sym",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "REPORT_NO",
      header: "Certificate",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      accessorKey: "LOCATION",
      header: "Country",
      cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
  ];

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(data.TBL_RECD,"helloo muskan")
  }

  useEffect(() => {
    dispatch(
      getAllMemoApi({
        action: !params.get("action") ? true : false,
        page_no: page,
      })
    );
  }, [dispatch, page]);

  return (
    <>
      <div className="p-3">
        <button
          onClick={() => back()}
          className="m-1 ml-5 text-xl border-0 bg-white flex items-center"
        >
          <MdKeyboardArrowLeft size={22} />
          Back
        </button>
      </div>
      <div className="mt-1 mx-6">
        <DynamicAdminTable
          columns={column}
          data={data?.data?.Table || []}
          isLoading={isLoading}
          width="md:w-full"
          rowSelection={rowSelection}
          selectedRow={(val) => { setRow(val.map(({ original }: any) => original)) }}
          setRowSelection={setRowSelection}
        />
        <div className="flex justify-end items-center mt-1">
          <CustomPagination
            page={page}
            count={Math.ceil((data?.TBL_RECD)||100)}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default ClientMemoList;