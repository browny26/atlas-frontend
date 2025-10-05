import React, { useState } from "react";
import GoogleMapComponent from "../../components/GoogleMapComponent";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchActivities(lat, lng, radius = 1) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:8080/amadeus/tours-and-activities?latitude=${41.397158}&longitude=${2.160873}&radius=${1}`,
        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWQiOjEsImZpc3ROYW1lIjoiTWFyaW8iLCJsYXN0TmFtZSI6IlJvc3NpIiwiaWF0IjoxNzU5NjEzNzE2LCJleHAiOjE3NTk3MDAxMTZ9.rEUYpzzJe3EtelkxaXSGZrPdWLNV3ETCP9i2gtUq7HA"}`,
          },
        }
      );
      if (!res.ok) throw new Error("Errore durante la richiesta");
      const data = await res.json();
      setActivities(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-3xl font-marcellus font-semibold text-gray-800 lg:mb-7">
          Activities
        </h3>
        <p>Find the best activities in your location.</p>
        <div className="space-y-6">
          <GoogleMapComponent onLocationSelect={fetchActivities} />

          {loading && <p>Caricamento attività...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((a) => (
              <li key={a.id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold">{a.name}</h3>
                <p>{a.shortDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Activities;
