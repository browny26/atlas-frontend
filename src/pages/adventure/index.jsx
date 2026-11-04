import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BookingForm from "../../components/BookingForm";
import { dotPulse } from "ldrs";
import ItineraryComponent from "../../components/ItineraryComponent";
import { useUser } from "../../context/UserContext";
import FlightComponent from "../../components/FlightComponent";
import { useLocation } from "react-router-dom";
dotPulse.register();

const Adventure = () => {
  const { user } = useUser();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [flights, setFlights] = useState(null); // the flight search, shown as links
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

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

      <section className="my-5 px-2">
        <div className="container flex flex-col items-center mx-auto max-w-6xl">
          <BookingForm
            setPage={setCurrentPage}
            setError={setError}
            error={error}
            loading={loading}
            setLoading={setLoading}
            setFlights={setFlights}
            setItinerary={setItinerary}
            setStreaming={setStreaming}
            setStatusMessage={setStatusMessage}
          />
        </div>
      </section>

      <section>
        {currentPage === 0 && (
          <ItineraryComponent
            itinerary={itinerary}
            user={user}
            loading={loading}
            streaming={streaming}
            statusMessage={statusMessage}
            onItineraryChange={setItinerary}
          />
        )}
        {currentPage === 1 && (
          <FlightComponent search={flights} />
        )}
      </section>

      <Footer />
    </section>
  );
};

export default Adventure;
