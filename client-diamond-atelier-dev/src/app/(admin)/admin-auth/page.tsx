import React from 'react';
import bk from "@/components/images/bkground.jpg"
import Link from 'next/link';


function page() {
  return (
    <div className='flex flex-col h-screen'>
        <div className='text-3xl text-center border-b py-5 font-bold'>DIAMOND ATELIER</div>

        <div className='border h-full flex justify-center items-center' style={{ backgroundImage: `url(${bk.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
            <form className='md:w-[27%] w-3/4'>
                 <div className='flex flex-col gap-1 mt-2'>
                   <label className='text-md font-bold'>Email</label>
                   <input className='px-8 py-2 rounded-3xl outline-none' placeholder='Enter Email'/>
                 </div>
                 <div className='flex flex-col gap-1 mt-2'>
                   <label className='text-md font-bold'>Password</label>
                   <input className='px-8 py-2 rounded-3xl outline-none' placeholder='Enter Password'/>
                 </div>
                 <div className='mt-2 flex item-center'>
                 <input type="checkbox"/>
                 <label className='mx-1 text-sm'>save password</label>
                 </div>
                 <div className='w-full flex flex-col text-center mt-4'>
                  <Link href={"/"} className='mb-3 underline text-sm text-[blue] font-bold'>User Login?</Link>
                  <input className='bg-blue-500 rounded-3xl font-bold text-sm py-2 px-6 mx-auto outline-none' type="submit"/>
                 </div>
            </form>
        </div>
    </div>
  )
}

export default page
    