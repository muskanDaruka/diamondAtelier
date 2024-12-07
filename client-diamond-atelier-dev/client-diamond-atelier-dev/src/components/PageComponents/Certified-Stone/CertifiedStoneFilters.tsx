"use client";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";
import SnapCheckBox from "@/components/common/SnapCheckBox";
import SnapInput from "@/components/common/SnapInput";

const CustomizeOptions = () => {
  const [toggle, setToggle] = useState(false);
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
  const Color = [
    { id: "D", name: "D", value: "1", fieldName: "coloR_SEQ" },
    { id: "E", name: "E", value: "2", fieldName: "coloR_SEQ" },
    { id: "F", name: "F", value: "3", fieldName: "coloR_SEQ" },
    { id: "G", name: "G", value: "4", fieldName: "coloR_SEQ" },
    { id: "H", name: "H", value: "5", fieldName: "coloR_SEQ" },
    { id: "I", name: "I", value: "6", fieldName: "coloR_SEQ" },
    { id: "J", name: "J", value: "7", fieldName: "coloR_SEQ" },
    { id: "K", name: "K", value: "8", fieldName: "coloR_SEQ" },
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
  ];

  const Availability = [
    { id: "STOCK", name: "STOCK", fieldName: "deaL_INT_STAGE", value: "A,WP" },
    { id: "MEMO", name: "MEMO", fieldName: "deaL_INT_STAGE", value: "M" },
    { id: "HOLD", name: "HOLD", fieldName: "deaL_INT_STAGE", value: "H" },
    {
      id: "INTRANSIT",
      name: "INTRANSIT",
      fieldName: "deaL_INT_STAGE",
      value: "T",
    },
  ];

  const cut = [
    { id: "ID", name: "ID", fieldName: "cuT_SEQ", value: "11" },
    { id: "EX", name: "EX", fieldName: "cuT_SEQ", value: "2" },
    { id: "VG", name: "VG", fieldName: "cuT_SEQ", value: "3" },
    { id: "VG-", name: "VG-", fieldName: "cuT_SEQ", value: "4,5" },
  ];

  const polish = [
    { id: "PEX", name: "EX", fieldName: "polisH_SEQ", value: "2" },
    { id: "PVG", name: "VG", fieldName: "polisH_SEQ", value: "3" },
    { id: "PG-", name: "G-", fieldName: "polisH_SEQ", value: "4,5" },
  ];

  const symmetry = [
    { id: "SEX", name: "EX", fieldName: "symM_SEQ", value: "2" },
    { id: "SVG", name: "VG", fieldName: "symM_SEQ", value: "3" },
    { id: "SG-", name: "G-", fieldName: "symM_SEQ", value: "4,5" },
  ];
  const Countries = [
    { id: "All", name: "All", value: "All", fieldName: "country" },
    { id: "New York", name: "NY", value: "New York", fieldName: "country" },
    { id: "Los Angeles", name: "LA", value: "Los Angeles", fieldName: "country" },
    { id: "India", name: "India", value: "India", fieldName: "country" }
  ];

  interface Item {
    id: string;
    name: string;
    value?: string;
    fieldName?: string;
  }
  return (
    <div>
      <div className="flex flex-col justify-center space-y-5 mt-2 m-3">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center gap-6">
          <div className="w-full">
            <p className="text-md font-extrabold mb-2 font-serif">CARAT</p>
            <div className="bg-[#f0f0f0]  px-4 py-4 rounded-full flex items-center gap-4 ">
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
            <div className="bg-[#f0f0f0] py-4 rounded-full flex justify-evenly">
              {Color.map((item: Item) => (
                <SnapCheckBox
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  color={true}
                  image={false}
                  value={item.value}
                  fieldName={item.fieldName}
                  shadow={true}
                />
              ))}
            </div>
          </div>
          <div className="w-full mb-14">
            <p className="text-md font-extrabold mb-2 font-serif">CLARITY</p>
            <div className="w-full relative">
              <div className="w-full gap-3 bg-[#f0f0f0] rounded-full py-4 px-5 grid grid-cols-5 flex justify-items-evenly absolute">
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
                  onClick={() => setToggle(!toggle)}
                  className="rounded-pill border-0 "
                >
                  <div className="flex">
                    <span className="text-xs font-extrabold">
                      {toggle ? "Less" : "More"}
                    </span>
                    <Icon icon="iconamoon:arrow-down-2-duotone"
                      className={`size-4 transform transition-transform ${toggle ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </button>
                {toggle && (
                  Clarity.slice(4).map((item: Item) => (
                    <SnapCheckBox
                      id={item.id}
                      name={item.name}
                      key={item.id}
                      other={true}
                      customClass="xl:px-4 px-2 py-1 ml-1"
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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center gap-6">
          <div className="w-full">
            <p className="text-md font-extrabold mb-2 font-serif">LAB</p>
            <div className="bg-[#f0f0f0] px-2  py-4 rounded-full flex justify-evenly space-x-1">
              {Lab.map((item: Item) => (
                <SnapCheckBox
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  other={true}
                  value={item.value}
                  customClass="xl:px-3 px-2 py-1"
                  image={false}
                  shadow={true}
                  fieldName={item.fieldName}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <p className="text-md font-extrabold mb-2 font-serif">GROWN</p>
            <div className="bg-[#f0f0f0] py-4 rounded-full flex justify-evenly space-x-2 ">
              {Grown.map((item: Item) => (
                <SnapCheckBox
                  other={true}
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  customClass="px-8"
                  image={false}
                  shadow={true}
                  fieldName={item.fieldName}
                  value={item.value}
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <p className="text-md font-extrabold mb-2 font-serif">AVAILABILITY</p>
            <div className="bg-[#f0f0f0] py-4 rounded-full flex justify-center space-x-2">
              {Availability.map((item: Item) => (
                <SnapCheckBox
                  other={true}
                  value={item.value}
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
        <div className="flex flex-col space-y-3">
          <div className="space-y-1" id="filter">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 flex justify-evenly items-center text-center bg-[#f0f0f0] px-5">
              <div className="w-full flex items-center ">
                <p className="text-md font-semibold font-serif">Stock</p>
                <div className="px-2 py-4 flex">
                  <SnapInput
                    placeholder="Enter Stock ID"
                    name="PACKET_NO"
                    type="text"
                    shadow={true}
                    customClass="w-full px-3 py-1.5"
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Certificate</p>
                <div className="px-2 py-4  flex gap-5">
                  <SnapInput
                    placeholder="Enter Report No."
                    name="reporT_NO"
                    shadow={true}
                    type="text"
                    customClass="w-full px-3 py-1.5"
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold xl:ml-5 font-serif">Cut/Pol/Symm</p>
                <div className="px-2 py-4 flex justify-evenly">
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
                        setValue("cuT_SEQ", ["11", "2"]);
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
              </div>
              <div className="w-full flex items-center ">
                <p className="text-md font-semibold font-serif">Location</p>
                <div className="px-1 py-4 flex justify-evenly gap-1">
                  {Countries.map((item: Item) => (
                    <SnapCheckBox
                      id={item.id}
                      name={item.name}
                      key={item.id}
                      other={true}
                      shadow={true}
                      customClass="xl:px-3 px-1.5 py-1"
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
                <p className="text-md font-semibold font-serif">Disc%</p>
                <div className=" px-4 py-4  flex gap-2">
                  <SnapInput
                    placeholder="%"
                    name="FDISC_PER"
                    shadow={true}
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput
                    placeholder="%"
                    shadow={true}
                    name="TDISC_PER"
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">P/Ct</p>
                <div className="  px-5 py-4   flex gap-2">
                  <SnapInput
                    placeholder="$"
                    name="PRATE_FROM"
                    shadow={true}
                    customClass="w-full py-1"
                  />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput
                    placeholder="$"
                    name="PRATE_TO"
                    shadow={true}
                    customClass="w-full py-1"
                  />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Total Amt</p>
                <div className=" px-4 py-4  flex items-center gap-2">
                  <SnapInput placeholder="$" name="PVALUE_FROM" shadow={true} />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="$" name="PVALUE_To" shadow={true} />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Ratio</p>
                <div className=" px-5 py-4 flex items-center gap-2">
                  <SnapInput placeholder="Min" name="ratiO_FROM" shadow={true} />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="Max" name="ratiO_TO" shadow={true} />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Table</p>
                <div className=" px-4 py-4  flex gap-2">
                  <SnapInput placeholder="MM" name="tableP_FROM" shadow={true} />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="tableP_TO" shadow={true} />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Depth%</p>
                <div className=" px-5 py-4  flex items-center gap-2">
                  <SnapInput placeholder="Min" name="depthP_FROM" shadow={true} />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="Max" name="depthP_TO" shadow={true} />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Length</p>
                <div className=" px-2 py-4  flex items-center gap-2">
                  <SnapInput placeholder="MM" name="lengtH_FROM" shadow={true} />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="lengtH_TO" shadow={true} />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Width</p>
                <div className=" px-2 py-4  flex items-center gap-2">
                  <SnapInput placeholder="MM" name="widtH_FROM" shadow={true} />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="widtH_TO" shadow={true} />
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Depth</p>
                <div className="  px-8 py-4  flex items-center gap-2">
                  <SnapInput placeholder="MM" name="deptH_FROM" shadow={true} />
                  <p className="font-serif font-semibold">To</p>
                  <SnapInput placeholder="MM" name="deptH_TO" shadow={true} />
                </div>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Cut</p>
                <div className="px-8 py-4  flex justify-evenly gap-2">
                  {cut.map((item: Item) => (
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
                    />
                  ))}
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Polish</p>
                <div className="px-3 py-4  flex justify-evenly gap-2">
                  {polish.map((item: Item) => (
                    <SnapCheckBox
                      id={item.id}
                      name={item.name}
                      key={item.id}
                      other={true}
                      customClass="xl:px-4 px-2 py-1"
                      image={false}
                      value={item.value}
                      shadow={true}
                      fieldName={item.fieldName}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full flex items-center">
                <p className="text-md font-semibold font-serif">Symmetry</p>
                <div className="px-1 py-4 flex justify-evenly gap-2">
                  {symmetry.map((item: Item) => (
                    <SnapCheckBox
                      id={item.id}
                      name={item.name}
                      key={item.id}
                      shadow={true}
                      other={true}
                      customClass="xl:px-4 px-2 py-1"
                      image={false}
                      value={item.value}
                      fieldName={item.fieldName}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-auto bg-white p-2 gap-5 mt-10 sticky bottom-0">
            <button
              className="bg-blue-700 text-white font-bold font-serif text-sm px-6 py-2 rounded-full"
              onClick={() => {
                window.location.href = "/certified-stone"
              }}
              type="button"
            >
              Clear Search
            </button>
            <button
              className="bg-blue-700 text-white font-bold font-serif text-sm px-6 py-2 rounded-full"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CustomizeOptions;
