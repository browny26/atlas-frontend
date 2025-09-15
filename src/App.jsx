import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import Card from "./components/ui/Card";
import CharWithBg from "./components/ui/CharWithBg";
import Accordion from "./components/ui/Accordion";
import Carousel from "./components/ui/Carousel";
import Footer from "./components/Footer";

const App = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 56,
    seconds: 50,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { hours, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <header
        className="relative h-screen flex flex-col items-center w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image
        }}
      >
        <Navbar />

        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-black px-4 max-w-3xl flex flex-col items-center gap-16">
            <h1 className="font-nata text-4xl md:text-9xl font-bold mb-4 text-white">
              <span className="font-italiana font-black text-black">
                Mysteries of
              </span>
              <br />
              The Desert
            </h1>

            <BookingForm />
          </div>
        </div>
      </header>

      {/* Explore Section */}
      <section className="py-16 px-4">
        <div className="container flex flex-col items-center mx-auto max-w-6xl">
          <h2 className="font-nata text-3xl md:text-6xl text-center font-bold mb-12">
            <span className="font-italiana font-black md:text-5xl">
              Explore the
            </span>
            <br />
            beautiful
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              rating={4.5}
              title={{ first: "The statue", second: "of Liberty" }}
              location="NEW YORK, USA"
              img={
                "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />

            {/* Destination 3 */}
            <Card
              rating={4.5}
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
          <h2 className="font-nata text-3xl md:text-8xl text-center font-bold">
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
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                <h2 className="font-nata text-3xl md:text-6xl font-bold">
                  <span className="font-italiana font-black md:text-5xl">
                    Seek The
                  </span>
                  <br />
                  Paradise
                </h2>
              </div>
              <div className="md:w-1/2 h-80 md:h-auto flex flex-col justify-center px-14 py-8 md:py-14 text-black">
                <h3 className="font-italiana text-2xl md:text-3xl mb-8">
                  Conquer the Frozen Trails
                </h3>
                <p className="font-extralight mb-8">
                  Our expert guides will lead you through the most breathtaking
                  frozen landscapes on Earth. All equipment and training
                  provided.
                </p>
                <div className="flex flex-col gap-2 mb-8">
                  <Accordion
                    items={[
                      {
                        title: "How do I book a trip through your site?",
                        content:
                          "We offer a user-friendly booking platform where you can search for your desired destination, choose your travel dates, and select from a variety of options. Follow the simple steps to confirm your booking.",
                      },
                      {
                        title: "What is your cancellation policy?",
                        content:
                          "Our cancellation policy varies depending on the travel product and provider. You can find detailed information about cancellation fees and deadlines in the booking confirmation and on our website.",
                      },
                      {
                        title: "What payment methods do you accept?",
                        content:
                          "We accept major credit cards, debit cards, and PayPal. Some travel products may also allow for bank transfers or other payment methods. Please check the payment options during the booking process.",
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

      <style jsx>{`
        .desert-bg {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
            #455a64;
        }
      `}</style>
    </div>
  );
};

export default App;
