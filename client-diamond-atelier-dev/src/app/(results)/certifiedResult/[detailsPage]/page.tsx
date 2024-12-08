"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import error from "@/components/images/error/error.avif"
import HoldStone from "@/components/ResultCertified/HoldStone";
import UnHoldStone from "@/components/ResultCertified/UnHoldStone";
import { FaShoppingBag } from "react-icons/fa";

export const runtime = "edge";

function Page() {
  const { back } = useRouter();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("singleStoneDetail") || "");
    setData([{ original: data }]);
  }, [])

  return (
    <div className="flex font-serif h-screen flex-col">
      <section className="flex flex-col bg-white w-100 mt-6">
        <div className="w-100">
          <button
            onClick={() => back()}
            className="m-2 text-xl border-0 bg-white flex items-center font-serif"
          >
            <MdKeyboardArrowLeft size={22} />
            Back to Search Result
          </button>
          <div className="flex flex-col lg:flex-row m-1 w-100 lg:h-[70vh] items-center lg:items-stretch">
            <div className="lg:w-1/2">
              {data[0]?.original?.VIDEO_PATH ? (
                <iframe
                  className="w-full h-[400px] lg:h-full"
                  src={data[0]?.original?.VIDEO_PATH}
                  title="Video description"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              ) : (
                <Image
                  src={error}
                  className="w-auto lg:h-auto h-[400px] p-12"
                  alt="Placeholder Image"
                  width={300}
                  height={300}
                />
              )}
            </div>
            <div className="lg:w-1/2 flex flex-col items-center justify-center h-full w-full">
              <table className="table-auto w-3/4 mx-auto border border-black">
                <thead>
                  <tr className="border border-black">
                    <th className="text-center border border-black font-serif" colSpan={2}>
                      STOCK #: {data[0]?.original?.PACKET_NO}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-black">
                    <th className="text-center border border-black font-serif" scope="row">
                      Status
                    </th>
                    <td className="text-center border border-black">
                      {data[0]?.original?.STONE_STAGE}
                    </td>
                  </tr>
                  <tr className="border border-black">
                    <th className="text-center border border-black font-serif" scope="row">
                      P/ct
                    </th>
                    <td className="text-center border border-black">
                      {`$${data[0]?.original?.NET_RATE}`}
                    </td>
                  </tr>
                  <tr className="border border-black">
                    <th className="text-center border border-black font-serif" scope="row">
                      Total Price
                    </th>
                    <td className="text-center border border-black">
                    {`$${data[0]?.original?.NET_VALUE}`}
                    </td>
                  </tr>
                  <tr className="border border-black">
                    <th className="text-center border border-black font-serif" scope="row">
                      Discount
                    </th>
                    <td className="text-center border border-black">
                    {data[0]?.original?.COST_DISC_PER || "0%"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex w-3/4 mx-auto mt-3">
                <table className="table-auto w-1/2 mx-auto border border-black">
                  <tbody>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Lab
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.LAB}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Report No
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.REPORT_NO}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Shape
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.SHAPE}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Cts
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.WGT}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Color
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.COLOR}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Clarity
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.PURITY}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Cut | Pol | Sym
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.CUT} | {data[0]?.original?.POLISH} | {data[0]?.original?.SYMM}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table-auto w-1/2 mx-auto border border-black">
                  <tbody>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Disc %
                      </th>
                      <td className="p-0 text-center border border-black">
                      {`${data[0]?.original?.DISC_PER}%`}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Rap.($)
                      </th>
                      <td className="p-0 text-center border border-black">
                      {`$${data[0]?.original?.RATE}`}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Depth
                      </th>
                      <td className="p-0 text-center border border-black">
                        {`${data[0]?.original?.DEPTH_PER}%`}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Table
                      </th>
                      <td className="p-0 text-center border border-black">
                        {`${data[0]?.original?.TABLE_PER}%`}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Measurement
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.MEASUREMENT}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        RATIO
                      </th>
                      <td className="p-0 text-center border border-black">
                        {data[0]?.original?.RATIO}
                      </td>
                    </tr>
                    <tr className="border border-black">
                      <th
                        className="bg-blue-700 text-white text-xs p-0 text-center border border-black font-serif"
                        scope="row"
                      >
                        Grown
                      </th>
                      <td className="p-0 text-center border border-black border border-black">
                        {data[0]?.original?.PREFIX}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center items-center mt-5">
                <button type="button" className="m-1 border-0 rounded bg-blue-700 text-xs pt-1 font-bold text-white px-6 font-serif">
                  <FaShoppingBag className="mx-auto" />
                  Buy
                </button>
                <HoldStone customClass="m-1 border-0 rounded bg-blue-700 text-white px-6 font-serif" rows={data} />
                <UnHoldStone customClass="m-1 border-0 rounded bg-blue-700 text-white font-serif" />
              </div>
            </div>
          </div>
        </div>
      </section >
    </div>
  );
}

export default Page;
