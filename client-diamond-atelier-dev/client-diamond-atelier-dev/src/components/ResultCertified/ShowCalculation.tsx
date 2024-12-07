import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaRegEye } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import ResultBtn from "../common/ResultBtn";
import { Row } from "@tanstack/react-table";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  p: 4,
};

type Fields = {
  id:number;
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

type Column = {
  field: string,
  headerName: string,
  width: number
}

let columns: Column[] = [
  {
    field: "PACKET_NO",
    headerName: "Stock#",
    width: 90,
  },
  {
    field: "SHAPE",
    headerName: "Shape",
    width: 90,
  },
  {
    field: "COLOR",
    headerName: "Color",
    width: 90,
  },
  {
    field: "PURITY",
    headerName: "Clarity",
    width: 90,
  },
  {
    field: "CUT",
    headerName: "Cut",
    width: 90,
  },
  {
    field: "POLISH",
    headerName: "Pol",
    width: 90,
  },
  {
    field: "SYMM",
    headerName: "Sym",
    width: 90,
  },
  {
    field: "DISC_PER",
    headerName: "Disc %",
    width: 90,
  },
  {
    field: "DEPTH_PER",
    headerName: "Depth %",
    width: 90,
  },
  {
    field: "TABLE_PER",
    headerName: "Table %",
    width: 90,
  },
  {
    field: "RATE",
    headerName: "Rap.($)",
    width: 90,
  },
  {
    field: "WGT",
    headerName: "$/Carat",
    width: 90,
  },
  {
    field: "NET_VALUE",
    headerName: "Total $",
    width: 90,
  },
  {
    field: "LAB",
    headerName: "Lab",
    width: 90,
  },
]

const item: { icon: React.ReactNode, title: string } = { icon: <FaRegEye className="mx-auto" />, title: "Show calculation" }

function ShowCalculation({ rows }: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  if (open) {
    if (rows?.length > 5) {
      toast.error("Maximun 5 rows can be shown at once");
      setOpen(false);
    }
    if (!rows?.length) {
      toast.error("Select at least one row");
      setOpen(false);
    }
  }

  return (
    <div className="">
      <ResultBtn
        key={item.title}
        icon={item.icon}
        title={item.title}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Show Calculation
          </Typography>
          <hr />
          <DataGrid
            columns={columns}
            rows={rows.map(({original}:{original: Fields },index:number) => ({...original, id:index})) || []}
            pageSizeOptions={[rows?.length]}
            getRowId={(row: Fields) =>{return row?.id}}
            rowHeight={30}
            hideFooter={true}
            className="overflow-y-auto h-[100px]"
            style={{overflow:"auto",
                height:"200px",
                borderRadius:"12px",
                fontFamily:"serif",
                font:"menu",
            }}
            columnHeaderHeight={35}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default ShowCalculation;
