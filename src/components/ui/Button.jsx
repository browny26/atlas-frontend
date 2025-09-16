import React from "react";

const Button = ({ text = "button", className = "" }) => {
  return (
    <button
      type="button"
      className={`text-white bg-black hover:bg-gray-900 font-medium text-sm px-8 py-3.5 text-nowrap ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
