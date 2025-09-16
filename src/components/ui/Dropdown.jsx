import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Dropdown = ({
  text = "Dropdown button",
  icon = true,
  decorativeIcon = null,
  options = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Settings", value: "settings" },
    { label: "Earnings", value: "earnings" },
    { label: "Sign out", value: "signout" },
  ],
  onSelect,
  buttonClassName = "",
  dropdownClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (onSelect) {
      onSelect(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`text-black bg-gray-50 w-full hover:bg-gray-100 font-medium text-sm px-5 py-3.5 text-center flex justify-between items-center ${buttonClassName}`}
        type="button"
      >
        <span className="flex items-center">
          {decorativeIcon && (
            <span className="mr-2 flex items-center">{decorativeIcon}</span>
          )}
          {text}
        </span>
        {icon && <ChevronDownIcon class="ms-2 h-4 w-4 text-black" />}
      </button>

      <div
        className={`z-10 absolute ${
          isOpen ? "block" : "hidden"
        } "bg-white divide-y divide-gray-100 shadow-sm w-44 ${dropdownClassName}"`}
      >
        <ul className="py-2 text-sm text-gray-700 bg-white">
          {options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleOptionClick(option)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
