"use client"
import React from 'react'
import DynamicAdminTable from "@/components/common/DynamicAdminTable"
import {  ColumnDef } from '@tanstack/react-table';

type ColumnKeys = {
  username:string,
  email:string,
  createdBy:string,
  createdAt:string
}

function page() {
  let columns:ColumnDef<ColumnKeys,any>[] = [
    {
      accessorKey: "username",
      header: "UserName",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "createdAt",
      header: "Created By",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      header: "Delete",
      cell: (info) => <button className='ring-2 ring-blue-600 rounded-xl m-2 px-2'>Remove</button>,
    },
    {
      header: "Edit",
      cell: (info) => <button className='ring-2 ring-blue-600 rounded-xl m-2 px-2'>Edit</button>,
    }
  ];

  let data:any = [
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    },
    {
      username:"Shivaay044",
      email:"Shivaay044@gmail.com",
      createdAt:"9-11-24",
      createdBy:"Shivendra"
    }
  ];
  return (
    <div className='overflow-y-auto h-full'>
       <DynamicAdminTable data={data||[]} columns={columns}/>
    </div>
  )
}

export default page