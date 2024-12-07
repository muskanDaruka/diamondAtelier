"use client"
import React, { useEffect } from 'react'
import DynamicAdminTable from "@/components/common/DynamicAdminTable"
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { getKycApprovedUserApi } from '@/redux/kyc/getKycApprovedUser';
import { useAppDispatch, useAppSelector } from '@/redux/ReduxHook';
import { RootState } from '@/redux/combineReducer';
import { MdKeyboardArrowLeft } from 'react-icons/md';

type ColumnKeys = {
    UserName: string,
    Emailid: string,
    CreatedOn: string,
    aasignSeller: string,
    // IS_KYC: boolean,
}

function KycPending() {
    const { data, isLoading } = useAppSelector((state: RootState) => state.getKycApprovedUserReducer);
    const { back } = useRouter();
    const dispatch = useAppDispatch();
    // const handlePendingClick = (username: string) => {
    //     // router.push(`/approval/${userId}`);
    //     router.push(`/kyc-approval?username=${username}`)
    // };

    const sellerOptions = [
        { id: "seller1", value: "seller1", label: "Seller 1" },
        { id: "seller2", value: "seller2", label: "Seller 2" },
        { id: "seller3", value: "seller3", label: "Seller 3" },
    ];
    const handleSellerAssign = () => {
        // alert("Either Admin-Seller or Super-Admin can approve the KYC.")
    }
    let columns: ColumnDef<ColumnKeys, any>[] = [
        {
            accessorKey: "UserName",
            header: "UserName",
            cell: (info) => <div className='text-center font-serif'><span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "Emailid",
            header: "Email",
            cell: (info) => <div className='text-center font-serif'><span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "CreatedOn",
            header: "Created On",
            cell: (info) => <div className='text-center font-serif'><span>{info.getValue()}</span></div>,
        },
        // {
        //     accessorKey: "IS_KYC",
        //     header: "Kyc Pending",
        //     cell: (info) => (
        //         <div className='text-center font-montserrat'>
        //             <button
        //                 //disabled={info.getValue() ?true:false}
        //                 className='ring-2 rounded-xl m-2 px-2 font-montserrat'
        //                 onClick={() => handlePendingClick(info?.row?.original?.UserName)}
        //             >
        //                 {info.getValue() ? "Approved" : "Pending"}
        //             </button>
        //         </div>
        //     ),
        // },
        {
            header: "Assign Seller",
            cell: (info) => {
                const rowIndex = info.row.index;
                return (
                    <div className="flex p-1 justify-center items-center">
                        <select
                            className="text-center font-serif rounded-3xl w-full h-8 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Default select example"
                            onClick={handleSellerAssign}
                        >
                            <option>Assign Seller</option>
                            {sellerOptions.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            },
        },
        
    ];


    useEffect(() => {
        dispatch(getKycApprovedUserApi({
            iS_KYC: false,
            emailid: "",
            mobileNo: "",
            partyrole: localStorage.getItem("partyrole") || '',
            companyName: "",
            userName: ""
        }))
    }, []);

    return (
        <div className='p-3'>
            <button
                onClick={() => back()}
                className="m-2 ml-5 text-xl border-0 bg-white flex items-center"
            >
                <MdKeyboardArrowLeft size={22} />
                Back
            </button>
            <div className='mx-6 mt-2'>
                <DynamicAdminTable isLoading={isLoading} width='md:w-full' data={data?.Table || []} columns={columns} />
            </div>
        </div>
    )
}

export default KycPending
