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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        <h3 className=" text-3xl font-marcellus font-semibold text-gray-800">
          Activities
        </h3>
        <p className="mb-10">Find the best activities in your location.</p>
        <div className="space-y-6 flex flex-col items-center">
          <GoogleMapComponent onLocationSelect={handleLocationSelect} />

          {loading && (
            <div className="h-[30vh] w-full flex items-center justify-center">
              <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-between w-full gap-10 my-10">
            {activities.map((a) => (
              <div key={a.id} className="">
                <ActivitiesCard
                  title={a.name}
                  price={
                    a.price
                      ? `${a.price.amount}0 ${a.price.currencyCode}`
                      : "N/A"
                  }
                  location={a.tourismType || "General"}
                  img={a.pictures[0]}
                  size="w-72 h-96"
                />
              </div>
            ))}
          </div>

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
