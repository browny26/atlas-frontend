import React from "react";
import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { flightSearchLinks } from "../services/flightLinks";

const formatDate = (isoDate) =>
  new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/** The searched route, with buttons that open it on flight comparison sites. */
const FlightSearchLinks = ({ search }) => {
  if (!search) return null;
  const passengers = Math.max(1, Number(search.adults) || 1);

  return (
    <div className="w-full bg-white shadow p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3 text-2xl font-semibold text-gray-800">
        {search.origin}
        <ArrowRightIcon className="h-6 w-6" />
        {search.destination}
      </div>
      <p className="mt-2 text-gray-600">
        {formatDate(search.departDate)}
        {search.returnDate ? ` – ${formatDate(search.returnDate)}` : " · one way"}
        {` · ${passengers} adult${passengers > 1 ? "s" : ""}`}
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Compare live prices and book on:
      </p>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {flightSearchLinks(search).map(({ provider, url }) => (
          <a
            key={provider}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 border border-gray-200 px-5 py-4 font-medium text-gray-800 hover:border-black hover:bg-gray-50 transition-colors"
          >
            {provider}
            <ArrowTopRightOnSquareIcon className="h-5 w-5 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchLinks;
