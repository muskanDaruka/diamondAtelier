import {
  default as CheckBoxImage,
  default as SnapCheckBox,
} from "@/components/common/SnapCheckBox";
import SnapInput from "@/components/common/SnapInput";
import Asscher from "@/components/images/DiamondShapes/Asscher.png";
import CushionLong from "@/components/images/DiamondShapes/cushion Long.png";
import Cushion from "@/components/images/DiamondShapes/cushion Square.png";
import Emerald from "@/components/images/DiamondShapes/Emerald.png";
import Heart from "@/components/images/DiamondShapes/Heart.png";
import Marquise from "@/components/images/DiamondShapes/Marquise.png";
import Oval from "@/components/images/DiamondShapes/Oval.png";
import Pear from "@/components/images/DiamondShapes/Pear.png";
import Princess from "@/components/images/DiamondShapes/Princess.png";
import RadiantSq from "@/components/images/DiamondShapes/Radiant Square.png";
import Radiant from "@/components/images/DiamondShapes/Radiant.png";
import round from "@/components/images/DiamondShapes/Round.png";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
const CustomizationFancyLayout = () => {
  const [filter, setFilter] = useState(false);

  const Grown = [
    { id: "CVD", name: "CVD",fieldName:"PREFIX", value:"CVD" },
    { id: "HPHT", name: "HPHT",fieldName:"PREFIX", value:"HPHT" },
  ];
  const DimondShapes = [
    { id: "round", src: round, alt: "Round",fieldName:"", value:"" },
    { id: "Asscher", src: Asscher, alt: "Asscher",fieldName:"", value:"" },
    { id: "Cushion", src: Cushion, alt: "Cushion",fieldName:"", value:"" },
    { id: "CushionLong", src: CushionLong, alt: "L Cushion",fieldName:"", value:"" },
    { id: "Emerald", src: Emerald, alt: "Emerald",fieldName:"", value:"" },
    { id: "Heart", src: Heart, alt: "Heart",fieldName:"", value:"" },
    { id: "Marquise", src: Marquise, alt: "Marquise",fieldName:"", value:"" },
    { id: "Oval", src: Oval, alt: "Oval",fieldName:"", value:"" },
    { id: "Pear", src: Pear, alt: "Pear",fieldName:"", value:"" },
    { id: "Princess", src: Princess, alt: "Princess",fieldName:"", value:"" },
    { id: "RadiantSq", src: RadiantSq, alt: "Radiant Sq",fieldName:"", value:"" },
    { id: "Radiant", src: Radiant, alt: "Radiant",fieldName:"", value:"" },
  ];
  type Image = {
    id: string;
    src: any;
    alt: string;
    value?:string;
    fieldName?:string
  };
  interface Item {
    id: string;
    name: string;
    value?:string;
    fieldName?:string;
  }
  return (
    <div className="flex flex-col justify-center space-y-5 px-1 my-5">
      <div className="bg-[#f0f0f0] p-5 rounded-xl">
        <div className="w-full flex items-center ">
          <p className="text-lg font-semibold">Weight</p>
          <div className="flex items-center gap-4 px-4 py-2">
            <SnapInput
              placeholder=""
              name="Min"
              customClass="w-1/3"
              shadow={true}
              type="number"
            />
            <span>/Pc</span>
            <p>To</p>
            <SnapInput
              placeholder=""
              name="Max"
              customClass="w-1/3"
              shadow={true}
              type="number"
            />
            <span>/Pc</span>
          </div>
        </div>
        <div className="w-full flex max-sm:flex-wrap">
          <div className="flex items-center">
            <p className="text-lg font-semibold">Length</p>
            <div className="flex gap-2 px-4 py-2">
              <SnapInput
                placeholder="MM"
                name="lengthInitial"
                customClass="w-1/3"
                shadow={true}
                type="number"
              />
              <p>To</p>
              <SnapInput
                placeholder="MM"
                name="lengthFinal"
                customClass="w-1/3"
                shadow={true}
                type="number"
              />
            </div>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-semibold ">Width</p>
            <div className="flex gap-2 px-4 py-2">
              <SnapInput
                placeholder="MM"
                name="widthInitial"
                customClass="w-1/3"
                shadow={true}
                type="number"
              />
              <p>To</p>
              <SnapInput
                placeholder="MM"
                name="widthFinal"
                customClass="w-1/3"
                shadow={true}
                type="number"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <p className="text-lg font-semibold ">Grown</p>
          <div className="flex  gap-4 px-4 py-2">
            {Grown.map((item: Item) => (
              <SnapCheckBox
                id={item.id}
                name={item.name}
                key={item.id}
                other={true}
                image={false}
                shadow={true}
                value={item.value}
                fieldName={item.fieldName}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#f0f0f0] rounded-xl flex py-5 px-2 gap-5 items-start ">
        <p className="text-lg font-semibold mt-2">Shape</p>
        <div className=" flex flex-wrap gap-4">
          {DimondShapes.map((shape: Image) => (
            <CheckBoxImage
              image={true}
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              name={shape.alt}
              key={shape.id}
              customClass="size-12 text-xs"
              value={shape.value}
              fieldName={shape.fieldName}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex justify-center gap-5">
          <button
            className="bg-blue-700 font-bold text-sm text-white px-6 py-2 rounded-full "
            type="submit"
          >
            Clear Search
          </button>
          <button
            className="bg-blue-700 font-bold text-sm text-white px-6 py-2 rounded-full "
            type="submit"
          >
            Search
          </button>
        </div>
        <button
          className="bg-gray-300 px-6 py-2 rounded-full w-fit mx-auto flex items-center gap-3"
          onClick={() => setFilter(!filter)}
        >
          More Filters
          <IoIosArrowDown className="size-5" />
        </button>
        {filter && <div className="space-y-3">More Filters</div>}
      </div>
    </div>
  );
};

export default CustomizationFancyLayout;
