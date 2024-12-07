"use client";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { FaRegEye, FaShoppingBag } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ResultBtn from "@/components/common/ResultBtn";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { RootState } from "@/redux/combineReducer";
import {Row, RowSelectionState } from "@tanstack/react-table";
import { certifiedStoneApi, resetState } from "@/redux/certifiedStone/getAllStone";
import ComapreStock from "@/components/ResultCertified/ComapreStock";
import SendWhatsapp from "@/components/ResultCertified/SendWhatsapp";
import ShowCalculation from "@/components/ResultCertified/ShowCalculation";
import DownloadStock from "@/components/ResultCertified/DownloadStock";
import dynamic from "next/dynamic";
import SendEmail from "@/components/ResultCertified/SendEmail";
import CertifiedCart from "@/components/ResultCertified/CertifiedCart";
import DynamicResultTable from "@/components/common/DynamicResultTable";
import HoldStone from "@/components/ResultCertified/HoldStone";
import { Column } from "@/components/Columns/Common-Columns";
import { GrResume } from "react-icons/gr";
import MakeToOrder from "@/components/common/MakeToOrder";

const PrintSelectedRow = dynamic(
  () => import("@/components/ResultCertified/PrintStock"),
  { ssr: false }
);

type ColumnType = {
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

function PageComponent() {
  const { data, isLoading } = useAppSelector(
    (store: RootState) => store?.getAllStoneReducer
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [resultCount, setResultCount] = useState<number>(0);
  const [rows, setRow] = useState<Row<ColumnType>[]>([]);
  const { replace, back, push } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const [hasLoad, setHasLoadMore] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [TableData, setTableData] = useState(null)
   
  const handleAvailability = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
  
    const params = new URLSearchParams(window.location.search);
    params.set("availability", isChecked.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  
    const availableStock = isChecked
      ? data.data.Table.filter((item: any) => item.STONE_STAGE === "Stock")
      : data.data.Table;
  
    setTableData(availableStock);
  };

  useEffect(() => {
    let filters = JSON.parse(localStorage.getItem("filters") || `{}`);
    if (!data?.data?.Table?.length && hasLoad !== false) {
      dispatch(
        certifiedStoneApi({
          ...filters,
          PAGENO: 1,
          partyrole: localStorage.getItem("userType") || "",
        })
      )
        .then((res) => res)
        .then((res: any) => {
          if (res?.payload?.data?.Table.length == 0) {
            setHasLoadMore(false);
          }
        });
    }
  }, [dispatch, data]);

  useEffect(()=>{
    const params = new URLSearchParams();
    params.set("availability", searchParams.get("availability")|| "false");
    replace(`${pathname}?${params.toString()}`, { scroll: false });
    if(data){
      const Stock = searchParams.get("availability") == "true" ? data?.data?.Table.filter((item:any) =>{
        if(item.STONE_STAGE == "Stock"){
         return item
        }
      }) : data?.data?.Table  ;
      setTableData(Stock)
    }
  },[data])

  const selectedRowCount = Object.keys(rowSelection).length;

  return (
    <div>
      <div className="flex font-serif h-screen flex-col ">
        <section className="flex flex-1 bg-white">
          <div className="relative flex flex-1 flex-col overflow-hidden">
            <main className="flex-1 py-2 lg:px-4 px-0.5">
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 w-[98%] mx-auto gap-2 p-1">
                  <div className="flex flex-col">
                    <label className="inline-flex items-center cursor-pointer w-fit">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        onChange={handleAvailability}
                        checked={searchParams.get("availability") == "true" ? true : false}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-bold text-gray-900 dark:text-gray-300 font-serif">
                        Show Available Stone
                      </span>
                    </label>
                  </div>
                  <div className="text-center flex justify-center gap-5 items-center">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-serif rounded-full font-bold text-sm px-7 py-1 text-center me-2"
                      onClick={() => back()}
                    >
                      Edit Search
                    </button>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-serif rounded-full font-bold text-sm px-7 py-1 text-center me-2"
                      onClick={() => replace("/color-stone?")}
                    >
                      New Search
                    </button>
                  </div>
                  <span className="font-bold text-sm text-end font-serif">
                    Showing results 1 - {resultCount || 0}/{data?.data?.Table1[0]?.TBL_RECD}
                  </span>
                </div>
                <span className="flex justify-end items-center gap-5">
                <button type="submit" onClick={handleOpen} className="rounded-full text-sm px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white font-bold mb-3">Make to Order</button>
                <MakeToOrder open={open} handleClose={handleClose} />
                  <div className="text-sm font-bold text-black mb-3 mr-5 flex justify-end font-serif">
                    Selected Rows: {selectedRowCount}/{resultCount}
                  </div>
                </span>

                <div className="grid lg:grid-cols-10 gap-1 md:grid-cols-5 grid-cols-2 w-[98%] mx-auto">
                <ResultBtn icon={ <FaShoppingBag className="mx-auto" />} title="Buy"  />
                <HoldStone rows={rows}/>
                {/* <UnHoldStone /> */}
                  <ResultBtn
                    icon={ <GrResume className="mx-auto" />}
                    title={"Unhold"}
                    onClick={() => {
                      push("/hold-stone");
                    }}
                  />
                  <CertifiedCart rows={rows} />
                  <ComapreStock rows={rows} />
                  <SendWhatsapp rows={rows} />
                  <ShowCalculation rows={rows} />
                  <DownloadStock rows={rows} />
                  <PrintSelectedRow rows={rows} />
                  <SendEmail rows={rows} />
                </div>
              </div>
              <div className="overflow-auto">
                <DynamicResultTable
                  selectedRow={(val: Row<ColumnType>[]) => setRow(val)}
                  resultCount={(val) => setResultCount(val)}
                  isLoading={isLoading}
                  column={Column()}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                  Tdata={TableData}
                  fetchData={certifiedStoneApi}
                  type="searchResult"
                />
              </div>
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}


const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
};

export default Page;
