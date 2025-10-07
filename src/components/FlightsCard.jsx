import React from "react";
import Button from "./ui/Button";

// Helper per formattare le date
const formatDateTime = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

const FlightsCard = ({ flight, onClick }) => {
  // Prendiamo il primo e ultimo segmento dell'itinerario per calcolare from/to
  const firstItinerary = flight.itineraries[0];
  const segments = firstItinerary.segments;
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  // Durata totale in ore e minuti
  const duration = firstItinerary.duration.match(/PT(\d+)H(\d+)M/);
  const hours = duration ? duration[1] : "0";
  const minutes = duration ? duration[2] : "0";

  return (
    <div className="border border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        <h4 className="font-semibold text-lg mb-2">
          Flight: {flight.validatingAirlineCodes[0]}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <p className="flex flex-col">
            <strong>From:</strong> {firstSegment.departure.iataCode}{" "}
          </p>

          <p className="flex flex-col">
            <strong>To:</strong> {lastSegment.arrival.iataCode}
          </p>

          <p className="flex flex-col">
            <strong>Departure:</strong>{" "}
            {new Date(firstSegment.departure.at).toLocaleString()}
          </p>

          <p className="flex flex-col">
            <strong>Arrival:</strong>{" "}
            {new Date(lastSegment.arrival.at).toLocaleString()}
          </p>

          <p className="flex flex-col">
            <strong>Duration:</strong> {hours}h {minutes}m
          </p>

          <p className="flex flex-col">
            <strong>Seats available:</strong> {flight.numberOfBookableSeats}
          </p>

          <p className="flex flex-col">
            <strong>Price:</strong> {flight.price.total} {flight.price.currency}
          </p>
        </div>
      </div>
      <Button type="button" onClick={onClick}>
        More Info
      </Button>
    </div>
  );
};

export default FlightsCard;
