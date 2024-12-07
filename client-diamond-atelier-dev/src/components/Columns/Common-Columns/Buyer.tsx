import { Tooltip } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { IoMdVideocam } from "react-icons/io";
import { RiVipDiamondFill } from "react-icons/ri";

type Fields = {
  STOCK?:string;
  PACKET_NO?: string;
  DESCRIPTION?:string;
  STONE_STAGE?: string;
  PREFIX?: string;
  SIZE_N?:string;
  SHAPE?: string;
  TOT_WGT?:string;
  WGT?: number;
  COLOR?: string;
  PURITY?: string;
  LENGTH?: number;
  WIDTH?: number;
  Width1?:number;
  HEIGHT?:number;
  VIDEO_PATH?: string;
  LAB?: string;
  CERT_LINK?:string;
  RATE?: number;
  DISC_PER?: number;
  NET_RATE?: number;
  NET_VALUE?: number;
  RATIO?: number;
  MEASUREMENT?: string;
  TABLE_PER?: number;
  DEPTH_PER?: number;
  CUT?: string;
  POLISH?: string;
  SYMM?: string;
  REPORT_NO?: string;
  Location?: string;
  MM_N?: string;
  SrNo?:number;
  No_of_stock_per_carat?: number;
    no_of_piece?: string;
    wholesale_price?: string;
    medium_price?:string;
    retail_price?:string;
    Approx_Amount?:string;
    approx_weight?:string;
    OIC?:string;
    piece_per_carat?:string;
    P_Ct?: string;
    CARAT?:string;
    CENT?:string;
    MEDIUM_RATE?:string;
    RETAIL_RATE?:string;
    MEDIUM_VALUE?:string;
    RETAIL_VALUE?:string;
};

export const buyerColumn:  ColumnDef<Fields, any>[] = [
  {
    id: "checkbox",
    size:50,
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
    id: "STONE_STAGE",
    accessorKey: "STONE_STAGE",
    header: "Status",
    size: 80,
    cell: (info) => {
      const value = info.getValue();
      let content = null;
      const handleClick = (e:any) => {
        e.stopPropagation(); 
      };
      switch (value) {
        case "Stock":
          content = (
            <div className="grid grid-cols-4 w-full" onClick={handleClick}>
              <div className="col-span-1 flex justify-center items-center">
                <RiVipDiamondFill size={"11px"} className="text-green-500" />
              </div>
              <div className="col-span-3">
                <span className="text-black">{value}</span>
              </div>  
            </div>
          );
          break;
        case "Memo":
          content = (
            <div className="grid grid-cols-4 flex items-center justify-center" onClick={handleClick}>
              <div className="col-span-1 flex justify-center items-center">
                <RiVipDiamondFill size={"11px"} className="text-red-500" />
              </div>
              <div
                className="col-span-3 relative group"
              >
                <span className="text-black">{value}</span>
              </div>
            </div>
          );
          break;
          case "Hold":
          content = (
            <div className="grid grid-cols-4 flex items-center justify-center" onClick={handleClick}>
              <div className="col-span-1 flex justify-center items-center">
                <RiVipDiamondFill size={"11px"} className="text-yellow-500" />
              </div>
              <div
                className="col-span-3 relative group"
              >
                <Tooltip title="This Stone is on temporary hold. For more details, please contact the salesperson." placement="bottom" arrow>
                  <span className="text-black">{value}</span>
                </Tooltip>
              </div>
            </div>
          );
          break;
        default:
          content = (
            <div className="grid grid-cols-4 flex items-center justify-center" onClick={handleClick}>
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
    id:"SrNo",
    accessorKey: "SrNo",
    header: "Sr.No.",
    size:60,
    cell:(info) => <span>{info.row.index + 1}</span>
  },
  {
    id:"PACKET_NO",
    size:80,
    accessorKey: "PACKET_NO",
    header: "STOCK ID",
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"PREFIX",
    accessorKey: "PREFIX",
    header: "Grown",
    size:60,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"SHAPE",
    accessorKey: "SHAPE",
    header: "Shape",
    size:60,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"WGT",
    accessorKey: "WGT",
    header: "Ct Weight",
    size:80,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id:"COLOR",
    accessorKey: "COLOR",
    header: "Color",
    size:80,
    cell: (info) => <span className="text-nowrap">{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"PURITY",
    accessorKey: "PURITY",
    header: "Clarity",
    size:80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id: "ICOLOR",
    accessorKey: "ICOLOR",
    header: "Color Intensity",
    size: 80,
    cell: (info) => <span className="text-nowrap">{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"NET_RATE",
    accessorKey: "NET_RATE",
    header: "P/Ct",
    size:120,
    cell: (info) => <span>{`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "NA"}`}</span>,
  },
  {
    id:"NET_VALUE",
    accessorKey: "NET_VALUE",
    header: "Total Value",
    size:100,
    cell: (info) => <span>{`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id:"DEPTH_PER",
    accessorKey: "DEPTH_PER",
    header: "Depth %",
    size:80,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id:"TABLE_PER",
    accessorKey: "TABLE_PER",
    header: "Table %",
    size:80,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id:"MEASUREMENT",
    accessorKey: "MEASUREMENT",
    header: "Measurement",
    size:100,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"RATIO",
    accessorKey: "RATIO",
    header: "Ratio",
    size:80,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id:"CUT",
    accessorKey: "CUT",
    header: "Cut",
    size:60,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"POLISH",
    accessorKey: "POLISH",
    header: "Polish",
    size:80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"SYMM",
    accessorKey: "SYMM",
    header: "Symm",
    size:80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id: "LAB",
    accessorKey: "LAB",
    header: "Lab",
    size: 80,
    cell: (info) =>  {
      const labValue = info.getValue();
      const certiLink = info.row.original.CERT_LINK; 
      return (
        <span
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {certiLink ? (
            <Link target="_blank" href={certiLink} onClick={(e) => e.stopPropagation()}>
              {labValue || "-"}
            </Link>
          ) : (
            <span>{labValue || "-"}</span>
          )}
        </span>
      );
    },
  },
  {
    id: "RATE",
    accessorKey: "RATE",
    header: "Rap",
    size:110,
    cell: (info) => <span>{`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}</span>,
  },
  {
    id: "DISC_PER",
    accessorKey: "DISC_PER",
    header: "Disc %",
    size:90,
    cell: (info) => <span>{`${info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}%` : "-"}`}</span>,
  },
  {
    id:"REPORT_NO",
    accessorKey: "REPORT_NO",
    header: "Certificate",
    size:100,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id:"LOCATION",
    accessorKey: "LOCATION",
    header: "Location",
    size:80,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
  },
  {
    id: "VIDEO_PATH",
    accessorKey: "VIDEO_PATH",
    header: "Video",
    size:80,
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
  
];
  

