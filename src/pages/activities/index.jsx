import React, { useEffect, useState } from "react";
import GoogleMapComponent from "../../components/GoogleMapComponent";
import ActivitiesCard from "../../components/ui/ActivitiesCard";
import Pagination from "../../components/Pagination";
import { Modal } from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { dotPulse } from "ldrs";
import { useModal } from "../../hooks/useModal";
import ActivityDescription from "../../components/ui/ActivityDescription";
import { Link } from "react-router-dom";
dotPulse.register();

const Activities = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
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

  const handleSelectCard = (activity) => {
    openModal();
    setSelectedActivity(activity);
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
                  onClick={() => handleSelectCard(a)}
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

          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[700px] m-4"
          >
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
              <div className="px-2 pr-14">
                <h4 className="mb-4 text-2xl font-semibold text-gray-800">
                  Activity Information
                </h4>

                {selectedActivity ? (
                  <>
                    {selectedActivity.minimumDuration && (
                      <p className="text-sm my-4">
                        Minimum Duration: {selectedActivity.minimumDuration}
                      </p>
                    )}
                    <p className="mb-2">
                      <ActivityDescription
                        description={selectedActivity.description}
                      />
                    </p>

                    {selectedActivity.bookingLink && (
                      <p className="text-sm my-4">
                        Want to book?{" "}
                        <Link
                          to={selectedActivity.bookingLink}
                          className="cursor-pointer text-blue-600"
                        >
                          Click here
                        </Link>
                      </p>
                    )}

                    <Button onClick={closeModal}>Close</Button>
                  </>
                ) : (
                  <p>No flight data available</p>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Activities;
