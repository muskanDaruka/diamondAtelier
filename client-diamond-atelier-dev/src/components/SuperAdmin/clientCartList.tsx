"use client";
import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { IoMdVideocam } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { RootState } from "@/redux/combineReducer";
import { ColumnDef, Row, RowSelectionState } from "@tanstack/react-table";
import { getCartDataApi } from "@/redux/Cart/getCartData";
import DynamicAdminTable from "@/components/common/DynamicAdminTable";
import { removeFromCartApi } from "@/redux/Cart/removeFromCart";
import toast from "react-hot-toast";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiVipDiamondFill } from "react-icons/ri";
import { GrResume } from "react-icons/gr";
import ResultBtn from "@/components/common/ResultBtn";
import HoldStone from "@/components/ResultCertified/HoldStone";
import { FaShoppingBag } from "react-icons/fa";

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
  PAGENO: number | string;
};

function ClientCartList() {
  const { data, isLoading } = useAppSelector(
    (store: RootState) => store?.getCartDataReducer
  );
  const [rows, setRow] = useState<Row<Fields>[]>([]);
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const { back, push } = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedOption, setSelectedOption] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setOpenDropdown(false);
    if (value === "holdStone") {
      setOpenModal(true);
    } else if(value === "unhold") {
      push('./hold-stone')
    }
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const column: ColumnDef<Fields, any>[] = [
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
      id: "removeBtn",
      header: "Remove Item",
      cell: ({ row }) => (
        <button
          onClick={() => {
            dispatch(
              removeFromCartApi({
                packetno: row.original.PACKET_NO,
                username: localStorage.getItem("username") || "",
              })
            ).then(() => {
              toast.success("item removed successfully");
              dispatch(
                getCartDataApi({
                  username: localStorage.getItem("username") || "",
                  isactive: 1,
                  is_own_list:true
                })
              );
            });
          }}
          className="bg-blue-700 text-white text-sm px-2 py-1 rounded-full"
        >
          Remove
        </button>
      ),
    },
    {
      id: "CART_PARTY_NAME",
      accessorKey: "CART_PARTY_NAME",
      header: "Cart Party Name",
      cell: (info) => <span className='text-nowrap'>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      id: "CART_SELLER_NAME",
      accessorKey: "CART_SELLER_NAME",
      header: "Cart Seller Name",
      cell: (info) => <span className='text-nowrap'>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
    },
    {
      id: "packetno",
      accessorKey: "PACKET_NO",
      header: "Stock Id",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "STONE_STAGE",
      accessorKey: "STONE_STAGE",
      header: "Status",
      size: 80,
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
      id: "grown",
      accessorKey: "PREFIX",
      header: "Grown",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "shapes",
      accessorKey: "SHAPE",
      header: "Shape",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "WGT",
      accessorKey: "WGT",
      header: "Per Carat Price",
      cell: (info) => <span>{parseFloat(info.getValue()).toFixed(2)}</span>,
    },
    {
      id: "color",
      accessorKey: "COLOR",
      header: "Color",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "PURITY",
      accessorKey: "PURITY",
      header: "Clarity",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "VIDEO_PATH",
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
      id: "lab",
      accessorKey: "LAB",
      header: "Lab",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "NET_RATE",
      accessorKey: "NET_RATE",
      header: "RAP",
      cell: (info) => <span>${parseFloat(info.getValue()).toFixed(2)}</span>,
    },
    {
      id: "DISC_PER",
      accessorKey: "DISC_PER",
      header: "DISC %",
      cell: (info) => <span>{parseFloat(info.getValue()).toFixed(2)}%</span>,
    },
    {
      id: "NET_VALUE",
      accessorKey: "NET_VALUE",
      header: "Total Value",
      cell: (info) => <span>${parseFloat(info.getValue()).toFixed(2)}</span>,
    },
    {
      id: "RATIO",
      accessorKey: "RATIO",
      header: "Ratio",
      cell: (info) => <span>{parseFloat(info.getValue()).toFixed(2)}</span>,
    },
    {
      id: "measurement",
      accessorKey: "MEASUREMENT",
      header: "Measurement",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "TABLE_PER",
      accessorKey: "TABLE_PER",
      header: "Table %",
      cell: (info) => <span>{parseFloat(info.getValue()).toFixed(2)}</span>,
    },
    {
      id: "DEPTH_PER",
      accessorKey: "DEPTH_PER",
      header: "Depth %",
      cell: (info) => <span>{parseFloat(info.getValue()).toFixed(2)}</span>,
    },
    {
      id: "CUT",
      accessorKey: "CUT",
      header: "Cut",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "POLISH",
      accessorKey: "POLISH",
      header: "Pol",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "SYMM",
      accessorKey: "SYMM",
      header: "Symm",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "RATE",
      accessorKey: "RATE",
      header: "RAP",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      id: "certificate",
      accessorKey: "REPORT_NO",
      header: "Certificate",
      cell: (info) => <span>{info.getValue()}</span>,
    },
  ];
  useEffect(() => {
    dispatch(
      getCartDataApi({
        username: params.get("username") || localStorage.getItem("username") || "",
        isactive: 1,
        is_own_list:false
      })
    );
  }, [dispatch]);


  return (
    <>
      <div className="flex justify-between items-center m-5">
        <button
          onClick={() => back()}
          className="m-2 ml-5 text-xl border-0 bg-white flex items-center"
        >
          <MdKeyboardArrowLeft size={22} />
          Back
        </button>
        <div className="relative w-48 mr-6" ref={dropdownRef}>

          <button
            className="text-center font-serif rounded-3xl w-full h-8 px-3 border border-gray-300 mt-2"
            onClick={() => setOpenDropdown(!openDropdown)}
            aria-label="Toggle dropdown"
          >
            {selectedOption ? selectedOption : "Action"}
          </button>
          {openDropdown && (
            <ul className="absolute bg-white border border-gray-300 rounded-lg w-full mt-1 shadow-lg z-10">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("buy")}
              >
                Buy
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("holdStone")}
              >
                Hold Stone
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick("unhold")}
              >
                Unhold
              </li>
            </ul>
          )}

          <div className="mt-1">
            {selectedOption === "holdStone" && (
              <HoldStone rows={rows} openModal={openModal} customClass="hidden" />
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 mx-6">
        <DynamicAdminTable
          columns={column}
          data={data?.Table || []}
          width={"w-[1800px]"}
          rowSelection={rowSelection}
          selectedRow={(val) =>{ setRow(val)}}
          setRowSelection={setRowSelection}
        />
      </div>
    </>
  );
}

export default ClientCartList
