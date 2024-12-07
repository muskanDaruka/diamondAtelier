"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import ResultBtn from "../common/ResultBtn";
import { CiBoxList } from "react-icons/ci";
import {
  MemoDetailsApi,
  resetState,
} from "@/redux/FancyLayouts/memoDetailsReducer";
import moment from 'moment';
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { usePathname, useSearchParams } from "next/navigation";
import { RootState } from "@/redux/combineReducer";
import CustomPagination from "../common/CustomPagination";

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
  id: number;
  PACKET_NO: string;
  STOCK: string;
  TOT_WGT: number;
  LENGTH: number;
  WIDTH: number;
  PREFIX: string;
  RATIO: number;
  DEPTH: number;
  COLOR: string;
  SHAPE: string;
  Location: string;
  MM_N: string;
  No_of_stock_per_carat: number;
  no_of_piece: string;
  ROW_NO: number;
};

type RowData = {
  rows: Fields;
};

type Column = {
  field: string;
  headerName: string;
  width: number;
  valueGetter?:(value:any, row:any)=>void
};

let columns: Column[] = [
  {
    field: "MEMO_INVOICE_DATE",
    headerName: "Date",
    width: 120,
    valueGetter: (value:any, row:any) => {
      return moment(value).format('MM-DD-YYYY');
    },
  },
  {
    field: "MEMO_INVOICE_NO",
    headerName: "Memo No",
    width: 130,
  },
  {
    field: "PACKET_NO",
    headerName: "Stock ID",
    width: 120,
  },
  {
    field: "MEMO_PARTY_NAME",
    headerName: "Party Name",
    width: 300,
  },
  {
    field: "SHAPE",
    headerName: "Shape",
    width: 120,
  },
  {
    field: "MM_N",
    headerName: "MM",
    width: 120,
  },
  {
    field: "MEMO_WGT",
    headerName: "Carats",
    width: 120,
  },
  {
    field: "MEMO_SELLER_NAME",
    headerName: "Seller Name",
    width: 120
  }
];

const item: { icon: React.ReactNode; title: string } = {
  icon: <CiBoxList className="mx-auto" />,
  title: "",
};

const PAGE_SIZE = 30;

function MemoDetails({ rows }: RowData) {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 1,
  });
  const { data, isLoading } = useAppSelector(
    (state: RootState) => state.MemoDetailsReducer
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handlePageChange = (event:any,value:number) =>{
    setPaginationModel({...paginationModel,page:value})
    let commenT_TYPE;
    if (pathname === "/fancyResult") {
      commenT_TYPE = "FANCY LAYOUT";
    } else if (pathname === '/meleeResult') {
      commenT_TYPE = "MELEE + POINTER";
    } else {
      commenT_TYPE = 'COLOR STONE'
    }
    dispatch(
        MemoDetailsApi({
          commenT_TYPE: commenT_TYPE,
          pageno: value,
          length: Number(rows.LENGTH),
          width: Number(rows.WIDTH),
          shape: rows.SHAPE,
          grown: rows.PREFIX,
        })
      );
  }

  React.useEffect(() => {
    if (open) {
      let commenT_TYPE;
      if (pathname === "/fancyResult") {
        commenT_TYPE = "FANCY LAYOUT";
      } else if(pathname === '/meleeResult'){
        commenT_TYPE = "MELEE + POINTER";
      } else {
        commenT_TYPE = 'COLOR STONE'
      }
      dispatch(
        MemoDetailsApi({
          commenT_TYPE: commenT_TYPE,
          pageno: 1,
          length: Number(rows.LENGTH),
          width: Number(rows.WIDTH),
          shape: rows.SHAPE,
          grown: rows.PREFIX,
        })
      );
    }

    return () => {
      dispatch(resetState());
    };
  }, [open]);

  return (
    <div>
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
            Memo Details
          </Typography>
          <hr />
          <DataGrid
            getRowId={(row: Fields) => row?.id}
            columns={columns}
            rows={
              data?.Table?.map((item: Fields, index: number) => ({
                ...item,
                id: index,
              })) || []
            }
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[PAGE_SIZE]}
            slotProps={{
              pagination: {
                page: paginationModel.page,
                count: 5,
                onChange: handlePageChange,
              },
            }}
            slots={{
              pagination: CustomPagination,
            }}
            {...data}
            loading={isLoading}
            rowHeight={30}
            className="overflow-y-auto h-[100px]"
            style={{
              overflow: "auto",
              height: "500px",
              borderRadius: "12px",
              fontFamily: "serif",
              font: "menu",
            }}
            columnHeaderHeight={35}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default MemoDetails;
