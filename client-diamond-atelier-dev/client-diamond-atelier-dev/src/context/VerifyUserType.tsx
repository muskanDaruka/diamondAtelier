"use client";
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export const VerifyUserType:React.FC<{ children: React.ReactNode }> = ({children}) => {
       
    const pathname = usePathname();
    const router = useRouter();
    let type = "super-admin"

    useEffect(()=>{
       if(!(type === pathname.split("/")[1])){
        router.back();
       }
    },[pathname])

  return (<>{children}</>)
}



