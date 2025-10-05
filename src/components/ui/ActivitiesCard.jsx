import React from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";

const ActivitiesCard = ({
  price = null,
  title = "",
  location = "SPAIN, EUROPE",
  img = null,
  size = "",
}) => {
  return (
    <div
      className={`relative ${
        size ? size : "lg:w-96 w-[90dvw] h-[500px]"
      }  shadow-md overflow-hidden`}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>
      {/* Background Image */}
      <div className="absolute inset-0">
        {img ? (
          <img
            src={img}
            alt={`${title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <div className="text-center text-gray-600">
              <svg
                className="w-16 h-16 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">No Images Found :/</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-5 text-white">
        {/* Gradient overlay only behind text (not covering whole image) */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative z-10">
          {/* Title */}
          <h3 className="font-serif text-xl font-bold mb-2 leading-tight">
            {title} <br />
          </h3>

          {/* Location */}
          <p className="text-sm uppercase tracking-wide font-medium flex items-center gap-2 opacity-90">
            <BanknotesIcon className="h-4 w-4" />
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesCard;
