import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import HorizotalTable from "@/components/common/HorizontalTable";
import SnapCheckBox from "@/components/common/SnapCheckBox";
import SnapInput from "@/components/common/SnapInput";
import { usePathname } from "next/navigation";
import { useFormContext } from "react-hook-form";

const ExoticShapeFilter = () => {
  const pathname = usePathname();
  const { register, watch, setValue } = useFormContext();
  const [numberToggle, setNumberToggle] = useState(false);
  const [letterToggle, setLetterToggle] = useState(false);

  const watchField = watch()

  const MatchingPairs = [
    { id: "DEF", name: "DEF", fieldName: "colgrp", value: "DEF" },
    { id: "GH", name: "GH", fieldName: "colgrp", value: "GH" },
    { id: "IJ", name: "IJ", fieldName: "colgrp", value: "IJ" },
    // { id: "HI", name: "HI", fieldName: "colgrp", value: "HI" },
  ];

  const SideStone = [
    { id: "D", name: "D", value: "D", fieldName: "colgrp" },
    { id: "E", name: "E", value: "E", fieldName: "colgrp" },
    { id: "F", name: "F", value: "F", fieldName: "colgrp" },
    { id: "G", name: "G", value: "G", fieldName: "colgrp" },
    { id: "H", name: "H", value: "H", fieldName: "colgrp" },
    { id: "I", name: "I", value: "I", fieldName: "colgrp" },
    { id: "J", name: "J", value: "J", fieldName: "colgrp" },
  ];

  const letter = [
    { id: "A", name: "A", value: "A", fieldName: "letter" },
    { id: "B", name: "B", value: "B", fieldName: "letter" },
    { id: "C", name: "C", value: "C", fieldName: "letter" },
    { id: "D", name: "D", value: "D", fieldName: "letter" },
    { id: "E", name: "E", value: "E", fieldName: "letter" },
    { id: "F", name: "F", value: "F", fieldName: "letter" },
    { id: "G", name: "G", value: "G", fieldName: "letter" },
    { id: "H", name: "H", value: "H", fieldName: "letter" },
    { id: "I", name: "I", value: "I", fieldName: "letter" },
    { id: "J", name: "J", value: "J", fieldName: "letter" },
    { id: "K", name: "K", value: "K", fieldName: "letter" },
    { id: "L", name: "L", value: "L", fieldName: "letter" },
    { id: "M", name: "M", value: "M", fieldName: "letter" },
    { id: "N", name: "N", value: "N", fieldName: "letter" },
    { id: "O", name: "O", value: "O", fieldName: "letter" },
    { id: "P", name: "P", value: "P", fieldName: "letter" },
    { id: "Q", name: "Q", value: "Q", fieldName: "letter" },
    { id: "R", name: "R", value: "R", fieldName: "letter" },
    { id: "S", name: "S", value: "S", fieldName: "letter" },
    { id: "T", name: "T", value: "T", fieldName: "letter" },
    { id: "U", name: "U", value: "U", fieldName: "letter" },
    { id: "V", name: "V", value: "V", fieldName: "letter" },
    { id: "W", name: "W", value: "W", fieldName: "letter" },
    { id: "X", name: "X", value: "X", fieldName: "letter" },
    { id: "Y", name: "Y", value: "Y", fieldName: "letter" },
    { id: "Z", name: "Z", value: "Z", fieldName: "letter" },
  ]
  const number = [
    { id: "1", name: "1", value: "1", fieldName: "number" },
    { id: "2", name: "2", value: "2", fieldName: "number" },
    { id: "3", name: "3", value: "3", fieldName: "number" },
    { id: "4", name: "4", value: "4", fieldName: "number" },
    { id: "5", name: "5", value: "5", fieldName: "number" },
    { id: "6", name: "6", value: "6", fieldName: "number" },
    { id: "7", name: "7", value: "7", fieldName: "number" },
    { id: "8", name: "8", value: "8", fieldName: "number" },
    { id: "9", name: "9", value: "9", fieldName: "number" },
    { id: "0", name: "0", value: "0", fieldName: "number" }
  ]
  const Grown = [
    { id: "CVD", name: "CVD", fieldName: "grown", value: "CVD" },
    { id: "HPHT", name: "HPHT", fieldName: "grown", value: "HPHT" },
  ];
  const Availability = [
    { id: "STOCK", name: "STOCK", fieldName: "stock", value: "A,WP" },
    { id: "HOLD", name: "HOLD", fieldName: "stock", value: "H" },
    { id: "MEMO", name: "MEMO", fieldName: "stock", value: "M" },
    { id: "INTRANSIT", name: "INTRANSIT", fieldName: "stock", value: "B" },
  ];
  const Countries = [
    { id: "All", name: "All", value: "All", fieldName: "location" },
    { id: "New York", name: "NY", value: "New York", fieldName: "location" },
    { id: "Los Angeles", name: "LA", value: "Los Angeles", fieldName: "location" },
    { id: "India", name: "India", value: "India", fieldName: "location" }
  ];

  const [toggle, setToggle] = useState(false);

  const cut = [
    { id: "Brilliant", name: "BRILLIANT", fieldName: "cut", value: "BRILLIANT" },
    { id: "Step", name: "STEP", fieldName: "cut", value: "STEP" },
    { id: "Rose", name: "ROSE", fieldName: "cut", value: "ROSE" },
    { id: "Euro", name: "EURO", fieldName: "cut", value: "EURO" },
    { id: "Old Mine", name: "OLD MINE", fieldName: "cut", value: "OLD MINE" },
    { id: "Antique", name: "ANTIQUE", fieldName: "cut", value: "ANTIQUE" },
    { id: "Others Labs", name: "OTHERS", fieldName: "cut", value: "OTHERS" },
  ];

  interface Item {
    id: string;
    name: string;
    fieldName: string;
    value: string;
  }

  const [selectedFilter, setSelectedFilter] = useState<'SINGLE' | 'PAIR'>(watchField.IS_MATCHING_PAIR);
  const handleFilterChange = (filter: 'SINGLE' | 'PAIR') => {
    setSelectedFilter(filter);
    setValue('IS_MATCHING_PAIR', filter);
  };

  const currentFilterData = selectedFilter === 'SINGLE' ? SideStone : MatchingPairs;


  return (
    <div>
      <div className="flex flex-col justify-center space-y-5 m-3">
        <div className="flex justify-center ">
          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className={`flex items-center gap-2 border-2 border-black rounded-full px-6 py-1 text-md ${toggle ? "bg-[#044299] text-white border-none" : ""
              }`}
          >
            <div className="font-serif font-semibold">More Shapes</div>
            <div className="mt-1">
              <IoIosArrowDown className="size-6" />
            </div>
          </button>
        </div>
        {toggle && (
          <div className="flex justify-evenly">
            <div className="grid grid-cols-4 my-4 text-center gap-8">
              <div className="w-full ">
                <button
                  type="button"
                  onClick={() => {
                    setNumberToggle(false);
                    setLetterToggle(!letterToggle);
                  }}
                  className={`bg-[#f0f0f0] px-10 py-2 rounded-full flex justify-center items-center gap-5 ${letterToggle ? "bg-custom-gradient text-white border-none" : ""
                    }`}
                >
                  <p className="text-md font-extrabold font-serif">LETTER</p>
                  <IoIosArrowDown className="size-6" />
                </button>
                <div className="">
                  {letterToggle && (
                    <div className="bg-[#f0f0f0] px-10 py-3 rounded-full flex flex-wrap w-2/7 grid grid-cols-12 justify-around items-center gap-3 mt-2 absolute">
                      {letter.map((item: any) => (
                        <SnapCheckBox
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          other={true}
                          value={item.value}
                          customClass="xl:px-4 px-2 py-1"
                          image={false}
                          shadow={true}
                          fieldName={item.fieldName}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div></div>
              <div></div>
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => {
                    setLetterToggle(false);
                    setNumberToggle(!numberToggle);
                  }}
                  className={`bg-[#f0f0f0] px-10 py-2 rounded-full flex justify-center items-center gap-5 ${numberToggle ? "bg-custom-gradient text-white border-none" : ""
                    }`}
                >
                  <p className="text-md font-extrabold font-serif">NUMBER</p>
                  <IoIosArrowDown className="size-6" />
                </button>
                <div className="flex justify-center">
                  {numberToggle && (
                    <div className="bg-[#f0f0f0] px-10 py-2 rounded-full flex flex-wrap justify-center items-center gap-3 mt-2 absolute mr-6">
                      {number.map((item: any) => (
                        <SnapCheckBox
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          other={true}
                          value={item.value}
                          customClass="xl:px-4 px-2 py-1"
                          image={false}
                          shadow={true}
                          fieldName={item.fieldName}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center gap-2 mt-4 ">
          <button
            type="button"
            onClick={() => handleFilterChange('SINGLE')}
            className={`border-2 ${selectedFilter === 'SINGLE' ? 'bg-custom-gradient text-white' : 'bg-none'} rounded-xl px-8 py-3 font-extrabold font-serif`}
          >
            Single Stone
          </button>
          <button
            type="button"
            onClick={() => handleFilterChange('PAIR')}
            className={`border-2 ${selectedFilter === 'PAIR' ? 'bg-custom-gradient text-white' : 'bg-none'} rounded-xl px-8 py-3 font-extrabold font-serif`}
          >
            Matching Pairs
          </button>
        </div>
        <div className="flex items-center justify-center font-serif">
          <p className="font-bold font-serif">To Purchase Single Stone from Pair, Please contact our sales person.</p>
        </div>
        <div className="space-y-1">
          <div className=" bg-[#f0f0f0]">
            <HorizotalTable />
          </div>
          <div className="grid lg:grid-cols-2  text-center bg-[#f0f0f0] lg:gap-8 px-5">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Carat</p>
              <div className="px-4 py-3 flex gap-2">
                <SnapInput
                  placeholder="Min Carat"
                  name="f_WGT"
                  shadow={true}
                />
                <p className="font-serif font-semibold">To</p>
                <SnapInput
                  placeholder="Max Carat"
                  name="t_WGT"
                  shadow={true}
                />
              </div>
            </div>
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Color Group</p>
              <div className=" px-1 py-3 flex gap-2">
                {currentFilterData.map((item: any) => (
                  <SnapCheckBox
                    id={item.id}
                    name={item.name}
                    key={item.id}
                    other={true}
                    shadow={true}
                    customClass="xl:px-4 px-3 py-1"
                    image={false}
                    value={item.value}
                    fieldName={item.fieldName}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2  text-center bg-[#f0f0f0] lg:gap-8 px-5">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Cut</p>
              <div className="px-7 py-2 flex gap-2 flex-wrap">
                {cut.map((item: Item) => (
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
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Availability</p>
              <div className=" px-2 py-2  flex gap-3">
                {Availability.map((item: Item) => (
                  <SnapCheckBox
                    id={item.id}
                    name={item.name}
                    key={item.id}
                    shadow={true}
                    other={true}
                    customClass="xl:px-4 px-2 py-1"
                    image={false}
                    fieldName={item.fieldName}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Grown</p>
              <div className="px-2 py-3  flex justify-evenly gap-2">
                {Grown.map((item: Item) => (
                  <SnapCheckBox
                    id={item.id}
                    name={item.name}
                    key={item.id}
                    other={true}
                    shadow={true}
                    customClass="xl:px-4 px-2 py-1"
                    image={false}
                    fieldName={item.fieldName}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Ratio</p>
              <div className="bg-[#f0f0f0]  px-12 py-3  flex gap-2">
                <SnapInput placeholder="Min" name="f_RATIO" shadow={true} />
                <p className="font-serif font-semibold">To</p>
                <SnapInput placeholder="Max" name="t_RATIO" shadow={true} />
              </div>
            </div>

          </div>

          <div className="grid lg:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Price</p>
              <div className="px-5 py-3 flex gap-2">
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
              <p className="text-md font-semibold font-serif">Amount</p>
              <div className=" px-7 py-3 flex items-center gap-2">
                <SnapInput
                  placeholder="$"
                  name="f_VALUE"
                  shadow={true}
                />
                <p className="font-serif font-semibold">To</p>
                <SnapInput
                  placeholder="$"
                  name="t_VALUE"
                  shadow={true}
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5 ">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Stock</p>
              <div className="px-4 py-3 flex gap-5">
                <SnapInput
                  placeholder="Stock ID"
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
              <p className="text-md font-semibold mr-4 font-serif">Location</p>
              <div className="px-2 py-3 flex justify-evenly gap-1">
                {Countries.map((item: Item) => (
                  <SnapCheckBox
                    id={item.id}
                    name={item.name}
                    key={item.id}
                    other={true}
                    shadow={true}
                    customClass="xl:px-6 px-3 py-1"
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
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] lg:gap-8 px-5">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Length</p>
              <div className=" px-2 py-3 flex gap-2">
                <SnapInput placeholder="MM" name="f_LENGTH" shadow={true} />
                <p>To</p>
                <SnapInput placeholder="MM" name="t_LENGTH" shadow={true} />
              </div>
            </div>
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Width</p>
              <div className=" px-4 py-3 flex gap-2">
                <SnapInput placeholder="MM" name="f_WIDTH" shadow={true} />
                <p className="font-serif font-semibold">To</p>
                <SnapInput placeholder="MM" name="t_WIDTH" shadow={true} />
              </div>
            </div>
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Depth</p>
              <div className=" px-4 py-3 flex gap-2">
                <SnapInput placeholder="MM" name="f_DEPTH" shadow={true} />
                <p className="font-serif font-semibold">To</p>
                <SnapInput placeholder="MM" name="t_DEPTH" shadow={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-10 sticky bottom-0 w-auto bg-white p-2">
          <button
            className="bg-blue-700 font-bold font-serif text-sm text-white px-6 py-2 rounded-full"
            type="button"
            onClick={() => {
              window.location.href = pathname
            }}
          >
            Clear Search
          </button>
          <button
            className="bg-blue-700 font-bold font-serif text-sm text-white px-6 py-2 rounded-full"
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExoticShapeFilter;
