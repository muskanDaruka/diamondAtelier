import React from "react";
import { useFormContext } from "react-hook-form";

function EditProfileInput({
  title,
  placeholder,
  value,
  id,
  fieldName,
  customClass,
  disabled,
}: {
  title: string;
  placeholder: string;
  value: string;
  id: string;
  fieldName: string;
  customClass?: string;
  disabled?:boolean,
}) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col w-full" key={id}>
      <label className="font-bold mb-1">{title}</label>
      <input
        type={id=="password" ? id : ""}
        placeholder={placeholder}
        {...register(fieldName || "default")}
        className={`${customClass} w-[100%]`}
        disabled={disabled}
      />
    </div>
  );
}

export default EditProfileInput;
