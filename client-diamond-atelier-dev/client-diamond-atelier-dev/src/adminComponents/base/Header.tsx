import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function Header() {
  return (
    <div className='flex w-full items-center border justify-between px-8 p-6'
    style={{
      height:"100px !important"
    }}
    >
         <div className='text-xl font-bold'>
             Diamond Atelier 
         </div>
         <div className='flex gap-4'>
           <div>
            <IoIosNotifications size={25} />
           </div>
           <div className='flex'><CgProfile size={24} /> Shivendra Singh</div>
         </div>
    </div>
  )
}

export default Header
