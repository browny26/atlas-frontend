import React, { useState } from "react";
import { useModal } from "../hooks/useModal";
import FlightsCard from "./FlightsCard";
import { Modal } from "./ui/Modal";
import Button from "./ui/Button";

const FlightComponent = ({ flights, loading, error }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleOpenModal = (flight) => {
    setSelectedFlight(flight);
    openModal();
  };
  return (
    <div className="max-w-7xl mx-auto my-10">
      {loading && (
        <div className="h-[30vh] w-full flex items-center justify-center">
          <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && flights && flights.length === 0 && (
        <div className="h-[30vh] w-full flex items-center justify-center">
          <p className="text-gray-500">No flights found.</p>
        </div>
      )}
      <div className="flex flex-col w-full gap-6">
        {flights.map((flight) => (
          <FlightsCard
            key={flight.id}
            flight={flight}
            onClick={() => handleOpenModal(flight)}
          />
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-4 text-2xl font-semibold text-gray-800">
              Flight Information
            </h4>

            {selectedFlight ? (
              <>
                <p className="mb-2">
                  <strong>Airline(s):</strong>{" "}
                  {selectedFlight.validatingAirlineCodes?.join(", ") || "N/A"}
                </p>

                <p className="mb-2">
                  <strong>Price:</strong> {selectedFlight.price?.total}{" "}
                  {selectedFlight.price?.currency}
                </p>

                <p className="mb-2">
                  <strong>Seats available:</strong>{" "}
                  {selectedFlight.numberOfBookableSeats}
                </p>

                <p className="mb-2">
                  <strong>Refundable:</strong>{" "}
                  {selectedFlight.pricingOptions?.refundableFare ? "Yes" : "No"}
                </p>

                <p className="mb-4">
                  <strong>Instant Ticketing Required:</strong>{" "}
                  {selectedFlight.instantTicketingRequired ? "Yes" : "No"}
                </p>

                <p className="mb-2 font-semibold">Itineraries:</p>
                {selectedFlight.itineraries?.map((itinerary, idx) => (
                  <div key={idx} className="mb-4 p-3 border border-gray-100">
                    <p>
                      <strong>Duration:</strong>{" "}
                      {itinerary.duration.match(/PT(\d+)H(\d+)M/)[1] +
                        "h" +
                        itinerary.duration.match(/PT(\d+)H(\d+)M/)[2] +
                        "m"}
                    </p>
                    <p>
                      <strong>Segments:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm mt-2">
                      {itinerary.segments?.map((segment, segIdx) => (
                        <li key={segIdx}>
                          {segment.departure?.iataCode} →{" "}
                          {segment.arrival?.iataCode}({segment.duration})
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <Button onClick={closeModal}>Close</Button>
              </>
            ) : (
              <p>No flight data available</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FlightComponent;
