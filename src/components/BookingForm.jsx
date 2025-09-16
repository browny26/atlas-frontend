import React from "react";
import Tab from "./ui/Tab";
import Dropdown from "./ui/Dropdown";
import {
  MapPinIcon,
  BanknotesIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";
import Button from "./ui/Button";

const BookingForm = () => {
  const tabs = [
    { label: "Itinerary", href: "#profile" },
    { label: "Hotels", href: "#dashboard" },
    { label: "Flights", href: "#settings" },
  ];

  const handleTabChange = (index) => {
    console.log("Tab changed to:", tabs[index].label);
  };

  return (
    <div className="bg-white py-4 px-6 flex flex-col gap-6 w-fit">
      <Tab tabs={tabs} onTabChange={handleTabChange} />
      <div className="flex items-center gap-2">
        <Dropdown
          text="Start"
          decorativeIcon={<MapPinIcon className="h-3 w-3 text-black" />}
          options={[
            { label: "Profile", value: "profile" },
            {
              label: "Settings",
              value: "settings",
            },
            {
              label: "Sign out",
              value: "signout",
            },
          ]}
        />
        <Dropdown
          text="Destination"
          decorativeIcon={
            <GlobeEuropeAfricaIcon className="h-3 w-3 text-black" />
          }
          options={[
            { label: "Profile", value: "profile" },
            {
              label: "Settings",
              value: "settings",
            },
            {
              label: "Sign out",
              value: "signout",
            },
          ]}
        />
        <Dropdown
          text="Budget"
          decorativeIcon={<BanknotesIcon className="h-3 w-3 text-black" />}
          options={[
            { label: "Profile", value: "profile" },
            {
              label: "Settings",
              value: "settings",
            },
            {
              label: "Sign out",
              value: "signout",
            },
          ]}
        />
        <Button text="Explore All" />
      </div>
    </div>
  );
};

export default BookingForm;
