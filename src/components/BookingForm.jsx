import React from "react";
import { useState } from "react";
import Tab from "./ui/Tab";
import Button from "./ui/Button";
import TagSelect from "./ui/TagSelect";
import AirportAutocomplete from "./ui/AirportAutocomplete";
import DatePicker from "./ui/DatePicker";
import Input from "./ui/InputField";
import { flightsAPI, itineraryAPI } from "../services/api";

const BookingForm = ({
  setPage,
  setError,
  setLoading,
  loading,
  setFlights,
  setItinerary,
  onSuccess,
  setHasSearched,
  error,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [flightData, setFlightData] = useState({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    adults: 1,
  });
  const [formData, setFormData] = useState({
    destination: "",
    days: 1,
    budget: "",
    interests: [],
  });
  const tabs = [
    { label: "Itinerary", href: "#itinerary" },
    { label: "Flights", href: "#flights" },
  ];
  const interestOptions = [
    { value: "food", label: "Food" },
    { value: "culture", label: "Culture" },
    { value: "adventure", label: "Adventure" },
    { value: "nature", label: "Nature" },
    { value: "shopping", label: "Shopping" },
    { value: "history", label: "History" },
    { value: "relaxation", label: "Relaxation" },
    { value: "nightlife", label: "Nightlife" },
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
    setError("");
    setLoading(false);
    setHasSearched(false);
    if (setPage) setPage(index);
  };

  async function fetchFlights(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !flightData.origin ||
      !flightData.destination ||
      !flightData.departDate
    ) {
      setError("Please fill in origin, destination and departure date");
      setLoading(false);
      return;
    }

    setHasSearched(true);

    try {
      const res = await flightsAPI.searchFlights(flightData);
      console.log(res);
      const data = res.data;

      if (onSuccess) {
        onSuccess(data, "flights");
      } else {
        console.log(data);
        setFlights(data || []);
      }
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const generateItinerary = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.destination || !formData.days || !formData.budget) {
      setError("Please fill in destination, days and budget");
      setLoading(false);
      return;
    }

    try {
      const res = await itineraryAPI.generateItinerary(formData);

      if (res.status !== 200) throw new Error("Failed to generate itinerary");

      const data = res.data;
      if (onSuccess) {
        onSuccess(data.itinerary, "itinerary");
      } else {
        if (data.success) {
          setItinerary(data.itinerary);
        } else {
          throw new Error("Failed to generate itinerary");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-4 px-6 flex flex-col flex-wrap gap-6 max-w-6xl lg:min-w-5xl 2xl:min-w-7xl min-w-full z-10">
      <Tab tabs={tabs} onTabChange={handleTabChange} />
      {activeTab === 0 && (
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => generateItinerary(e)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 items-center gap-x-2 gap-y-5">
            <Input
              name="destination"
              id="destination"
              type="text"
              placeholder="Destination"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  destination: e.target.value,
                })
              }
              containerClass="col-span-1 sm:col-span-2 lg:col-span-1"
            />
            <Input
              type="number"
              min={1}
              placeholder="Days"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  days: e.target.value,
                })
              }
            />
            <Input
              type="number"
              min={1}
              placeholder="Budget (€)"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  budget: e.target.value,
                })
              }
            />
            <TagSelect
              className="col-span-1 sm:col-span-2 lg:col-span-1"
              placeholder="Interests"
              options={interestOptions}
            />

            <Button
              type="submit"
              disabled={loading}
              className="col-span-1 sm:col-span-2 lg:col-span-1"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Itinerary...
                </div>
              ) : (
                "Generate Itinerary"
              )}
            </Button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400 text-center">{error}</p>
          )}
          {loading && (
            <p className="mt-2 text-sm text-fray-400 text-center">
              It may take a moment for the ai to respond...
            </p>
          )}
        </form>
      )}
      {activeTab === 1 && (
        <form
          className="flex flex-col gap-10 justify-between"
          onSubmit={(e) => fetchFlights(e)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 justify-between">
            <div className="flex flex-col">
              <AirportAutocomplete
                value={flightData.origin}
                onChange={(iataCode) =>
                  setFlightData({ ...flightData, origin: iataCode })
                }
                placeholder="From"
              />
            </div>
            <div>
              <AirportAutocomplete
                value={flightData.destination}
                onChange={(iataCode) =>
                  setFlightData({ ...flightData, destination: iataCode })
                }
                placeholder="To"
              />
            </div>
            <div>
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
              <Input
                type="number"
                min="1"
                max="9"
                placeholder="N. Adults"
                onChange={(e) =>
                  setFlightData({ ...flightData, adults: e.target.value })
                }
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                "Search"
              )}
            </Button>
          </div>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default BookingForm;
