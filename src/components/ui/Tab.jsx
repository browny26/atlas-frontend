import React, { useState } from "react";

const Tab = ({ tabs, defaultActive = 0, onTabChange, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <ul
      className={`flex flex-wrap text-sm text-center text-black border-b border-gray-200 ${className}`}
    >
      {tabs.map((tab, index) => (
        <li key={index} className="me-2">
          <a
            href={tab.href || "#"}
            onClick={(e) => {
              e.preventDefault();
              handleTabClick(index);
            }}
            className={`inline-block p-4 hover:text-gray-600 border-b-2 ${
              activeTab === index
                ? "border-black font-semibold"
                : "border-transparent"
            }`}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Tab;
