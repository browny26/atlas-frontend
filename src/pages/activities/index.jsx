import React, { useEffect, useState } from "react";
import GoogleMapComponent from "../../components/GoogleMapComponent";
import ActivitiesCard from "../../components/ui/ActivitiesCard";
import Pagination from "../../components/Pagination";
import { dotPulse } from "ldrs";
dotPulse.register();

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const itemsPerPage = 10;

  async function fetchActivities(lat, lng, radius = 1, page = 1) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:8080/amadeus/tours-and-activities?latitude=${41.397158}&longitude=${2.160873}&radius=${1}&page=${page}&size=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWQiOjEsImZpc3ROYW1lIjoiTWFyaW8iLCJsYXN0TmFtZSI6IlJvc3NpIiwiaWF0IjoxNzU5NjEzNzE2LCJleHAiOjE3NTk3MDAxMTZ9.rEUYpzzJe3EtelkxaXSGZrPdWLNV3ETCP9i2gtUq7HA"}`,
          },
        }
      );
      if (!res.ok) throw new Error("Errore durante la richiesta");
      const data = await res.json();
      setActivities(data.data || []);
      setTotalPages(data.totalPages);
      setPage(data.page);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleLocationSelect = (lat, lng) => {
    setLocation({ lat, lng });
    setPage(1);
    fetchActivities(lat, lng, 1, 1);
  };

  useEffect(() => {
    if (location) {
      fetchActivities(location.lat, location.lng, 1, page);
    }
  }, [page]);

  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-3xl font-marcellus font-semibold text-gray-800 lg:mb-7">
          Activities
        </h3>
        <p>Find the best activities in your location.</p>
        <div className="space-y-6 flex flex-col items-center mt-20">
          <GoogleMapComponent onLocationSelect={handleLocationSelect} />

          {loading && (
            <div className="h-[30vh] w-full flex items-center justify-center">
              <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}

          <ul className="flex flex-wrap justify-between gap-4 my-10">
            {activities.map((a) => (
              <li key={a.id} className="">
                {/* <h3 className="font-bold">{a.name}</h3>
                <p>{a.shortDescription}</p> */}
                <ActivitiesCard
                  title={a.name}
                  price={
                    a.price
                      ? `${a.price.amount}0 ${a.price.currencyCode}`
                      : "N/A"
                  }
                  location={a.tourismType || "General"}
                  img={a.pictures[0]}
                />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
              size="sm" // o "lg"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Activities;
