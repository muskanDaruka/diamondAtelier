"use client";
import Table from "@/components/common/DynamicTable";
import MeleePointersFilter from "@/components/PageComponents/Melee-Pointers/MeleePointersFilters";
import { ValidationSchemaType, schema } from "@/schemas/melee-pointers/formData.types";
import { ColumnDef, Row, RowSelectionState } from "@tanstack/react-table";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useState, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DataFormateMelee from "@/helpers/ApiDataMelee";
import { resetState } from "@/redux/MeleePointers/meleePointersReducer";
import { useAppDispatch } from "@/redux/ReduxHook";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


type DataRow = {
  id?: string;
  checkbox?: boolean;
  mm?: string;
  category?: string;
  sieve?: string;
  cent?: string;
};

const PageComponent = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const router = useRouter();
  const pathname = usePathname();
  const [rows, setRow] = useState<Row<ColumnType>[]>([]);
  const dispatch = useAppDispatch();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const defaultValues: ValidationSchemaType = {
    commenT_TYPE: "MELEE + POINTER",
    pageno: Number(searchParams.get("pageno")) || 0,
    colgrp: searchParams.getAll("colgrp"),
    stock: searchParams.getAll("stock"),
    purgrp: searchParams.getAll("purgrp"),
    grown: searchParams.getAll("grown"),
    f_LENGTH: searchParams.get("f_LENGTH") || "",
    t_LENGTH: searchParams.get("t_LENGTH") || "",
    f_WIDTH: searchParams.get("f_WIDTH") || "",
    t_WIDTH: searchParams.get("t_WIDTH") || "",
    tableFilter: searchParams.getAll('tableFilter'),
  }
  type ColumnType = {
    category?: string;
    sieve?: string;
    mm?: string;
    cent?: string;
  };
  const methods: any = useForm<ValidationSchemaType>({ defaultValues, resolver: zodResolver(schema) });
  const watchField: any = methods.watch();

  const defaultData: DataRow[] = [
    {
      "id": "1",
      "category": "-2",
      "sieve": "000",
      "cent": "0.001",
      "mm": "0.60-0.64",
      "checkbox": false
    },
    {
      "id": "2",
      "category": "-2",
      "sieve": "000",
      "cent": "0.001",
      "mm": "0.65-0.69",
      "checkbox": false
    },
    {
      "id": "3",
      "category": "-2",
      "sieve": "000",
      "cent": "0.002",
      "mm": "0.70-0.74",
      "checkbox": false
    },
    {
      "id": "4",
      "category": "-2",
      "sieve": "000",
      "cent": "0.002",
      "mm": "0.75-0.79",
      "checkbox": false
    },
    {
      "id": "5",
      "category": "-2",
      "sieve": "000",
      "cent": "0.003",
      "mm": "0.80-0.84",
      "checkbox": false
    },
    {
      "id": "6",
      "category": "-2",
      "sieve": "000",
      "cent": "0.003",
      "mm": "0.85-0.89",
      "checkbox": false
    },
    {
      "id": "7",
      "category": "-2",
      "sieve": "000 - 00",
      "cent": "0.005",
      "mm": "0.90-0.99",
      "checkbox": false
    },
    {
      "id": "8",
      "category": "-2",
      "sieve": "00  - 0",
      "cent": "0.005",
      "mm": "1.00-1.09",
      "checkbox": false
    },
    {
      "id": "9",
      "category": "-2",
      "sieve": "+0 - 1.0",
      "cent": "0.007",
      "mm": "1.10-1.14",
      "checkbox": false
    },
    {
      "id": "10",
      "category": "-2",
      "sieve": "+1.0 - 1.5",
      "cent": "0.007",
      "mm": "1.15-1.19",
      "checkbox": false
    },
    {
      "id": "11",
      "category": "-2",
      "sieve": "+1.5 - 2.0",
      "cent": "0.008",
      "mm": "1.20-1.24",
      "checkbox": false
    },
    {
      "id": "12",
      "category": "star",
      "sieve": "+2.0 - 2.5",
      "cent": "0.009",
      "mm": "1.25-1.29",
      "checkbox": false
    },
    {
      "id": "13",
      "category": "star",
      "sieve": "+2.5-3.0",
      "cent": "0.010",
      "mm": "1.30-1.34",
      "checkbox": false
    },
    {
      "id": "14",
      "category": "star",
      "sieve": "+3.0 - 3.5",
      "cent": "0.011",
      "mm": "1.35-1.39",
      "checkbox": false
    },
    {
      "id": "15",
      "category": "star",
      "sieve": "+3.5 - 4.0",
      "cent": "0.013",
      "mm": "1.40-1.44",
      "checkbox": false
    },
    {
      "id": "16",
      "category": "star",
      "sieve": "+4.0 - 4.5",
      "cent": "0.013",
      "mm": "1.45.1.49",
      "checkbox": false
    },
    {
      "id": "17",
      "category": "star",
      "sieve": "+4.5 - 5.0",
      "cent": "0.015",
      "mm": "1.50-1.54",
      "checkbox": false
    },
    {
      "id": "18",
      "category": "star",
      "sieve": "+5.0 - 5.5",
      "cent": "0.016",
      "mm": "1.55-1.59",
      "checkbox": false
    },
    {
      "id": "19",
      "category": "star",
      "sieve": "+5.5 - 6.0",
      "cent": "0.018",
      "mm": "1.60-1.69",
      "checkbox": false
    },
    {
      "id": "20",
      "category": "star",
      "sieve": "+6.0 -  6.5",
      "cent": "0.020",
      "mm": "1.70-1.79",
      "checkbox": false
    },
    {
      "id": "21",
      "category": "melee",
      "sieve": "+6.5 - 7.0",
      "cent": "0.025",
      "mm": "1.80-1.89",
      "checkbox": false
    },
    {
      "id": "22",
      "category": "melee",
      "sieve": "+7.0 - 7.5",
      "cent": "0.030",
      "mm": "1.90-1.99",
      "checkbox": false
    },
    {
      "id": "23",
      "category": "melee",
      "sieve": "+7.5 - 8.0",
      "cent": "0.035",
      "mm": "2.00-2.09",
      "checkbox": false
    },
    {
      "id": "24",
      "category": "melee",
      "sieve": "+8.0 - 8.5",
      "cent": "0.040",
      "mm": "2.10-2.19",
      "checkbox": false
    },
    {
      "id": "25",
      "category": "melee",
      "sieve": "+8.5 - 9.0",
      "cent": "0.045",
      "mm": "2.20-2.29",
      "checkbox": false
    },
    {
      "id": "26",
      "category": "melee",
      "sieve": "+9.o - 9.5",
      "cent": "0.050",
      "mm": "2.30-2.39",
      "checkbox": false
    },
    {
      "id": "27",
      "category": "melee",
      "sieve": "+9.5 - 10.0",
      "cent": "0.055",
      "mm": "2.40-2.49",
      "checkbox": false
    },
    {
      "id": "28",
      "category": "melee",
      "sieve": "+10.0 - 10.5",
      "cent": "0.060",
      "mm": "2.50-2.59",
      "checkbox": false
    },
    {
      "id": "29",
      "category": "melee",
      "sieve": "+10.5 - 11.0",
      "cent": "0.070",
      "mm": "2.60-2.69",
      "checkbox": false
    },
    {
      "id": "30",
      "category": "eleven",
      "sieve": "+11.0 -11.5",
      "cent": "0.080",
      "mm": "2.70-2.79",
      "checkbox": false
    },
    {
      "id": "31",
      "category": "eleven",
      "sieve": "+11.5 -12.0",
      "cent": "0.090",
      "mm": "2.80-2.89",
      "checkbox": false
    },
    {
      "id": "32",
      "category": "eleven",
      "sieve": "+12.0 -12.5",
      "cent": "0.100",
      "mm": "2.90-2.99",
      "checkbox": false
    },
    {
      "id": "33",
      "category": "eleven",
      "sieve": "+12.5 -13.0",
      "cent": "0.110",
      "mm": "3.00-3.09",
      "checkbox": false
    },
    {
      "id": "34",
      "category": "eleven",
      "sieve": "+13.0 -13.5",
      "cent": "0.120",
      "mm": "3.10-3.19",
      "checkbox": false
    },
    {
      "id": "35",
      "category": "eleven",
      "sieve": "+13.5 -14.0",
      "cent": "0.130",
      "mm": "3.20-3.29",
      "checkbox": false
    },
    {
      "id": "36",
      "category": "fourteen",
      "sieve": "+14.0 -14.5",
      "cent": "0.140",
      "mm": "3.30-3.39",
      "checkbox": false
    },
    {
      "id": "37",
      "category": "fourteen",
      "sieve": "+14.5 -15.0",
      "cent": "0.150",
      "mm": "3.40-3.49",
      "checkbox": false
    },
    {
      "id": "38",
      "category": "fourteen",
      "sieve": "+15.0 -15.5",
      "cent": "0.160",
      "mm": "3.50-3.59",
      "checkbox": false
    },
    {
      "id": "39",
      "category": "fourteen",
      "sieve": "+15.5 -16.0",
      "cent": "0.170",
      "mm": "3.60-3.69",
      "checkbox": false
    },
    {
      "id": "40",
      "category": "twenties",
      "sieve": "1/5",
      "cent": "0.18-0.20",
      "mm": "3.70-3.79",
      "checkbox": false
    },
    {
      "id": "41",
      "category": "twenties",
      "sieve": "1/5",
      "cent": "0.19-0.22",
      "mm": "3.80-3.89",
      "checkbox": false
    },
    {
      "id": "42",
      "category": "twenties",
      "sieve": "1/5",
      "cent": "0.21-0.24",
      "mm": "3.90-3.99",
      "checkbox": false
    },
    {
      "id": "43",
      "category": "quarter",
      "sieve": "1/4",
      "cent": "0.23-0.27",
      "mm": "4.00-4.09",
      "checkbox": false
    },
    {
      "id": "44",
      "category": "quarter",
      "sieve": "1/4",
      "cent": "0.25-0.29",
      "mm": "4.10-4.19",
      "checkbox": false
    },
    {
      "id": "45",
      "category": "thirds",
      "sieve": "1/3",
      "cent": "0.29-0.32",
      "mm": "4.20-4.29",
      "checkbox": false
    },
    {
      "id": "46",
      "category": "thirds",
      "sieve": "1/3",
      "cent": "0.30-0.33",
      "mm": "4.30-4.39",
      "checkbox": false
    },
    {
      "id": "47",
      "category": "thirds",
      "sieve": "1/3",
      "cent": "0.33-0.36",
      "mm": "4.40-4.49",
      "checkbox": false
    },
    {
      "id": "48",
      "category": "thirds",
      "sieve": "1/3",
      "cent": "0.35-0.38",
      "mm": "4.50-4.59",
      "checkbox": false
    },
    {
      "id": "49",
      "category": "thirds",
      "sieve": "1/3",
      "cent": "0.36-0.40",
      "mm": "4.60-4.69",
      "checkbox": false
    },
    {
      "id": "50",
      "category": "fourties",
      "sieve": "3/8",
      "cent": "0.39-0.43",
      "mm": "4.70-4.79",
      "checkbox": false
    },
    {
      "id": "51",
      "category": "fourties",
      "sieve": "3/8",
      "cent": "0.43-0.46",
      "mm": "4.80-4.89",
      "checkbox": false
    },
    {
      "id": "52",
      "category": "fourties",
      "sieve": "3/8",
      "cent": "0.44-0.49",
      "mm": "4.90-4.99",
      "checkbox": false
    }
  ];

  const [data, setData] = useState(() => defaultData);
  const [tableData, setTableData] = useState(data)
  const columns: ColumnDef<DataRow, any>[] = [
    {
      id: "checkbox",
      cell: ({ row }) => (
        <input
          type="checkbox"
          value={row.original.mm}
          {...methods.register('tableFilter')}
          className="form-checkbox w-4 h-4 "
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
      ),
      header: "Select",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "mm",
      header: "MM",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold " : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "sieve",
      header: "Sieve",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "cent",
      header: "Cent",
      cell: (info) => (
        <span
          className={
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
  ];

  const onSubmit = (data: any) => {
    DataFormateMelee(data);
    dispatch(resetState());
    localStorage.setItem("filters", JSON.stringify({}));
    if (rows.length) {
      let mm = rows.map((el:any) => el.mm.split("-")).reduce((acc, [l, w]) => {
        acc.l.push(l);
        acc.w.push(w);
        return acc;
      }, { l: [], w: [] });
      data.f_LENGTH = mm.l.join(",");
      data.t_LENGTH = mm.l.join(",");
      data.f_WIDTH = mm.w.join(",");
      data.t_WIDTH = mm.w.join(",");
    }
    localStorage.setItem("filters", JSON.stringify(data || {}));
    localStorage.removeItem("columnOrder");
    router.push("/meleeResult")
  }

  const updateQueryParameter = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(watchField)
      .filter(([key, value]: [string, any]) => !(value == 0 || value == ""))
      .forEach(([key, value]: [string, any]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => params.append(key, val));
        } else {
          params.set(key, value);
        }
      });

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [watchField, pathname, replace]);

  useEffect(() => {
    if (Array.isArray(watchField.mm) && watchField.mm.length > 0) {
      const filteredData = defaultData.filter((ele: any) =>
        watchField.mm.includes(ele.mm)
      );
      setTableData([...filteredData]);

    } else {
      setTableData([...defaultData]);
    }
  }, [watchField.mm]);

  useEffect(() => {
    updateQueryParameter();
  }, [watchField]);

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-4 m-3 mt-0">
            <Table
              data={tableData}
              selectedRow={(val: Row<ColumnType>[]) => setRow(val.map(({original}:any)=>original))}
              columns={columns}
              headerText="1 CARAT = 100 POINTERS OR 100 CENTS"
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              colorBlue={true}
            />
            <MeleePointersFilter />
          </div>
          <div className="flex justify-center items-center gap-5 mt-4 sticky bottom-0 w-auto bg-white p-2">
            <button
              className="bg-blue-700 font-bold text-sm text-white px-6 py-2 rounded-full"
              type="button"
              onClick={() => {
                window.location.href = pathname
              }}
            >
              Clear Search
            </button>
            <button
              className="bg-blue-700 font-bold text-sm text-white px-6 py-2 rounded-full"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};


const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
}
export default Page;
