import { useForm, useFormContext } from "react-hook-form";
import Select from "react-select";

type Option = {
  value:string,
  label:string,
}

const SnapDropdown = ({
  options,
  name,
  shadow,
  customClass,
  placeholder,
  fieldName,
}: {
  options: Option[];
  name: string;
  shadow?: boolean;
  customClass?: string;
  placeholder?:string;
  fieldName?:string;
}) => {
  const { register, setValue } = useForm();

  const selectOptions = options.map(({value,label}) => ({
    value: value,
    label: label,
  }));

  const handleChange = (selectedOption: any) => {
    setValue(name, selectedOption ? selectedOption.value : "");
  };

  return (
    <div className={``}>
      <Select
        options={selectOptions}
        {...register(fieldName || "default")}
        placeholder={placeholder}
        className={`bg-transparent text-center w-30 text-sm shadow flex items-center justify-center ${customClass}`}
        onChange={handleChange}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "9999px",
            width: "100%",
            zIndex: 0,
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "0px",
          }),
          input: (base) => ({
            ...base,
            padding: "0px",
          }),
          dropdownIndicator: (base) => ({
            ...base,
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: "none",
          }),
          placeholder: (base) => ({
            ...base,
            color: "black",
          }),
        }}
      />
    </div>
  );
};

export default SnapDropdown;
