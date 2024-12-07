import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import category1 from "../../components/images/category/category1.png";
import category2 from "../../components/images/category/category2.png";
import category3 from "../../components/images/category/category3.png";
import category4 from "../../components/images/category/category4.png";
import category5 from "../../components/images/category/category5.png";
import category6 from "../../components/images/category/category6.png";
import { Tooltip } from "@mui/material";

const SidebarIcon = () => {
  const activePath = usePathname();
  const sidebarListIcon = [
    {
      id: "Certified Stone",
      src: category1,
      title: "CERTIFIED STONE",
      alt: "CERTIFIED STONE",
      link: "/certified-stone",
      resultLink: ["/certifiedResult"],
    },
    {
      id: "Color Stone",
      src: category5,
      title: "COLOR STONE",
      alt: "COLOR STONE",
      link: "/color-stone/certified-stone",
      resultLink: ["/color-result/cs-colorResult", "/color-result/noncs-colorResult","/color-result/cs-meleeResult"],
    },
    {
      id: "Fancy Layouts",
      src: category4,
      title: "FANCY LAYOUTS",
      alt: "FANCY LAYOUTS",
      link: "/fancy-layouts",
      resultLink: ["/fancyResult"],
    },
    {
      id: "Melee Pointers",
      src: category2,
      title: "MELEE + POINTERS",
      alt: "MELEE + POINTERS",
      link: "/melee-pointers",
      resultLink: ["/meleeResult"],
    },
    {
      id: "Non Certified",
      src: category6,
      title: "NON CERTIFIED",
      alt: "NON CERTIFIED",
      link: "/non-certified",
      resultLink: ["/nonCertifiedResult"],
    },
    {
      id: "Exotic Shapes",
      src: category3,
      title: "EXOTIC SHAPES",
      alt: "EXOTIC SHAPES",
      link: "/exotic-shapes",
      resultLink: ["/exoticResult"],
    },  
  ];

  return (
    <div className="hidden lg:flex flex-col border-r bg-custom-gradient text-white">
      <ul className="grid grid-cols-1 gap-1">
        {sidebarListIcon.map((item) => (
          <Tooltip  key={item.id} title={item.title} placement="right" arrow>
            <li
            className={`hover:bg-white hover:text-black border-4 hover:border-4 hover:border-blue-900 px-1 rounded-xl transition-all ${
              activePath.startsWith(item.link) ||
              item.resultLink.includes(activePath)
                ? "border-4 border-blue-900 bg-white text-black hover:sticky"
                : "border-transparent"
            }`}
          >
            <a href={item.link}>
              <Image
                src={item.src}
                alt={item.alt}
                width={40}
                height={40}
                className="mx-auto rounded-none"
              />
              {/* <div className="text-center text-[12px]">{item.title}</div> */}
            </a>
          </li>
          </Tooltip>
        ))}
      </ul>
    </div>
  );
};
export default SidebarIcon;
