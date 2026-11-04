import React from "react";
import FlightSearchLinks from "./FlightSearchLinks";

/** Flight results on the adventure page: the search, opened on comparison sites. */
const FlightComponent = ({ search }) => (
  <div className="max-w-7xl mx-auto py-10 px-2">
    <FlightSearchLinks search={search} />
  </div>
);

export default FlightComponent;
