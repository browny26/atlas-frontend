import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";

const Card = ({
  rating = 4.7,
  title = { first: "Royal Palace", second: "of Madrid" },
  location = "SPAIN, EUROPE",
  img = null,
}) => {
  return (
    <div className="relative w-[90dvw] h-96 lg:w-80 shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Background Image */}
      <div className="absolute inset-0">
        {img ? (
          <img
            src={img}
            alt={`${title.first} ${title.second}`}
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
              <span className="text-sm font-medium">Destination Image</span>
            </div>
          </div>
        )}
      </div>

      {/* Dark overlay for better text visibility */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-5 text-white">
        {/* Gradient overlay only behind text (not covering whole image) */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative z-10">
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? "text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 font-semibold">{rating}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold mb-2 leading-tight">
            {title.first} <br />
            <span className="font-nata font-black">{title.second}</span>
          </h3>

          {/* Location */}
          <p className="text-sm uppercase tracking-wide font-medium flex items-center gap-2 opacity-90">
            <MapPinIcon className="h-4 w-4" />
            {location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
