import { MouseEventHandler } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface SnapInputProps {
  placeholder: string;
  customClass?: string;
  name: string;
  type?: string;
  shadow?: boolean;
  onClick?: MouseEventHandler<HTMLInputElement>;
  value?: string;
  maxInput?: number;
  disable?: boolean;
}

const SnapInput = ({
  placeholder,
  customClass,
  name,
  type,
  shadow,
  onClick,
  value,
  maxInput,
  disable
}: SnapInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || ""}
      render={({ field: { onChange, onBlur, value, ref} }) => (
        <input
          type={type?type:"number"}
          value={value}
          placeholder={placeholder}
          onClick={onClick}
          onBlur={(e) => {
            if(type !== "text") {
              onBlur();
              const inputValue = parseFloat(e.target.value);
              if (!isNaN(inputValue)) {
                const formattedValue = inputValue.toFixed(2);
                onChange(formattedValue);
              } else {
                onChange("");
              }
            }
          }}
          onChange={(e) => onChange(e.target.value.trim())}
          maxLength={maxInput}
          ref={ref}
          className={`${customClass} w-1/2 rounded-full text-center placeholder:text-gray-500 text-xs text-black drop-shadow outline-none lg:text-sm py-1 ${
            shadow ? "shadow-custom" : ""
          }`}
        />
      )}
    />
  );
};

export default SnapInput;
