import React from "react";

const Button = ({ text = "button", className = "" }) => {
  return (
    <button
      type="button"
      class={`text-white bg-black hover:bg-gray-900 font-medium text-sm px-8 py-2.5 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
