import React, { createContext, useContext, useState, useEffect } from "react";

const ItineraryContext = createContext();

export const useItinerary = () => useContext(ItineraryContext);

export const ItineraryProvider = ({ children }) => {
  const [itineraryData, setItineraryData] = useState({
    destination: "",
    days: 1,
    budget: "",
    interests: [],
  });

  return (
    <ItineraryContext.Provider value={{ itineraryData, setItineraryData }}>
      {children}
    </ItineraryContext.Provider>
  );
};
