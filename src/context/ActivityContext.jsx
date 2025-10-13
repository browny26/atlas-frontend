import React, { createContext, useContext, useState, useEffect } from "react";

const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [activity, setActivity] = useState(null);
  const [pointer, setPointer] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <ActivityContext.Provider
      value={{ activity, pointer, setPointer, loading }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
