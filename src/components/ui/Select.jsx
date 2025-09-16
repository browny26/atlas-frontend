import React from "react";

const Select = ({ label, options, placeholder, name, onChange }) => {
  const handleChange = (e) => {
    if (multiple) {
      const selectedValues = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      onChange?.(selectedValues);
    } else {
      // Altrimenti singolo valore
      onChange?.(e.target.value);
    }
  };

  return (
    <div classNameName="w-full">
      <label htmlFor={name} className={`${label ? "" : "sr-only"}`}>
        {label}
      </label>

      <select
        id={name}
        name={name}
        className="block p-2.5 w-full text-sm text-black bg-gray-50 border-b border-gray-50 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
        onChange={handleChange}
      >
        <option className="text-gray-200" value="" disabled>
          {placeholder}
        </option>

        {options.map((option, index) =>
          typeof option === "string" ? (
            <option key={index} value={option}>
              {option}
            </option>
          ) : (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default Select;
