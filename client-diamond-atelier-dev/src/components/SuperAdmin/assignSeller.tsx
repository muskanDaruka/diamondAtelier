"use client"
import React, { useEffect } from 'react'
import DynamicAdminTable from "@/components/common/DynamicAdminTable"
import { ColumnDef } from '@tanstack/react-table';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/navigation';

type ColumnKeys = {
    username: string,
    email: string,
    aasignSeller: string,
}

function AssignSeller() {
    const { back } = useRouter();

    const sellerOptions = [
        { id: "seller1", value: "seller1", label: "Seller 1" },
        { id: "seller2", value: "seller2", label: "Seller 2" },
        { id: "seller3", value: "seller3", label: "Seller 3" },
    ];

    const handleAssignSeller = (e: any) => {

    }

    let columns: ColumnDef<ColumnKeys, any>[] = [
        {
            accessorKey: "username",
            header: "UserName",
            cell: (info) => <div className='text-center font-serif'> <span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => <div className='text-center font-serif'> <span>{info.getValue()}</span></div>,
        },
        {
            header: "Assign Seller",
            cell: (info) => {
                const rowIndex = info.row.index;
                return (
                    <div className="flex justify-center items-center">
                        <select
                            onChange={handleAssignSeller}
                            className="px-1 text-center font-serif rounded-3xl w-1/2 h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Default select example"
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

    let data: any = [
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""

        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""

        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""

        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            assignSeller: ""
        }
    ];

    useEffect(() => {

    }, [])

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
                <DynamicAdminTable data={data || []} columns={columns} width='md:w-full' />
            </div>
        </div>
    )
}

export default AssignSeller
