import Navbar from "../../components/Navbar";
import BookingForm from "../../components/BookingForm";
import Card from "../../components/ui/Card";
import CharWithBg from "../../components/ui/CharWithBg";
import Accordion from "../../components/ui/Accordion";
import Carousel from "../../components/ui/Carousel";
import Footer from "../../components/Footer";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmitSuccess = (results, tabType) => {
    navigate("/adventure", {
      state: {
        results,
        tabType,
        timestamp: new Date().getTime(),
      },
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <header
        className="relative h-screen flex flex-col items-center w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image
        }}
      >
        <Navbar />

        <div className="flex-grow flex items-center justify-center lg:mt-30">
          <div className="text-center text-black px-4 max-w-3xl flex flex-col items-center gap-16">
            <h1 className="font-nata text-6xl sm:text-7xl md:text-8xl 2xl:text-9xl font-bold mb-4 text-black select-none">
              <span className="font-italiana text-white">Mysteries of</span>
              <br />
              The World
            </h1>

            <BookingForm
              onSuccess={handleSubmitSuccess}
              setError={setError}
              error={error}
              loading={loading}
              setLoading={setLoading}
            />

            <span className="flex flex-col gap-2 items-center text-white/50 font-nata md:text-xl font-extralight">
              Scrool Down
              <ArrowDownIcon className="h-5 w-5 text-white/40" />{" "}
            </span>
          </div>
        </div>
      </header>

      {/* Explore Section */}
      <section className="py-16 px-4 z-0">
        <div className="container flex flex-col items-center mx-auto max-w-6xl">
          <h2 className="font-nata text-3xl md:text-6xl text-center font-bold mb-12">
            <span className="font-italiana font-black md:text-5xl">
              Explore the
            </span>
            <br />
            beautiful
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center">
            {/* Destination 1 */}
            <Card
              rating={4.5}
              title={{ first: "Pyramids", second: "of Giza" }}
              location="EGYPT, AFRICA"
              img={
                "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />

            {/* Destination 2 */}
            <Card
              rating={4.4}
              title={{ first: "The statue", second: "of Liberty" }}
              location="NEW YORK, USA"
              img={
                "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />

            {/* Destination 3 */}
            <Card
              rating={3.9}
              title={{ first: "The", second: "Big Ben" }}
              location="LONDON, UK"
              img={
                "https://images.unsplash.com/photo-1665573456818-67a4c48110c0?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 flex justify-center">
        <Carousel
          showArrows={false}
          images={[
            {
              src: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Madrid",
              name: "Madrid",
              place: "Spain",
            },
            {
              src: "https://images.unsplash.com/photo-1593069567131-53a0614dde1d?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Amazon forest",
              name: "Amazon forest",
              place: "Brazil",
            },
            {
              src: "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Mount Fuji",
              name: "Mount Fuji",
              place: "Japan",
            },
            {
              src: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=2286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              alt: "Roma",
              name: "Roma",
              place: "Italy",
            },
          ]}
        />
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl text-center px-4">
          <span className="text-xs uppercase tracking-widest font-medium items-center gap-2 opacity-90 py-3 px-6 bg-gray-200 border border-gray-300 inline-block mb-6 rounded-full">
            travel layout pack
          </span>
          <h2 className="font-nata text-3xl sm:text-6xl md:text-8xl text-center font-bold">
            <span className="font-italiana font-black md:text-7xl">
              Your adventure
            </span>
            <br />
            our expertise
          </h2>
          <div className="flex justify-center relative">
            <CharWithBg char="5" />
            <CharWithBg char="2" />
            <CharWithBg char="K" />
            <CharWithBg char="+" />
            <span className="absolute bottom-0 font-comforter font-black text-2xl md:text-9xl text-nowrap">
              Bookings
            </span>
          </div>
          <p className="mt-12 font-italiana text-2xl text-neutral-500">
            Book Your Adventure{" "}
            <span className="text-black cursor-pointer">Now!</span>
          </p>
        </div>
      </section>

      {/* Travel Pack Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div
            className="bg-cover bg-center bg-no-repeat overflow-hidden shadow-xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1678211370298-0daeced0e569?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image
            }}
          >
            <div className="lg:flex">
              <div className="md:w-1/2 p-12 flex flex-col">
                <h2 className="font-nata text-6xl font-bold">
                  <span className="font-italiana font-black md:text-5xl">
                    Discover Your
                  </span>
                  <br />
                  Next Adventure
                </h2>
              </div>
              <div className="lg:w-1/2 h-auto flex flex-col justify-center px-14 py-8 md:py-14 text-black">
                <h3 className="font-marcellus text-2xl md:text-3xl mb-8 text-white lg:text-black">
                  Explore Majestic Landscapes
                </h3>
                <p className="text-white lg:text-black lg:font-extralight mb-8">
                  Join our expert guides on journeys to the world’s most
                  stunning destinations. All trips include full support, safety
                  equipment, and personalized planning for an unforgettable
                  experience.
                </p>
                <div className="flex flex-col gap-2 mb-8">
                  <Accordion
                    items={[
                      {
                        title: "How do I create a personalized itinerary?",
                        content:
                          "Simply select your destinations, choose your preferred activities, and our platform will generate a tailored itinerary to match your travel style.",
                      },
                      {
                        title: "How can I book an activity or experience?",
                        content:
                          "Browse our curated list of activities, select your preferred date and time, and confirm your booking directly through the site.",
                      },
                      {
                        title: "How do I search for flights?",
                        content:
                          "Use our flight search tool to compare options, view real-time availability, and find the best flights for your trip.",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
