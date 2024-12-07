import round from "@/components/images/DiamondShapes/Round.png";
import Asscher from "@/components/images/DiamondShapes/Asscher.png";
import Baguette from "@/components/images/ExoticShapes1/baguette .png";
import Cushion from "@/components/images/DiamondShapes/cushion Square.png";
import CushionLong from "@/components/images/DiamondShapes/cushion Long.png";
import Emerald from "@/components/images/DiamondShapes/Emerald.png";
import Heart from "@/components/images/DiamondShapes/Heart.png";
import Marquise from "@/components/images/DiamondShapes/Marquise.png";
import Oval from "@/components/images/DiamondShapes/Oval.png";
import Pear from "@/components/images/DiamondShapes/Pear.png";
import Princess from "@/components/images/DiamondShapes/Princess.png";
import Radiant from "@/components/images/DiamondShapes/Radiant.png";
import RadiantSq from "@/components/images/DiamondShapes/Radiant Square.png";
import CheckBoxImage from "@/components/common/SnapCheckBox";

const StoneHeader = () => {
  const DimondShapes = [
    { id: "round", src: round, alt: "Round",value:"1",fieldName:"shapE_SEQ" },
    { id: "Oval", src: Oval, alt: "Oval",value:"7",fieldName:"shapE_SEQ" },
    { id: "Emerald", src: Emerald, alt: "Emerald",value:"4",fieldName:"shapE_SEQ" },
    { id: "Radiant", src: Radiant, alt: "Radiant",value:"13",fieldName:"shapE_SEQ" },
    { id: "CushionLong", src: CushionLong, alt: "Cushion Lg.",value:"88",fieldName:"shapE_SEQ" },
    { id: "Pear", src: Pear, alt: "Pear",value:"6",fieldName:"shapE_SEQ" },
    { id: "Marquise", src: Marquise, alt: "Marquise",value:"3",fieldName:"shapE_SEQ" },
    { id: "Princess", src: Princess, alt: "Princess",value:"2",fieldName:"shapE_SEQ" },
    { id: "Cushion", src: Cushion, alt: "Cushion Sq.",value:"89",fieldName:"shapE_SEQ" },
    { id: "Heart", src: Heart, alt: "Heart",value:"15",fieldName:"shapE_SEQ" },
    { id: "Asscher", src: Asscher, alt: "Asscher",value:"28",fieldName:"shapE_SEQ" },
    { id: "Baguette", src: Baguette, alt: "Baguette", value:"26", fieldName:"shapE_SEQ" },
    { id: "RadiantSq", src: RadiantSq, alt: "Radiant Sq.",value:"14",fieldName:"shapE_SEQ" },
  ];
  type Image = {
    id: string;
    src: any;
    alt: string;
    value?: string;
    fieldName?:string;
  };
  return (
    <div className="bg-[#f0f0f0] p-3 lg:rounded-full flex justify-evenly items-center font-serif  overflow-x-scroll no-scrollbar m-3 mt-0">
      {DimondShapes.map((shape: Image) => (
        <CheckBoxImage
          image={true}
          id={shape.id}
          src={shape.src}
          alt={shape.alt}
          name={shape.alt}
          customClass="xl:size-[75px] size-[60px]"
          key={shape.id}
          value={shape.value}
          fieldName={shape.fieldName}
        />
      ))}
    </div>
  );
};

export default StoneHeader;
