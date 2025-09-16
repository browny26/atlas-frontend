import React from "react";

const TextInput = ({ name, type, required = true, label, placeholder }) => {
  return (
    <div className="w-full">
      {label && (
        <label
          for={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name-={name}
        className="bg-gray-50 text-black text-sm block w-full px-2.5 py-3.5 border-b border-gray-50 focus:border-black focus:outline-none"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default TextInput;
