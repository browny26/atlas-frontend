import React from "react";

const Button = ({
  children,
  text = "",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  variant = "black",
}) => {
  const variants = {
    black: "bg-black text-white hover:bg-gray-900",
    white: "bg-white text-black hover:bg-gray-200",
    gray: "bg-gray-500 text-white hover:bg-gray-600",
    green: "bg-green-500 text-white hover:bg-green-600",
    red: "bg-red-500 text-white hover:bg-red-600",
  };

  const variantClass = variants[variant] || variants.black;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`font-medium text-sm px-8 py-3.5 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${className}`}
    >
      {children || text}
    </button>
  );
};

export default Button;
