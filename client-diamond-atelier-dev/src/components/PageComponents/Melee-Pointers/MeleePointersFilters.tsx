"use client"
import SnapCheckBox from "@/components/common/SnapCheckBox";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";

const CustomizationMelee = () => {
  const Grown = [
    { id: 'CVD', name: 'CVD', fieldName: "grown", value: 'CVD' },
    { id: 'HPHT', name: 'HPHT', fieldName: "grown", value: 'HPHT' },
  ]
  const CvdColor = [
    { id: "D-G", name: "D - G", fieldName: "colgrp", value: "DG" },
    { id: "H-J", name: "H - J", fieldName: "colgrp", value: "HJ" }
  ]
  const CvdClarity = [
    { id: "CVVS-VS", name: "VVS - VS", fieldName: "purgrp", value: "VVS-VS" },
    { id: "CSI1&SI2", name: "SI1 - SI2", fieldName: "purgrp", value: "SI1-SI2" },
    { id: "CSI3&I1", name: "SI3 - I1", fieldName: "purgrp", value: "SI3-I1" },
  ];
  const CvdAvailability = [
    { id: "CSTOCK", name: "STOCK", fieldName: "stock", value: "A,WP" },
    { id: "CHOLD", name: "HOLD", fieldName: "stock", value: "H" },
    { id: "CMEMO", name: "MEMO", fieldName: "stock", value: "M" },
    { id: "CINTRANSIT", name: "INTRANSIT", fieldName: "stock", value: "B" },
  ];
  const HphtColor = [
    { id: "DEF", name: "DEF", fieldName: "colgrp", value: "DEF" }
  ]
  interface Item {
    id: string;
    name: string;
    fieldName?: string;
    value: string;
  }

  const [selectedFilter, setSelectedFilter] = useState<'CvdColor' | 'HphtColor' | null>(null);
  const handleFilterChange = (filter: 'CvdColor' | 'HphtColor') => {
    setSelectedFilter(filter);
  };

  const currentFilterData = selectedFilter === 'CvdColor' ? CvdColor
    : selectedFilter === 'HphtColor' ? HphtColor
      : [...CvdColor, ...HphtColor];

  const { setValue, watch, resetField } = useFormContext();
  const watchField = watch();

  return (
    <div className="flex flex-col justify-center px-1">
      <div className="text-center mt-7">
        <div className="bg-[#f0f0f0] p-5 rounded-xl">
          <div className="w-full grid place-items-start grid-cols-12">
            <p className="text-md font-semibold col-span-3 py-2 font-serif">Grown</p>
            <div className="px-4 py-2 flex justify-evenly gap-1 col-span-9">
              {Grown.map((item: Item) => (
                <SnapCheckBox
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  other={true}
                  customClass="xl:px-6 px-3 py-1"
                  image={false}
                  shadow={true}
                  fieldName={item.fieldName}
                  value={item.value}
                  onClick={() => {
                    if (selectedFilter === (item.value === 'CVD' ? 'CvdColor' : 'HphtColor')) {
                      setValue("grown", "");
                      setSelectedFilter(null);
                    } else {
                      setValue("grown", item.value);
                      handleFilterChange(item.value === 'CVD' ? 'CvdColor' : 'HphtColor');
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="w-full grid place-items-start grid-cols-12">
            <p className="text-md font-semibold col-span-3 py-2 font-serif">Color</p>
            <div className="px-4 py-2 flex justify-evenly gap-1 col-span-9">
              {currentFilterData.map((item: Item) => (
                <SnapCheckBox
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  other={true}
                  customClass="xl:px-6 px-3 py-1"
                  image={false}
                  shadow={true}
                  fieldName={item.fieldName}
                  value={item.value}
                />
              ))}
            </div>
          </div>
          <div className="w-full grid place-items-start grid-cols-12">
            <p className="text-md font-semibold col-span-3 py-2 font-serif">Clarity</p>
            <div className="px-4 py-2 flex justify-evenly gap-1 col-span-9">
              {CvdClarity.map((item: Item) => (
                <SnapCheckBox
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  other={true}
                  customClass="xl:px-3 px-3 py-1"
                  image={false}
                  shadow={true}
                  fieldName={item?.fieldName}
                  value={item.value}
                />
              ))}
            </div>
          </div>
          <div className="w-full grid place-items-start grid-cols-12">
            <p className="text-md font-semibold col-span-3 py-2 font-serif">Availability</p>
            <div className=" px-4 py-2 flex justify-evenly gap-1 col-span-9">
              {CvdAvailability.map((item: Item) => (
                <SnapCheckBox
                  id={item.id}
                  name={item.name}
                  value={item.value}
                  key={item.id}
                  other={true}
                  shadow={true}
                  customClass="xl:px-4 px-2 py-1"
                  image={false}
                  fieldName={item.fieldName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationMelee;
