import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SlCalculator } from "react-icons/sl";
import toast from "react-hot-toast";
import ResultBtn from "../common/ResultBtn";
import { Row } from "@tanstack/react-table";


type Fields = {
  id:number;
  PACKET_NO: string;
  STOCK: string;
  PREFIX: string;
  SHAPE: string;
  WGT: number;
  TOT_WGT: number;
  LENGTH: number;
  WIDTH: number;
  COLOR: string;
  LAB: string;
  SALERATE: number;
  VALUE: number;
  RATIO: number;
  MM_N: string;
  DEPTH: number;
  CUT: string;
  LOCATION: string;
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
    <div>
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
                "$/Carat",
                "Length",
                "Width",
                "Grown",
                "MM_N",
                'P/CT',
                'Total Amount'
              ].map((label) => (
                <div className="font-bold my-1" key={label}>
                  {label}
                </div>
              ))}
            </div>
            {rows?.map((items: { original: Fields }) => (
              <div key={items.original.PACKET_NO ?? '-'}>
                <div className="my-1">{items.original.PACKET_NO ?? '-'}</div>
                <div className="my-1">{items.original.SHAPE ?? '-'}</div>
                <div className="my-1 text-red-600">{items.original.TOT_WGT ?? '-'}</div>
                {/* <div className="my-1">{items.original.DEPTH}</div> */}
                <div className="my-1">{items.original.LENGTH ?? '-'}</div>
                <div className="my-1">{items.original.WIDTH ?? '-'}</div>
                <div className="my-1">{items.original.PREFIX ?? '-'}</div>
                <div className="my-1">{items.original.MM_N ?? '-'}</div>
                <div className="my-1">{items.original.SALERATE ?? '-'}</div>
                <div className="my-1">{items.original.VALUE ?? '-'}</div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
