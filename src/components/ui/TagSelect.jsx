import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const TagSelect = ({
  placeholder = "Choose or create...",
  options = [],
  onChange,
  className = "",
}) => {
  const [value, setValue] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange?.(newValue.map((opt) => opt.value));
  };

  return (
    <CreatableSelect
      isMulti
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={handleChange}
      className={`w-full ${className}`}
      styles={{
        control: (base, state) => ({
          ...base,
          border: "none",
          borderBottom: `1px solid ${state.isFocused ? "black" : "#d1d5db"}`,
          backgroundColor: "transparent",
          borderRadius: 0,
          boxShadow: "none",
          padding: "5px 10px", // p-2.5
          minHeight: "unset",
          fontSize: "0.875rem", // text-sm
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#e5e7eb", // gray-200 per i tag
          borderRadius: "4px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "black",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "black",
          ":hover": {
            backgroundColor: "black",
            color: "white",
          },
        }),
        placeholder: (base) => ({
          ...base,
          color: "#99a1af", // gray-500
        }),
      }}
      classNamePrefix="select"
    />
  );
};

export default TagSelect;
