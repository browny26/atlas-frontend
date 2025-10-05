import React from "react";

const Button = ({ children, text = "", className = "", type = "button" }) => {
  return (
    <button
      type={type}
      className={`text-white bg-black hover:bg-gray-900 font-medium text-sm px-8 py-3.5 text-nowrap ${className}`}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
