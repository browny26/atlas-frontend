import React from "react";
import Input from "../../components/ui/InputField";
import Label from "../../components/ui/Label";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { dotPulse } from "ldrs";
import Button from "../../components/ui/Button";
import FlightsCard from "../../components/FlightsCard";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../../components/ui/modal";
import { format } from "date-fns";
import DatePicker from "../../components/ui/DatePicker";
import AirportAutocomplete from "../../components/ui/AirportAutocomplete";
dotPulse.register();

const Flights = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [flightData, setFlightData] = useState({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    adults: 1,
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const itemsPerPage = 10;

  async function fetchFlights(e, page = 1) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSelectedFlight(null);

    if (
      !flightData.origin ||
      !flightData.destination ||
      !flightData.departDate
    ) {
      setError("Please fill in origin, destination and departure date");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/amadeus/flights?origin=${flightData.origin}&destination=${flightData.destination}&departDate=${flightData.departDate}&returnDate=${flightData.returnDate}&adults=${flightData.adults}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Errore durante la richiesta");
      const data = await res.json();
      setFlights(data || []);
      //setTotalPages(data.totalPages);
      //setPage(data.page);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDepartDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFlightData({ ...flightData, departDate: formattedDate });
  };

  const handleReturnDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFlightData({ ...flightData, returnDate: formattedDate });
  };

  const handleOpenModal = (flight) => {
    console.log("1. Flight card clicked");
    console.log("2. Flight data:", flight);
    setSelectedFlight(flight);
    console.log("3. Selected flight set");
    openModal();
    console.log("4. Modal opened, isOpen should be true");
  };

  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-3xl font-marcellus font-semibold text-gray-800 lg:mb-7">
          Flights
        </h3>
        <div className="space-y-6">
          <form
            className="border border-gray-100 flex flex-col gap-10 justify-between p-10"
            onSubmit={(e) => fetchFlights(e)}
          >
            <div className="flex gap-10 justify-between">
              <div>
                <Label>From</Label>
                <AirportAutocomplete
                  value={flightData.origin}
                  onChange={(iataCode) =>
                    setFlightData({ ...flightData, origin: iataCode })
                  }
                  placeholder="Departure city or airport..."
                />
              </div>
              <div>
                <Label>To</Label>
                <AirportAutocomplete
                  value={flightData.destination}
                  onChange={(iataCode) =>
                    setFlightData({ ...flightData, destination: iataCode })
                  }
                  placeholder="Arrival city or airport..."
                />
              </div>
              <div>
                <Label>Departure Date</Label>
                <DatePicker
                  value={flightData.departDate}
                  onChange={(date) =>
                    setFlightData({ ...flightData, departDate: date })
                  }
                  placeholder="Select departure date"
                  minDate={new Date()}
                />
                {flightData.departDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {flightData.departDate}
                  </p>
                )}
              </div>

              <div>
                <Label>Return Date</Label>
                <DatePicker
                  value={flightData.returnDate}
                  onChange={(date) =>
                    setFlightData({ ...flightData, returnDate: date })
                  }
                  placeholder="Select return date"
                  minDate={
                    flightData.departDate
                      ? new Date(flightData.departDate)
                      : new Date()
                  }
                />
                {flightData.returnDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {flightData.returnDate}
                  </p>
                )}
              </div>
              <div>
                <Label>Number of Adults</Label>
                <Input
                  type="number"
                  min="1"
                  max="9"
                  placeholder="es: 3"
                  onChange={(e) =>
                    setFlightData({ ...flightData, adults: e.target.value })
                  }
                />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          <div className="flex flex-col items-center mt-20">
            {loading && (
              <div className="h-[30vh] w-full flex items-center justify-center">
                <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && flights.length === 0 && (
              <p className="text-gray-500">No flights found.</p>
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
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => fetchFlights(newPage)}
                size="md"
              />
            )}
            <Modal
              isOpen={isOpen}
              onClose={closeModal}
              className="max-w-[700px] m-4"
            >
              <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
                <div className="px-2 pr-14">
                  <h4 className="mb-4 text-2xl font-semibold text-gray-800">
                    Flight Information
                  </h4>

                  {selectedFlight ? (
                    <>
                      <p className="mb-2">
                        <strong>Airline(s):</strong>{" "}
                        {selectedFlight.validatingAirlineCodes?.join(", ") ||
                          "N/A"}
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
                        {selectedFlight.pricingOptions?.refundableFare
                          ? "Yes"
                          : "No"}
                      </p>

                      <p className="mb-4">
                        <strong>Instant Ticketing Required:</strong>{" "}
                        {selectedFlight.instantTicketingRequired ? "Yes" : "No"}
                      </p>

                      <p className="mb-2 font-semibold">Itineraries:</p>
                      {selectedFlight.itineraries?.map((itinerary, idx) => (
                        <div
                          key={idx}
                          className="mb-4 p-3 border border-gray-100"
                        >
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
        </div>
      </div>
    </>
  );
};

export default Flights;
