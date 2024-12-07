"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import {phone} from "phone";

export default function ConnectSeller() {

    const [sellerNo, setSellerContactNo] = useState<string|null>(null);
    const [role,setRole] = useState<null|string>(null);
    const pathname = usePathname();

    useEffect(()=>{
        const number = phone(localStorage.getItem("seller_mobile_no")||"");
        setSellerContactNo(number.phoneNumber);
        setRole(localStorage.getItem("userType"));
    },[]);




    
  return (
    <Link target='_blank' href={`https://wa.me/${sellerNo}`} className={`${role == "BUYER" && !pathname.includes("/category") ? "": "hidden"} bg-[#61CE70] fixed right-8 bottom-6 rounded-full p-2 z-[12]`}>
         <span className='flex items-center gap-1 text-md text-white font-bold'>
              Connect Seller <FaWhatsapp size={30}/>
         </span>
    </Link>
  )
}
