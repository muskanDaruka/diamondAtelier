"use client"
import React, { useEffect, useState } from 'react'
import DynamicAdminTable from "@/components/common/DynamicAdminTable"
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/ReduxHook';
import { RootState } from '@/redux/combineReducer';
import { getKycApprovedUserApi } from '@/redux/kyc/getKycApprovedUser';
import { getApprovedUserApi } from '@/redux/approvalLogin/saveUserApproval';

type ColumnKeys = {
    UserName: string,
    companyName: string,
    emailid: string,
    mobileNo: string,
    isUserApproval: boolean,
    iS_KYC: boolean
}

function ApproveLogin() {
    const { data, isLoading } = useAppSelector((store: RootState) => store.getKycApprovedUserReducer)
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    const handleApprovalClick = (userName:string) => {
        dispatch(getApprovedUserApi({
            userName,
            isUserApproval: true,
            modifyby: localStorage.getItem("username") || ""
        }))
    };

    let columns: ColumnDef<ColumnKeys, any>[] = [
        {
            accessorKey: "UserName",
            header: "UserName",
            cell: (info) => <div className="text-center font-serif"><span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "CompanyName",
            header: "Company Name",
            cell: (info) => <div className="text-center font-serif"><span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "Emailid",
            header: "Email Id",
            cell: (info) => <div className="text-center font-serif"><span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "MobileNo",
            header: "Mobile No.",
            cell: (info) => <div className="text-center font-serif"><span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "IsUserApproval",
            header: "User Approval",
            cell: (info) =>
                <div className="text-center font-serif">
                    <button
                        disabled={info.getValue() ? true : false}
                        onClick={() => handleApprovalClick(info.row.original.UserName)}

                        className='ring-2 rounded-xl m-2 px-2 font-serif'>
                        {info.getValue() ? "Approved" : "Pending"}
                    </button>
                </div>,
        },
    ];
    useEffect(() => {
        dispatch(getKycApprovedUserApi({
            isUserApproval: false,
            iS_KYC:true,
            emailid:"",
            userName:"",
            mobileNo:"",
            partyrole: localStorage.getItem("partyrole") || '',
            companyName:""
        }))
    }, []);

    return (
        <div className='p-3'>
            <div className='h-[85vh] mt-2'>
                <DynamicAdminTable data={data?.Table||[]} columns={columns} width='md:w-full' />
            </div>
        </div>
    )
}

export default ApproveLogin
