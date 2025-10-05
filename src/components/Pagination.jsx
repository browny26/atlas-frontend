import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, onPageChange, size = "sm" }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const isSmall = size === "sm";

  return (
    <nav aria-label="Page navigation">
      <ul
        className={`flex items-center -space-x-px ${
          isSmall ? "h-8 text-sm" : "h-10 text-base"
        }`}
      >
        {/* Previous */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-${
              isSmall ? "3" : "4"
            } h-${isSmall ? "8" : "10"} ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            } bg-white border border-e-0 border-gray-300 rounded-s-lg`}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon
              className={`${isSmall ? "w-2.5 h-2.5" : "w-3 h-3"}`}
            />
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              onClick={() => onPageChange(num)}
              className={`flex items-center justify-center px-${
                isSmall ? "3" : "4"
              } h-${isSmall ? "8" : "10"} leading-tight border ${
                num === currentPage
                  ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {num}
            </button>
          </li>
        ))}

        {/* Next */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-${
              isSmall ? "3" : "4"
            } h-${isSmall ? "8" : "10"} ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            } bg-white border border-gray-300 rounded-e-lg`}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon
              className={`${isSmall ? "w-2.5 h-2.5" : "w-3 h-3"}`}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
