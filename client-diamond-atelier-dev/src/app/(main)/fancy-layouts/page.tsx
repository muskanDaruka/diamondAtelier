"use client";
import Table from "@/components/common/DynamicTable";
import CustomizationFancyLayout from "@/components/Fancy-Layout/CustomizationFancyLayout";
import { ColumnDef, Row, RowSelectionState } from "@tanstack/react-table";
import { useState, useEffect, useCallback, Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  schema,
  ValidationSchemaType,
} from "@/schemas/fancyLayouts/formData.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/ReduxHook";
import DataFormateFancy from "@/helpers/ApiDataFancy";
import { resetState } from "@/redux/FancyLayouts/fancyLayoutsReducer";
import MakeToOrder from "@/components/common/MakeToOrder";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

type DataRow = {
  shape?: string;
  checkbox?: boolean;
  mm?: string;
  cent?: string;
  pointer?: string;
  id:number;
};

const defaultData: DataRow[] = [
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "2.00-2.00",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 1
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "2.50-2.50",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 2
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "3.00-3.00",
      "cent": "0.15",
      "pointer": "15 PT",
      "id": 3
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "3.30-3.30",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 4
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "3.50-3.50",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 5
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "3.75-3.75",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 6
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "3.95-3.95",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 7
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "4.10-4.10",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 8
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "4.30-4.30",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 9
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "4.45-4.45",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 10
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "4.75-4.75",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 11
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "4.95-4.95",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 12
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "5.05-5.05",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 13
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "5.25-5.25",
      "cent": "0.80",
      "pointer": "80 PT",
      "id": 14
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "5.40-5.40",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 15
  },
  {
      "checkbox": false,
      "shape": "ASSCHER",
      "mm": "5.70-5.70",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 16
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.00-1.00",
      "cent": "0.02",
      "pointer": "1.5 PT",
      "id": 17
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.00-1.30",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 18
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.25-1.25",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 19
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.50-1.00",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 20
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.00-1.00",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 21
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.00-1.50",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 22
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.50-1.25",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 23
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.50-1.00",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 24
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.25-1.50",
      "cent": "0.04",
      "pointer": "4 PT",
      "id": 25
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.50-1.50",
      "cent": "0.04",
      "pointer": "4 PT",
      "id": 26
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.70-1.35",
      "cent": "0.04",
      "pointer": "4 PT",
      "id": 27
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.00-1.25",
      "cent": "0.04",
      "pointer": "4 PT",
      "id": 28
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.50-1.25",
      "cent": "0.04",
      "pointer": "4 PT",
      "id": 29
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.25-1.75",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 30
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.75-1.50",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 31
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.00-1.50",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 32
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.00-1.25",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 33
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.50-1.75",
      "cent": "0.06",
      "pointer": "6 PT",
      "id": 34
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.70-1.80",
      "cent": "0.06",
      "pointer": "6 PT",
      "id": 35
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.50-1.50",
      "cent": "0.06",
      "pointer": "6 PT",
      "id": 36
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.00-1.75",
      "cent": "0.07",
      "pointer": "7 PT",
      "id": 37
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.75-1.50",
      "cent": "0.07",
      "pointer": "7 PT",
      "id": 38
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.00-1.50",
      "cent": "0.07",
      "pointer": "7 PT",
      "id": 39
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "2.75-2.00",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 40
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.50-1.75",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 41
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.75-1.75",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 42
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.50-1.50",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 43
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.75-1.50",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 44
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.00-2.00",
      "cent": "0.09",
      "pointer": "9 PT",
      "id": 45
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.00-1.75",
      "cent": "0.09",
      "pointer": "9 PT",
      "id": 46
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.00-1.50",
      "cent": "0.09",
      "pointer": "9 PT",
      "id": 47
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.50-2.00",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 48
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.75-2.00",
      "cent": "0.11",
      "pointer": "11 PT",
      "id": 49
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.50-1.75",
      "cent": "0.11",
      "pointer": "11 PT",
      "id": 50
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.75-1.75",
      "cent": "0.11",
      "pointer": "11 PT",
      "id": 51
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.00-1.50",
      "cent": "0.11",
      "pointer": "11 PT",
      "id": 52
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.00-2.00",
      "cent": "0.12",
      "pointer": "12 PT",
      "id": 53
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.00-1.75",
      "cent": "0.12",
      "pointer": "12 PT",
      "id": 54
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.50-1.75",
      "cent": "0.13",
      "pointer": "13 PT",
      "id": 55
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.50-2.00",
      "cent": "0.14",
      "pointer": "14 PT",
      "id": 56
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.75-2.00",
      "cent": "0.14",
      "pointer": "14 PT",
      "id": 57
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.00-1.75",
      "cent": "0.14",
      "pointer": "14 PT",
      "id": 58
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.00-2.00",
      "cent": "0.15",
      "pointer": "15 PT",
      "id": 59
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "3.50-2.50",
      "cent": "0.16",
      "pointer": "16 PT",
      "id": 60
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.50-2.25",
      "cent": "0.17",
      "pointer": "17 PT",
      "id": 61
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.50-2.00",
      "cent": "0.17",
      "pointer": "17 PT",
      "id": 62
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.00-2.50",
      "cent": "0.18",
      "pointer": "18 PT",
      "id": 63
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.00-2.00",
      "cent": "0.18",
      "pointer": "18 PT",
      "id": 64
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.50-2.50",
      "cent": "0.21",
      "pointer": "21 PT",
      "id": 65
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.75-2.50",
      "cent": "0.22",
      "pointer": "22 PT",
      "id": 66
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "7.00-2.00",
      "cent": "0.22",
      "pointer": "22 PT",
      "id": 67
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.00-2.50",
      "cent": "0.23",
      "pointer": "23 PT",
      "id": 68
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.00-3.00",
      "cent": "0.26",
      "pointer": "26 PT",
      "id": 69
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.50-2.50",
      "cent": "0.26",
      "pointer": "26 PT",
      "id": 70
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "8.00-2.00",
      "cent": "0.26",
      "pointer": "26 PT",
      "id": 71
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.00-2.50",
      "cent": "0.29",
      "pointer": "29 PT",
      "id": 72
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "4.50-3.00",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 73
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.50-2.75",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 74
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.50-2.50",
      "cent": "0.31",
      "pointer": "31 PT",
      "id": 75
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.00-3.00",
      "cent": "0.33",
      "pointer": "33 PT",
      "id": 76
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "7.00-2.50",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 77
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.50-3.00",
      "cent": "0.36",
      "pointer": "36 PT",
      "id": 78
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "7.50-2.50",
      "cent": "0.39",
      "pointer": "39 PT",
      "id": 79
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "8.00-2.50",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 80
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.00-3.00",
      "cent": "0.42",
      "pointer": "42 PT",
      "id": 81
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.00-3.50",
      "cent": "0.43",
      "pointer": "43 PT",
      "id": 82
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "5.50-3.50",
      "cent": "0.49",
      "pointer": "49 PT",
      "id": 83
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.50-3.25",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 84
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "7.00-3.00",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 85
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "8.00-3.00",
      "cent": "0.57",
      "pointer": "57 PT",
      "id": 86
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.50-3.50",
      "cent": "0.58",
      "pointer": "58 PT",
      "id": 87
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "9.00-3.00",
      "cent": "0.64",
      "pointer": "64 PT",
      "id": 88
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "6.00-4.00",
      "cent": "0.68",
      "pointer": "68 PT",
      "id": 89
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "7.00-3.50",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 90
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "10.00-3.00",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 91
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "8.00-3.50",
      "cent": "0.76",
      "pointer": "76 PT",
      "id": 92
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "11.00-3.00",
      "cent": "0.76",
      "pointer": "76 PT",
      "id": 93
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "7.50-3.75",
      "cent": "0.78",
      "pointer": "78 PT",
      "id": 94
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "7.00-4.00",
      "cent": "0.85",
      "pointer": "85 PT",
      "id": 95
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "8.00-4.00",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 96
  },
  {
      "checkbox": false,
      "shape": "BAGUETTE",
      "mm": "7.50-5.00",
      "cent": "1.33",
      "pointer": "1.33 CT",
      "id": 97
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "2.00-2.00",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 98
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "2.60-2.60",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 99
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "2.80-2.80",
      "cent": "0.12",
      "pointer": "12 PT",
      "id": 100
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "3.00-3.00",
      "cent": "0.15",
      "pointer": "15 PT",
      "id": 101
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "3.40-3.40",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 102
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "3.60-3.60",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 103
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "3.85-3.85",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 104
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "4.05-4.05",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 105
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "4.25-4.25",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 106
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "4.40-4.40",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 107
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "4.60-4.60",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 108
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "4.80-4.80",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 109
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "5.15-5.15",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 110
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "5.25-5.25",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 111
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "5.30-5.30",
      "cent": "0.80",
      "pointer": "80 PT",
      "id": 112
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "5.50-5.50",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 113
  },
  {
      "checkbox": false,
      "shape": "CUSHION",
      "mm": "5.70-5.70",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 114
  },
  {
      "checkbox": false,
      "shape": "CUSHION L",
      "mm": "3.20-2.45",
      "cent": "0.10",
      "pointer": "10.2 PT",
      "id": 115
  },
  {
      "checkbox": false,
      "shape": "CUSHION L",
      "mm": "3.65-2.80",
      "cent": "0.15",
      "pointer": "15.2 PT",
      "id": 116
  },
  {
      "checkbox": false,
      "shape": "CUSHION L",
      "mm": "3.95-3.05",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 117
  },
  {
      "checkbox": false,
      "shape": "CUSHION L",
      "mm": "4.30-3.30",
      "cent": "0.25",
      "pointer": "25.1 PT",
      "id": 118
  },
  {
      "checkbox": false,
      "shape": "CUSHION L",
      "mm": "4.55-3.50",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 119
  },
  {
      "checkbox": false,
      "shape": "CUSHION L",
      "mm": "5.00-3.85",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 120
  },
  {
      "checkbox": false,
      "shape": "CUSHION L",
      "mm": "5.35-4.10",
      "cent": "0.50",
      "pointer": "50.1 PT",
      "id": 121
  },
  {
      "checkbox": false,
      "shape": "CUSHION L",
      "mm": "6.00-4.60",
      "cent": "0.70",
      "pointer": "70.1 PT",
      "id": 122
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "2.50-1.80",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 123
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "3.00-1.50",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 124
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "3.00-2.00",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 125
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "3.10-2.20",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 126
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "3.50-2.00",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 127
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "4.00-2.00",
      "cent": "0.11",
      "pointer": "11 PT",
      "id": 128
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "3.50-2.50",
      "cent": "0.13",
      "pointer": "13 PT",
      "id": 129
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "3.75-2.50",
      "cent": "0.16",
      "pointer": "16 PT",
      "id": 130
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "3.80-2.70",
      "cent": "0.19",
      "pointer": "19 PT",
      "id": 131
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "4.00-2.85",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 132
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "4.00-3.00",
      "cent": "0.22",
      "pointer": "22 PT",
      "id": 133
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "5.00-2.50",
      "cent": "0.24",
      "pointer": "24 PT",
      "id": 134
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "4.20-3.00",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 135
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "4.50-3.00",
      "cent": "0.28",
      "pointer": "28 PT",
      "id": 136
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "4.50-3.20",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 137
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "5.00-3.00",
      "cent": "0.32",
      "pointer": "32 PT",
      "id": 138
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "4.70-3.30",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 139
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "5.00-3.55",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 140
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "6.00-3.00",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 141
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "5.50-3.50",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 142
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "5.00-4.00",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 143
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "5.40-3.85",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 144
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "5.60-4.00",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 145
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "6.00-4.00",
      "cent": "0.65",
      "pointer": "65 PT",
      "id": 146
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "6.00-4.20",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 147
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "6.00-4.25",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 148
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "6.10-4.35",
      "cent": "0.80",
      "pointer": "80 PT",
      "id": 149
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "6.50-4.50",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 150
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "6.60-4.80",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 151
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "7.00-5.00",
      "cent": "1.10",
      "pointer": "1.1 CT",
      "id": 152
  },
  {
      "checkbox": false,
      "shape": "EMERALD",
      "mm": "7.50-5.30",
      "cent": "1.50",
      "pointer": "1.5 CT",
      "id": 153
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "3.00-3.20",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 154
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "3.30-3.60",
      "cent": "0.15",
      "pointer": "15 PT",
      "id": 155
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "3.60-4.00",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 156
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "4.00-4.40",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 157
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "4.20-4.65",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 158
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "4.40-4.90",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 159
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "4.60-5.10",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 160
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "4.75-5.30",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 161
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "5.00-5.50",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 162
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "5.10-5.70",
      "cent": "0.55",
      "pointer": "55 PT",
      "id": 163
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "5.25-5.85",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 164
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "5.55-6.15",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 165
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "5.65-6.30",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 166
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "5.80-6.50",
      "cent": "0.80",
      "pointer": "80 PT",
      "id": 167
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "5.90-6.55",
      "cent": "0.85",
      "pointer": "85 PT",
      "id": 168
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "6.00-6.65",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 169
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "6.10-6.80",
      "cent": "0.95",
      "pointer": "95 PT",
      "id": 170
  },
  {
      "checkbox": false,
      "shape": "HEART",
      "mm": "6.25-6.95",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 171
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "2.60-1.30",
      "cent": "0.02",
      "pointer": "1.5 PT",
      "id": 172
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "2.50-1.50",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 173
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "2.80-1.40",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 174
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "3.00-1.50",
      "cent": "0.03",
      "pointer": "2.5 PT",
      "id": 175
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "3.00-1.75",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 176
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "3.50-1.75",
      "cent": "0.04",
      "pointer": "4 PT",
      "id": 177
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "3.75-1.75",
      "cent": "0.04",
      "pointer": "4 PT",
      "id": 178
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "3.00-2.00",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 179
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "3.50-2.00",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 180
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "3.80-1.90",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 181
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "4.00-2.00",
      "cent": "0.06",
      "pointer": "6 PT",
      "id": 182
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "4.25-2.25",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 183
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "4.50-2.25",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 184
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "4.00-2.50",
      "cent": "0.10",
      "pointer": "9.5 PT",
      "id": 185
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "4.80-2.40",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 186
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "4.50-2.50",
      "cent": "0.11",
      "pointer": "10.5 PT",
      "id": 187
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "5.00-2.50",
      "cent": "0.11",
      "pointer": "11 PT",
      "id": 188
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "5.50-2.75",
      "cent": "0.15",
      "pointer": "15 PT",
      "id": 189
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "5.00-3.00",
      "cent": "0.17",
      "pointer": "17 PT",
      "id": 190
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "5.50-3.00",
      "cent": "0.18",
      "pointer": "18 PT",
      "id": 191
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "6.00-3.00",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 192
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "6.50-3.25",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 193
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "7.00-3.50",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 194
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "7.50-3.50",
      "cent": "0.33",
      "pointer": "33 PT",
      "id": 195
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "7.30-3.65",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 196
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "7.60-3.80",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 197
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "8.00-4.00",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 198
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "7.70-4.20",
      "cent": "0.48",
      "pointer": "48 PT",
      "id": 199
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "8.30-4.15",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 200
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "8.50-4.25",
      "cent": "0.55",
      "pointer": "55 PT",
      "id": 201
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "8.50-4.50",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 202
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "8.70-4.35",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 203
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "9.00-4.50",
      "cent": "0.65",
      "pointer": "65 PT",
      "id": 204
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "9.40-4.70",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 205
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "9.60-4.80",
      "cent": "0.80",
      "pointer": "80 PT",
      "id": 206
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "10.00-5.00",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 207
  },
  {
      "checkbox": false,
      "shape": "MARQUISE",
      "mm": "10.50-5.25",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 208
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "3.00-1.50",
      "cent": "0.03",
      "pointer": "2.5 PT",
      "id": 209
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "2.50-1.80",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 210
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "3.00-2.00",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 211
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "3.50-2.50",
      "cent": "0.09",
      "pointer": "9 PT",
      "id": 212
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "3.60-2.70",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 213
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "4.00-2.80",
      "cent": "0.13",
      "pointer": "13 PT",
      "id": 214
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "4.00-3.00",
      "cent": "0.14",
      "pointer": "14 PT",
      "id": 215
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "4.30-3.10",
      "cent": "0.15",
      "pointer": "15 PT",
      "id": 216
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "4.50-3.00",
      "cent": "0.16",
      "pointer": "16 PT",
      "id": 217
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "4.70-3.30",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 218
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "5.00-3.00",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 219
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "4.50-3.50",
      "cent": "0.21",
      "pointer": "21 PT",
      "id": 220
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "5.00-3.55",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 221
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "5.30-3.80",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 222
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "5.00-4.00",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 223
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "5.60-4.00",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 224
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "5.80-4.15",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 225
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "6.00-4.00",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 226
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "6.30-4.50",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 227
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "6.60-4.80",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 228
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "7.05-5.05",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 229
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "7.15-5.10",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 230
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "7.40-5.20",
      "cent": "0.80",
      "pointer": "80 PT",
      "id": 231
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "7.60-5.40",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 232
  },
  {
      "checkbox": false,
      "shape": "OVAL",
      "mm": "7.90-5.60",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 233
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "2.30-1.50",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 234
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "2.50-1.70",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 235
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "2.70-1.80",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 236
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "3.00-2.00",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 237
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "3.25-2.10",
      "cent": "0.06",
      "pointer": "5.5 PT",
      "id": 238
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "3.50-2.25",
      "cent": "0.07",
      "pointer": "7 PT",
      "id": 239
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "3.50-2.50",
      "cent": "0.09",
      "pointer": "9 PT",
      "id": 240
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "3.75-2.50",
      "cent": "0.09",
      "pointer": "9 PT",
      "id": 241
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "4.00-2.50",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 242
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "4.00-2.80",
      "cent": "0.12",
      "pointer": "12 PT",
      "id": 243
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "4.20-2.70",
      "cent": "0.12",
      "pointer": "12 PT",
      "id": 244
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "4.00-3.00",
      "cent": "0.14",
      "pointer": "14 PT",
      "id": 245
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "4.55-2.95",
      "cent": "0.15",
      "pointer": "15 PT",
      "id": 246
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "4.70-3.00",
      "cent": "0.16",
      "pointer": "16 PT",
      "id": 247
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "5.00-3.00",
      "cent": "0.18",
      "pointer": "18 PT",
      "id": 248
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "5.00-3.25",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 249
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "5.00-3.50",
      "cent": "0.23",
      "pointer": "23 PT",
      "id": 250
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "5.40-3.50",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 251
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "5.70-3.70",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 252
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "6.00-4.00",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 253
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "6.30-4.10",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 254
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "6.55-4.25",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 255
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "6.80-4.40",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 256
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "7.00-4.55",
      "cent": "0.55",
      "pointer": "55 PT",
      "id": 257
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "7.20-4.70",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 258
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "7.00-5.00",
      "cent": "0.67",
      "pointer": "67 PT",
      "id": 259
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "7.50-5.00",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 260
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "7.75-5.05",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 261
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "8.00-5.00",
      "cent": "0.77",
      "pointer": "77 PT",
      "id": 262
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "8.20-5.40",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 263
  },
  {
      "checkbox": false,
      "shape": "PEAR",
      "mm": "8.60-5.60",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 264
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.00-1.00",
      "cent": "-0.01",
      "pointer": "-1 PT",
      "id": 265
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.10-1.10",
      "cent": "0.01",
      "pointer": "1 PT",
      "id": 266
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.20-1.20",
      "cent": "0.01",
      "pointer": "1 PT",
      "id": 267
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.30-1.30",
      "cent": "0.02",
      "pointer": "1.5 PT",
      "id": 268
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.40-1.40",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 269
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.50-1.50",
      "cent": "0.02",
      "pointer": "2 PT",
      "id": 270
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.60-1.60",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 271
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.70-1.70",
      "cent": "0.03",
      "pointer": "3 PT",
      "id": 272
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.80-1.80",
      "cent": "0.04",
      "pointer": "4 PT",
      "id": 273
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "1.90-1.90",
      "cent": "0.05",
      "pointer": "4.5 PT",
      "id": 274
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.00-2.00",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 275
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.10-2.10",
      "cent": "0.06",
      "pointer": "6 PT",
      "id": 276
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.20-2.20",
      "cent": "0.07",
      "pointer": "7 PT",
      "id": 277
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.30-2.30",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 278
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.40-2.40",
      "cent": "0.09",
      "pointer": "9 PT",
      "id": 279
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.50-2.50",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 280
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.60-2.60",
      "cent": "0.11",
      "pointer": "11 PT",
      "id": 281
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.70-2.70",
      "cent": "0.13",
      "pointer": "13 PT",
      "id": 282
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.80-2.80",
      "cent": "0.14",
      "pointer": "14 PT",
      "id": 283
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "2.90-2.90",
      "cent": "0.16",
      "pointer": "16 PT",
      "id": 284
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.00-3.00",
      "cent": "0.18",
      "pointer": "18 PT",
      "id": 285
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.10-3.10",
      "cent": "0.19",
      "pointer": "19 PT",
      "id": 286
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.20-3.20",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 287
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.30-3.30",
      "cent": "0.22",
      "pointer": "22 PT",
      "id": 288
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.40-3.40",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 289
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.50-3.50",
      "cent": "0.28",
      "pointer": "28 PT",
      "id": 290
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.60-3.60",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 291
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.70-3.70",
      "cent": "0.33",
      "pointer": "33 PT",
      "id": 292
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.80-3.80",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 293
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "3.90-3.90",
      "cent": "0.38",
      "pointer": "38 PT",
      "id": 294
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.00-4.00",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 295
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.10-4.10",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 296
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.20-4.20",
      "cent": "0.48",
      "pointer": "48 PT",
      "id": 297
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.30-4.30",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 298
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.40-4.40",
      "cent": "0.55",
      "pointer": "55 PT",
      "id": 299
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.50-4.50",
      "cent": "0.58",
      "pointer": "58 PT",
      "id": 300
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.60-4.60",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 301
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.70-4.70",
      "cent": "0.65",
      "pointer": "65 PT",
      "id": 302
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.80-4.80",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 303
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "4.90-4.90",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 304
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "5.05-5.05",
      "cent": "0.80",
      "pointer": "80 PT",
      "id": 305
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "5.25-5.25",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 306
  },
  {
      "checkbox": false,
      "shape": "PRINCESS",
      "mm": "5.45-5.45",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 307
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "3.00-1.50",
      "cent": "0.05",
      "pointer": "5 PT",
      "id": 308
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "3.00-2.00",
      "cent": "0.08",
      "pointer": "8 PT",
      "id": 309
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "3.10-2.20",
      "cent": "0.10",
      "pointer": "10 PT",
      "id": 310
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "4.00-2.00",
      "cent": "0.11",
      "pointer": "11 PT",
      "id": 311
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "3.50-2.50",
      "cent": "0.15",
      "pointer": "15 PT",
      "id": 312
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "3.80-2.70",
      "cent": "0.18",
      "pointer": "18 PT",
      "id": 313
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "4.00-2.80",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 314
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "5.00-2.50",
      "cent": "0.20",
      "pointer": "20 PT",
      "id": 315
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "4.00-3.00",
      "cent": "0.22",
      "pointer": "22 PT",
      "id": 316
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "4.20-3.00",
      "cent": "0.25",
      "pointer": "25 PT",
      "id": 317
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "4.50-3.00",
      "cent": "0.27",
      "pointer": "27 PT",
      "id": 318
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "4.50-3.20",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 319
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "5.00-3.00",
      "cent": "0.30",
      "pointer": "30 PT",
      "id": 320
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "4.70-3.30",
      "cent": "0.35",
      "pointer": "35 PT",
      "id": 321
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "6.00-3.00",
      "cent": "0.36",
      "pointer": "36 PT",
      "id": 322
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "5.00-3.50",
      "cent": "0.40",
      "pointer": "40 PT",
      "id": 323
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "5.10-3.60",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 324
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "5.50-3.50",
      "cent": "0.45",
      "pointer": "45 PT",
      "id": 325
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "5.40-3.85",
      "cent": "0.50",
      "pointer": "50 PT",
      "id": 326
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "5.60-4.00",
      "cent": "0.60",
      "pointer": "60 PT",
      "id": 327
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "6.00-4.00",
      "cent": "0.65",
      "pointer": "65 PT",
      "id": 328
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "6.00-4.20",
      "cent": "0.70",
      "pointer": "70 PT",
      "id": 329
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "6.00-4.25",
      "cent": "0.75",
      "pointer": "75 PT",
      "id": 330
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "6.15-4.40",
      "cent": "0.80",
      "pointer": "80 PT",
      "id": 331
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "6.50-4.50",
      "cent": "0.90",
      "pointer": "90 PT",
      "id": 332
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "6.65-4.80",
      "cent": "1.00",
      "pointer": "1 CT",
      "id": 333
  },
  {
      "checkbox": false,
      "shape": "RADIANT",
      "mm": "7.00-5.00",
      "cent": "1.10",
      "pointer": "1.1 CT",
      "id": 334
  }
];

type ColumnType = {
  checkbox?:any;
  shape?: string;
  mm?: string;
  cent?: string;
  pointer?: string;
};

const PageComponent = () => {
  const searchParams = useSearchParams();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [rows, setRow] = useState<Row<ColumnType>[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  const { replace } = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();


  const getDefaultValues = () => {
    return {
      commenT_TYPE: "FANCY LAYOUT",
      pageno: searchParams.get("pageno") || 0,
      f_WGT: searchParams.get("f_WGT") || "",
      t_WGT: searchParams.get("t_WGT") || "",
      f_LENGTH: searchParams.get("f_LENGTH") || "",
      t_LENGTH: searchParams.get("t_LENGTH") || "",
      f_WIDTH: searchParams.get("f_WIDTH") || "",
      t_WIDTH: searchParams.get("t_WIDTH") || "",
      shape: searchParams.getAll("shape"),
      grown: searchParams.getAll("grown"),
      // tableFilter:searchParams.getAll("tableFilter"),
    };
  };
  const [defaultValues, setDefaultValues] =
    useState<ValidationSchemaType>(getDefaultValues);

  const methods: any = useForm<ValidationSchemaType>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const watchField: any = methods.watch();

  const [data, setData] = useState(() => defaultData);
  const [tableData, setTableData] = useState(data);

  const columns: ColumnDef<DataRow, any>[] = [
    {
      id: "checkbox",
      cell: ({ row }) => (
        <input
          id={row.id}
          type="checkbox"
          // value={row.original.mm}
          // {...methods.register('tableFilter')}
          className="form-checkbox w-4 h-4"
          onClick={(e) => {
            methods.setValue("tableFilter",row.original.mm)
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
      accessorKey: "shape",
      header: "Shape",
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
            info.row.original.checkbox ? "text-white font-extrabold" : ""
          }
        >
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "cent",
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
      accessorKey: "pointer",
      header: "pt/cent",
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
  
  const onSubmit = (data: ValidationSchemaType) => {
    DataFormateFancy(data);
    dispatch(resetState());
    localStorage.setItem("filters", JSON.stringify({}));
    if(rows.length){
      let mm = rows.map((el:any) => el.mm.split("-")).reduce((acc, [l, w]) => {
        acc.l.push(l);
        acc.w.push(w);
        return acc;
      }, { l: [], w: [] });   
      data.f_LENGTH = mm.l.join(",");
      data.t_LENGTH = mm.l.join(",");
      data.f_WIDTH = mm.w.join(",");
      data.t_WIDTH = mm.w.join(",");
      data.shape = rows.map((el:any) => el.shape).join(",");
    }
    localStorage.setItem("filters", JSON.stringify(data || {}));
    localStorage.removeItem("columnOrder");
    router.push("/fancyResult");
  };
  
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
    if (Array.isArray(watchField.shape) && watchField.shape.length > 0) {
      const filteredData = defaultData.filter((ele: any) =>
        watchField.shape.includes(ele.shape)
      );
      setTableData([...filteredData]);

    } else {
      setTableData([...defaultData]);
    }
  }, [watchField.shape]);

  useEffect(() => {
    const newDefaultValues = getDefaultValues();
    setDefaultValues(newDefaultValues);
    methods.reset(newDefaultValues);
  }, [searchParams]);

  useEffect(() => {
    updateQueryParameter();
  }, [watchField]);
  

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="border-2 border-[#2366c3] py-3 px-8 rounded-xl transition-all"
            onClick={handleOpen}
          >
            Make to Order
          </button>
          <MakeToOrder open={open} handleClose={handleClose} />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 m-3 mt-0">
          <Suspense>
            <Table
              data={tableData}
              selectedRow={(val: Row<DataRow>[]) =>{ setRow(val.map(({original}:any)=>original))}}
              columns={columns}
              headerText=""
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              colorBlue={true}
            />
            <CustomizationFancyLayout />
          </Suspense>
        </div>
        <div className="flex justify-center items-center gap-5 mt-4 sticky bottom-0 w-auto bg-white p-2">
          <button
            className="bg-blue-700 font-bold text-sm text-white px-6 py-2 rounded-full"
            type="button"
            onClick={() => {
              window.location.href = pathname;
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
