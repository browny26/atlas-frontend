import React, { useEffect, useRef, useState } from "react";

import {
  SunIcon,
  MoonIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  CloudIcon,
  ArrowPathIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { bouncy } from "ldrs";
import Button from "./ui/Button";
import ActivityCard from "./ActivityCard";
import Alert from "./ui/Alert";
import { Link } from "react-router-dom";
import { itineraryAPI } from "../services/api";
bouncy.register();

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
    return { day: day.day, morning: null, afternoon: null, evening: null };
  });
};

const getTotalDays = (itinerary) =>
  itinerary.total_days || itinerary.itinerary?.length || 0;

/** Shown when the AI was unavailable and the backend returned a generic template. */
const FallbackNotice = () => (
  <div className="bg-yellow-50 border border-yellow-200 p-4 flex items-start gap-3">
    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 shrink-0" />
    <div>
      <h4 className="font-semibold text-yellow-800">Generic itinerary</h4>
      <p className="text-yellow-700 text-sm mt-1">
        Our AI planner is temporarily unavailable, so this is a generic plan
        based on your budget. Try again in a few minutes for a personalized
        itinerary.
      </p>
    </div>
  </div>
);

const StreamingNotice = ({ itinerary, statusMessage }) => (
  <div className="bg-blue-50 border border-blue-200 p-4 flex items-center gap-3">
    <SparklesIcon className="h-6 w-6 text-blue-600 animate-pulse shrink-0" />
    <p className="text-blue-800 text-sm">
      {statusMessage ||
        `Planning your trip... ${itinerary.itinerary?.length || 0} of ${getTotalDays(itinerary)} days ready`}
    </p>
  </div>
);

/** "Regenerate" control for one day, with optional feedback for the AI. */
const RegenerateDay = ({ day, disabled, busy, onRegenerate }) => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const regenerate = async (e) => {
    e.preventDefault();
    if (await onRegenerate(day, feedback)) {
      setOpen(false);
      setFeedback("");
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="flex items-center gap-1 text-sm text-white/80 hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ArrowPathIcon className="h-4 w-4" /> Regenerate
      </button>
    );
  }

  return (
    <form onSubmit={regenerate} className="flex items-center gap-2">
      <input
        type="text"
        value={feedback}
        maxLength={300}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="e.g. more museums, less walking (optional)"
        className="w-64 px-3 py-1 text-sm text-black bg-white"
        disabled={disabled}
        autoFocus
      />
      <button
        type="submit"
        disabled={disabled}
        className="text-sm bg-white text-black px-3 py-1 cursor-pointer disabled:opacity-50"
      >
        {busy ? "Regenerating..." : "Go"}
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        disabled={disabled}
        className="text-sm text-white/80 hover:text-white cursor-pointer"
      >
        Cancel
      </button>
    </form>
  );
};

const ItineraryComponent = ({
  itinerary,
  user,
  loading,
  streaming = false,
  statusMessage = "",
  onItineraryChange,
}) => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!message.text) return;
    const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    return () => clearTimeout(timer);
  }, [message.text]);

  const handleSaveItinerary = async () => {
    setSaving(true);
    try {
      await itineraryAPI.saveItinerary(user.id, itinerary);
      setMessage({ type: "success", text: "Itinerary saved successfully" });
    } catch (error) {
      console.error("Error saving itinerary:", error);
      setMessage({ type: "error", text: "Failed to save itinerary" });
    } finally {
      setSaving(false);
    }
  };

  const showError = (text) => setMessage({ type: "error", text });

  // One regeneration at a time: each response replaces the whole itinerary, so two
  // concurrent ones would undo each other. A response that arrives after the itinerary
  // was replaced (e.g. a new trip was generated) is discarded.
  const [regeneratingDay, setRegeneratingDay] = useState(null);
  const currentItinerary = useRef(itinerary);
  useEffect(() => {
    currentItinerary.current = itinerary;
  }, [itinerary]);

  const regenerateDay = async (day, feedback) => {
    const snapshot = itinerary;
    setRegeneratingDay(day);
    try {
      const res = await itineraryAPI.regenerateDay(snapshot, day, feedback);
      if (currentItinerary.current !== snapshot) return false;
      onItineraryChange(res.data.itinerary);
      return true;
    } catch (error) {
      showError(error.response?.data?.message || "Could not regenerate this day");
      return false;
    } finally {
      setRegeneratingDay(null);
    }
  };
  const canRegenerate =
    !streaming && onItineraryChange && itinerary?.source !== "fallback";

  return (
    <div className="bg-white py-10 px-2">
      {message.text && <Alert type={message.type} message={message.text} />}
      <div className="max-w-7xl mx-auto">
        <div className="lg:col-span-2">
          {itinerary ? (
            <div className="space-y-6">
              {streaming && (
                <StreamingNotice
                  itinerary={itinerary}
                  statusMessage={statusMessage}
                />
              )}
              {itinerary.source === "fallback" && <FallbackNotice />}

              <div className="bg-white shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 capitalize">
                      {itinerary.destination || "Unknown destination"}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {getTotalDays(itinerary)} day
                      {getTotalDays(itinerary) > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {itinerary.total_budget || "Not specified"}
                    </div>
                    <div className="text-sm text-gray-500">Total Budget</div>
                    {itinerary.total_estimated_cost && (
                      <div
                        className={`text-sm mt-1 ${
                          itinerary.budget_status === "over_budget"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        Estimated cost: {itinerary.total_estimated_cost}
                        {itinerary.budget_status === "over_budget" &&
                          " (over budget)"}
                      </div>
                    )}
                  </div>
                </div>

                {itinerary.accommodation && (
                  <div className="bg-blue-50 rounded-xl p-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          Accommodation
                        </h3>
                        <p className="text-gray-600">
                          {itinerary.accommodation.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          {itinerary.accommodation.cost}
                        </div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {getItineraryDays(itinerary).map((day) => (
                  <div key={day.day} className="bg-white shadow overflow-hidden">
                    <div className="bg-black p-4 flex flex-wrap justify-between items-center gap-2">
                      <h3 className="text-xl font-bold text-white">
                        Day {day.day}
                      </h3>
                      {canRegenerate && (
                        <RegenerateDay
                          day={day.day}
                          busy={regeneratingDay === day.day}
                          disabled={regeneratingDay !== null}
                          onRegenerate={regenerateDay}
                        />
                      )}
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

              {streaming && (
                <div className="flex justify-center py-6">
                  <l-bouncy size="35" speed="1.75" color="black"></l-bouncy>
                </div>
              )}

              {itinerary.tips?.length > 0 && (
                <div className="bg-white shadow p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Travel Tips
                  </h3>
                  <div className="grid gap-3">
                    {itinerary.tips.map((tip, index) => (
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

              {!streaming && (
                <div className="flex space-x-4">
                  {user ? (
                    <Button
                      onClick={handleSaveItinerary}
                      disabled={saving}
                      className="flex-1 py-3"
                    >
                      {saving ? "Saving Itinerary..." : "Save Itinerary"}
                    </Button>
                  ) : (
                    <Link
                      className="flex-1 py-3 text-center font-medium text-sm px-8 whitespace-nowrap cursor-pointer bg-black text-white hover:bg-gray-900"
                      to="/signin"
                    >
                      Login to save the itinerary
                    </Link>
                  )}
                </div>
              )}
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
