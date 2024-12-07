import React from 'react'

function Adminlayout({children}:Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
         {children}
    </div>
  )
}

export default Adminlayout
