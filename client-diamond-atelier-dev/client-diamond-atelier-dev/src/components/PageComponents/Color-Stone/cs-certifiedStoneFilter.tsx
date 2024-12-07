"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SnapCheckBox from "@/components/common/SnapCheckBox";
import SnapInput from "@/components/common/SnapInput";
import CheckBoxImage from "@/components/common/SnapCheckBox";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import black from "@/components/images/color-stone/Black.png";
import blue from "@/components/images/color-stone/Blue.png";
import brown from "@/components/images/color-stone/Brown.png";
import green from "@/components/images/color-stone/Green.png";
import grey from "@/components/images/color-stone/grey.png";
import olive from "@/components/images/color-stone/Olive.png";
import violet from "@/components/images/color-stone/Violet.png";
import purple from "@/components/images/color-stone/Purple.png";
import orange from "@/components/images/color-stone/Orange.png";
import pink from "@/components/images/color-stone/Pink.png";
import red from "@/components/images/color-stone/Red.png";
import yellow from "@/components/images/color-stone/Yellow2.png";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";

const CsCertifiedStoneFilter = () => {
  const [toggle, setToggle] = useState(false);
  const [clarityToggle, setClarityToggle] = useState(false);
  const { setValue, watch } = useFormContext();

  const Clarity = [
    { id: "IF", name: "IF", fieldName: "puritY_SEQ", value: "2" },
    { id: "VVS1", name: "VVS1", fieldName: "puritY_SEQ", value: "3" },
    { id: "VVS2", name: "VVS2", fieldName: "puritY_SEQ", value: "4" },
    { id: "VS1", name: "VS1", fieldName: "puritY_SEQ", value: "5" },
    { id: "VS2", name: "VS2", fieldName: "puritY_SEQ", value: "6" },
    { id: "SI1", name: "SI1", fieldName: "puritY_SEQ", value: "7" },
    { id: "SI2", name: "SI2", fieldName: "puritY_SEQ", value: "8" },
    { id: "SI3", name: "SI3-", fieldName: "puritY_SEQ", value: "9,10,11,12" },
    // { id: "I1", name: "I1", fieldName: "puritY_SEQ", value: "10" },
    // { id: "I2", name: "I2", fieldName: "puritY_SEQ", value: "11" },
    // { id: "I3", name: "I3", fieldName: "puritY_SEQ", value: "12" },
  ];

  const Lab = [
    { id: "IGI", name: "IGI", fieldName: "laB_SEQ", value: "2" },
    { id: "GIA", name: "GIA", fieldName: "laB_SEQ", value: "1" },
    { id: "CGL", name: "CGL", fieldName: "laB_SEQ", value: "4" },
    { id: "HRD", name: "HRD", fieldName: "laB_SEQ", value: "3" },
    { id: "OTHER", name: "OTHER", fieldName: "laB_SEQ", value: "99" },
  ];
  const Grown = [
    { id: "CVD", name: "CVD", fieldName: "PREFIX", value: "CVD" },
    { id: "HPHT", name: "HPHT", fieldName: "PREFIX", value: "HPHT" },
    { id: "BOTH", name: "BOTH", fieldName: "PREFIX", value: "BOTH" },
  ];
  const Availability = [
    { id: "STOCK", name: "STOCK", fieldName: "deaL_INT_STAGE", value: "A,WP" },
    { id: "HOLD", name: "HOLD", fieldName: "deaL_INT_STAGE", value: "H" },
    { id: "MEMO", name: "MEMO", fieldName: "deaL_INT_STAGE", value: "M" },
    {
      id: "INTRANSIT",
      name: "INTRANSIT",
      fieldName: "deaL_INT_STAGE",
      value: "T",
  },
  { id: "ALL", name: "ALL", fieldName: "deaL_INT_STAGE", value: 'ALL' },
  ];

  const cut = [
    { id: "ID", name: "ID", fieldName: "cuT_SEQ", value: "11" },
    { id: "EX", name: "EX", fieldName: "cuT_SEQ", value: "2" },
    { id: "VG", name: "VG", fieldName: "cuT_SEQ", value: "3" },
    { id: "VG-", name: "VG-", fieldName: "cuT_SEQ", value: "VG-" },
  ];

  const polish = [
    { id: "PEX", name: "EX", fieldName: "polisH_SEQ", value: "2" },
    { id: "PVG", name: "VG", fieldName: "polisH_SEQ", value: "3" },
    { id: "PG-", name: "G-", fieldName: "polisH_SEQ", value: "G-" },
  ];

  const symmetry = [
    { id: "SEX", name: "EX", fieldName: "symM_SEQ", value: "2" },
    { id: "SVG", name: "VG", fieldName: "symM_SEQ", value: "3" },
    { id: "SG-", name: "G-", fieldName: "symM_SEQ", value: "G-" },
  ];
  const ColorStone = [
    {
      id: "Yellow",
      src: yellow,
      alt: "Yellow",
      fieldName: "coloR_SEQ",
      value: "319",
    },
    {
      id: "Pink",
      src: pink,
      alt: "Pink",
      fieldName: "coloR_SEQ",
      value: "408",
    },
    {
      id: "Blue",
      src: blue,
      alt: "Blue",
      fieldName: "coloR_SEQ",
      value: "407",
    },
    {
      id: "Green",
      src: green,
      alt: "Green",
      fieldName: "coloR_SEQ",
      value: "260",
    },
    {
      id: "Black",
      src: black,
      alt: "Black",
      fieldName: "coloR_SEQ",
      value: "476",
    },
    {
      id: "Brown",
      src: brown,
      alt: "Brown",
      fieldName: "coloR_SEQ",
      value: "429",
    },
    {
      id: "Violet",
      src: violet,
      alt: "Violet",
      fieldName: "coloR_SEQ",
      value: "478",
    },
    { id: "Grey", src: grey, alt: "Grey", fieldName: "coloR_SEQ", value: "463" },
    {
      id: "Olive",
      src: olive,
      alt: "Olive",
      fieldName: "coloR_SEQ",
      value: "479",
    },
    {
      id: "Purple",
      src: purple,
      alt: "Purple",
      fieldName: "coloR_SEQ",
      value: "178,176,119",
    },
    {
      id: "Orange",
      src: orange,
      alt: "Orange",
      fieldName: "coloR_SEQ",
      value: "460",
    },
    { id: "Red", src: red, alt: "Red", fieldName: "coloR_SEQ", value: "469" },
  ];

  const Intensity = [
    {
      id: "FANCY DARK",
      name: "FANCY DARK",
      fieldName: "icolor_desc",
      value: "FANCY DARK",
    },
    {
      id: "FANCY DEEP",
      name: "FANCY DEEP",
      fieldName: "icolor_desc",
      value: "FANCY DEEP",
    },
    {
      id: " FANCY VIVID",
      name: " FANCY VIVID",
      fieldName: "icolor_desc",
      value: "FANCY VIVID",
    },
    {
      id: "FANCY INTENSE",
      name: "FANCY INTENSE",
      fieldName: "icolor_desc",
      value: "FANCY INTENSE",
    },
    { id: "FANCY", name: "FANCY", fieldName: "icolor_desc", value: "FANCY" },
    {
      id: " FANCY LIGHT",
      name: " FANCY LIGHT",
      fieldName: "icolor_desc",
      value: "FANCY LIGHT",
    },
    { id: " LIGHT", name: "LIGHT", fieldName: "icolor_desc", value: "LIGHT" },
    {
      id: " VERY LIGHT",
      name: " VERY LIGHT",
      fieldName: "icolor_desc",
      value: "VERY LIGHT",
    },
    { id: " FAINT", name: "FAINT", fieldName: "icolor_desc", value: "FAINT" },
  ];

  const Countries = [
    { id: "All", name: "All", value: "All", fieldName: "country" },
    { id: "New York", name: "NY", value: "New York", fieldName: "country" },
    {
      id: "Los Angeles",
      name: "LA",
      value: "Los Angeles",
      fieldName: "country",
    },
    { id: "India", name: "India", value: "India", fieldName: "country" },
  ];
  interface Item {
    id: string;
    name: string;
    fieldName: string;
    value: string;
  }
  type Image = {
    id: string;
    src: any;
    alt: string;
    fieldName: string;
    value: string;
  };
  return (
    <div className="flex flex-col justify-center space-y-5 m-3 mt-5">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center xl:gap-8 gap-5">
        <div className="w-full">
          <p className="text-md font-extrabold mb-2 font-serif">CARAT</p>
          <div className="bg-[#f0f0f0] px-4 py-4 rounded-full flex items-center gap-5">
            <SnapInput
              placeholder="Min Carat"
              name="froM_WGT"
              shadow={true}
            />
            <p className="font-serif font-semibold">To</p>
            <SnapInput
              placeholder="Max Carat"
              name="tO_WGT"
              shadow={true}
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
                  value={shape.value}
                  fieldName={shape.fieldName}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  setClarityToggle(false);
                  setToggle(!toggle);
                  }
                }
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
                    value={shape.value}
                    fieldName={shape.fieldName}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="w-full mb-14">
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
                  value={item.value}
                  fieldName={item.fieldName}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  setToggle(false);
                  setClarityToggle(!clarityToggle);
                }}
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
                    value={item.value}
                    shadow={true}
                    fieldName={item.fieldName}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center xl:gap-8 gap-5">
        <div className="w-full">
          <p className="text-md font-extrabold mb-2 font-serif">LAB</p>
          <div className="bg-[#f0f0f0] pr-5 pl-3 py-4 rounded-full flex justify-evenly space-x-1">
            {Lab.map((item: Item) => (
              <SnapCheckBox
                id={item.id}
                name={item.name}
                key={item.id}
                value={item.value}
                other={true}
                image={false}
                shadow={true}
                customClass="xl:px-3 px-2 py-1"
                fieldName={item.fieldName}
              />
            ))}
          </div>
        </div>
        <div className="w-full">
          <p className="text-md font-extrabold mb-2 font-serif">GROWN</p>
          <div className="bg-[#f0f0f0] pr-5 pl-3 py-4 rounded-full flex justify-evenly space-x-1">
            {Grown.map((item: Item) => (
              <SnapCheckBox
                other={true}
                id={item.id}
                name={item.name}
                key={item.id}
                value={item.value}
                customClass="xl:px-5 px-5 py-1"
                image={false}
                shadow={true}
                fieldName={item.fieldName}
                onClick={() => {
                  const currentValues = watch('PREFIX') || [];
                  if (item.id === 'BOTH') {
                    if (currentValues.includes('CVD') && currentValues.includes('HPHT')) {
                      setValue('PREFIX', []);
                    } else {
                      setValue('PREFIX', ['CVD', 'HPHT','BOTH']);
                    }
                  } else {
                    const newValues = currentValues.includes(item.value)
                      ? currentValues.filter((val:any) => val !== item.value)
                      : [...currentValues, item.value];
                    setValue('PREFIX', newValues);
                  }
                }}
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
                value={item.value}
                id={item.id}
                name={item.name}
                key={item.id}
                image={false}
                shadow={true}
                customClass="xl:px-2 px-0.5 py-1"
                fieldName={item.fieldName}
                onClick={() => {
                  const currentValues = watch('deaL_INT_STAGE') || [];
                  if (item.id === 'ALL') {
                    if (currentValues.includes('A,WP') && currentValues.includes('H') && currentValues.includes('M') && currentValues.includes('T')) {
                      setValue('deaL_INT_STAGE', []);
                    } else {
                      setValue('deaL_INT_STAGE', ['A,WP', 'H','M','T','ALL']);
                    }
                  } else {
                    const newValues = currentValues.includes(item.value)
                      ? currentValues.filter((val:any) => val !== item.value)
                      : [...currentValues, item.value];
                    setValue('deaL_INT_STAGE', newValues);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-5">
          <div className="space-y-1" id="filter">
            <div className="grid  text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Color Intensity</p>
                <div className="px-2 py-2 flex justify-start gap-1 flex-wrap grid grid-cols-5">
                  {Intensity.map((item: Item) => (
                    <SnapCheckBox
                      fieldName={item?.fieldName}
                      id={item?.id}
                      name={item?.name}
                      key={item?.id}
                      other={true}
                      value={item?.value}
                      customClass="text-xs px-4 py-1"
                      image={false}
                      shadow={true}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              {/* <div className="w-full flex items-center">
                <p className="text-md font-semibold">Disc%</p>
                <div className=" px-2 py-6 flex gap-2 ">
                  <SnapInput
                    placeholder="%"
                    customClass="w-full py-1"
                    name="FDISC_PER"
                    shadow={true}
                  />
                  <p>To</p>
                  <SnapInput
                    placeholder="%"
                    customClass="w-full py-1"
                    name="TDISC_PER"
                    shadow={true}
                  />
                </div>
              </div> */}
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">P/CT</p>
                <div className=" px-6 py-4 flex gap-2">
                  <SnapInput
                    placeholder="$"
                    name="PRATE_FROM"
                    customClass="w-full py-1"
                    shadow={true}
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput
                    placeholder="$"
                    name="PRATE_TO"
                    customClass="w-full py-1"
                    shadow={true}
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Total Amt</p>
                <div className=" px-4 py-4 flex justify-evenly gap-2">
                  <SnapInput placeholder="$" name="PVALUE_FROM" shadow={true}
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="$" name="PVALUE_To" shadow={true}
                  />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center ">
                <p className="text-md font-semibold font-serif">Stock</p>
                <div className="px-5 py-4  flex">
                  <SnapInput
                    placeholder="Enter Stock ID"
                    name="PACKET_NO"
                    type="text"
                    shadow={true}
                    customClass="w-full px-5 py-1"
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Certificate</p>
                <div className="px-3 py-4  flex gap-5">
                  <SnapInput
                    placeholder="Enter Report No."
                    name="reporT_NO"
                    shadow={true}
                    type="text"
                    customClass="w-full px-4 py-1"
                  />
                </div>
              </div>
              {/* <div className="w-full flex items-center">
                <p className="text-md font-semibold xl:ml-5">Cut/Pol/Symm</p>
                <div className="px-3 py-6 flex justify-evenly">
                  <SnapCheckBox
                    id="cut-polish-symmetry"
                    name="3 X"
                    key="cutPolishSymmetry"
                    other={true}
                    shadow={true}
                    customClass="px-4 py-1"
                    image={false}
                    onClick={(e: any) => {
                      if (e.target.checked) {
                        setValue("cuT_SEQ", ["1", "2"]);
                        setValue("polisH_SEQ", ["2"]);
                        setValue("symM_SEQ", ["2"]);
                      } else {
                        setValue("cuT_SEQ", []);
                        setValue("polisH_SEQ", []);
                        setValue("symM_SEQ", []);
                      }
                    }}
                  />
                </div>
              </div> */}
              <div className="w-full flex items-center ">
                <p className="text-md font-semibold font-serif">Location</p>
                <div className="px-2 py-4 flex justify-evenly gap-1">
                  {Countries.map((item: Item) => (
                    <SnapCheckBox
                      id={item.id}
                      name={item.name}
                      key={item.id}
                      other={true}
                      shadow={true}
                      customClass="xl:px-5 px-2 py-1"
                      image={false}
                      value={item.value}
                      fieldName={item.fieldName}
                      onClick={() => {
                        const currentValues = watch('country') || [];
                        if (item.id === 'All') {
                          if (currentValues.includes('New York') && currentValues.includes('Los Angeles') && currentValues.includes('India')) {
                            setValue('country', []);
                          } else {
                            setValue('country', ['New York', 'Los Angeles','India','All']);
                          }
                        } else {
                          const newValues = currentValues.includes(item.value)
                            ? currentValues.filter((val:any) => val !== item.value)
                            : [...currentValues, item.value];
                          setValue('country', newValues);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Ratio</p>
                <div className=" px-5 py-4 flex gap-2">
                  <SnapInput placeholder="Min" name="ratiO_FROM" shadow={true}
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="Max" name="ratiO_TO" shadow={true}
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Table</p>
                <div className=" px-11 py-4 flex gap-2">
                  <SnapInput placeholder="Min" name="tableP_FROM" shadow={true} 
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="Max" name="tableP_TO" shadow={true}
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Depth%</p>
                <div className=" px-2 py-4 flex gap-2">
                  <SnapInput placeholder="Min" name="depthP_FROM" shadow={true}
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="Max" name="depthP_TO" shadow={true}
                  />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Length</p>
                <div className=" px-2 py-4 flex gap-2">
                  <SnapInput placeholder="MM" name="lengtH_FROM" shadow={true} 
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="lengtH_TO" shadow={true} 
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Width</p>
                <div className="px-9 py-4 flex gap-2">
                  <SnapInput placeholder="MM" name="widtH_FROM" shadow={true} customClass="px-5"
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="widtH_TO" shadow={true} customClass="px-5"
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Depth</p>
                <div className=" px-5 py-4 rounded-full flex gap-2">
                  <SnapInput placeholder="MM" name="deptH_FROM" shadow={true}
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="deptH_TO" shadow={true}
                  />
                </div>
              </div>
            </div>
            {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold">Cut</p>
                <div className="px-4 py-6 flex justify-evenly xl:gap-2 gap-1">
                  {cut.map((item: Item) => (
                    <SnapCheckBox
                      id={item.id}
                      name={item.name}
                      key={item.id}
                      value={item.value}
                      shadow={true}
                      other={true}
                      customClass="xl:px-5 px-4 py-1"
                      image={false}
                      fieldName={item.fieldName}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold">Polish</p>
                <div className="px-4 py-6 flex justify-evenly xl:gap-2 gap-1">
                  {polish.map((item: Item) => (
                    <SnapCheckBox
                      id={item.id}
                      name={item.name}
                      shadow={true}
                      key={item.id}
                      value={item.value}
                      other={true}
                      customClass="xl:px-5 px-4 py-1"
                      image={false}
                      fieldName={item.fieldName}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold">Symmetry</p>
                <div className="px-4 py-6 flex justify-evenly xl:gap-2 gap-1">
                  {symmetry.map((item: Item) => (
                    <SnapCheckBox
                      id={item.id}
                      name={item.name}
                      key={item.id}
                      value={item.value}
                      shadow={true}
                      other={true}
                      customClass="xl:px-5 px-4 py-1"
                      image={false}
                      fieldName={item.fieldName}
                    />
                  ))}
                </div>
              </div>
            </div> */}
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
  );
};

export default CsCertifiedStoneFilter;
