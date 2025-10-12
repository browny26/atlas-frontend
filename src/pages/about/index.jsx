import React from "react";
import Navbar from "../../components/Navbar";
import {
  ArrowDownIcon,
  MapIcon,
  MapPinIcon,
  TicketIcon,
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
            "url('https://images.unsplash.com/photo-1596987851982-3b90e09ab4ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image
        }}
      >
        <Navbar />

        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-3xl flex flex-col items-center gap-16">
            <span className="text-xs uppercase tracking-widest font-medium items-center gap-2 opacity-90 py-3 px-6 bg-gray-700/40 border border-gray-500 inline-block mb-6 rounded-full">
              about us
            </span>

            <h1 className="font-nata text-6xl sm:text-7xl md:text-8xl 3xl:text-9xl font-bold mb-4 text-nowrap">
              <span className="font-italiana">Every trip</span>
              <br />
              Tells a story
            </h1>

            <span className="flex flex-col gap-2 items-center text-white/70 font-nata md:text-xl font-extralight">
              Scrool Down
              <ArrowDownIcon className="h-5 w-5 text-white/60" />{" "}
            </span>
          </div>
        </div>
      </header>

      <div class="overflow-hidden py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div class="lg:pt-4 lg:pr-8">
              <div class="lg:max-w-lg">
                <h2 class="text-sm/7 font-semibold text-gray-400 uppercase">
                  Learn more
                </h2>
                <p class="mt-2 text-4xl font-semibold font-marcellus tracking-tight text-pretty text-gray-900 sm:text-5xl">
                  Experience the safest travel packages
                </p>
                <p class="mt-6 text-lg/8 text-gray-700">
                  Explore the world with confidence through our curated travel
                  packages — designed for comfort, safety, and flexibility
                  wherever you go.
                </p>
                <dl class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                  <div class="relative pl-9">
                    <dt class="inline font-semibold text-gray-900">
                      <MapPinIcon className="absolute top-1 left-1 h-5 w-5" />
                      Itinerary.{" "}
                    </dt>
                    <dd class="inline">
                      Plan your trip effortlessly with personalized itineraries
                      that guide you through every destination — from must-see
                      landmarks to hidden gems.
                    </dd>
                  </div>
                  <div class="relative pl-9">
                    <dt class="inline font-semibold text-gray-900">
                      <MapIcon className="absolute top-1 left-1 h-5 w-5" />
                      Activities.{" "}
                    </dt>
                    <dd class="inline">
                      Turn every stop into an experience. Choose from local
                      tours, cultural adventures, and outdoor activities
                      tailored to your travel style.
                    </dd>
                  </div>
                  <div class="relative pl-9">
                    <dt class="inline font-semibold text-gray-900">
                      <TicketIcon className="absolute top-1 left-1 h-5 w-5" />
                      Flights.{" "}
                    </dt>
                    <dd class="inline">
                      Find and book the best flight options at competitive
                      rates, with real-time updates and 24/7 support for
                      complete peace of mind.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <img
              width="2432"
              height="1442"
              src="https://images.unsplash.com/photo-1558862107-d49ef2a04d72?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Product screenshot"
              class="w-3xl max-w-none shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>

      <section className="py-16">
        <div class="bg-gray-100 py-24 sm:py-32">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 class="text-center text-base/8 text-gray-600 uppercase tracking-widest">
              Our partners enhance your journey’s comfort.
            </h2>
            <div class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                width="158"
                height="48"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />
              <img
                width="158"
                height="48"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />
              <img
                width="158"
                height="48"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
                alt="Tuple"
                class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              />
              <img
                width="158"
                height="48"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              />
              <img
                width="158"
                height="48"
                src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container flex flex-col items-center mx-auto max-w-7xl">
          <h2 className="font-nata text-3xl md:text-6xl text-center font-bold mb-12">
            <span className="font-italiana font-black md:text-5xl">
              Choose the
            </span>
            <br />
            ideal options
          </h2>

          <div className="flex gap-5 w-full h-[600px]">
            <div
              className="relative flex-1 bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-500 hover:flex-[3]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1493160831989-93b036daec5f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            ></div>
            <div
              className="relative flex-1 bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-500 hover:flex-[3]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1593993553727-3ec1b39c74f8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            ></div>
            <div
              className="relative flex-1 bg-cover bg-center bg-no-repeat overflow-hidden transition-all duration-500 hover:flex-[3]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1699449566081-4e3282c7c0ed?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            ></div>
          </div>
        </div>
      </section>

      <section className="py-16 w-full">
        <div className="flex flex-col items-center w-full gap-20">
          <p className="text-center text-base/8 text-gray-600 uppercase tracking-widest">
            more informations about us
          </p>
          <div class="w-full">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
              <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-4">
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt class="text-base/7 text-gray-600">Global Partners</dt>
                  <dd class="order-first text-3xl font-marcellus font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    44
                  </dd>
                </div>
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt class="text-base/7 text-gray-600">Global Reach</dt>
                  <dd class="order-first text-3xl font-marcellus font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    119
                  </dd>
                </div>
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt class="text-base/7 text-gray-600">New users annually</dt>
                  <dd class="order-first text-3xl font-marcellus font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    4.500
                  </dd>
                </div>
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                  <dt class="text-base/7 text-gray-600">AI Working</dt>
                  <dd class="order-first text-3xl font-marcellus font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    1
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section class="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-4xl">
          <figure class="mt-10">
            <blockquote class="text-center text-xl/8 font-marcellus font-semibold text-gray-900 sm:text-2xl/9">
              <p>
                “Atlas completely changed the way I travel. Their team made
                everything effortless — from planning to booking — and I felt
                supported every step of the way. Truly a next-level experience.”
              </p>
            </blockquote>
            <figcaption class="mt-10">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                class="mx-auto size-10 rounded-full"
              />
              <div class="mt-4 flex items-center justify-center space-x-3 text-base">
                <div class="font-semibold text-gray-900">Emma Collins</div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  class="fill-gray-900"
                >
                  <circle r="1" cx="1" cy="1" />
                </svg>
                <div class="text-gray-600">CEO of TravelMind</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="py-16">
        <div className="container flex flex-col items-center mx-auto max-w-7xl">
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

      <section className="py-16 w-full">
        <div className="max-w-7xl flex flex-col items-center justify-center mx-auto">
          <div className="w-full">
            <h2 className="font-nata text-3xl md:text-6xl font-bold mb-12 text-center lg:text-start">
              <span className="font-italiana font-black md:text-5xl">
                Users
              </span>
              <br />
              Experience
            </h2>
          </div>
          <div class="mx-auto w-full grid grid-cols-1 gap-x-8 gap-y-16 sm:pt-16 px-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <article class="flex w-full lg:max-w-xl flex-col items-start justify-between bg-gray-100 p-8">
              <div class="flex items-center gap-2 text-xs">
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-gray-200" />
              </div>
              <div class="group relative grow">
                <h3 class="mt-3 text-xl/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <p className="font-marcellus">Travel made effortless</p>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  Planning my trip through Atlas was smooth from start to
                  finish. The itinerary was perfectly balanced, the activities
                  were unique, and customer support was always available when I
                  needed it. Highly recommended for anyone who loves to travel
                  with peace of mind.
                </p>
              </div>
              <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  class="size-10 rounded-full bg-gray-50"
                />
                <div class="text-sm/6">
                  <p class="font-semibold text-gray-900">
                    <a href="#">
                      <span class="absolute inset-0"></span>
                      Michael Foster
                    </a>
                  </p>
                  <p class="text-gray-600">Happy Traveler</p>
                </div>
              </div>
            </article>
            <article class="flex w-full lg:max-w-xl flex-col items-start justify-between bg-gray-100 p-8">
              <div class="flex items-center gap-2 text-xs">
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-gray-200" />
              </div>
              <div class="group relative grow">
                <h3 class="mt-3 text-xl/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <p className="font-marcellus">Unforgettable experiences</p>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  Atlas made our honeymoon truly special. Every detail — from
                  flights to local activities — was handled flawlessly. We
                  discovered hidden spots we’d never have found on our own.
                </p>
              </div>
              <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  class="size-10 rounded-full bg-gray-50"
                />
                <div class="text-sm/6">
                  <p class="font-semibold text-gray-900">
                    <a href="#">
                      <span class="absolute inset-0"></span>
                      Sophie Martin
                    </a>
                  </p>
                  <p class="text-gray-600">Adventure Seeker</p>
                </div>
              </div>
            </article>
            <article class="flex w-full lg:max-w-xl flex-col items-start justify-between bg-gray-100 p-8">
              <div class="flex items-center gap-2 text-xs">
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-amber-500" />
                <StarIcon className="h-3 w-3 text-gray-200" />
              </div>
              <div class="group relative grow">
                <h3 class="mt-3 text-xl/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <p className="font-marcellus">
                    Seamless from start to finish
                  </p>
                </h3>
                <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                  Booking with Atlas saved me hours of planning. The platform is
                  intuitive, and the support team is amazing. Everything worked
                  perfectly during my business trip abroad.
                </p>
              </div>
              <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  class="size-10 rounded-full bg-gray-50"
                />
                <div class="text-sm/6">
                  <p class="font-semibold text-gray-900">
                    <a href="#">
                      <span class="absolute inset-0"></span>
                      David Nguyen
                    </a>
                  </p>
                  <p class="text-gray-600">Business Traveler</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default index;
