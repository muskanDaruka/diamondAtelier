"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const activePath = usePathname();
  const sidebarList = [
    {
      id: "Certified Stone",
      title: "CERTIFIED STONE",
      description: "IGI & GIA",
      link: "/certified-stone",
      resultLink: ["/certifiedResult"],
      comingSoon:false,
    },
    {
      id: "Color Stone",
      title: "COLOR STONE",
      description: "MELEES + CERTIFIED",
      link: "/color-stone/certified-stone",
      resultLink: ["/color-stone/non-certified", "/color-stone"],
      comingSoon:false
    },
    {
      id: "Fancy Layouts",
      title: "FANCY LAYOUTS",
      description: "Fancy-Layouts",
      link: "/fancy-layouts",
      resultLink: ["/fancyResult"],
      comingSoon:false,
    },
    {
      id: "Melee Pointers",
      title: "MELEE + POINTERS",
      description: "0.001 TO 0.49 CT | ROUND (0.80 - 4.90 MM)",
      link: "/melee-pointers",
      resultLink: ["/meleeResult"],
      comingSoon:false,
    },
    {
      id: "Non Certified",
      title: "NON CERTIFIED",
      description: "ALL SHAPES | 0.50 CT+",
      link: "/non-certified",
      resultLink: ["/non-certifiedResult"],
      comingSoon:false
    },
    {
      id: "Exotic Shapes",
      title: "EXOTIC SHAPES",
      description: "MATCHING PAIR / SIDE STONE 100+ SHAPES",
      link: "/exotic-shapes",
      resultLink: ["/exoticResult"],
      comingSoon:false,
    },
  ];

    return (
      <>
        <div className="hidden border-r flex-col overflow-y-scroll no-scrollbar transition-all duration-300 md:w-[18%] md:max-w-[250px] lg:flex bg-custom-gradient text-white  pb-6">
          <ul className=" xl:gap-4 mt-2 flex flex-col item-center">
            {sidebarList.map((item, index) => (
              <a href={item.link} key={item.id}>
                <li
                  key={index}
                  className={`hover:bg-white hover:text-black py-3 px-3 rounded-xl transition-all ${(activePath.startsWith(item.link) || item.resultLink.includes(activePath))
                      ? " bg-white text-black"
                      : "border-transparent"
                    }`}
                >
                  <div className="font-bold text-center lg:text-sm xl:text-[1rem] font-serif">{item.title}</div>
                  <div className="text-[10px] text-center font-serif">{item.description}</div>
                  {item.comingSoon && (
                    <div className="text-center rounded-md">
                      <span className="mx-auto my-1 text-black text-xs">Coming Soon</span>
                    </div>
                  )}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </>
    );
  };

  export default Sidebar;
