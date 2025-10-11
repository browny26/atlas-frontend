import React from "react";
import Navbar from "../../components/Navbar";
import {
  ArrowDownIcon,
  MapIcon,
  HomeModernIcon,
  PaperAirplaneIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import Card from "../../components/ui/Card";
import Footer from "../../components/Footer";
import { StarIcon } from "@heroicons/react/24/solid";

const index = () => {
  return (
    <section className="bg-gray-50">
      <header
        className="relative h-[90dvh] flex flex-col items-center w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image
        }}
      >
        <Navbar />

        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-3xl flex flex-col items-center gap-16">
            <span className="text-xs uppercase tracking-widest font-medium items-center gap-2 opacity-90 py-3 px-6 bg-gray-700/40 border border-gray-500 inline-block mb-6 rounded-full">
              services
            </span>

            <h1 className="font-nata text-6xl sm:text-7xl 2xl:text-8xl 3xl:text-9xl font-bold mb-4 text-nowrap">
              <span className="font-italiana">Your Gateway to</span>
              <br />
              Travel Adventures
            </h1>

            <span className="flex flex-col gap-2 items-center text-white/70 font-nata md:text-xl font-extralight">
              Scrool Down
              <ArrowDownIcon className="h-5 w-5 text-white/60" />{" "}
            </span>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 p-5 max-w-7xl mx-auto">
          <div className="flex flex-col gap-5 p-10 bg-gray-100">
            <MapIcon className="h-15 w-15" />
            <div className="flex flex-col gap-2">
              <h3 className="font-marcellus text-2xl ">Itinerary Creation</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                vitae in dolorem optio? Error quaerat illo dolorum quos eligendi
                corrupti dignissimos facere sint. Cupiditate eum quod ratione
                ipsa sint facilis!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-10 bg-gray-100">
            <PaperAirplaneIcon className="h-15 w-15" />
            <div className="flex flex-col gap-2">
              <h3 className="font-marcellus text-2xl ">Flight Search</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                vitae in dolorem optio? Error quaerat illo dolorum quos eligendi
                corrupti dignissimos facere sint. Cupiditate eum quod ratione
                ipsa sint facilis!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-10 bg-gray-100">
            <HomeModernIcon className="h-15 w-15" />
            <div className="flex flex-col gap-2">
              <h3 className="font-marcellus text-2xl ">Hotel Raccomandation</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                vitae in dolorem optio? Error quaerat illo dolorum quos eligendi
                corrupti dignissimos facere sint. Cupiditate eum quod ratione
                ipsa sint facilis!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
          <div
            className="relative flex-2 bg-cover bg-center bg-no-repeat overflow-hidden h-96"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          ></div>
          <div className="flex-1 flex flex-col gap-5">
            <FireIcon className="h-15 w-15" />
            <h2 className="text-4xl font-semibold font-marcellus tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Experience the safest travel packages
            </h2>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Aenean leo
              sem ultrices ut tempor sit amet fringilla ut eros Sed gravida
            </p>
            <a href="/about" className="underline">
              Learn more about us!
            </a>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto p-5">
          <h2 className="text-[200px] font-marcellus">Adventure</h2>
          <div className="flex flex-col lg:flex-row gap-10 mt-5">
            <div className="flex flex-col">
              <span className="text-2xl font-marcellus mb-6">#1</span>
              <div
                className="relative bg-cover bg-center bg-no-repeat overflow-hidden h-[700px] w-full"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1479030160180-b1860951d696?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              ></div>
              <div className="flex flex-col gap-6 my-10">
                <h2 className="text-4xl font-semibold font-marcellus tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  Experience the safest travel packages and best view of the
                  nature.
                </h2>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Aenean
                  leo sem ultrices ut tempor sit amet fringilla ut eros Sed
                  gravida sapien leo et sodales ipsum ullamcorper sit amet
                  Vestibulum elementum imperdiet lectus a molestie mi placerat
                  sit amet
                </p>
              </div>
              <a href="/about" className="underline">
                Learn more about us!
              </a>
            </div>
            <div className="flex flex-col gap-10">
              <span className="text-xs uppercase tracking-widest font-medium items-center gap-2">
                services
              </span>
              <div className="flex flex-col gap-6 h-full">
                <div
                  className="relative lg:flex-2 bg-cover bg-center bg-no-repeat overflow-hidden h-96"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                  }}
                ></div>
                <h2 className="text-4xl font-semibold font-marcellus tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  Discover Unforgettable Travel Experiences with Natural Views.
                </h2>
              </div>
              <div className="flex flex-col gap-6 h-full">
                <div
                  className="relative lg:flex-2 bg-cover bg-center bg-no-repeat overflow-hidden h-96"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                  }}
                ></div>
                <h2 className="text-4xl font-semibold font-marcellus tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  Embark on Memorable Journeys with Unbeatable Travel Packages.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div
          className="max-w-7xl mx-auto relative bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col items-center justify-center h-[600px] text-white"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/37/IHLjdHdzSvi0rgUMMlSK_TE3_0286.jpg?q=80&w=3268&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <span className="uppercase tracking-widest font-medium items-center gap-2">
            Experience the beauty with sunshine.
          </span>
          <h2 className="text-[100px] md:text-[150px] lg:text-[200px] font-marcellus">
            Ready?
          </h2>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div
            className="bg-cover bg-center bg-no-repeat overflow-hidden shadow-xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1678211370298-0daeced0e569?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image
            }}
          >
            <div className="lg:flex p-10">
              <div className="md:w-1/2 flex flex-col mb-20">
                <h2 className="font-nata text-6xl font-bold">
                  <span className="font-italiana font-black md:text-5xl">
                    Explore the
                  </span>
                  <br />
                  beautiful
                </h2>
              </div>
              <div className="lg:w-1/2 flex flex-col gap-10 justify-center px-14 py-8 md:py-14 text-black bg-white">
                <div>
                  <h3 className="uppercase tracking-widest font-medium items-center gap-2 mb-8 text-black/80">
                    Upcoming Trek Events
                  </h3>

                  <div className="flex flex-col gap-10">
                    <div className="relative border border-gray-200 rounded-lg flex flex-col gap-2 p-8">
                      <span className="absolute -top-4 bg-white p-1 right-4 text-xs uppercase tracking-widest font-medium text-green-700">
                        book now
                      </span>
                      <p className="uppercase tracking-widest font-medium items-center gap-2">
                        Himalayan Range
                      </p>
                      <p className="font-marcellus text-2xl">
                        Trekking to Mountain
                      </p>
                    </div>
                    <div className="relative border border-gray-200 rounded-lg flex flex-col gap-2 p-8">
                      <span className="absolute -top-4 bg-white p-1 right-4 text-xs uppercase tracking-widest font-medium text-green-700">
                        book now
                      </span>
                      <p className="uppercase tracking-widest font-medium items-center gap-2">
                        Himalayan Range
                      </p>
                      <p className="font-marcellus text-2xl">
                        Trekking to Mountain
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="uppercase tracking-widest font-medium items-center gap-2 mb-8 text-black/80">
                    Booking Closed, Sorry
                  </h3>

                  <div className="flex flex-col gap-10">
                    <div className="relative border border-gray-200 rounded-lg flex flex-col gap-2 p-8">
                      <span className="absolute -top-4 bg-white p-1 right-4 text-xs uppercase tracking-widest font-medium text-red-700">
                        closed
                      </span>
                      <p className="uppercase tracking-widest font-medium items-center gap-2">
                        Himalayan Range
                      </p>
                      <p className="font-marcellus text-2xl">
                        Trekking to Mountain
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default index;
