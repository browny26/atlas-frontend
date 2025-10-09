import React, { use, useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { PlusIcon } from "@heroicons/react/24/outline";
import GoogleMapComponent from "../../components/GoogleMapComponent";
import { useNavigate } from "react-router-dom";
import { useActivity } from "../../context/ActivityContext";
import Label from "../../components/ui/Label";
import Input from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import { useItinerary } from "../../context/ItineraryContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { setPointer } = useActivity();
  const [itineraries, setItineraries] = useState([]);
  //const { itineraryData, setItineraryData } = useItinerary();
  // const interestOptions = [
  //   "food",
  //   "culture",
  //   "adventure",
  //   "nature",
  //   "shopping",
  //   "history",
  //   "relaxation",
  //   "nightlife",
  // ];

  // const handleInterestToggle = (interest) => {
  //   setItineraryData((prev) => ({
  //     ...prev,
  //     interests: prev.interests.includes(interest)
  //       ? prev.interests.filter((i) => i !== interest)
  //       : [...prev.interests, interest],
  //   }));
  // };

  const handleLocationSelect = ({ lat, lng }) => {
    setPointer({ lat, lng });
    navigate("/dashboard/activities");
  };

  // const generateItinerary = (e) => {
  //   e.preventDefault();
  //   console.log("Generating itinerary with data:", itineraryData);
  //   navigate("/dashboard/itinerary");
  // };

  const getUserItineraries = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/v1/api/itinerary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch itineraries");
      const data = await response.json();
      console.log("User Itineraries:", data);

      setItineraries(data);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
  };

  useEffect(() => {
    getUserItineraries();
  }, []);

  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-3xl font-marcellus font-semibold text-gray-800 lg:mb-7">
          Dashboard
        </h3>
        <section className="space-y-6">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <p className="mb-2 text-gray-600">
                Click on the map to find the best activity near you!
              </p>
              <GoogleMapComponent onLocationSelect={handleLocationSelect} />
            </div>
            <div>
              <div className="bg-white shadow p-6 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-semibold mb-4">
                    Your Itineraries
                  </h4>
                  <div>
                    {itineraries.length === 0 ? (
                      <p className="text-gray-500">
                        You have no itineraries. Create one by selecting a
                        location on the map.
                      </p>
                    ) : (
                      <div className="max-h-[400px] overflow-y-auto">
                        {itineraries.map((itinerary, index) => (
                          <div
                            key={itinerary.id}
                            className={`p-4 hover:shadow cursor-pointer ${
                              index === itineraries.length - 1
                                ? ""
                                : "border-b border-gray-100"
                            }`}
                            onClick={() =>
                              navigate(`/dashboard/itinerary/${itinerary.id}`)
                            }
                          >
                            <h5 className="text-lg font-medium">
                              {itinerary.destination}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {itinerary.totalDays} days | Budget:{" "}
                              {itinerary.totalBudget}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full py-3 flex items-center justify-center gap-2"
                    onClick={() => navigate("/dashboard/itineraries")}
                  >
                    <PlusIcon className="h-5 w-5" />
                    Create New Itinerary
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="bg-white shadow p-6">
              <h2 className="font-medium text-xl">Looking for a flight?</h2>
              <p className="mb-4 text-gray-600">
                Use our flight search tool to find the best deals on flights to
                your destination.
              </p>
              <Button onClick={() => navigate("/dashboard/flights")}>
                Search Flights
              </Button>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
