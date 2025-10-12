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
              Privacy Policy
            </h1>
            <h2 className="font-medium text-gray-800 sm:text-lg">
              Your privacy is important to us.
            </h2>
            <p className="text-sm text-gray-500">
              This Privacy Policy explains how Atlas collects, uses, and
              protects your personal data.
            </p>
          </div>
          <div>
            <ol className="space-y-8">
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  1. Data We Collect
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Personal information: name, email, account details.
                  </li>
                  <li className="text-sm text-gray-500">
                    - Activity data: itineraries, selected activities,
                    preferences.
                  </li>
                  <li className="text-sm text-gray-500">
                    - Usage data: how you interact with the site to improve
                    services.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  2. How We Use Your Data
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - To provide personalized itineraries and activity
                    recommendations.
                  </li>
                  <li className="text-sm text-gray-500">
                    - To improve platform features and user experience.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  3. Data Sharing
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Your information may be shared with trusted partners only
                    to enhance travel recommendations.
                  </li>
                  <li className="text-sm text-gray-500">
                    - We never sell your personal data to third parties.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  4. User Rights
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Access, correct, or delete your personal information at
                    any time.
                  </li>
                  <li className="text-sm text-gray-500">
                    - Opt out of communications whenever you wish.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  5. Data Security
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Atlas uses encryption and secure servers to protect your
                    data.
                  </li>
                  <li className="text-sm text-gray-500">
                    - We implement best practices to prevent unauthorized access
                    or disclosure.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  6. Cookies
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Our website uses cookies to improve your experience and
                    analyze traffic.
                  </li>
                  <li className="text-sm text-gray-500">
                    - You can manage cookie preferences through your browser
                    settings.
                  </li>
                </ul>
              </li>
              <li>
                <h3 className="font-medium text-gray-800 sm:text-lg mb-2">
                  7. Changes to Privacy Policy
                </h3>
                <ul className="ps-7">
                  <li className="text-sm text-gray-500">
                    - Atlas may update this Privacy Policy.
                  </li>
                  <li className="text-sm text-gray-500">
                    - Users will be notified of major changes via email or site
                    announcements.
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
