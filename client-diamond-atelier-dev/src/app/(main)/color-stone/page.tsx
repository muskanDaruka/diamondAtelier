"use client";
import MleePointerCustomization from "@/components/PageComponents/Color-Stone/MleePointerCustomization";
import Table from "@/components/common/DynamicTable";
import { schema, ValidationSchemaType } from "@/schemas/color-stone/cs-meleePointer/formData.types";
import { ColumnDef, Row, RowSelectionState } from "@tanstack/react-table";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/ReduxHook";
import { zodResolver } from "@hookform/resolvers/zod";
import DataFormateCsMelee from "@/helpers/ApiDataCsMelee";
import { resetState } from "@/redux/color/cs-melee/getCsMeleeReducer";

type DataRow = {
  checkbox?: boolean;
  mm: string;
  carat: string;
  cent: string;
};
type ColumnType = {
  mm: string;
  carat: string;
  cent: string;
}
const PageComponent = () => {
  const searchParams = useSearchParams();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [rows, setRow] = useState<Row<ColumnType>[]>([]);
  const { replace } = useRouter();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const defaultValues: ValidationSchemaType = {
    commenT_TYPE: "COLOR STONE",
    pageno: Number(searchParams.get("pageno")) || 0,
    fancY_COLOR: searchParams.getAll("fancY_COLOR"),
    stock: searchParams.getAll("stock"),
    grown: '',
    purgrp: searchParams.getAll('purgrp'),
    intensity: searchParams.getAll('intensity'),
    f_LENGTH: Number(searchParams.get("f_LENGTH")) || '',
    t_LENGTH: Number(searchParams.get("t_LENGTH")) || '',
    f_WIDTH: Number(searchParams.get("f_WIDTH")) || '',
    t_WIDTH: Number(searchParams.get("t_WIDTH")) || '',
    location: searchParams.getAll('location'),
    tableFilter: searchParams.getAll('tableFilter'),
  }
  const methods: any = useForm<ValidationSchemaType>({ defaultValues, resolver: zodResolver(schema) });
  const watchField: any = methods.watch();

  const defaultData: DataRow[] = [
    {
      checkbox: false,
      mm: "0.60-0.64",
      carat: "0.001",
      cent: "0.10",
    },
    {
      checkbox: false,
      mm: "0.65-0.69",
      carat: "0.001",
      cent: "0.10",
    },
    {
      checkbox: false,
      mm: "0.70-0.74",
      carat: "0.002",
      cent: "0.20",
    },
    {
      checkbox: false,
      mm: "0.75-0.79",
      carat: "0.002",
      cent: "0.20",
    },
    {
      checkbox: false,
      mm: "0.80-0.84",
      carat: "0.003",
      cent: "0.30",
    },
    {
      checkbox: false,
      mm: "0.85-0.89",
      carat: "0.003",
      cent: "0.30",
    },
    {
      checkbox: false,
      mm: "0.90-0.99",
      carat: "0.005",
      cent: "0.45",
    },
    {
      checkbox: false,
      mm: "1.00-1.09",
      carat: "0.005",
      cent: "0.50",
    },
    {
      checkbox: false,
      mm: "1.10-1.14",
      carat: "0.007",
      cent: "0.65",
    },
    {
      checkbox: false,
      mm: "1.15 - 1.19",
      carat: "0.007",
      cent: "0.70",
    },
    {
      checkbox: false,
      mm: "1.20-1.24",
      carat: "0.008",
      cent: "0.80",
    },
    {
      checkbox: false,
      mm: "1.20-1.24",
      carat: "0.008",
      cent: "0.80",
    },
    {
      checkbox: false,
      mm: "1.25-1.29",
      carat: "0.009",
      cent: "0.90",
    },
    {
      checkbox: false,
      mm: "1.30-1.34",
      carat: "0.010",
      cent: "1.00",
    },
    {
      checkbox: false,
      mm: "1.30-1.49",
      carat: "0.010",
      cent: "1.00",
    },
    {
      checkbox: false,
      mm: "1.35-1.39",
      carat: "0.011",
      cent: "1.10",
    },
    {
      checkbox: false,
      mm: "1.40-1.44",
      carat: "0.013",
      cent: "1.25",
    },
    {
      checkbox: false,
      mm: "1.45-1.49",
      carat: "0.013",
      cent: "1.30",
    },
    {
      checkbox: false,
      mm: "1.50-1.54",
      carat: "0.015",
      cent: "1.50",
    },
    {
      checkbox: false,
      mm: "1.55-1.59",
      carat: "0.016",
      cent: "1.60",
    },
    {
      checkbox: false,
      mm: "1.60-1.69",
      carat: "0.018",
      cent: "1.75",
    },
    {
      checkbox: false,
      mm: "1.70-1.79",
      carat: "0.020",
      cent: "2.00",
    },
    {
      checkbox: false,
      mm: "1.80-1.89",
      carat: "0.025",
      cent: "2.50",
    },
    {
      checkbox: false,
      mm: "1.90-1.99",
      carat: "0.030",
      cent: "3.00",
    },
    {
      checkbox: false,
      mm: "2.00-2.09",
      carat: "0.035",
      cent: "3.50",
    },
    {
      checkbox: false,
      mm: "2.10-2.19",
      carat: "0.040",
      cent: "4.00",
    },
    {
      checkbox: false,
      mm: "2.20-2.29",
      carat: "0.045",
      cent: "4.50",
    },
    {
      checkbox: false,
      mm: "2.30-2.39",
      carat: "0.050",
      cent: "5.00",
    },
    {
      checkbox: false,
      mm: "2.40-2.49",
      carat: "0.055",
      cent: "5.50",
    },
    {
      checkbox: false,
      mm: "2.50-2.59",
      carat: "0.060",
      cent: "6.00",
    }, {
      checkbox: false,
      mm: "2.60-2.69",
      carat: "0.070",
      cent: "7.00",
    }, {
      checkbox: false,
      mm: "2.70-2.79",
      carat: "0.080",
      cent: "8.00",
    }, {
      checkbox: false,
      mm: "2.70-2.79",
      carat: "0.080",
      cent: "8.00",
    }, {
      checkbox: false,
      mm: "2.80-2.89",
      carat: "0.090",
      cent: "9.00",
    }, {
      checkbox: false,
      mm: "2.90-2.99",
      carat: "0.100",
      cent: "10.00",
    }, {
      checkbox: false,
      mm: "3.00-3.09",
      carat: "0.110",
      cent: "11.00",
    }, {
      checkbox: false,
      mm: "3.10-3.19",
      carat: "0.120",
      cent: "12.00",
    }, {
      checkbox: false,
      mm: "3.20-3.29",
      carat: "0.130",
      cent: "13.00",
    }, {
      checkbox: false,
      mm: "3.30-3.39",
      carat: "0.140",
      cent: "14.00",
    }, {
      checkbox: false,
      mm: "3.40-3.49",
      carat: "0.150",
      cent: "15.00",
    }, {
      checkbox: false,
      mm: "3.50-3.59",
      carat: "0.160",
      cent: "16.00",
    }, {
      checkbox: false,
      mm: "3.60-3.69",
      carat: "0.170",
      cent: "17.00",
    }, {
      checkbox: false,
      mm: "3.70-3.79",
      carat: "0.18-0.20",
      cent: "18.00",
    }, {
      checkbox: false,
      mm: "3.80-3.89",
      carat: "0.19-0.22",
      cent: "19.00",
    }, {
      checkbox: false,
      mm: "3.90-3.99",
      carat: "0.21-0.24",
      cent: "21.00",
    }, {
      checkbox: false,
      mm: "4.00-4.09",
      carat: "0.23-0.27",
      cent: "23.00",
    },
    {
      checkbox: false,
      mm: "4.10-4.19",
      carat: "0.25-0.29",
      cent: "25.00",
    },
    {
      checkbox: false,
      mm: "4.20-4.29",
      carat: "0.29-0.32",
      cent: "29.00",
    },
    {
      checkbox: false,
      mm: "4.30-4.39",
      carat: "0.30-0.33",
      cent: "30.00",
    },
    {
      checkbox: false,
      mm: "4.40-4.49",
      carat: "0.33-0.36",
      cent: "33.00",
    },
    {
      checkbox: false,
      mm: "4.50-4.59",
      carat: "0.35-0.38",
      cent: "35.00",
    },
    {
      checkbox: false,
      mm: "4.60-4.69",
      carat: "0.36-0.40",
      cent: "36.00",
    },
    {
      checkbox: false,
      mm: "4.70-4.79",
      carat: "0.39-0.43",
      cent: "39.00",
    },
    {
      checkbox: false,
      mm: "4.80-4.89",
      carat: "0.43-0.46",
      cent: "43.00",
    },
    {
      checkbox: false,
      mm: "4.90-4.99",
      carat: "0.44-0.49",
      cent: "44.00",
    },
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
      accessorKey: "mm",
      header: "MM",
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
      accessorKey: "carat",
      header: "Carat",
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
    DataFormateCsMelee(data)
    dispatch(resetState());
    let mm = rows.map((el:any) => el.mm.split("-")).reduce((acc, [l, w]) => {
      acc.l.push(l);
      acc.w.push(w);
      return acc;
    }, { l: [], w: [] });
    if (rows) {
      data.f_LENGTH = mm.l.join(",");
      data.t_LENGTH = mm.l.join(",");
      data.f_WIDTH = mm.w.join(",");
      data.t_WIDTH = mm.w.join(",");
    }
    localStorage.setItem("filters", JSON.stringify(data || {}));
    localStorage.removeItem("columnOrder");
    router.push("/color-result/cs-meleeResult")
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-4">
          <Table data={tableData} selectedRow={(val: Row<ColumnType>[]) => setRow(val.map(({original}:any)=>original))} columns={columns} rowSelection={rowSelection}
            setRowSelection={setRowSelection} headerText="" colorBlue={true} />
          <MleePointerCustomization />
        </div>
        <div className="flex justify-center items-center gap-5 sticky bottom-0 w-auto bg-white p-2">
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
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
};

export default Page;