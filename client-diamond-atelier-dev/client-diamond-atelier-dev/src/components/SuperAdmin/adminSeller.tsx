"use client"
import React, { useEffect } from 'react'
import DynamicAdminTable from "@/components/common/DynamicAdminTable"
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/ReduxHook';
import { MdKeyboardArrowLeft } from 'react-icons/md';

type ColumnKeys = {
    username: string,
    email: string,
    numberofClients: number,
    numberOfStoneHold: number,
}

function AdminSeller() {
    const { push, back } = useRouter();
    const dispatch = useAppDispatch();

    let columns: ColumnDef<ColumnKeys, any>[] = [
        {
            accessorKey: "username",
            header: "UserName",
            cell: (info) => <div className='text-center'> <span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: (info) => <div className='text-center'> <span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "numberOfClients",
            header: "Total Clients",
            cell: (info) => <div className='text-center'> <span>{info.getValue()}</span></div>,
        },
        {
            accessorKey: "numberOfStonesHold",
            header: "Total Holded Stones",
            cell: (info) => <div className='text-center'> <span>{info.getValue()}</span></div>,
        },
        {
            header: "Seller/Seller Admin Cart",
            cell: (info) => <div className='text-center font-serif'>
                <button
                    className='ring-2 ring-blue-600 rounded-xl m-2 px-2 font-serif text-[11px] font-bold'
                    onClick={() => { push(`/cart?username=${info.row.original.username}`) }}
                >
                    Check Cart
                </button>
            </div>,
        }
    ];

    let data: any = [
        {
            username: "RSuperAdmin",
            email: "rsuperadmin@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,

        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        },
        {
            username: "Shivaay044",
            email: "Shivaay044@gmail.com",
            numberOfClients: 10,
            numberOfStonesHold: 5,
        }
    ];

    useEffect(() => {
        //  dispatch(getUserDetailApi({
        //     "userName": "RSuperAdmin",
        //     "userRole": "",
        //   }))
    }, [dispatch])

    return (
        <div className='p-4'>
            <button
                onClick={() => back()}
                className="m-2 ml-5 text-xl border-0 bg-white flex items-center"
            >
                <MdKeyboardArrowLeft size={22} />
                Back
            </button>
            <div className='mx-6 mt-2'>
                <DynamicAdminTable data={data || []} width='md:w-full' columns={columns} />
            </div>
        </div>
    )
}

export default AdminSeller
