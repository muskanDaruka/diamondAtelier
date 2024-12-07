import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SlCalculator } from "react-icons/sl";
import toast from "react-hot-toast";
import ResultBtn from "../common/ResultBtn";
import { Row } from "@tanstack/react-table";


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
  rows: Row<Fields>[]
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const item: { icon: React.ReactNode, title: string } = { icon: <SlCalculator className="mx-auto" />, title: "Compare stock" }


export default function CompareStock({ rows }: RowData) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  if (open) {
    if (rows?.length > 5) {
      toast.error("Maximun 5 rows comparision allowed at once");
      setOpen(false);
    }
    if (!rows?.length) {
      toast.error("Select at least one row");
      setOpen(false);
    }
  }



  return (
    <div >
      <ResultBtn
        key={item.title}
        onClick={handleOpen}
        icon={item.icon}
        title={item.title}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Compare Stocks
          </Typography>
          <hr />
          <div className="flex gap-4">
            <div>
              {[
                "Stock#",
                "Shape",
                "Cts",
                "Color",
                "Clarity",
                "Cut",
                "Pol",
                "Sym",
                "Disc %",
                "Depth%",
                "Table%",
                "Lab",
                "Grown",
                "Measurements",
                "P/CT($)",
                "Total $",
                "Rap.($)",
              ].map((label) => (
                <div className="font-bold my-1" key={label}>
                  {label}
                </div>
              ))}
            </div>
            {rows?.map((items: { original: Fields }) => (
              <div key={items.original.PACKET_NO}>
                <div className="my-1">{items.original.PACKET_NO ?? '-'}</div>
                <div className="my-1">{items.original.SHAPE ?? '-'}</div>
                <div className="my-1 text-red-600">{items.original.WGT ?? '-'}</div>
                <div className="my-1">{items.original.COLOR ?? '-'}</div>
                <div className="my-1">{items.original.PURITY ?? '-'}</div>
                <div className="my-1">{items.original.CUT ?? '-'}</div>    
                <div className="my-1">{items.original.POLISH ?? '-'}</div>
                <div className="my-1">{items.original.SYMM ?? '-'}</div>
                <div className="my-1">{items.original.DISC_PER ?? '-'}</div>
                <div className="my-1">{items.original.DEPTH_PER ?? '-'}</div>
                <div className="my-1">{items.original.TABLE_PER ?? '-'}</div> 
                <div className="my-1">{items.original.LAB ?? '-'}</div>
                <div className="my-1">{items.original.PREFIX ?? '-'}</div>
                <div className="my-1 w-36">{items.original.MEASUREMENT ?? '-'}</div>
                <div className="my-1 text-red-600">{items.original.NET_RATE ?? '-'}</div>
                <div className="my-1 text-red-600">{items.original.NET_VALUE ?? '-'}</div>
                <div className="my-1">{items.original.RATE ?? '-'}</div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}


export const RenderCol =  () =>{
  return <div>
  {[
    "Stock#",
    "Shape",
    "Cts",
    "Color",
    "Clarity",
    "Cut",
    "Pol",
    "Sym",
    "Disc %",
    "Depth%",
    "Table%",
    "Rap.($)",
    "$/Carat",
    "Total $",
    "Lab",
    "Grown",
    "Measurements",
  ].map((label) => (
    <div className="font-bold my-1" key={label}>
      {label}
    </div>
  ))}
</div>
}


export const RenderRow = () =>{
  return <>
  Hello
  </>
}