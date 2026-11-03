import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/InputField";
import Label from "../../components/ui/Label";
import { useUser } from "../../context/UserContext";
import ItineraryComponent from "../../components/ItineraryComponent";
import { generateItineraryStream } from "../../services/itineraryStream";

const Itineraries = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    destination: "",
    days: 1,
    budget: "",
    interests: [],
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
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
      // Days appear one by one while the AI writes them (Server-Sent Events).
      setItinerary(null);
      setStreaming(true);
      const result = await generateItineraryStream(formData, {
        onDay: (day) =>
          setItinerary((prev) => ({
            destination: formData.destination,
            total_days: Number(formData.days),
            total_budget: `€${formData.budget}`,
            ...prev,
            itinerary: [...(prev?.itinerary || []), day],
          })),
        onStatus: setStatusMessage,
      });
      setItinerary(result);
    } catch (err) {
      setItinerary(null); // partial days are not authoritative
      setError(err.message);
    } finally {
      setLoading(false);
      setStreaming(false);
      setStatusMessage("");
    }
  };

  return (
    <div className="relative">
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow p-6 sticky top-8">
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
                      max="14"
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
              <ItineraryComponent
                itinerary={itinerary}
                user={user}
                loading={loading}
                streaming={streaming}
                statusMessage={statusMessage}
                onItineraryChange={setItinerary}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itineraries;
