"use client";
import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from "react";
import SnapCheckBox from "@/components/common/SnapCheckBox";
import SnapInput from "@/components/common/SnapInput";
import HorizotalTable from "@/components/common/HorizontalTable";
import SnapDropdown from "@/components/common/SnapDropdown";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react";

const NonCertifiedFilter = () => {
  const searchParams = useSearchParams();
  const { setValue, watch } = useFormContext();
  const [toggle, setToggle] = useState(false);

  const Clarity = [
    { id: "IF", name: "IF", fieldName: "purgrp", value: "IF" },
    { id: "VVS1", name: "VVS1", fieldName: "purgrp", value: "VVS1" },
    { id: "VVS2", name: "VVS2", fieldName: "purgrp", value: "VVS2" },
    { id: "VS1", name: "VS1", fieldName: "purgrp", value: "VS1" },
    { id: "VS2", name: "VS2", fieldName: "purgrp", value: "VS2" },
    { id: "SI1", name: "SI1", fieldName: "purgrp", value: "SI1" },
    { id: "SI2", name: "SI2", fieldName: "purgrp", value: "SI2" },
    { id: "SI3", name: "SI3-", fieldName: "purgrp", value: "SI3,I1,I2,I3" },
  //   { id: "I1", name: "I1", fieldName: "puritY_SEQ", value: "10" },
  //   { id: "I2", name: "I2", fieldName: "puritY_SEQ", value: "11" },
  //   { id: "I3", name: "I3", fieldName: "puritY_SEQ", value: "12" },
  ];
  const Color = [
    { id: "D", name: "D", fieldName: "colgrp", value: "D" },
    { id: "E", name: "E", fieldName: "colgrp", value: "E" },
    { id: "F", name: "F", fieldName: "colgrp", value: "F" },
    { id: "G", name: "G", fieldName: "colgrp", value: "G" },
    { id: "H", name: "H", fieldName: "colgrp", value: "H" },
    { id: "I", name: "I", fieldName: "colgrp", value: "I" },
    { id: "J", name: "J", fieldName: "colgrp", value: "J" },
    { id: "K", name: "K", fieldName: "colgrp", value: "K" },
  ];

  const Grown = [
    { id: "CVD", name: "CVD", fieldName: "grown", value: "CVD" },
    { id: "HPHT", name: "HPHT", fieldName: "grown", value: "HPHT" },
  ];
  const Availability = [
    { id: "STOCK", name: "STOCK", fieldName: "stock", value: "A,WP" },
    { id: "HOLD", name: "HOLD", fieldName: "stock", value: "H" },
    { id: "MEMO", name: "MEMO", fieldName: "stock", value: "M" },
    { id: "INTRANSIT", name: "IN TRANSIT", fieldName: "stock", value: "B" },
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
    fieldName: string;
    value: string;
  }
  type Image = {
    id: string;
    src: any;
    alt: string;
  };
  return (
    <div className="flex flex-col justify-center space-y-5 m-3">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center gap-8">
        <div className="w-full">
          <p className="text-md font-extrabold mb-2 font-serif">CARAT</p>
          <div className="bg-[#f0f0f0] px-4 py-4 rounded-full flex items-center gap-5">
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
                shadow={true}
                value={item.value}
                fieldName={item.fieldName}
              />
            ))}
          </div>
        </div>
        <div className="w-full mb-14">
          <p className="text-md font-extrabold mb-2 font-serif">CLARITY</p>
          <div className="w-full relative">
            <div className="w-full bg-[#f0f0f0] rounded-full py-4 px-4 gap-2 pr-2 grid grid-cols-5 justify-evenly place-items-evenly absolute ">
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
                className="rounded-pill border-0 pl-1"
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
              {toggle && (
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-center gap-8">
        <div className="w-full">
          <p className="text-md font-extrabold mb-2 font-serif">RATIO</p>
          <div className="bg-[#f0f0f0] px-4 py-4 rounded-full flex items-center gap-5">
            <SnapInput placeholder="Min" name="f_RATIO" shadow={true}
            />
            <p className="font-serif font-semibold">To</p>
            <SnapInput placeholder="Max" name="t_RATIO" shadow={true} 
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-md font-extrabold mb-2 font-serif">GROWN</p>
          <div className="bg-[#f0f0f0]  py-4 rounded-full flex justify-evenly ">
            {Grown.map((item: Item) => (
              <SnapCheckBox
                other={true}
                id={item.id}
                name={item.name}
                key={item.id}
                customClass="xl:px-8 px-4 py-1"
                image={false}
                shadow={true}
                value={item.value}
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
      <div className="flex flex-col space-y-4">
        <div className="space-y-1" id="filter">
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] px-5 ">
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Stock</p>
              <div className="px-4 py-3 flex gap-5">
                <SnapInput
                  placeholder="Enter Stock ID"
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
              <div className="px-4 py-3 flex justify-evenly gap-1">
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
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 text-center bg-[#f0f0f0] px-5">
            {/* <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Disc%</p>
              <div className=" px-3 py-3 flex gap-2">
                <SnapInput placeholder="%" name="DISCP_from" shadow={true}
                />
                <p className="font-serif font-semibold">To</p> 
                <SnapInput placeholder="%" name="DISCP_to" shadow={true}
                />
              </div>
            </div> */}
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">P/Ct</p>
              <div className=" px-6 py-3  flex gap-2">
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
              <div className="px-2 py-3  flex items-center gap-2">
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
              <div className="px-2 py-3  flex gap-2">
                <SnapInput
                  placeholder="MM"
                  name="f_LENGTH"
                  shadow={true}
                />
                <p className="font-serif font-semibold">To</p>
                <SnapInput
                  placeholder="MM"
                  name="t_LENGTH"
                  shadow={true}
                />
              </div>
            </div>
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Width</p>
              <div className=" px-2 py-3  flex gap-2">
                <SnapInput
                  placeholder="MM"
                  name="f_WIDTH"
                  shadow={true}
                />
                <p className="font-serif font-semibold">To</p>
                <SnapInput
                  placeholder="MM"
                  name="t_WIDTH"
                  shadow={true}
                />
              </div>
            </div>
            <div className="w-full flex items-center">
              <p className="text-md font-semibold font-serif">Depth</p>
              <div className="px-3 py-3 flex gap-2">
                <SnapInput placeholder="MM" name="f_DEPTH" shadow={true}/>
                <p className="font-serif font-semibold">To</p>
                <SnapInput placeholder="MM" name="t_DEPTH" shadow={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-auto p-2 sticky bottom-0 bg-white gap-5 mt-10">
          <button
            className="bg-blue-700 font-bold font-serif text-sm text-white px-6 py-2 rounded-full"
            type="button"
            onClick={() => {
              window.location.href = "/non-certified"
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

export default NonCertifiedFilter;
