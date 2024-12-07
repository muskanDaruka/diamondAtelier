import Asscher from "@/components/images/DiamondShapes/Asscher.png";
import Cushion from "@/components/images/DiamondShapes/cushion Square.png";
import Emerald from "@/components/images/DiamondShapes/Emerald.png";
import Heart from "@/components/images/DiamondShapes/Heart.png";
import Marquise from "@/components/images/DiamondShapes/Marquise.png";
import Oval from "@/components/images/DiamondShapes/Oval.png";
import Pear from "@/components/images/DiamondShapes/Pear.png";
import Princess from "@/components/images/DiamondShapes/Princess.png";
import Radiant from "@/components/images/DiamondShapes/Radiant.png";
import round from "@/components/images/DiamondShapes/Round.png";
import CheckBoxImage from "@/components/common/SnapCheckBox";
import Baguette from "@/components/images/ExoticShapes1/baguette .png";

const NonCertifiedHeader = () => {
  const DimondShapes = [
    { id: "round", src: round, alt: "Round", fieldName:"shape", value:"ROUND" },
    { id: "Baguette", src: Baguette, alt: "Baguette", fieldName:"shape", value:"BAGUETTE" },
    { id: "Princess", src: Princess, alt: "Princess", fieldName:"shape", value:"PRINCESS" },
    { id: "Cushion", src: Cushion, alt: "Cushion", fieldName:"shape", value:"CUSHION" },
    { id: "Radiant", src: Radiant, alt: "Radiant", fieldName:"shape", value:"RADIANT" },
    { id: "Asscher", src: Asscher, alt: "Asscher", fieldName:"shape", value:"ASSCHER" },
    { id: "Emerald", src: Emerald, alt: "Emerald", fieldName:"shape", value:"EMERALD" },
    { id: "Oval", src: Oval, alt: "Oval", fieldName:"shape", value:"OVAL" },
    { id: "Pear", src: Pear, alt: "Pear", fieldName:"shape", value:"PEAR" },
    { id: "Marquise", src: Marquise, alt: "Marquise", fieldName:"shape", value:"MARQUISE" },
    { id: "Heart", src: Heart, alt: "Heart", fieldName:"shape", value:"HEART" },
  ];
  type Image = {
    id: string;
    src: any;
    alt: string;
    fieldName?:string;
    value:string;
  };
  return (
    <>
      <div>
        <div className="bg-[#f0f0f0] p-3 lg:rounded-full flex justify-evenly items-center font-serif  overflow-x-scroll no-scrollbar m-3 mt-0">
          {DimondShapes.map((shape: Image) => (
            <CheckBoxImage
              image={true}
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              key={shape.id}
              name={shape.alt}
              customClass="size-[60px] "
              value={shape.value}
              fieldName={shape.fieldName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NonCertifiedHeader;
