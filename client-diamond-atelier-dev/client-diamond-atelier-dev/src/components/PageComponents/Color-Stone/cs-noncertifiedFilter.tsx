"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
  default as CheckBoxImage,
  default as SnapCheckBox,
} from "@/components/common/SnapCheckBox";
import SnapInput from "@/components/common/SnapInput";
import black from "@/components/images/color-stone/Black.png";
import blue from "@/components/images/color-stone/Blue.png";
import Pink from "@/components/images/color-stone/Pink.png";
import brown from "@/components/images/color-stone/Brown.png";
import green from "@/components/images/color-stone/Green.png";
import grey from "@/components/images/color-stone/grey.png";
import olive from "@/components/images/color-stone/Olive.png";
import orange from "@/components/images/color-stone/Orange.png";
import purple from "@/components/images/color-stone/Purple.png";
import red from "@/components/images/color-stone/Red.png";
import yellow from "@/components/images/color-stone/Yellow2.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SnapDropdown from "@/components/common/SnapDropdown";
import { Icon } from "@iconify/react";

const CsNoncertifiedFilter = () => {
  const [toggle, setToggle] = useState(false);
  const [clarityToggle, setClarityToggle] = useState(false);

  const Clarity = [
    { id: "IF", name: "IF", fieldName: "", value: "" },
    { id: "VVS1", name: "VVS1", fieldName: "", value: "" },
    { id: "VVS2", name: "VVS2", fieldName: "", value: "" },
    { id: "VS1", name: "VS1", fieldName: "", value: "" },
    { id: "VS2", name: "VS2", fieldName: "", value: "" },
    { id: "SI1", name: "SI1", fieldName: "", value: "" },
    { id: "SI2", name: "SI2", fieldName: "", value: "" },
    { id: "SI3", name: "SI3-", fieldName: "", value: "" },
    // { id: "I1", name: "I1", fieldName: "", value: "" },
    // { id: "I2", name: "I2", fieldName: "", value: "" },
    // { id: "I3", name: "I3", fieldName: "", value: "" },
  ];

  const Grown = [
    { id: "CVD", name: "CVD",fieldName:"" },
    { id: "HPHT", name: "HPHT",fieldName:"" },
    { id: "BOTH", name: "BOTH",fieldName:"" },
  ];
  const Availability = [
    { id: "STOCK", name: "STOCK",fieldName:"" },
    { id: "INTRANSIT", name: "IN TRANSIT",fieldName:"" },
    { id: "HOLD", name: "HOLD",fieldName:"" },
    { id: "MEMO", name: "MEMO",fieldName:"" },
  ];

  const ColorStone = [
    { id: "Yellow", src: yellow, alt: "Yellow" },
    { id: "Pink", src: Pink, alt: "Pink" },
    { id: "Blue", src: blue, alt: "Blue" },
    { id: "Green", src: green, alt: "Green" },
    { id: "Black", src: black, alt: "Black" },
    { id: "Brown", src: brown, alt: "Brown" },
    { id: "Grey", src: grey, alt: "Grey" },
    { id: "Olive", src: olive, alt: "Olive" },
    { id: "Pink", src: Pink, alt: "Pink" },
    { id: "Purple", src: purple, alt: "Purple" },
    { id: "Orange", src: orange, alt: "Orange" },
    { id: "Red", src: red, alt: "Red" },
  ];
  const Intensity = [
    { id: "FANCY DARK", name: "FANCY DARK",fieldName:"" },
    { id: " FANCY DARK", name: " FANCY DARK",fieldName:"" },
    { id: " FANCY VIVID", name: " FANCY VIVID",fieldName:"" },
    { id: "FANCY INTENSE", name: "FANCY INTENSE",fieldName:"" },
    { id: "FANCY", name: "FANCY",fieldName:"" },
    { id: " FANCY LIGHT", name: " FANCY LIGHT",fieldName:"" },
    { id: " LIGHT", name: "LIGHT",fieldName:"" },
    { id: " VERY LIGHT", name: " VERY LIGHT",fieldName:"" },
    { id: " FAINT", name: "FAINT",fieldName:"" },
  ];

  const Countries = [
    { id: "All", name: "All"},
    { id: "New York", name: "NY"},
    { id: "Los Angeles", name: "LA"},
    { id: "India", name: "India"}
  ];

  interface Item {
    id: string;
    name: string;
    fieldName?:string;
  }
  type Image = {
    id: string;
    src: any;
    alt: string;
    fieldName?:string
  };
  return (
    <div>
      <div className="flex flex-col justify-center space-y-5">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center gap-8">
          <div className="w-full">
            <p className="text-md font-extrabold mb-2 font-serif">CARAT</p>
            <div className="bg-[#f0f0f0]  px-10 py-4 rounded-full flex items-center gap-5">
              <SnapInput
                placeholder="Min Carat"
                name="Min Carat"
                shadow={true}
                type="number"
              />
              <p>To</p>
              <SnapInput
                placeholder="Max Carat"
                name="Max Carat"
                shadow={true}
                type="number"
              />
            </div>
          </div>
          <div className="w-full">
          <p className="text-md font-extrabold mb-2 font-serif">COLOR</p>
          <div className="w-full relative">
            <div className="w-full bg-[#f0f0f0] pt-1 flex justify-items-evenly rounded-full py-0.5 grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-5 px-14 pr-1 absolute z-20">
              {ColorStone.slice(0, 4).map((shape: Image) => (
                <CheckBoxImage
                  image={true}
                  id={shape.id}
                  src={shape.src}
                  alt={shape.alt}
                  name={shape.alt}
                  shadow={true}
                  customClass="size-9"
                  key={shape.id}
                />
              ))}
              <button
                type="button"
                onClick={() => setToggle(!toggle)}
                className="flex items-center mt-3"
              >
                <div className="flex">
                  <span className="text-xs font-extrabold font-serif">
                    {toggle ? "Less" : "More"}
                  </span>
                  <Icon icon="iconamoon:arrow-down-2-duotone"
                    className={`size-4 transform transition-transform ${toggle ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </button>
              {toggle &&
                ColorStone.slice(4).map((shape: Image) => (
                  <CheckBoxImage
                    image={true}
                    id={shape.id}
                    src={shape.src}
                    alt={shape.alt}
                    shadow={true}
                    name={shape.alt}
                    customClass="size-10"
                    key={shape.id}
                  />
                ))}
            </div>
          </div>
        </div>
          <div className="w-full">
            <p className="text-md font-extrabold mb-2 font-serif">CLARITY</p>
            <div className="w-full relative">
            <div className="w-full bg-[#f0f0f0] rounded-full py-4 px-5 gap-2 pr-2 grid grid-cols-5 justify-evenly place-items-evenly absolute ">
              {Clarity.slice(0, 4).map((item: Item) => (
                <SnapCheckBox
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  other={true}
                  customClass="xl:px-4 px-2 py-1"
                  image={false}
                  shadow={true}
                />
              ))}
              <button
                type="button"
                onClick={() => setClarityToggle(!clarityToggle)}
                className="rounded-pill border-0"
              >
                <div className="flex">
                  <span className="text-xs font-extrabold font-serif">
                    {clarityToggle ? "Less" : "More"}
                  </span>
                  <Icon icon="iconamoon:arrow-down-2-duotone" className={`size-4 transform transition-transform ${clarityToggle ? "rotate-180" : ""}`} />
                </div>
              </button>
              {clarityToggle && (
                Clarity.slice(4).map((item: Item) => (
                  <SnapCheckBox
                    id={item.id}
                    name={item.name}
                    key={item.id}
                    other={true}
                    customClass="xl:px-4 px-2 py-1 "
                    image={false}
                    shadow={true} 
                  />
                ))
              )}
            </div>
          </div>
        </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center gap-8">
          <div className="w-full">
            <p className="text-md font-extrabold mb-2 font-serif">RATIO</p>
            <div className="bg-[#f0f0f0]  px-10 py-4 rounded-full flex items-center gap-5">
              <SnapInput
                placeholder="Min"
                name="Min"
                shadow={true}
                type="number"
              />
              <p className="font-serif font-semibold">To</p>
              <SnapInput
                placeholder="Max"
                name="Max"
                shadow={true}
                type="number"
              />
            </div>
          </div>
          <div className="w-full">
            <p className="text-md font-extrabold mb-2 font-serif">GROWN</p>
            <div className="bg-[#f0f0f0] pr-5 pl-3 py-4 rounded-full flex justify-evenly ">
              {Grown.map((item: Item) => (
                <SnapCheckBox
                  other={true}
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  customClass="px-4 py-1"
                  image={false}
                  shadow={true}
                  fieldName={item.fieldName}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
          <p className="text-md font-extrabold mb-2 font-serif">AVAILABILITY</p>
          <div className="bg-[#f0f0f0] py-4 rounded-full flex justify-center space-x-1">
            {Availability.map((item: Item) => (
              <SnapCheckBox
                other={true}
                id={item.id}
                name={item.name}
                key={item.id}
                image={false}
                shadow={true}
                customClass="xl:px-3 px-1 py-1"
                fieldName={item.fieldName}
              />
            ))}
          </div>
        </div>
        </div>
         <div className="flex flex-col space-y-5">
          {/* <div className="flex justify-center gap-5 mt-10">
            <button
              className="bg-blue-700 text-white px-6 py-2 rounded-full font-serif"
              type="submit"
            >
              Clear Search
            </button>
            <button
              className="bg-blue-700 text-white px-6 py-2 rounded-full font-serif"
              type="submit"
            >
              Search
            </button>
          </div>
          <a href="#filter">
            <div className="bg-gray-300 px-6 py-2 rounded-full w-fit mx-auto flex items-center gap-3 font-serif">
              More Filters
              <IoIosArrowDown className="size-5" />
            </div>
          </a> */} 
          <div className="space-y-1" id="filter">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] px-5 ">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Stock</p>
              <div className="px-4 py-4 flex gap-5">
                <SnapInput
                  placeholder="Enter Report/Stock ID"
                  name="packeT_NO"
                  type="text"
                  customClass="w-full py-1.5"
                  shadow={true}
                />
              </div>
            </div>
            {/* <div className="w-full flex items-center">
                <p className="text-md font-semibold ">Certificate</p>
                <div className="px-2 py-6  flex gap-5">
                  <SnapInput
                    placeholder="Enter Report No."
                    name="reporT_NO"
                    shadow={true}
                    type="text"
                    customClass="w-full px-3 py-1.5"
                  />
                </div>
              </div> */}
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Location</p>
              <div className="px-3 py-4 flex justify-evenly gap-1">
                {Countries.map((item: Item) => (
                  <SnapCheckBox
                    id={item.id}
                    name={item.name}
                    key={item.id}
                    other={true}
                    shadow={true}
                    customClass="xl:px-6 px-3 py-1"
                    image={false}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Disc%</p>
              <div className=" px-3 py-4 flex gap-2">
                <SnapInput placeholder="%" name="DISCP_from" shadow={true}
                />
                <p className="font-serif font-semibold">To</p> 
                <SnapInput placeholder="%" name="DISCP_to" shadow={true}
                />
              </div>
            </div>
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">P/Ct</p>
              <div className=" px-5 py-4  flex gap-2">
                <SnapInput
                  placeholder="$"
                  name="f_RATE"
                  customClass="w-full py-1"
                  shadow={true}
                />
                <p className="font-serif font-semibold">To</p>
                <SnapInput
                  placeholder="$"
                  name="t_RATE"
                  customClass="w-full py-1"
                  shadow={true}
                />
              </div>
            </div>
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Total Amt</p>
              <div className="px-3 py-4  flex items-center gap-2">
                <SnapInput placeholder="$" name="f_VALUE" shadow={true}
                />
                <p className="font-serif font-semibold">To</p>
                <SnapInput placeholder="$" name="t_VALUE" shadow={true}
                />
              </div>
            </div>
          </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Length</p>
                <div className="bg-[#f0f0f0] px-4 py-4 rounded-full flex gap-5">
                  <SnapInput placeholder="MM" name="MM" type="number" shadow={true}/>
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="MM" type="number" shadow={true} />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Width</p>
                <div className="bg-[#f0f0f0]  px-4 py-4 rounded-full flex gap-5">
                  <SnapInput placeholder="MM" name="MM" type="number" shadow={true}/>
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="MM" type="number" shadow={true}/>
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Depth</p>
                <div className="bg-[#f0f0f0]  px-4 py-4 rounded-full flex gap-5">
                  <SnapInput placeholder="MM" name="MM" type="number" shadow={true}/>
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="MM" type="number" shadow={true}/>
                </div>
              </div>
            </div>
            <div className="grid  text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Color Intensity</p>
                <div className="px-2 py-3 flex justify-start gap-1 flex-wrap grid grid-cols-5">
                  {Intensity.map((item: Item) => (
                    <SnapCheckBox
                      fieldName={item?.fieldName}
                      id={item?.id}
                      name={item?.name}
                      key={item?.id}
                      other={true}
                      customClass="text-xs px-4 py-1"
                      image={false}
                      shadow={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-auto bg-white p-2 gap-5 mt-10 sticky bottom-0">
          <button
            onClick={() => {
              window.location.href = "/color-stone/certified-stone";
            }}
            className="bg-blue-700 text-white px-6 py-2 rounded-full font-serif"
            type="button"
          >
            Clear Search
          </button>
          <button
            className="bg-blue-700 text-white px-6 py-2 rounded-full font-serif"
            type="submit"
          >
            Search
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CsNoncertifiedFilter;
