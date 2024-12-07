import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const tableData = [
  { id: "1", range: "0.01 - 0.17", point: "(5 PT-5 PT)", value: "0.01-0.17" },
  { id: "2", range: "0.18 - 0.28", point: "(10 PT-10 PT)", value: "0.18-0.28" },
  { id: "3", range: "0.29 - 0.38", point: "(15 PT-15 PT)", value: "0.29-0.38" },
  { id: "4", range: "0.39 - 0.48", point: "(20 PT-20 PT)", value: "0.39-0.48" },
  { id: "5", range: "0.49 - 0.58", point: "(25 PT-25 PT)", value: "0.49-0.58" },
  { id: "6", range: "0.59 - 0.68", point: "(30 PT-30 PT)", value: "0.59-0.68" },
  { id: "7", range: "0.69 - 0.77", point: "(35 PT-35 PT)", value: "0.69-0.77" },
  { id: "8", range: "0.78 - 0.88", point: "(40 PT-40 PT)", value: "0.78-0.88" },
  { id: "9", range: "0.99 - 1.18", point: "(45 PT-45 PT)", value: "0.99-1.18" },
  { id: "10", range: "1.19 - 1.37", point: "(50 PT-50 PT)", value: "1.19-1.37" },
  { id: "11", range: "1.38 - 1.47", point: "(60 PT-60 PT)", value: "1.38-1.47" },
  { id: "12", range: "1.48 - 1.77", point: "(70 PT-70 PT)", value: "1.48-1.77" },
  { id: "13", range: "1.58 - 1.77", point: "(75 PT-75 PT)", value: "1.58-1.77" },
  { id: "14", range: "1.78 - 1.96", point: "(80 PT-80 PT)", value: "1.78-1.96" },
  { id: "15", range: "1.78 - 1.96", point: "(90 PT-90 PT)", value: "1.78-1.96" },
  { id: "16", range: "1.97 - 2.39", point: "(1.00 CT-1.00 CT)", value: "1.97-2.39" },
  { id: "17", range: "2.40 - 2.95", point: "(1.25 CT-1.25 CT)", value: "2.40-2.95" },
  { id: "18", range: "2.96 - 3.95", point: "(1.50 CT-1.50 CT)", value: "2.96-3.95" },
  { id: "19", range: "3.96 - 4.95", point: "(2.00 CT-2.00 CT)", value: "3.96-4.95" },
  { id: "20", range: "4.96 - 5.95", value: "4.96-5.95" },
  { id: "21", range: "5.96 - 6.95", value: "5.96-6.95" },
  { id: "22", range: "6.96 - 8.00", value: "6.96-8.00" },
];

const HorizotalTable = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const { setValue, watch } = useFormContext();
  const {replace} = useRouter();
  const watchField =  watch();
  const handleRowClick = (index: number, row: any) => {
    if (selectedRow === index) {
      setSelectedRow(null);
      setValue("f_WGT", "");
      setValue("t_WGT", "");
    } else {
      setSelectedRow(index);
      setValue("f_WGT", row.value.split("-")[0].trim());
      setValue("t_WGT", row.value.split("-")[1].trim());
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border " style={{ borderColor: "#cfcfcf" }}>
        <thead>
          <tr>
            <th className="border p-1 font-serif" style={{ borderColor: "#cfcfcf" }} >Total Weight</th>
          </tr>
          <tr className="grid grid-cols-11 overflow-y-auto">
            {tableData.map((row, index) => {
              return <th
                key={index}
                className={`border text-xs px-1 py-1  ${(
                  watchField.f_WGT  == row.value.trim().split("-")[0] &&
                  watchField.t_WGT ==  row.value.trim().split("-")[1]
                )
                    ? "bg-[#2366c3] text-white font-extrabold font-serif"
                    : ""
                  }`}
                style={{ borderColor: "#cfcfcf" }}
                onClick={() => handleRowClick(index, row)}
              >
                <label
                  htmlFor={`row-${index}`}
                  className={`cursor-pointer block `}
                >
                  {row.range}<br />
                  {row.point}
                </label>
              </th>
            })}
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default HorizotalTable;
