import React, { useEffect, useRef, useState } from "react";
import MapComponent from "../../components/MapComponent";
import ActivitiesCard from "../../components/ui/ActivitiesCard";
import Pagination from "../../components/Pagination";
import Button from "../../components/ui/Button";
import { dotPulse } from "ldrs";
import { useModal } from "../../hooks/useModal";
import { useActivity } from "../../context/ActivityContext";
import { activityAPI } from "../../services/api";
import { Modal } from "../../components/ui/Modal";
dotPulse.register();

const RADIUS_OPTIONS = [1, 2, 5, 10]; // km
const ITEMS_PER_PAGE = 12;

const formatDistance = (meters) =>
  meters == null ? "" : meters < 1000 ? `${meters} m` : `${(meters / 1000).toFixed(1)} km`;

const entryLabel = (free) =>
  free === true ? "Free entry" : free === false ? "Paid entry" : "Entry: check on site";

const Activities = () => {
  const { pointer } = useActivity();
  const { isOpen, openModal, closeModal } = useModal();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(pointer || null);
  const [radius, setRadius] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searched, setSearched] = useState(false);
  // The map and the radius stay usable during a search: only the latest one may update
  // the page, so a slow, older answer cannot replace newer results.
  const latestRequest = useRef(0);

  async function fetchActivities({ lat, lng }, radiusKm, pageNumber) {
    const requestId = ++latestRequest.current;
    const isLatest = () => requestId === latestRequest.current;
    setLoading(true);
    setError("");
    try {
      const res = await activityAPI.searchActivity({
        latitude: lat,
        longitude: lng,
        radius: radiusKm,
        page: pageNumber,
        size: ITEMS_PER_PAGE,
      });
      if (!isLatest()) return;
      setActivities(res.data.data || []);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
      setSearched(true);
    } catch (err) {
      if (!isLatest()) return;
      setActivities([]);
      setError(
        err.response?.data?.message ||
          "Could not load the activities. Please try again."
      );
    } finally {
      if (isLatest()) setLoading(false);
    }
  }

  // MapComponent passes { lat, lng }.
  const handleLocationSelect = (point) => {
    setLocation(point);
    fetchActivities(point, radius, 1);
  };

  const handleRadiusChange = (e) => {
    const value = Number(e.target.value);
    setRadius(value);
    if (location) fetchActivities(location, value, 1);
  };

  const handleSelectCard = (activity) => {
    setSelectedActivity(activity);
    openModal();
  };

  // Coming from the dashboard map: search around the clicked point right away.
  useEffect(() => {
    if (pointer) fetchActivities(pointer, radius, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className=" text-3xl font-marcellus font-semibold text-gray-800">
          Activities
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <p className="text-gray-600">
            Click on the map, or use your location, to find museums, monuments
            and places to visit nearby.
          </p>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            Within
            <select
              value={radius}
              onChange={handleRadiusChange}
              className="border border-gray-300 px-2 py-1 bg-white"
            >
              {RADIUS_OPTIONS.map((km) => (
                <option key={km} value={km}>
                  {km} km
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="space-y-6 flex flex-col items-center">
          <MapComponent
            onLocationSelect={handleLocationSelect}
            initialMarker={pointer || null}
            radiusKm={radius}
          />

          {loading && (
            <div className="h-[30vh] w-full flex items-center justify-center">
              <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && searched && activities.length === 0 && (
            <p className="text-gray-500">
              No places found within {radius} km. Try a larger radius.
            </p>
          )}

          {!loading && (
            <div className="flex flex-wrap justify-between w-full gap-10 my-10">
              {activities.map((a) => (
                <ActivitiesCard
                  key={a.id}
                  title={a.name}
                  location={[a.category, formatDistance(a.distanceMeters)]
                    .filter(Boolean)
                    .join(" · ")}
                  price={entryLabel(a.free)}
                  img={a.imageUrl}
                  size="w-72 h-96"
                  onClick={() => handleSelectCard(a)}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && !loading && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => fetchActivities(location, radius, newPage)}
              size="sm"
            />
          )}

          {searched && (
            <p className="text-xs text-gray-400">
              Places ©{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                OpenStreetMap contributors
              </a>
            </p>
          )}

          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[700px] m-4"
          >
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
              <div className="px-2 pr-14">
                {selectedActivity && (
                  <>
                    <h4 className="mb-1 text-2xl font-semibold text-gray-800">
                      {selectedActivity.name}
                    </h4>
                    <p className="mb-6 text-sm text-gray-500">
                      {[
                        selectedActivity.category,
                        formatDistance(selectedActivity.distanceMeters) &&
                          `${formatDistance(selectedActivity.distanceMeters)} away`,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    {selectedActivity.imageUrl && (
                      <img
                        src={selectedActivity.imageUrl}
                        alt={selectedActivity.name}
                        className="mb-6 w-full max-h-72 object-cover"
                      />
                    )}
                    {selectedActivity.description && (
                      <p className="mb-4 text-gray-700">
                        {selectedActivity.description}
                      </p>
                    )}
                    <dl className="mb-6 space-y-2 text-sm text-gray-700">
                      <div>
                        <dt className="inline font-semibold">Entry: </dt>
                        <dd className="inline">
                          {entryLabel(selectedActivity.free).replace("Entry: ", "")}
                        </dd>
                      </div>
                      {selectedActivity.openingHours && (
                        <div>
                          <dt className="inline font-semibold">Opening hours: </dt>
                          <dd className="inline">{selectedActivity.openingHours}</dd>
                        </div>
                      )}
                    </dl>
                    <div className="mb-8 flex flex-wrap gap-4 text-sm">
                      <a
                        href={selectedActivity.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Open in Google Maps
                      </a>
                      {selectedActivity.wikipediaUrl && (
                        <a
                          href={selectedActivity.wikipediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Wikipedia
                        </a>
                      )}
                      {selectedActivity.website && (
                        <a
                          href={selectedActivity.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Official website
                        </a>
                      )}
                    </div>
                    <Button onClick={closeModal}>Close</Button>
                  </>
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
