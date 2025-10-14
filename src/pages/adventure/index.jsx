import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingForm from "../../components/BookingForm";
import { dotPulse } from "ldrs";
import FlightsCard from "../../components/FlightsCard";
import Pagination from "../../components/Pagination";
import { Modal } from "../../components/ui/Modal";
import ItineraryComponent from "../../components/ItineraryComponent";
import { useModal } from "../../hooks/useModal";
import { useUser } from "../../context/UserContext";
import FlightComponent from "../../components/FlightComponent";
import { useLocation } from "react-router-dom";
dotPulse.register();

const index = () => {
  const { user } = useUser();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [flightData, setFlightData] = useState({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    adults: 1,
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    destination: "",
    days: 1,
    budget: "",
    interests: [],
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitted, setSubmitted] = useState(false);
  const [itinerary, setItinerary] = useState(null);

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

  useEffect(() => {
    if (location.state?.results) {
      const { results, tabType } = location.state;

      if (tabType === "flights") {
        setFlights(results);
        setCurrentPage(1);
      } else if (tabType === "itinerary") {
        setItinerary(results);
        setCurrentPage(0);
      }
    }
  }, [location.state]);

  return (
    <section className="relative bg-gray-50">
      <div
        className="absolute top-0 h-[50dvh] w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1681679942947-18b2a539f27a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
      <header className="relative h-[50dvh] flex flex-col items-center w-full bg-cover bg-center bg-no-repeat overflow-hidden">
        <Navbar />

        <div className="flex-grow flex items-center justify-center mt-10">
          <div className="text-center text-black px-4 max-w-3xl flex flex-col items-center gap-16">
            <h1 className="font-nata text-6xl sm:text-7xl 2xl:text-8xl 3xl:text-9xl font-bold mb-4 text-nowrap">
              <span className="font-italiana text-white">Find your</span>
              <br />
              New Adventure
            </h1>
          </div>
        </div>
      </header>

      <section className="my-5">
        <div className="container flex flex-col items-center mx-auto max-w-6xl">
          <BookingForm
            setPage={setCurrentPage}
            setError={setError}
            error={error}
            loading={loading}
            setLoading={setLoading}
            setFlights={setFlights}
            setItinerary={setItinerary}
            setHasSearched={setHasSearched}
          />
        </div>
      </section>

      <section>
        {currentPage === 0 && (
          <ItineraryComponent
            itinerary={itinerary}
            user={user}
            loading={loading}
          />
        )}
        {currentPage === 1 && (
          <FlightComponent
            flights={flights}
            loading={loading}
            error={error}
            setHasSearched={hasSearched}
          />
        )}
      </section>

      <Footer />
    </section>
  );
};

export default index;
