import React, { useEffect, useState } from "react";
import Input from "../../components/ui/InputField";
import Label from "../../components/ui/Label";
import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import AirportAutocomplete from "../../components/ui/AirportAutocomplete";
import FlightSearchLinks from "../../components/FlightSearchLinks";
import { validateFlightSearch } from "../../services/flightLinks";
import Alert from "../../components/ui/Alert";

const Flights = () => {
  const [flightData, setFlightData] = useState({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    adults: 1,
  });
  const [search, setSearch] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message.text]);

  // Live prices come from comparison sites: the search is validated here and opened there.
  const searchFlights = (e) => {
    e.preventDefault();
    const error = validateFlightSearch(flightData);
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }
    setSearch({ ...flightData });
  };

  return (
    <div className="relative">
      {message.text && <Alert type={message.type} message={message.text} />}
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="text-3xl font-marcellus font-semibold text-gray-800">
          Flights
        </h3>
        <p className="text-gray-600 mb-10">
          Search the flight for your new adventure
        </p>
        <div className="space-y-6">
          <form
            className="border border-gray-100 shadow flex flex-col gap-10 justify-between p-10"
            onSubmit={searchFlights}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 justify-between">
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
              </div>
              <div>
                <Label>Number of Adults</Label>
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={flightData.adults}
                  placeholder="es: 3"
                  onChange={(e) =>
                    setFlightData({ ...flightData, adults: e.target.value })
                  }
                />
              </div>
            </div>
            <Button type="submit">Search</Button>
          </form>
          <div className="flex flex-col items-center mt-10">
            <FlightSearchLinks search={search} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
