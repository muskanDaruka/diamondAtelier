"use client";
import Header from "@/components/base/Header";
import "@fontsource-variable/montserrat";
import { Icon } from "@iconify/react";
import { FC, ReactNode, useEffect, useState } from "react";
import Sidebar from "@/components/base/Sidebar";
import { useRouter } from "next/navigation";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  
  return (
    <>
      <div className="flex font-serif h-screen flex-col cursor-pointer">
        <section className="flex w-full">
          <div onClick={()=>router.push("/certified-stone")} className=" md:w-[45%]  md:max-w-[280px] py-4 text-black flex justify-center flex-col items-center bg-[#f0f0f0] space-y-3">
            <div className="text-xl uppercase font-serif">Diamond Atelier</div>
            <Icon icon="ion:home" className="size-7" />
          </div>
          <Header />
        </section>
        <section className="flex flex-1 overflow-hidden bg-white">
          <Sidebar />
          <div className="relative flex h-full flex-1 flex-col overflow-y-auto ">
            <main className="flex-1 py-5 lg:px-4 px-0.5 font-serif">{children}</main>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainLayout;
