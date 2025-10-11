import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import GoogleMapComponent from "../../components/GoogleMapComponent";
import { useNavigate } from "react-router-dom";
import { useActivity } from "../../context/ActivityContext";
import Button from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { useModal } from "../../hooks/useModal";
import {
  SunIcon,
  MoonIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";
import ActivityCard from "../../components/ActivityCard";
import { itineraryAPI } from "../../services/api";

const Dashboard = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const { setPointer } = useActivity();
  const [itineraries, setItineraries] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const handleLocationSelect = ({ lat, lng }) => {
    setPointer({ lat, lng });
    navigate("/dashboard/activities");
  };

  const getUserItineraries = async () => {
    try {
      const res = await itineraryAPI.getUserItineraries();

      if (res.status !== 200) throw new Error("Failed to generate itinerary");

      const data = res.data;

      if (data.length === 0) {
        return;
      }
      if (data.success) {
        setItinerary(data.itinerary);
      } else {
        throw new Error("Failed to generate itinerary");
      }
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
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
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
                        You have no itineraries. Create one by clicking the
                        button down below.
                      </p>
                    ) : (
                      <div className="max-h-[400px] overflow-y-auto">
                        {itineraries.map((itinerary, index) => (
                          <div
                            key={itinerary.id}
                            className={`p-4 hover:bg-gray-50 cursor-pointer ${
                              index === itineraries.length - 1
                                ? ""
                                : "border-b border-gray-100"
                            }`}
                            onClick={() => {
                              setSelectedItinerary(itinerary);
                              openModal();
                            }}
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
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] m-4"
        >
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-6 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-6 text-2xl font-semibold text-gray-800">
                Itinerary Information
              </h4>

              {selectedItinerary ? (
                <div className="space-y-4">
                  {selectedItinerary.note && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
                      <div className="flex items-center">
                        <div className="text-yellow-600 text-lg mr-3">
                          <ExclamationTriangleIcon className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800">
                            Partial Itinerary
                          </h4>
                          <p className="text-yellow-700 text-sm mt-1">
                            {selectedItinerary.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row md:justify-between md:gap-10">
                    <p className="flex flex-col mb-3">
                      <strong>Destination:</strong>{" "}
                      {selectedItinerary.destination}
                    </p>
                    <p className="flex flex-col mb-3">
                      <strong>Budget:</strong>
                      {selectedItinerary.totalBudget}
                    </p>

                    <p className="flex flex-col mb-3">
                      <strong>Days:</strong> {selectedItinerary.totalDays}
                    </p>
                  </div>

                  {selectedItinerary.accommodation && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4>
                            <strong>Accommodation</strong>
                          </h4>
                          <p className="text-gray-600">
                            {selectedItinerary.accommodation.accomodationName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-800">
                            {selectedItinerary.accommodation.accomodationCost}
                          </div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedItinerary.itinerary.map((itinerary) => (
                    <div
                      key={itinerary.day}
                      className="bg-white overflow-hidden mb-5"
                    >
                      <h3 className="font-bold">Day {itinerary.day}</h3>

                      <div className="space-y-4">
                        <ActivityCard
                          activity={itinerary.morning}
                          timeSlot="morning"
                          emoji={
                            <SunIcon className="h-6 w-6 text-orange-600" />
                          }
                          bordered
                        />
                        <ActivityCard
                          activity={itinerary.afternoon}
                          timeSlot="afternoon"
                          emoji={
                            <CloudIcon className="h-6 w-6 text-green-600 text-center" />
                          }
                          bordered
                        />
                        <ActivityCard
                          activity={itinerary.evening}
                          timeSlot="evening"
                          emoji={
                            <MoonIcon className="h-6 w-6 text-purple-600 text-center" />
                          }
                        />

                        {/* Messaggio se non ci sono attività */}
                        {!itinerary.morning &&
                          !itinerary.afternoon &&
                          !itinerary.evening && (
                            <div className="text-center py-8 text-gray-500">
                              <div className="text-4xl mb-2">🤔</div>
                              <p>No activities planned for this day</p>
                            </div>
                          )}
                      </div>
                    </div>
                  ))}

                  <Button onClick={closeModal}>Close</Button>
                </div>
              ) : (
                <p>No flight data available</p>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
