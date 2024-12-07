import CheckBoxImage from "@/components/common/SnapCheckBox";
import Asscher from "@/components/images/DiamondShapes/Asscher.png";
import Cushion from "@/components/images/DiamondShapes/cushion Square.png";
import Emerald from "@/components/images/DiamondShapes/Emerald.png";
import Heart from "@/components/images/DiamondShapes/Heart.png";
import Marquise from "@/components/images/DiamondShapes/Marquise.png";
import Oval from "@/components/images/DiamondShapes/Oval.png";
import Pear from "@/components/images/DiamondShapes/Pear.png";
import Princess from "@/components/images/DiamondShapes/Princess.png";
import Radiant from "@/components/images/DiamondShapes/Radiant.png";
const CSNonCertifiedStoneHeader = () => {
  const DimondShapes = [
    { id: "Princess", src: Princess, alt: "Princess",fieldName:"" },
    { id: "Cushion", src: Cushion, alt: "Cushion",fieldName:"" },
    { id: "Radiant", src: Radiant, alt: "Radiant",fieldName:"" },
    { id: "Asscher", src: Asscher, alt: "Asscher",fieldName:"" },
    { id: "Emerald", src: Emerald, alt: "Emerald",fieldName:"" },
    { id: "Oval", src: Oval, alt: "Oval",fieldName:"" },
    { id: "Pear", src: Pear, alt: "Pear",fieldName:"" },
    { id: "Marquise", src: Marquise, alt: "Marquise",fieldName:"" },
    { id: "Heart", src: Heart, alt: "Heart",fieldName:"" },
  ];
  type Image = {
    id: string;
    src: any;
    alt: string;
    fieldName?:string;
  };
  return (
    <>
      <div>
        <div className="bg-[#f0f0f0] font-serif mt-5 lg:rounded-full flex justify-between items-center space-x-2 overflow-x-scroll no-scrollbar px-5 py-2">
          {DimondShapes.map((shape: Image) => (
            <CheckBoxImage
              image={true}
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              name={shape.alt}
              customClass="size-20 px-2"
              key={shape.id}
              fieldName={shape.fieldName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CSNonCertifiedStoneHeader;
