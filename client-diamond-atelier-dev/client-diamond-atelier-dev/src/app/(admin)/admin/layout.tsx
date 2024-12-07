
import Header from '@/adminComponents/base/Header';
import Sidebar from '@/adminComponents/base/SideBar';
import React from 'react'

function Adminlayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="flex flex-col font-serif h-screen cursor-pointer">
          <Header />
        <section className="flex flex-1 overflow-hidden bg-white">
          <Sidebar />
          <div className="relative flex flex-1 h-full flex-col overflow-y-auto">
            <main className="flex-1 py-5 lg:px-4 px-0.5 h-full font-serif">{children}</main>
          </div>
        </section>
      </div>
  )
}

export default Adminlayout
