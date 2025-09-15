import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Accordion = ({
  items = [
    {
      title: "What is Flowbite?",
      content:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
    },
  ],
  allowMultiple = false,
}) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      // For multiple open items
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      // For single open item (accordion behavior)
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div id="accordion-collapse" className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);

        return (
          <div key={index} className="">
            <h2>
              <button
                type="button"
                className={`flex items-center justify-between w-full p-5 text-lg font-medium text-left text-black font-marcellus bg-gray-100 transition-all duration-200
                }`}
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <span>{item.title}</span>
                <ChevronRightIcon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
            </h2>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="p-5 bg-gray-100">
                {typeof item.content === "string" ? (
                  <p className="text-gray-500 font-nata font-light">
                    {item.content}
                  </p>
                ) : (
                  <div className="text-gray-500 font-nata font-light">
                    {item.content}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
