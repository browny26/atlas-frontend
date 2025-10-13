import React from "react";
import { XCircleIcon } from "@heroicons/react/16/solid";

const Alert = ({ type = "success", message }) => {
  const typeStyles = {
    success: {
      containerBg: "bg-white text-gray-500",
      iconBg: "bg-green-100 text-green-500",
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      ),
    },
    error: {
      containerBg: "bg-white text-gray-500",
      iconBg: "bg-red-100 text-red-500",
      icon: <XCircleIcon className="h-5 w-5" />,
    },
  };

  const { containerBg, iconBg, icon } = typeStyles[type] || typeStyles.success;

  return (
    <div className="fixed top-9 right-0 p-10 z-10">
      <div
        className={`flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-sm ${containerBg}`}
        role="alert"
      >
        <div
          className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${iconBg}`}
        >
          {icon}
          <span className="sr-only">
            {type === "success" ? "Success icon" : "Error icon"}
          </span>
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          onClick={(e) => e.currentTarget.parentElement.remove()}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
