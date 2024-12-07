"use client";
import Asscher from "@/components/images/DiamondShapes/Asscher.png";
import Cushion from "@/components/images/DiamondShapes/cushion Square.png";
import CushionL from "@/components/images/DiamondShapes/cushion Long.png";
import Emerald from "@/components/images/DiamondShapes/Emerald.png";
import Heart from "@/components/images/DiamondShapes/Heart.png";
import Marquise from "@/components/images/DiamondShapes/Marquise.png";
import Oval from "@/components/images/DiamondShapes/Oval.png";
import Pear from "@/components/images/DiamondShapes/Pear.png";
import Princess from "@/components/images/DiamondShapes/Princess.png";
import Radiant from "@/components/images/DiamondShapes/Radiant.png";
import Radiantsq from "@/components/images/DiamondShapes/Radiant Square.png";
import round from "@/components/images/DiamondShapes/Round.png";
import CheckBoxImage from "@/components/common/SnapCheckBox";
import Baguette from "@/components/images/baguette .png";
import Bullet from "@/components/images/bullet copy.png";
import Cadillac from "@/components/images/Cadillac.png";
import HalfMoon from "@/components/images/half moon.png";
import Hexagon from "@/components/images/Hexagon.png";
import Kite from "@/components/images/Kite.png";
import LHexagon from "@/components/images/Long hexagon.png";
import Triangle from "@/components/images/triangle.png";
import Trillion from "@/components/images/Trillion.png";
import Trapezoid from "@/components/images/trapezoid diamond.png";
import TBaguette from "@/components/images/tapered baguette.png";
import Shield from "@/components/images/Shield.png";
import Lozenge from "@/components/images/Lozenge.png"
import { useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CertifiedStone = () => {
  const DiamondShapes = [
    { id: "round", src: round, alt: "Round", fieldName: "shapE_SEQ", value: "1" },
    { id: "Princess", src: Princess, alt: "Princess", fieldName: "shapE_SEQ", value: "2" },
    { id: "CushionSq", src: Cushion, alt: "Cushion Sq.", fieldName: "shapE_SEQ", value: "89" },
    { id: "CushionL", src: CushionL, alt: "Cushion Lg.", fieldName: "shapE_SEQ", value: "88" },
    { id: "Radiant", src: Radiant, alt: "Radiant", fieldName: "shapE_SEQ", value: "13" },
    { id: "Asscher", src: Asscher, alt: "Asscher", fieldName: "shapE_SEQ", value: "28" },
    { id: "Emerald", src: Emerald, alt: "Emerald", fieldName: "shapE_SEQ", value: "4" },
    { id: "Oval", src: Oval, alt: "Oval", fieldName: "shapE_SEQ", value: "7" },
    { id: "Pear", src: Pear, alt: "Pear", fieldName: "shapE_SEQ", value: "6" },
    { id: "Marquise", src: Marquise, alt: "Marquise", fieldName: "shapE_SEQ", value: "3" },
    { id: "Heart", src: Heart, alt: "Heart", fieldName: "shapE_SEQ", value: "15" },
    { id: "Radiant Square", src: Radiantsq, alt: "Radiant Sq.", fieldName: "shapE_SEQ", value: "169" },
    { id: "Baguette", src: Baguette, alt: "Baguette", fieldName: "shapE_SEQ", value: "26" },
    { id: "Bullet", src: Bullet, alt: "Bullet", fieldName: "shapE_SEQ", value: "92" },
    { id: "Cadillac", src: Cadillac, alt: "Cadillac", fieldName: "shapE_SEQ", value: "96" },
    { id: "HalfMoon", src: HalfMoon, alt: "HalfMoon", fieldName: "shapE_SEQ", value: "87" },
    { id: "Hexagon", src: Hexagon, alt: "Hexagon", fieldName: "shapE_SEQ", value: "85" },
    { id: "Kite", src: Kite, alt: "kite", fieldName: "shapE_SEQ", value: "91" },
    { id: "LHexagon", src: LHexagon, alt: "Hexagon Lg.", fieldName: "shapE_SEQ", value: "102" },
    { id: "Triangle", src: Triangle, alt: "Triangle", fieldName: "shapE_SEQ", value: "16" },
    { id: "Trillion", src: Trillion, alt: "Trillion", fieldName: "shapE_SEQ", value: "84" },
    { id: "Trapezoid", src: Trapezoid, alt: "Trapezoid", fieldName: "shapE_SEQ", value: "30" },
    { id: "TBaguette", src: TBaguette, alt: "TBaguette", fieldName: "shapE_SEQ", value: "93" },
    { id: "Shield", src: Shield, alt: "Shield", fieldName: "shapE_SEQ", value: "86" },
    { id: "Lozenge", src: Lozenge, alt: "Lozenge", fieldName: "shapE_SEQ", value: "100" },
  ];
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-0 mt-2">
      <button
        type="button"
        onClick={scrollLeft}
        className="z-10  bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400"
      >
        <MdKeyboardArrowLeft size={25} />
      </button>
        <div
          ref={scrollRef}
          className="bg-[#f0f0f0] m-2 mb-0 lg:rounded-full flex font-serif justify-start items-center space-x-5 overflow-x-scroll no-scrollbar p-3"
        >
          {DiamondShapes.map((shape: any) => (
            <CheckBoxImage
              image={true}
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              name={shape.alt}
              customClass="xl:size-[75px] size-[50px]"
              key={shape.id}
              fieldName={shape.fieldName}
              value={shape.value}
            />
          ))}
        </div>
        <button
        type="button"
        onClick={scrollRight}
        className=" bg-gray-300 p-2 rounded-full shadow-md hover:bg-gray-400">
        <MdKeyboardArrowRight size={25} />
      </button>
      </div>
    </>
  );
};

export default CertifiedStone;