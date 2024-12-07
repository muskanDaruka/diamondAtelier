"use client";
import { Icon } from "@iconify/react";
import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";

const SnapPopoverBox = ({
  id,
  src,
  alt,
  customClass,
  popoverTitle,
  popoverLink,
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
  popoverContent?: string;
  popoverTitle?: string;
  popoverLink?: string;
}) => {
  const { register, setValue, getValues } = useFormContext();
  const [Blur, setBlur] = useState(false);

  const onOpenChange = (e: boolean) => {
    setValue(id, e);
    setBlur(e);
  };

  return (
    <>
      {Blur && (
        <div
          id="custom-blur"
          className={`fixed -inset-10 bg-white  transition-opacity duration-300 opacity-70  z-10`}
        ></div>
      )}

      <Popover.Root key={id} onOpenChange={(e:any) => onOpenChange(e)}>
        <Popover.Trigger>
          <input
            type="checkbox"
            id={id}
            className="hidden peer"
            // {...register(id ?? "")}
            disabled
          />
          <label
            htmlFor={id}
            className={`${customClass} drop-shadow-lg rounded-full  flex mx-auto items-center justify-center  cursor-pointer border-4 text-sm bg-white border-transparent peer-checked:text-white peer-checked:border-blue-700 peer-checked:z-50  peer-checked:relative
            `}
          >
            <Image src={src ?? ""} alt={alt ?? ""} />
          </label>
          <p
            className={`text-center peer-checked:font-bold peer-checked:text-black  text-gray-400 text-xs font-semibold text-nowrap mt-2 `}
          >
            {alt}
          </p>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align="start" className="z-30">
            <>
              <div className="  bg-[#efefef] border p-1 py-4   border-gray-200 z-30 shadow-lg  font-bold rounded-xl">
                <Popover.Close>
                  <Icon
                    icon="carbon:close-filled"
                    className="-top-3 size-7 absolute left-5 border-t-2  cursor-pointer text-[#9c9d9c] bg-[#efefef] rounded-full p-0.5"
                  />
                </Popover.Close>
                <p className="text-black text-center px-14">
                  {popoverTitle} Shape is listed in Fancy Layout category
                </p>
                <hr className="my-3 bg-gray-300 h-0.5" />
                <p className=" text-black mt-5 text-center">
                  <a
                    href={popoverLink}
                    className="text-blue-700 cursor-pointer"
                  >
                    Click here
                  </a>{" "}
                  to Explore {popoverTitle} Layout
                </p>
              </div>
            </>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default SnapPopoverBox;
