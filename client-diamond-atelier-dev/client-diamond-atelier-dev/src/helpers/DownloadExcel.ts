import * as XLSX from 'xlsx';

type Data = {
    field:string,
    headerName:string,
    width:number
}

const columns:Data[] = [
  { field: "PACKET_NO", headerName: "STOCK ID", width: 90 },
  {
    field: "STONE_STAGE",
    headerName: "Status",
    width: 90,
  },
  {
    field: "PREFIX",
    headerName: "Grown",
    width:90 
  },
  {
    field: "SHAPE",
    headerName: "Shape",
    width: 90,
  },
  {
    field: "WGT",
    headerName: "Carat",
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
    field: "VIDEO_PATH",
    headerName: "Video",
    width: 90
  },
  {
    field: "LAB",
    headerName: "Lab",
    width: 90,
  },
  {
    field: "RATE",
    headerName: "Rap",
    width: 90,
  },
  {
    field: "DISC_PER",
    headerName: "Discount %",
    width: 90,
  },
  {
    field: "NET_RATE",
    headerName: "Per Carat Price",
    width: 150,
  },
  {
    field: "NET_VALUE",
    headerName: "Total Value",
    width: 100,
  },
  {
    field: "RATIO",
    headerName: "Ratio",
    width: 40,
  },
  {
    field: "MEASUREMENT",
    headerName: "Measurement",
    width: 130,
  },
  {
    field: "TABLE_PER",
    headerName: "Table %",
    width: 100,
  },
  {
    field: "DEPTH_PER",
    headerName: "Depth %",
    width: 80,
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
    field: "REPORT_NO",
    headerName: "Certificate",
    width: 120,
  },
  {
    field: "LOCATION",
    headerName: "Country",
    width: 100,
  },
];

const downloadExcel = (data:any) => {
  const pathname = window.location.pathname.replace(/\//g, '_').slice(1) || "download";
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  const link = document.createElement('a');
  const date = new Date().toISOString().slice(0, 10);
  link.href = URL.createObjectURL(blob);
  link.download =  `${pathname}_${date}.xlsx`;;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadExcel;
