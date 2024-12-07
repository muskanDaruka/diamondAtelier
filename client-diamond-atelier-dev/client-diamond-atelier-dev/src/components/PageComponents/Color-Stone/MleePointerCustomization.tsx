import { useState } from "react";
import SnapCheckBox from "@/components/common/SnapCheckBox";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import black from "@/components/images/color-stone/Black.png";
import blue from "@/components/images/color-stone/Blue.png";
import brown from "@/components/images/color-stone/Brown.png";
import green from "@/components/images/color-stone/Green.png";
import grey from "@/components/images/color-stone/grey.png";
import olive from "@/components/images/color-stone/Olive.png";
import purple from "@/components/images/color-stone/Purple.png";
import orange from "@/components/images/color-stone/Orange.png";
import pink from "@/components/images/color-stone/Pink.png";
import red from "@/components/images/color-stone/Red.png";
import yellow from "@/components/images/color-stone/Yellow2.png";
import violet from "@/components/images/color-stone/Violet.png";
import CheckBoxImage from "@/components/common/SnapCheckBox";
import SnapDropdown from "@/components/common/SnapDropdown";
import { useFormContext } from "react-hook-form";

const MleePointerCustomization = () => {
  const [toggle, setToggle] = useState(false);
  const [filter, setFilter] = useState(false);
  const { setValue, watch } = useFormContext();

  const clarity = [
    { id: "VVS-VS", name: "VVS - VS", fieldName: "purgrp", value:"VVS-VS" },
    { id: "SI1&SI2", name: "SI1 & SI2", fieldName: "purgrp", value:"SI1-SI2" },
    { id: "SI3&I1", name: "SI3 - I1", fieldName: "purgrp", value:"SI3-I1" },
  ];
  const Availability = [
    { id: "STOCK", name: "STOCK", fieldName: "stock", value:"A,WP"  },
    { id: "HOLD", name: "HOLD", fieldName: "stock", value:"H"  },
    { id: "MEMO", name: "MEMO", fieldName: "stock", value:"M"  },
    { id: "INTRANSIT", name: "INTRANSIT", fieldName: "stock", value:"B"  },

  ];
  const Intensity = [
    { id: "FANCY DARK", name: "FANCY DARK", fieldName: "intensity", value:"DARK"  },
    { id: "FANCY DEEP", name: " FANCY DEEP", fieldName: "intensity", value:"DEEP"  },
    { id: "FANCY VIVID", name: " FANCY VIVID", fieldName: "intensity", value:"VIVID"  },
    { id: "FANCY INTENSE", name: "FANCY INTENSE", fieldName: "intensity", value:"INTENSE"  },
    { id: "FANCY", name: "FANCY", fieldName: "intensity", value:"FANCY"  },
    { id: "FANCY LIGHT", name: "FANCY LIGHT", fieldName: "intensity", value:"LIGHT"  },
    { id: "LIGHT", name: "LIGHT", fieldName: "intensity", value:"LIGHT"  },
    { id: "VERY LIGHT", name: "VERY LIGHT", fieldName: "intensity", value:"VERY LIGHT"  },
    { id: "FAINT", name: "FAINT", fieldName: "intensity", value:"FAINT"  },
  ];
  const ColorStone = [
    { id: "Pink", src: pink, alt: "Pink", fieldName: "fancY_COLOR", value:"PINK" },
    { id: "Blue", src: blue, alt: "Blue", fieldName: "fancY_COLOR", value:"BLUE" },
    { id: "Green", src: green, alt: "Green", fieldName: "fancY_COLOR", value:"GREEN" },
    { id: "Yellow", src: yellow, alt: "Yellow", fieldName: "fancY_COLOR", value:"YELLOW" },
    { id: "Black", src: black, alt: "Black", fieldName: "fancY_COLOR", value:"BLACK" },
    { id: "Brown", src: brown, alt: "Brown", fieldName: "fancY_COLOR", value:"BROWN" },
    { id: "Grey", src: grey, alt: "Grey", fieldName: "fancY_COLOR", value:"GREY" },
    { id: "Olive", src: olive, alt: "Olive", fieldName: "fancY_COLOR", value:"OLIVE" },
    { id: "Purple", src: purple, alt: "Purple", fieldName: "fancY_COLOR", value:"PURPLE" },
    { id: "Orange", src: orange, alt: "Orange", fieldName: "fancY_COLOR", value:"ORANGE" },
    { id: "Red", src: red, alt: "Red", fieldName: "fancY_COLOR", value:"RED" },
    { id: "Violet", src: violet, alt: "Violet", fieldName: "fancY_COLOR", value:"VIOLET" },
  ];

  const Countries = [
    { id: "All", name: "All", value: "All", fieldName: "location" },
    { id: "New York", name: "NY", value: "New York", fieldName: "location" },
    { id: "Los Angeles", name: "LA", value: "Los Angeles", fieldName: "location" },
    { id: "India", name: "India", value: "India", fieldName: "location" }
  ];

  interface Item {
    id: string;
    name: string;
    fieldName?: string;
    value?:string;
  }
  type Image = {
    id: string;
    src: any;
    alt: string;
    fieldName?: string;
    value:string;
  };
  return (
    <div className="flex flex-col justify-start space-y-5 px-1 mt-7">
      <div className="bg-[#f0f0f0] p-5 rounded-xl">
        <div className="w-full grid  grid-cols-12">
          <p className="text-md font-semibold mt-5 col-span-3 font-serif">Color</p>
          <div className="relative py-4 rounded-full grid grid-cols-5 place-items-center justify-evenly items-start gap-4 col-span-9">
            {ColorStone.slice(0, 4).map((shape: Image) => (
              <CheckBoxImage
                image={true}
                id={shape.id}
                src={shape.src}
                alt={shape.alt}
                name={shape.alt}
                customClass="size-10"
                value={shape.value}
                key={shape.id}
                fieldName={shape.fieldName}
              />
            ))}
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="flex items-center mt-4"
            >
              <span className="text-sm font-extrabold font-serif">More</span>
              {toggle ? (
                <IoIosArrowUp />
              ) : (
                <MdOutlineKeyboardArrowDown className="size-5" />
              )}
            </button>
            {toggle && (
            <div className="grid grid-cols-4 absolute transform translate-y-full bottom-0 p-2 rounded-xl w-full  font-serif bg-[#f5f5f5] z-10">
              {ColorStone.slice(4).map((shape: Image) => (
                <CheckBoxImage
                  image={true}
                  id={shape.id}
                  src={shape.src}
                  alt={shape.alt}
                  name={shape.alt}
                  customClass="size-12"
                  key={shape.id}
                  value={shape.value}
                  fieldName={shape.fieldName}
                />
              ))}
            </div>
          )}
          </div>
        </div>
        <div className="w-full grid items-center  grid-cols-12">
          <p className="text-md font-semibold col-span-3 font-serif">Clarity</p>
          <div className="px-3 py-4 rounded-full flex justify-start gap-2 col-span-9">
            {clarity.map((item: Item) => (
              <SnapCheckBox
                id={item.id}
                name={item.name}
                key={item.id}
                other={true}
                value={item.value}
                customClass="xl:px-4 px-2 py-1"
                image={false}
                shadow={true}
                fieldName={item.fieldName}
              />
            ))}
          </div>
        </div>
        <div className="w-full grid place-items-start grid-cols-12">
          <p className="text-md font-semibold col-span-3 py-2 font-serif">Availability</p>
          <div className=" px-3 py-4 flex justify-evenly gap-1 col-span-9">
            {Availability.map((item: Item) => (
              <SnapCheckBox
                id={item.id}
                name={item.name}
                key={item.id}
                other={true}
                image={false}
                value={item.value}
                customClass="xl:px-4 px-2 py-1"
                shadow={true}
                fieldName={item.fieldName}
              />
            ))}
          </div>
        </div>
        <div className="w-full grid place-items-start grid-cols-12">
          <p className="text-md font-semibold col-span-3 py-2 font-serif">Location</p>
          <div className="px-3 py-4 flex justify-evenly gap-1 col-span-9">
            {Countries.map((item: Item) => (
              <SnapCheckBox
                id={item.id}
                name={item.name}
                key={item.id}
                other={true}
                shadow={true}
                customClass="xl:px-4 px-2 py-1"
                image={false}
                value={item.value}
                fieldName={item.fieldName}
                onClick={() => {
                  const currentValues = watch('location') || [];
                  if (item.id === 'All') {
                    if (currentValues.includes('New York') && currentValues.includes('Los Angeles') && currentValues.includes('India')) {
                      setValue('location', []);
                    } else {
                      setValue('location', ['New York', 'Los Angeles','India','All']);
                    }
                  } else {
                    const newValues = currentValues.includes(item.value)
                      ? currentValues.filter((val:any) => val !== item.value)
                      : [...currentValues, item.value];
                    setValue('location', newValues);
                  }
                }}
              />
            ))}
          </div>
        </div>
        <div className="w-full grid place-items-start grid-cols-12">
          <p className="text-md font-semibold col-span-3 py-2 font-serif">Intensity</p>
          <div className="px-3 py-4 flex grid lg:grid-cols-3 sm:grid-cols-2 justify-evenly col-span-9 gap-1">
            {Intensity.map((item: Item) => (
              <SnapCheckBox
                id={item.id}
                name={item.name}
                key={item.id}
                other={true}
                image={false}
                customClass="xl:px-3 px-3 text-nowrap"
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

export default MleePointerCustomization;
