"use client";
import { FC, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import MakeToOrder from "@/components/common/MakeToOrder";

const Page: FC<{ children: ReactNode }> = ({ children }) => {
  const path = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const List = [
    {
      title: "Melee + Pointers",
      description: "Round | 0.80 - 4.90 MM",
      link: "/color-stone",
    },
    {
      title: "Certified Stone",
      description: "IGI & GIA",
      link: "/color-stone/certified-stone",
    },
    {
      title: "Non - Certified",
      description: "Fancy Shape | 0.05 - 0.49 CT",
      link: "#",
    },
    {
      title: "Make to Order",
      description: "",
      onClick: handleOpen
    },
  ];

  return (
    <>
      <div className="flex justify-center ">
        <ul className="grid grid-cols-4 gap-2 list-none">
          {List.map((item, index) => (
            <a href={item.link} key={index}>
              <li
                className={`border-2 border-[#2366c3] rounded-xl transition-all text-center h-full py-2 px-6 pt-1 ${
                  path === item.link || (item.title === "Make to Order" && open) ? "bg-[#2366c3] text-white" : ""
                }`}
                onClick={item.onClick}
              >
                <span className="font-extrabold text-lg flex justify-center items-center">{item.title}</span>
                <p className="font-extrabold text-sm ">{item.description}</p>
              </li>
            </a>
          ))}
        </ul>
      </div>
      <MakeToOrder open={open} handleClose={handleClose} />
      <div className=" px-0.5">
        {children}
      </div>
    </>
  );
};

export default Page;
