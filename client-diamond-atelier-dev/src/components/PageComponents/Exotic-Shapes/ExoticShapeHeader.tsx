import Baguette from "@/components/images/ExoticShapes1/baguette .png";
import Bullet from "@/components/images/ExoticShapes1/bullet copy.png";
import Cadilac from "@/components/images/ExoticShapes1/Cadillac.png";
import HalfMoon from "@/components/images/ExoticShapes1/half moon.png";
import Hexagon from "@/components/images/ExoticShapes1/Hexagon.png";
import Kite from "@/components/images/ExoticShapes1/Kite.png";
import LongHexagon from "@/components/images/ExoticShapes1/Long hexagon.png";
import Lozenge from "@/components/images/ExoticShapes1/Lozenge.png";
import Shield from "@/components/images/ExoticShapes1/Shield.png";
import TBaguette from "@/components/images/ExoticShapes1/tapered baguette.png";
import Trapezoid from "@/components/images/ExoticShapes1/trapezoid diamond.png";
import {
  default as Triangle,
  default as Trillion,
} from "@/components/images/ExoticShapes1/Trillion.png";
import CheckBoxImage from "@/components/common/SnapCheckBox";
import SnapPopoverBox from "@/components/common/SnapPopoverBox";
import Bull from "@/components/images/Bull.png";
import Cross from "@/components/images/Cross.png";
import Dog from "@/components/images/Dog.png";
import Batman from "@/components/images/ExoticShapes2/Batman.png";
import Bone from "@/components/images/ExoticShapes2/Bone.png";
import Buddha from "@/components/images/ExoticShapes2/Buddha.png";
import Butterfly from "@/components/images/ExoticShapes2/Butterfly.png";
import Cat from "@/components/images/ExoticShapes2/Cat.png";
import Cloud from "@/components/images/ExoticShapes2/Cloud.png";
import Hamsa from "@/components/images/ExoticShapes2/Hamsa.png";
import Horse from "@/components/images/ExoticShapes2/Horse.png";
import xmas from "@/components/images/ExoticShapes2/X mas tree.png";
import Flower from "@/components/images/Flower.png";

const StoneHeader = () => {
  const ExoticSHapes1 = [
    { id: "Baguette", src: Baguette, alt: "Baguette", fieldName: "shape", value: "Baguette"  },
    { id: "T Baguette", src: TBaguette, alt: "TBaguette", fieldName: "shape", value: "TRAPEZOID" },
    { id: "Trapezoid", src: Trapezoid, alt: "Trapezoid", fieldName: "shape", value: "TRAPEZOID" },
    { id: "Trillion", src: Trillion, alt: "Trillion", fieldName: "shape", value: "TRILLION" },
    { id: "Half Moon", src: HalfMoon, alt: "Half Moon", fieldName: "shape", value: "HALF MOON" },
    { id: "Kite", src: Kite, alt: "Kite", fieldName: "shape", value: "KITE" },
    { id: "Bullet", src: Bullet, alt: "Bullet", fieldName: "shape", value: "BULLET" },
    { id: "Shield", src: Shield, alt: "Shield", fieldName: "shape", value: "SHIELD" },
    { id: "Triangle", src: Triangle, alt: "Triangle", fieldName: "shape", value: "TRIANGLE" },
    { id: "Cadilac", src: Cadilac, alt: "Cadilac", fieldName: "shape", value: "CADILAC" },
    { id: "Hexagon", src: Hexagon, alt: "Hexagon", fieldName: "shape", value: "HEXAGON" },
    { id: "Long Hexagon", src: LongHexagon, alt: "HexagonLg.", fieldName: "shape", value: "LONG HEXAGON" },
    { id: "Lozenge", src: Lozenge, alt: "Lozenge", fieldName: "shape", value: "LOZENGE" },
  ];

  const ExoticSHapes2 = [
    { id: "Batman", src: Batman, alt: "Batman", fieldName: "shape", value: "BATMAN" },
    { id: "Bone", src: Bone, alt: "Bone", fieldName: "shape", value: "BONE" },
    { id: "Buddha", src: Buddha, alt: "Buddha", fieldName: "shape", value: "BUDDHA" },
    { id: "Bull", src: Bull, alt: "Bull", fieldName: "shape", value: "BULL" },
    { id: "Butterfly", src: Butterfly, alt: "Butterfly", fieldName: "shape", value: "BUTTERFLY" },
    { id: "Cat", src: Cat, alt: "Cat", fieldName: "shape", value: "CAT" },
    { id: "Christmas Tree", src: xmas, alt: "Christmas Tree", fieldName: "shape", value: "CHRISTMAS TREE" },
    { id: "Cloud", src: Cloud, alt: "Cloud", fieldName: "shape", value: "CLOUD" },
    { id: "Cross", src: Cross, alt: "Cross", fieldName: "shape", value: "CROSS" },
    { id: "Dog", src: Dog, alt: "Dog", fieldName: "shape", value: "DOG" },
    { id: "Flower", src: Flower, alt: "Flower", fieldName: "shape", value: "FLOWER" },
    { id: "Hamsa", src: Hamsa, alt: "Hamsa", fieldName: "shape", value: "HAMSA" },
    { id: "Horse", src: Horse, alt: "Horse", fieldName: "shape", value: "HORSE" },
  ];

  type Image = {
    id: string;
    src: any;
    alt: string;
    value?: string;
    fieldName?: string;
  };
  return (
    <div className="space-y-2">
      <div className="bg-[#f0f0f0] p-4 lg:rounded-full flex justify-evenly font-serif items-center space-x-4 overflow-x-scroll no-scrollbar m-3 mt-0">
      {ExoticSHapes1.map((shape: Image) => (
          shape.id === "Baguette" ? (
            <SnapPopoverBox
              image={true}
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              name={shape.alt}
              key={shape.id}
              customClass="size-[60px] p-0"
              popoverContent={shape.alt}
              popoverTitle={shape.alt}
              popoverLink="/fancy-layouts"
            />
          ) : (
            <CheckBoxImage
              image={true}
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              name={shape.alt}
              customClass="size-[60px] p-0"
              key={shape.id}
              value={shape.value}
              fieldName={shape.fieldName}
            />
          )
        ))}
      </div>
      <div className="bg-[#f0f0f0] p-4 lg:rounded-full flex font-serif justify-evenly items-center space-x-4 overflow-x-scroll no-scrollbar m-3 mt-0">
        {ExoticSHapes2.map((shape: Image) => (
          <CheckBoxImage
            image={true}
            id={shape.id}
            src={shape.src}
            alt={shape.alt}
            name={shape.alt}
            customClass="size-[60px] p-0"
            key={shape.id}
            value={shape.value}
            fieldName={shape.fieldName}
          />
        ))}
      </div>
    </div>
  );
};

export default StoneHeader;
