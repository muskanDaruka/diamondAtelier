"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Item = {
  id: string,
  title: string,
  link: string,
}

const Sidebar = () => {
  const activePath = usePathname();
  const sidebarList : Item[] = [
    {
      id: "dashboard",
      title: "DashBoard",
      link: "/admin/dashboard",

    },
    {
      id: "users",
      title: "Users",
      link: "/admin/users"
    },
    {
      id: "admin",
      title: "Admin Users",
      link: "/admin/admin-users"
    }
  ];

  return (
    <>
      <div className="hidden lg:flex flex-col bg-custom-gradient md:w-[18%] md:max-w-[250px] overflow-y-auto no-scrollbar">
        <ul className="flex flex-col">
         {
          sidebarList.map((item:Item,index) =>(
            <li key={item.id} 
            className={`w-full hover:border-8 border-blue-500 
            rounded-xl hover:bg-white py-4 text-white 
            hover:bg-white hover:text-black mt-4 ${activePath.startsWith(item.link) ? "bg-white text-[black] border-8 border-blue-500":""}`}>
             <Link key={index} href={item.link}>
              <div className="text-xl text-center">
                 {item.title}
              </div>
             </Link>
             <div className="border border-white w-[90%] mx-auto mt-3 border"></div>
            </li>
          ))
         }
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
