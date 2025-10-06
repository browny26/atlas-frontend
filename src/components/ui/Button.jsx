import React from "react";

const Button = ({
  children,
  text = "",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  bgColor = "black",
  textColor = "white",
  hoverBgColor = "gray-900",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`text-${textColor} cursor-pointer bg-${bgColor} hover:bg-${hoverBgColor} font-medium text-sm px-8 py-3.5 text-nowrap ${className}`}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
