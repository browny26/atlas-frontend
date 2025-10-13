import React, { useState } from "react";

import {
  SunIcon,
  MoonIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";
import { bouncy } from "ldrs";
import Button from "./ui/Button";
import ActivityCard from "./ActivityCard";
import { Link } from "react-router-dom";
import { itineraryAPI } from "../services/api";
bouncy.register();

const ItineraryComponent = ({ itinerary, user, loading }) => {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSaveItinerary = async () => {
    setSubmitted(false);

    try {
      const res = await itineraryAPI.saveItinerary(user.id, itinerary);

      if (res.status !== 200)
        setMessage({ type: "error", text: "Failed to save itinerary" });

      const data = res.data;
      if (data.success) {
        setMessage({ type: "success", text: "Itinerary saved successfully" });
      } else {
        setMessage({ type: "error", text: "Failed to save itinerary" });
      }
    } catch (error) {
      console.error("Error saving itinerary:", error);
      setMessage({ type: "error", text: "Failed to save itinerary" });
    } finally {
      setSubmitted(true);
    }
  };

  const getAccommodation = (itinerary) => {
    return itinerary.accommodation || null;
  };

  const getItineraryDays = (itinerary) => {
    if (!itinerary.itinerary) return [];

    return itinerary.itinerary.map((day) => {
      if (day.morning || day.afternoon || day.evening) {
        return {
          day: day.day,
          morning: day.morning,
          afternoon: day.afternoon,
          evening: day.evening,
        };
      } else if (day.activities && Array.isArray(day.activities)) {
        const activities = day.activities.slice(0, 3);
        return {
          day: day.day,
          morning: activities[0] || null,
          afternoon: activities[1] || null,
          evening: activities[2] || null,
        };
      }

      return {
        day: day.day,
        morning: null,
        afternoon: null,
        evening: null,
      };
    });
  };

  const getTips = (itinerary) => {
    return itinerary.tips || [];
  };

  const getNote = (itinerary) => {
    return itinerary.note || null;
  };

  const getTotalBudget = (itinerary) => {
    return itinerary.total_budget || "Not specified";
  };

  const getTotalDays = (itinerary) => {
    return itinerary.total_days || itinerary.itinerary?.length || 0;
  };

  const getDestination = (itinerary) => {
    return itinerary.destination || "Unknown destination";
  };

  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto">
        <div className="lg:col-span-2">
          {itinerary ? (
            <div className="space-y-6">
              {getNote(itinerary) && (
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
                        {getNote(itinerary)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 capitalize">
                      {getDestination(itinerary)}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {getTotalDays(itinerary)} day
                      {getTotalDays(itinerary) > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {getTotalBudget(itinerary)}
                    </div>
                    <div className="text-sm text-gray-500">Total Budget</div>
                  </div>
                </div>

                {getAccommodation(itinerary) && (
                  <div className="bg-blue-50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Accommodation
                        </h3>
                        <p className="text-gray-600">
                          {getAccommodation(itinerary).name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          {getAccommodation(itinerary).cost}
                        </div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {getItineraryDays(itinerary).map((day) => (
                  <div
                    key={day.day}
                    className="bg-white shadow overflow-hidden"
                  >
                    <div className="bg-black p-4">
                      <h3 className="text-xl font-bold text-white">
                        Day {day.day}
                      </h3>
                    </div>

                    <div className="p-6 space-y-4">
                      <ActivityCard
                        activity={day.morning}
                        timeSlot="morning"
                        emoji={<SunIcon className="h-6 w-6 text-orange-600" />}
                        bordered
                      />
                      <ActivityCard
                        activity={day.afternoon}
                        timeSlot="afternoon"
                        emoji={
                          <CloudIcon className="h-6 w-6 text-green-600 text-center" />
                        }
                        bordered
                      />
                      <ActivityCard
                        activity={day.evening}
                        timeSlot="evening"
                        emoji={
                          <MoonIcon className="h-6 w-6 text-purple-600 text-center" />
                        }
                      />

                      {!day.morning && !day.afternoon && !day.evening && (
                        <div className="text-center py-8 text-gray-500">
                          <div className="text-4xl mb-2">🤔</div>
                          <p>No activities planned for this day</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {getTips(itinerary).length > 0 && (
                <div className="bg-white shadow p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Travel Tips
                  </h3>
                  <div className="grid gap-3">
                    {getTips(itinerary).map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg"
                      >
                        <p className="text-gray-700">- {tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                {user ? (
                  <Button
                    onClick={() => handleSaveItinerary()}
                    className="flex-1 py-3"
                  >
                    Save Itinerary
                  </Button>
                ) : (
                  <Link
                    className={`flex-1 py-3 text-center font-medium text-sm px-8 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white hover:bg-gray-900`}
                    to="/signin"
                  >
                    Login to save the itinary
                  </Link>
                )}
              </div>
            </div>
          ) : loading ? (
            <div className="h-[50vh] flex items-center justify-center">
              <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
            </div>
          ) : (
            <div className="bg-white p-12 text-center">
              <div className="flex text-6xl mb-4 justify-center">
                <PaperAirplaneIcon className="h-12 w-12 text-black -rotate-45" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Ready to Plan Your Adventure?
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Fill out the form to generate a personalized travel itinerary
                based on your destination, budget, and interests.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryComponent;
