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
import CheckBoxImage from "../common/SnapCheckBox";
import SnapPopoverBox from "../common/SnapPopoverBox";
const StoneHeader = () => {
  const ExoticSHapes1 = [
    { id: "Baguette", src: Baguette, alt: "Baguette" },
    { id: "T Baguette", src: TBaguette, alt: "T Baguette" },
    { id: "Trapezoid", src: Trapezoid, alt: "Trapezoid" },
    { id: "Trillion", src: Trillion, alt: "Trillion" },
    { id: "Half Moon", src: HalfMoon, alt: "Half Moon" },
    { id: "Kite", src: Kite, alt: "Kite" },
    { id: "Bullet", src: Bullet, alt: "Bullet" },
    { id: "Shield", src: Shield, alt: "Shield" },
    { id: "Triangle", src: Triangle, alt: "Triangle" },
    { id: "Cadilac", src: Cadilac, alt: "Cadilac" },
    { id: "Hexagon", src: Hexagon, alt: "Hexagon" },
    { id: "Long Hexagon", src: LongHexagon, alt: "L Hexagon" },
    { id: "Lozenge", src: Lozenge, alt: "Lozenge" },
  ];

  const ExoticSHapes2 = [
    { id: "Batman", src: Batman, alt: "Batman" },
    { id: "Bone", src: Bone, alt: "Bone" },
    { id: "Buddha", src: Buddha, alt: "Buddha" },
    { id: "Bull", src: Bull, alt: "Bull" },
    { id: "Butterfly", src: Butterfly, alt: "Butterfly" },
    { id: "Cat", src: Cat, alt: "Cat" },
    { id: "Christmas Tree", src: xmas, alt: "Christmas Tree" },
    { id: "Cloud", src: Cloud, alt: "Cloud" },
    { id: "Cross", src: Cross, alt: "Cross" },
    { id: "Dog", src: Dog, alt: "Dog" },
    { id: "Flower", src: Flower, alt: "Flower" },
    { id: "Hamsa", src: Hamsa, alt: "Hamsa" },
    { id: "Horse", src: Horse, alt: "Horse" },
  ];

  type Image = {
    id: string;
    src: any;
    alt: string;
  };
  return (
    <>
      <div className="space-y-5">
        <div className="bg-[#f0f0f0] p-4 lg:rounded-full flex justify-between items-center space-x-4">
          {ExoticSHapes1.map((shape: Image) => (
            <SnapPopoverBox
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              key={shape.id}
              name={shape.alt}
              popoverTitle={shape.alt}
              popoverLink={"/fancy-layouts"}
              customClass="size-20 p-2"
            />
          ))}
        </div>
        <div className="bg-[#f0f0f0] p-4 lg:rounded-full flex justify-between items-center space-x-4">
          {ExoticSHapes2.map((shape: Image) => (
            <CheckBoxImage
              image={true}
              id={shape.id}
              src={shape.src}
              alt={shape.alt}
              key={shape.id}
              name={shape.alt}
              customClass="size-20 p-0"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StoneHeader;
