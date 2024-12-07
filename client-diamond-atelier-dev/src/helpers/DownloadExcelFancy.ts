import * as XLSX from 'xlsx';

type Data = {
    field:string,
    headerName:string,
    width:number
}

const columns:Data[] = [
    {
        field: "PACKET_NO",
        headerName: "STOCK ID",
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
        field: "PREFIX",
        headerName: "Grown",
        width: 90,
      },
      {
        field: "SHAPE",
        headerName: "Shape",
        width: 90,
      }, 
];

const downloadExcel = (data:any) => {
  const pathname = window.location.pathname.replace(/\//g, '_').slice(1) || "download";
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  const date = new Date().toISOString().slice(0, 10);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download =  `${pathname}_${date}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadExcel;
