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
    STOCK: string;
    TOT_WGT: number;
    LENGTH: number;
    WIDTH: number;
    PREFIX: string;
    RATIO: number;
    SALERATE: number;
    DEPTH: number;
    COLOR: string;
    SHAPE: string;
    LOCATION: string;
    MM_N: string;
    No_of_stock_per_carat: number;
    no_of_piece: string;
};

type RowData = {
  rows:Row<Fields>[]
}

type Column = {
    field: string,
    headerName: string,
    width: number
}


let columns: Column[] = [
    {
        field: "PREFIX",
        headerName: "Grown",
        width: 90,
    },
    {
        field: "SHAPE",
        headerName: "Shape",
        width: 90,
    },
    {
        field: "TOT_WGT",
        headerName: "Weight",
        width: 90,
    },
    {
        field: "LENGTH",
        headerName: "Length",
        width: 90,
    },
    {
        field: "WIDTH",
        headerName: "Width",
        width: 90,
    }, 
    {
        field: 'SALERATE',
        headerName: 'P/CT',
        width: 90,
    }
]

const item: { icon: React.ReactNode, title: string } = { icon: <FaRegEye className="mx-auto" />, title: "Show calculation" }

function ShowCalculation({ rows }: RowData) {
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
                        Show Calculation
                    </Typography>
                    <hr />
                    <DataGrid
                        columns={columns}
                        rows={rows.map(({original}:{original: Fields },index:number) => ({...original, id:index})) || []}
                        pageSizeOptions={[rows?.length]}
                        getRowId={(row : Fields) =>row?.id}
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
