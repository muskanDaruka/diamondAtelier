"use client";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { useFormContext } from "react-hook-form";

const SnapCheckBox = ({
  id,
  src,
  alt,
  name,
  image,
  color,
  other,
  customClass,
  shadow,
  value,
  fieldName ,
  onClick
}: {
  id: string;
  src?: string;
  alt?: string;
  name: string;
  image?: boolean;
  color?: boolean;
  other?: boolean;
  customClass?: string;
  shadow?: boolean;
  value?:string;
  fieldName?:string;
  disabled?:boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
}) => {
 
  const { register } = useFormContext();

  return (
    <>
      {image ? (
        <div key={id}>
          <input
            type="checkbox"
            id={id}
            className="hidden peer"
             {...register(fieldName || "default")}
            value={value}
            onClick={onClick}
          />
          <label
            htmlFor={id}
            className={`${customClass} drop-shadow-lg rounded-full  flex mx-auto items-center justify-center  cursor-pointer border-4 text-sm bg-white border-transparent peer-checked:text-white peer-checked:border-blue-700 peer-checked:z-[1]  peer-checked:relative
            `}
          >
            <Image src={src ?? ""} alt={alt ?? ""} />
          </label>
          <p
            className={`text-center peer-checked:font-bold peer-checked:text-black text-gray-400 text-xs font-semibold text-nowrap mt-1 `}
          >
            {alt}
          </p>
        </div>
      ) : null}

      {color ? (
        <div key={id}>
          <input
            type="checkbox"
            id={id}
            className="hidden peer"
             {...register(fieldName || "default")}
            value={value ?? ""}
          />
          <label
            htmlFor={id}
            className={`flex items-center justify-center rounded-full drop-shadow cursor-pointer size-7  bg-white text-sm peer-checked:text-white peer-checked:bg-blue-700 ${customClass} peer-checked:shadow-transparent shadow-custom`}
          >
            {name}
          </label>
        </div>
      ) : null}

      {other ? (
        <div key={id}>
          <input
            type="checkbox"
            id={id}
            className="hidden peer"
             {...register(fieldName || "default")}
             value={value ?? ""}
            onClick={onClick}
          />
          <label
            htmlFor={id}
            className={`${customClass} flex items-center  justify-center rounded-full drop-shadow cursor-pointer py-1 text-xs xl:text-sm bg-white peer-checked:text-white peer-checked:bg-blue-700 ${
              shadow ? "shadow-custom" : ""
            } peer-checked:shadow-transparent`}
          >
            {name}
          </label>
        </div>
      ) : null}
    </>
  );
};

export default SnapCheckBox;
