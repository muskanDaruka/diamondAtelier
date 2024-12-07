"use client"
import React, { useState, useEffect} from "react";
import { FaShoppingBag } from "react-icons/fa";
import { GrResume } from "react-icons/gr";
import { useRouter } from "next/navigation";
import ResultBtn from "@/components/common/ResultBtn";
import { RowSelectionState, Row } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { RootState } from "@/redux/combineReducer";
import SendWhatsapp from "@/components/ResultNonCertified/SendWhatsapp";
import dynamic from "next/dynamic";
import DownloadStock from "@/components/ResultNonCertified/DownloadStock";
import CompareStock from "@/components/ResultNonCertified/CompareStock";
import ShowCalculation from "@/components/ResultNonCertified/ShowCalculation";
import SendEmail from "@/components/ResultNonCertified/SendEmail";
import { nonCertifiedApi } from "@/redux/NonCertified/nonCertifiedReducer";
import AddToCart from "@/components/ResultNonCertified/AddToCart";
import DynamicResultTable from "@/components/common/DynamicResultTable";
import HoldStone from "@/components/ResultNonCertified/HoldStone";
import { Column } from "@/components/Columns/NonCerti-Columns";
import MakeToOrder from "@/components/common/MakeToOrder";


const PrintSelectedRow = dynamic(() => import('@/components/ResultNonCertified/PrintStock'), { ssr: false });

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

function Page() {
  const { data, filters, isLoading } = useAppSelector(
    (store: RootState) => store?.nonCertifiedReducer
  );
  const [hasLoad, setHasLoadMore] = useState<boolean>(true);
  const [rows, setRow] = useState<Row<Fields>[]>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [resultCount, setResultCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const { back, replace, push } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let filters = JSON.parse(localStorage.getItem("filters") || `{}`);
    if (!data?.data?.Table?.length && hasLoad !== false) {
      dispatch(nonCertifiedApi({ ...filters, PAGENO: 1 })).then((res) => res).then((res: any) => {
        if (res?.payload?.data?.Table.length == 0) {
          setHasLoadMore(false)
        }
      })
    }
  }, [dispatch, data]);

  const selectedRowCount = Object.keys(rowSelection).length;

  return (
    <div className="flex font-serif h-screen flex-col">
      <section className=" flex flex-1 bg-white">
        <div className="relative flex h-full flex-1 flex-col overflow-hidden">
          <main className="flex-1 py-2 lg:px-4 px-0.5 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 w-[98%] mx-auto gap-2 p-1">
              <div className="flex flex-col justify-center">
                <label className="inline-flex items-center cursor-pointer w-fit">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-bold text-gray-900 dark:text-gray-300 font-serif">
                    Show Available Stone
                  </span>
                </label>
              </div>
              <div className="text-center flex items-center justify-center gap-5 items-center font-serif">
                <button
                  type="button"
                  className="font-bold text-sm text-white bg-blue-700 hover:bg-blue-800 font-serif focus:ring-4 focus:ring-blue-300 rounded-full px-7 py-1 text-center me-2"
                  onClick={() => back()}
                >
                  Edit Search
                </button>
                <button
                  type="button"
                  className="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-serif focus:ring-blue-300 rounded-full text-sm px-7 py-1 text-center me-2"
                  onClick={() => replace("/non-certified?")}
                >
                  New Search
                </button>
              </div>
              <span className="font-bold text-sm text-right flex flex-col justify-center font-serif">
                Showing results 1 - {resultCount || 0}
              </span>
            </div>
            <span className="flex justify-end items-center gap-5">
              <button type="submit" onClick={handleOpen} className="rounded-full text-sm px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white font-bold mb-3">Make to Order</button>
              <MakeToOrder open={open} handleClose={handleClose} />
              <div className="text-sm font-bold text-black mb-3 mr-5 font-serif">
                Selected Rows: {selectedRowCount}/{resultCount}
              </div>
            </span>
            <div className="grid lg:grid-cols-10 gap-1 md:grid-cols-5 grid-cols-2 w-[98%] mx-auto">
              <ResultBtn icon={<FaShoppingBag className="mx-auto" />} title="Buy" />
              <HoldStone rows={rows} />
              <ResultBtn
                icon={<GrResume className="mx-auto" />}
                title={"Unhold"}
                onClick={() => {
                  push("/hold-stone");
                }}
              />
              <AddToCart rows={rows} />
              <SendWhatsapp rows={rows} />
              <ShowCalculation rows={rows} />
              <CompareStock rows={rows} />
              <DownloadStock rows={rows} />
              <PrintSelectedRow rows={rows} />
              <SendEmail rows={rows} />
            </div>
            <DynamicResultTable
              resultCount={(val) => setResultCount(val)}
              isLoading={isLoading}
              Twidth={"100%"}
              selectedRow={(val: Row<Fields>[]) => setRow(val)}
              column={Column()}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              Tdata={data?.data?.Table || []}
              fetchData={nonCertifiedApi}
              type="searchResult"
            />
          </main>
        </div>
      </section>
    </div>
  );
}

export default Page;
