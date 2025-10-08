import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/InputField";
import Label from "../../components/ui/Label";
import Table from "../../components/Table";
import {
  SunIcon,
  MoonIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";
import { bouncy } from "ldrs";
bouncy.register();

const index = () => {
  const [formData, setFormData] = useState({
    destination: "",
    days: 1,
    budget: "",
    interests: [],
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState("");

  const interestOptions = [
    "food",
    "culture",
    "adventure",
    "nature",
    "shopping",
    "history",
    "relaxation",
    "nightlife",
  ];

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

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
      const response = await fetch(
        "http://localhost:8080/v1/api/itinerary/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to generate itinerary");

      const data = await response.json();
      if (data.success) {
        setItinerary(data.itinerary);
      } else {
        throw new Error("Failed to generate itinerary");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAccommodation = (itinerary) => {
    return itinerary.accommodation || null;
  };

  const getItineraryDays = (itinerary) => {
    if (!itinerary.itinerary) return [];

    return itinerary.itinerary.map((day) => {
      // Se ha la struttura classica (morning, afternoon, evening)
      if (day.morning || day.afternoon || day.evening) {
        return {
          day: day.day,
          morning: day.morning,
          afternoon: day.afternoon,
          evening: day.evening,
        };
      }
      // Se ha la struttura activities array
      else if (day.activities && Array.isArray(day.activities)) {
        const activities = day.activities.slice(0, 3); // Prendi max 3 attività
        return {
          day: day.day,
          morning: activities[0] || null,
          afternoon: activities[1] || null,
          evening: activities[2] || null,
        };
      }
      // Formato sconosciuto
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

  // Componente per mostrare un'attività
  const ActivityCard = ({ activity, timeSlot, emoji, bordered }) => {
    if (!activity) return null;

    return (
      <div
        className={`flex items-start gap-5 space-x-4 p-4 ${
          bordered ? "border-b border-gray-100" : ""
        }`}
      >
        <div className="flex flex-col flex-shrink-0 w-16 text-center items-center">
          <div className="text-2xl">{emoji}</div>
          <div
            className={`text-xs font-medium mt-1 ${
              timeSlot === "morning"
                ? "text-orange-600"
                : timeSlot === "afternoon"
                ? "text-green-600"
                : "text-purple-600"
            }`}
          >
            {timeSlot.toUpperCase()}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{activity.activity}</h4>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            {activity.time && <span>{activity.time}</span>}
            {activity.cost && <span>{activity.cost}</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h1 className="text-3xl font-marcellus font-semibold text-gray-800">
          Travel Itinerary Generator
        </h1>
        <p className="text-gray-600 mb-10">
          Plan your perfect trip with AI-powered itinerary suggestions tailored
          to your interests and budget.
        </p>
        <div className="space-y-6">
          {/* <Table /> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-lg p-6 sticky top-8">
                <form onSubmit={generateItinerary} className="space-y-6">
                  {/* Destination */}
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      type="text"
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          destination: e.target.value,
                        })
                      }
                      placeholder="Where do you want to go?"
                      required
                    />
                  </div>

                  {/* Days */}
                  <div>
                    <Label htmlFor="days">Number of Days</Label>
                    <Input
                      id="days"
                      type="number"
                      min="1"
                      max="30"
                      value={formData.days}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          days: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <Label htmlFor="budget">Total Budget (€)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      placeholder="Enter your budget"
                      required
                    />
                  </div>

                  {/* Interests */}
                  <div>
                    <Label>Interests</Label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => handleInterestToggle(interest)}
                          className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            formData.interests.includes(interest)
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {interest.charAt(0).toUpperCase() + interest.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Generating...
                      </div>
                    ) : (
                      "Generate Itinerary"
                    )}
                  </Button>

                  {loading && (
                    <p className="text-center mt-2 text-gray-400 text-sm">
                      Please wait, this may take a moment...
                    </p>
                  )}

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Itinerary Display Section */}
            <div className="lg:col-span-2">
              {itinerary ? (
                <div className="space-y-6">
                  {/* Warning per itinerari parziali */}
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

                  {/* Header Card */}
                  <div className="bg-white shadow-lg p-6">
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
                        <div className="text-sm text-gray-500">
                          Total Budget
                        </div>
                      </div>
                    </div>

                    {/* Accommodation */}
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
                            <div className="text-sm text-gray-500">
                              per night
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Daily Itinerary */}
                  <div className="space-y-4">
                    {getItineraryDays(itinerary).map((day) => (
                      <div
                        key={day.day}
                        className="bg-white shadow-lg overflow-hidden"
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
                            emoji={
                              <SunIcon className="h-6 w-6 text-orange-600" />
                            }
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

                          {/* Messaggio se non ci sono attività */}
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

                  {/* Travel Tips */}
                  {getTips(itinerary).length > 0 && (
                    <div className="bg-white shadow-lg p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Travel Tips
                      </h3>
                      <div className="grid gap-3">
                        {getTips(itinerary).map((tip, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-3 rounded-lg"
                          >
                            {/* <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm">
                              💡
                            </div> */}
                            <p className="text-gray-700">- {tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => window.print()}
                      className="flex-1 py-3"
                    >
                      📝 Save Itinerary
                    </Button>
                    <Button
                      onClick={() => setItinerary(null)}
                      textColor="black"
                      bgColor="gray-200"
                      hoverBgColor="gray-300"
                      className="flex-1 py-3"
                    >
                      🔄 Generate New
                    </Button>
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
                    Fill out the form to generate a personalized travel
                    itinerary based on your destination, budget, and interests.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
