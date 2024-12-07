import React, { MouseEventHandler, ReactNode } from 'react'

function ResultBtn({ icon, title, onClick,customClass }: {
  icon: ReactNode,
  title: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  customClass?:string
}) {
  return (

    <button
      onClick={onClick}
      className={(customClass == "" || customClass == undefined) ? "rounded-none text-black bg-[#eeeeee] w-full h-full": customClass}
      type="button"
    > 
      <span className='text-[12px] font-bold flex items-center justify-center text-center pt-1'> {icon}</span>
      <span className='text-[10px] font-bold flex items-center justify-center text-center'>{title}</span>
    </button>

  )
}

export default ResultBtn
