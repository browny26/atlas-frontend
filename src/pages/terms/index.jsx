import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="flex flex-col flex-1 px-2 py-5 sm:p-10">
      <div className="w-full max-w-7xl mx-auto">
        <Link
          to="/signup"
          className="inline-flex gap-2 items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-fit mx-auto px-2 sm:px-10">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl">
              Terms & Conditions
            </h1>
            <h2 className="font-medium text-gray-800 sm:text-lg">
              Welcome to Atlas!
            </h2>
            <p className="text-sm text-gray-500">
              By using our website and services, you agree to the following
              terms and conditions. Please read them carefully.
            </p>
          </div>
          <div>
            <ol className="space-y-8">
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  1. Account Registration
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Users must create an account to access itineraries,
                    activities, and personalized travel features.
                  </li>
                  <li className="text-sm text-gray-500">
                    - You are responsible for keeping your login credentials
                    secure.
                  </li>
                  <li className="text-sm text-gray-500">
                    - You must provide accurate and complete information during
                    registration.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  2. Use of Services
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Atlas provides tools to create itineraries, discover
                    activities, and explore travel content.
                  </li>
                  <li className="text-sm text-gray-500">
                    - You agree to use the platform responsibly and not engage
                    in any activity that disrupts the service.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  3. User Responsibilities
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - You must comply with local laws and regulations during any
                    activities or trips you plan using Atlas.
                  </li>
                  <li className="text-sm text-gray-500">
                    - You are responsible for any content you share or upload on
                    the platform. secure.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  4. Intellectual Property
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - All content on Atlas (texts, images, logos) is the
                    property of Atlas and protected by copyright.
                  </li>
                  <li className="text-sm text-gray-500">
                    - You may not reproduce, distribute, or use content without
                    prior written consent.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  5. Limitation of Liability
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Atlas provides tools and information to help plan travel
                    experiences.
                  </li>
                  <li className="text-sm text-gray-500">
                    - We are not liable for any incidents, losses, or issues
                    arising from activities or travel planned using our
                    platform.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  6. Changes to Terms
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Atlas reserves the right to update these Terms &
                    Conditions at any time.
                  </li>
                  <li className="text-sm text-gray-500">
                    - Users will be notified of significant changes via email or
                    site announcements.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
