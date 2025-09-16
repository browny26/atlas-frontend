import React from "react";
import { useState } from "react";
import Tab from "./ui/Tab";
import Dropdown from "./ui/Dropdown";
import { TicketIcon } from "@heroicons/react/24/outline";
import Button from "./ui/Button";
import TextInput from "./ui/TextInput";
import Select from "./ui/Select";
import TagSelect from "./ui/TagSelect";

const BookingForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Itinerary", href: "#itinerary" },
    { label: "Hotels", href: "#hotels" },
    { label: "Flights", href: "#flights" },
  ];

  const handleTabChange = (index) => {
    console.log("Tab changed to:", tabs[index].label);
    setActiveTab(index);
  };

  return (
    <div className="bg-white py-4 px-6 flex flex-col flex-wrap gap-6 max-w-6xl lg:min-w-5xl min-w-full">
      <Tab tabs={tabs} onTabChange={handleTabChange} />
      {activeTab === 0 && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-6 items-center gap-2">
            <TextInput placeholder="Destination" />
            <TextInput placeholder="Days" />
            <TextInput placeholder="Budget (€)" />
            <TagSelect
              className="col-span-2"
              placeholder="Interests"
              options={[
                { value: "food", label: "Food" },
                { value: "culture", label: "Culture" },
                { value: "adventure", label: "Adventure" },
              ]}
              onChange={(value) => console.log("Scelta singola:", value)}
            />

            <Button text="Explore All" />
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className="grid grid-cols-4 items-center gap-2">
          <TextInput placeholder="Destination" />
          <TextInput placeholder="Days" />
          <TextInput placeholder="Budget (€)" />
          <Button text="Explore All" />
        </div>
      )}
      {activeTab === 2 && (
        <div className="grid grid-cols-4 items-center gap-2">
          <TextInput placeholder="Destination" />
          <TextInput placeholder="Days" />
          <Dropdown
            text="Budget"
            decorativeIcon={<TicketIcon className="h-3 w-3 text-black" />}
            options={[
              { label: "Economy Class", value: "profile" },
              {
                label: "Business Class",
                value: "settings",
              },
              {
                label: "First Class",
                value: "signout",
              },
            ]}
          />
          <Button text="Explore All" />
        </div>
      )}
    </div>
  );
};

export default BookingForm;
