"use client";
import React, { useEffect, useRef, useState } from "react";
import DynamicAdminTable from "@/components/common/DynamicAdminTable";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { RootState } from "@/redux/combineReducer";
import { clientListApi } from "@/redux/seller/ClientListReducer";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import moment from "moment";
import CustomPagination from "@/components/common/CustomPagination";

interface SalesManData {
    id: number;
    PARTYNAME: string;
    PAGE_NO: number | string;
}

function ClientList() {
    const { data, isLoading } = useAppSelector(
        (store: RootState) => store.clientListReducer
    );
    const [userRole, setUserRole] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const { back } = useRouter();
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        setUserRole(localStorage.getItem("userType"));
    }, []);

    useEffect(() => {
        dispatch(
            clientListApi({
                SALESMAN: "",
                PARTYNAME: "",
                PAGE_NO: page,
            })
        );
    }, [dispatch, page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const columns: ColumnDef<SalesManData, any>[] = [
        {
            id: "ROW_NO",
            accessorKey: "ROW_NO",
            header: "Sr.No.",
            size: 60,
            cell: (info) => <span>{info.getValue()}</span>
        },
        ...(userRole === "SELLER" || userRole === "SELLERADMIN" || userRole === "SUPERADMIN"
            ? [
                {
                    accessorKey: "PARTY_NAME",
                    header: "Client Name",
                    cell: (info: any) => <span className="font-serif text-nowrap">{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
                },
            ]
            : []),
        ...(userRole === "SUPERADMIN"
            ? [
                {
                    accessorKey: "MOBILE_NO",
                    header: "Mobile No.",
                    cell: (info: any) => <span className="font-serif text-nowrap">{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
                },
            ]
            : []),
        ...(userRole === "SUPERADMIN"
            ? [
                {
                    accessorKey: "SELLER_NAME",
                    header: "Seller Name",
                    cell: (info: any) => <span className="font-serif text-nowrap">{`${info.getValue() ? `${info.getValue()}` : "-"}`}</span>,
                },
            ]
            : []),
        ...(userRole === "SUPERADMIN"
            ? [
                {
                    accessorKey: "INVOICE_AMOUNT",
                    header: "Invoice Amount",
                    cell: (info: any) => (
                        <span className="font-serif text-nowrap">
                            {`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}
                        </span>
                    ),
                },
            ]
            : []),
        ...(userRole === "SELLER" || userRole === "SELLERADMIN"
            ? [
                {
                    accessorKey: "NET_VALUE",
                    header: "Pricing",
                    cell: (info: any) => (
                        <span className="font-serif text-nowrap">
                            {`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}
                        </span>
                    ),
                },
            ]
            : []),
        ...(userRole === "SUPERADMIN"
            ? [
                {
                    accessorKey: "MEMO_AMOUNT",
                    header: "Memo Amount",
                    cell: (info: any) => (
                        <span className="font-serif text-nowrap">
                            {`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}
                        </span>
                    ),
                },
            ]
            : []),

        ...(userRole === "SUPERADMIN"
            ? [
                {
                    accessorKey: "DUE_AMOUNT",
                    header: "Total Due",
                    cell: (info: any) => (
                        <span className="font-serif text-nowrap">
                            {`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}
                        </span>
                    ),
                },
            ]
            : []),
        ...(userRole === "SUPERADMIN"
            ? [
                {
                    accessorKey: "LAST_PAYMENT_AMOUNT",
                    header: "Last Payment Received",
                    cell: (info: any) => (
                        <span className="font-serif text-nowrap">
                            {`${info.getValue() ? `$${parseFloat(info.getValue()).toFixed(2)}` : "-"}`}
                        </span>
                    ),
                },
            ]
            : []),
        ...(userRole === "SUPERADMIN"
            ? [
                {
                    accessorKey: "LAST_PAYMENT_DATE",
                    header: "Last Payment Date",
                    cell: (info: any) => (
                        <span className="font-serif text-nowrap">
                            {`${info.getValue() ? `${moment(info.getValue()).format("MM-DD-YYYY")}` : "-"}`}
                        </span>
                    ),
                },
            ]
            : []),
    ];

    return (
        <div className="p-3">
            <button onClick={() => back()} className="m-1 ml-5 text-xl border-0 bg-white flex items-center">
                <MdKeyboardArrowLeft size={22} />
                Back
            </button>
            <div className="mx-6 mt-1">
                <DynamicAdminTable
                    data={data?.Table || []}
                    columns={columns}
                    width="md:w-full"
                    fetchData={clientListApi}
                    isLoading={isLoading}
                />
                <div className="flex justify-end items-center mt-1">
                    <CustomPagination
                        page={page}
                        count={Math.ceil((data?.TBL_RECD) || 50)}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default ClientList;
