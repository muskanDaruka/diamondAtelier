import SnapCheckBox from "../common/SnapCheckBox";
import { useState } from "react";
import SnapInput from "../common/SnapInput";
import round from "@/components/images/DiamondShapes/Round.png";
import Asscher from "@/components/images/DiamondShapes/Asscher.png";
import Cushion from "@/components/images/DiamondShapes/cushion Square.png";
import CushionLong from "@/components/images/DiamondShapes/cushion Long.png";
import Emerald from "@/components/images/DiamondShapes/Emerald.png";
import Heart from "@/components/images/DiamondShapes/Heart.png";
import Marquise from "@/components/images/DiamondShapes/Marquise.png";
import Oval from "@/components/images/DiamondShapes/Oval.png";
import Pear from "@/components/images/DiamondShapes/Pear.png";
import Princess from "@/components/images/DiamondShapes/Princess.png";
import Radiant from "@/components/images/DiamondShapes/Radiant.png";
import Baguette from "@/components/images/ExoticShapes1/baguette .png";
import RadiantSq from "@/components/images/DiamondShapes/Radiant Square.png";
import CheckBoxImage from "../common/SnapCheckBox";
import { usePathname, useRouter } from "next/navigation";

const CustomizationFancyLayout = () => {
  const [filter, setFilter] = useState(false);
  const [allShapesSelected, setAllShapesSelected] = useState(false);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const Grown = [
    { id: "CVD", name: "CVD", fieldName: "grown", value: "CVD" },
    { id: "HPHT", name: "HPHT", fieldName: "grown", value: "HPHT" },
  ];
  const DimondShapes = [
    { id: "Baguette", src: Baguette, alt: "Baguette", fieldName: "shape", value: "BAGUETTE" },
    { id: "Asscher", src: Asscher, alt: "Asscher", fieldName: "shape", value: "ASSCHER" },
    { id: "Cushion", src: Cushion, alt: "Cushion", fieldName: "shape", value: "CUSHION" },
    { id: "CushionLong", src: CushionLong, alt: "CushionLg.", fieldName: "shape", value: "LONG CUSHION" },
    { id: "Emerald", src: Emerald, alt: "Emerald", fieldName: "shape", value: "EMERALD" },
    { id: "Heart", src: Heart, alt: "Heart", fieldName: "shape", value: "HEART" },
    { id: "Marquise", src: Marquise, alt: "Marquise", fieldName: "shape", value: "MARQUISE" },
    { id: "Oval", src: Oval, alt: "Oval", fieldName: "shape", value: "OVAL" },
    { id: "Pear", src: Pear, alt: "Pear", fieldName: "shape", value: "PEAR" },
    { id: "Princess", src: Princess, alt: "Princess", fieldName: "shape", value: "PRINCESS" },
    { id: "RadiantSq", src: RadiantSq, alt: "RadiantSq.", fieldName: "shape", value: "SQ RADIANT" },
    { id: "Radiant", src: Radiant, alt: "Radiant", fieldName: "shape", value: "RADIANT" }
  ];
  type Image = {
    id: string;
    src: any;
    alt: string;
    value?: string;
    fieldName?: string
  };
  interface Item {
    id: string;
    name: string;
    value?: string;
    fieldName?: string;
  }

  return (
    <div className="flex flex-col justify-center space-y-5 px-1 my-5">
      <div className="bg-[#f0f0f0] rounded-xl flex py-5 px-2 gap-5 items-start ">
        <p className="text-md font-semibold mt-2 xl:p-3">Shape</p>
        <div className="flex flex-wrap grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-3 gap-3 pl-0">
          {DimondShapes.map((shape: Image) => (
            <CheckBoxImage
              image={true}
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              name={shape.alt}
              key={shape.id}
              customClass="xl:size-[65px] size-[40px] text-xs "
              value={shape.value}
              fieldName={shape.fieldName}
            />
          ))}
        </div>
      </div>
      <div className="bg-[#f0f0f0] p-5 rounded-xl">
        <div className="w-full flex items-center ">
          <p className="text-md font-semibold">Weight</p>
          <div className="flex gap-6 px-4 py-2">
            <SnapInput
              placeholder="Min Cent"
              name="f_WGT"
              customClass="w-1/3"
              shadow={true}
            />
            <span>/Pc</span>
            <p className="text-md font-semibold">To</p>
            <SnapInput
              placeholder="Max Cent"
              name="t_WGT"
              customClass="w-1/3"
              shadow={true}
            />
            <span>/Pc</span>
          </div>
        </div>
        <div className="w-full flex max-sm:flex-wrap">
          <div className="flex items-center">
            <p className="text-md font-semibold">Length</p>
            <div className="flex gap-2 px-4 py-2">
              <SnapInput
                placeholder="MM"
                name="f_LENGTH"
                customClass="w-1/3"
                shadow={true}
              />
              <p>To</p>
              <SnapInput
                placeholder="MM"
                name="t_LENGTH"
                customClass="w-1/3"
                shadow={true}
              />
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-md font-semibold ">Width</p>
            <div className="flex gap-2 px-2 py-2">
              <SnapInput
                placeholder="MM"
                name="f_WIDTH"
                customClass="w-1/3"
                shadow={true}
              />
              <p>To</p>
              <SnapInput
                placeholder="MM"
                name="t_WIDTH"
                customClass="w-1/3"
                shadow={true}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <p className="text-md font-semibold ">Grown</p>
          <div className="flex  gap-4 px-4 py-2">
            {Grown.map((item: Item) => (
              <SnapCheckBox
                id={item.id}
                name={item.name}
                key={item.id}
                other={true}
                image={false}
                customClass="xl:px-4 px-2 py-1"
                shadow={true}
                value={item.value}
                fieldName={item.fieldName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationFancyLayout;
