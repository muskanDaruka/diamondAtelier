import MemoDetails from "@/components/ResultFancyLayout/MemoDetails";
import StockDetails from "@/components/ResultFancyLayout/StockDetails";
import { ApproxPiece, SizeInCent } from "@/helpers/CalculationFancy";
import { ColumnDef, isRowSelected, SortingFn } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  WIDTH_1?: number;
  HEIGHT?: number;
  COLOR?: string;
  FANCY_COLOR?: string;
  INTENSITY?: string;
  TOT_WGT?: number;
  WGT?: number;
  PURITY?: string;
  VIDEO_PATH?: string;
  LAB?: string;
  RATE?: number;
  DISC_PER?: number;
  SIZE_N?: string;
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
  SrNo?: number;
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
  memo_dtl?: string;
};

const TableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    let AvailableStock = Number(ApproxPiece(row.original.SIZE_N)) * row.original.TOT_WGT;

    if (AvailableStock < Number(e.target.value) && column.id === "no_of_piece") {
      toast.error(`Available stock is ${AvailableStock}`);
      setValue("");
      table.options.meta?.updateData(row.index, column.id, "");
      return
    } 

    if (row.original.TOT_WGT < Number(newValue) && column.id === "OIC") {
      toast.error(`Available stock is ${row.original.TOT_WGT}`)
      setValue("");
      table.options.meta?.updateData(row.index, column.id, "");
      return
    } 

    setValue(newValue);
    table.options.meta?.updateData(row.index, column.id, newValue);
    if (newValue) {
      row.toggleSelected(true);
    } else {
      row.toggleSelected(false);
    }
  };

  return (<>
    <input
      className={`text-center text-[black]`}
      type="number"
      placeholder={column.id === "no_of_piece" ? "pcs" : "ct"}
      value={value}
      onChange={handleChange}
      disabled={row.original.TOT_WGT<=0 ||row.original.TOT_WGT==undefined }
      onBlur={onBlur}
    />
    </>
  );
};

export const buyerColumn: ColumnDef<Fields, any>[] = [
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
    id: "SrNo",
    accessorKey: "SrNo",
    header: "Sr.No.",
    size: 60,
    cell: (info) => <span>{info.row.index + 1}</span>,
  },
  // {
  //   id: "stock_dtl",
  //   accessorKey: "stock_dtl",
  //   header: "Stock Details",
  //   size: 80,
  //   cell: ({ row }: any) => <StockDetails rows={row.original} />,
  // },
  {
    id: "PREFIX",
    accessorKey: "PREFIX",
    header: "Grown",
    size: 80,
    cell: (info) => (
      <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>
    ),
  },
  {
    id: "SHAPE",
    accessorKey: "SHAPE",
    header: "Shape",
    size: 80,
    cell: (info) => (
      <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>
    ),
  },
  {
    id: "SIZE_N",
    accessorKey: "SIZE_N",
    header: "SIZE IN (CARAT)",
    size:100,
    cell: (info) => <span>{info.getValue() ? info.getValue() : "-"}</span>,
  },
  {
    id: "Size_CENT",
    accessorKey: "SIZE_N",
    header: "SIZE IN (CENT)",
    size:100,
    cell: (info) => (
      <span>{info.getValue() ? SizeInCent(info.getValue()) : "-"}</span>
    ),
  },
  {
    id: "COLOR",
    accessorKey: "COLOR",
    header: "Color",
    size: 80,
    cell: (info) => (
      <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>
    ),
  },
  {
    id: "FANCY_COLOR",
    accessorKey: "FANCY_COLOR",
    header: "Color",
    size: 80,
    cell: (info) => (
      <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>
    ),
  },
  {
    id: "INTENSITY",
    accessorKey: "INTENSITY",
    header: "Color-Intensity",
    cell: (info) => (
      <span className="text-nowrap">{`${
        info.getValue() ? `${info.getValue()}` : "-"
      }`}</span>
    ),
  },
  {
    id: "PURITY",
    accessorKey: "PURITY",
    header: "Clarity",
    size: 80,
    cell: (info) => (
      <span>{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>
    ),
  },
  {
    id: "LENGTH",
    accessorKey: "LENGTH",
    header: "Length",
    size:90,
    cell: (info) => (
      <span>{`${
        info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"
      }`}</span>
    ),
  },
  {
    id: "WIDTH",
    accessorKey: "WIDTH",
    header: "Width",
    size:90,
    cell: (info) => (
      <span>{`${
        info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"
      }`}</span>
    ),
  },
  {
    id: "MM_N",
    accessorKey: "MM_N",
    header: "Measurement",
    size: 120,
    cell: (info) => <span>{`${info.getValue() ? `${info.getValue().split("*").join("-")}` : "-"}`}</span>,
  },
  {
    id: "TOT_WGT",
    accessorKey: "TOT_WGT",
    header: "Goods in Stock",
    size: 100,
    cell: (info) => (
      <span>{`${
        info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"
      }`}</span>
    ),
  },
  // {
  //   id: "MEMO_WGT",
  //   accessorKey: "MEMO_WGT",
  //   header: "Goods in Memo",
  //   size: 100,
  //   cell: (info) => (
  //     <span>{`${
  //       info.getValue() ? `${parseFloat(info.getValue()).toFixed(2)}` : "-"
  //     }`}</span>
  //   ),
  // },
  {
    id: "SALERATE",
    accessorKey: "NET_RATE",
    header: "P/Ct",
    size: 120,
    cell: (info) => (
      <span>{`${
        info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"
      }`}</span>
    ),
  },
  {
    id: "LOCATION",
    accessorKey: "LOCATION",
    header: "Location",
    size: 120,
    cell: (info) => <span>{`${info.getValue() ? info.getValue() : "-"}`}</span>,
  },
  {
    id: "no_of_piece",
    header: "Number of Pieces",
    accessorKey: "no_of_piece",
    cell: TableCell,
  },
  {
    id: "OIC",
    accessorKey: "OIC",
    header: "Order In Ct",
    cell: TableCell,
  },
  {
    id: "piece_per_carat",
    accessorKey: "SIZE_N",
    size: 80,
    header: "Approx Pieces In (1 Ct)",
    cell: (info) => (
      <span>{`${info.getValue() ? ApproxPiece(info.getValue()) : "-"}`}</span>
    ),
  },
  {
    id: "approx_weight",
    header: "Approx Total Cts",
    accessorKey: "approx_weight",
    cell: (info) => <span>{info?.getValue() == undefined || isNaN(info?.getValue()) || info.getValue() == "" ? 0: info.getValue()}</span>
  },
  {
    id: "Approx_Amount",
    accessorKey: "Approx_Amount",
    header: "Approx Total Amt",
    cell: ({ row }: any) => (
      <span>
        $
        {((row.original.WGT || 300) /
          Number(ApproxPiece(row?.original?.SIZE_N))) *
          row.original.no_of_piece || 0}
      </span>
    ),
  },
];
