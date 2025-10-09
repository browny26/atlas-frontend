import React, { createContext, useContext, useState, useEffect } from "react";

const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const [activity, setActivity] = useState(null);
  const [pointer, setPointer] = useState(null);
  const [loading, setLoading] = useState(true);

  //   const fetchActivities = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const res = await fetch(
  //         `http://localhost:8080/amadeus/tours-and-activities?latitude=${41.397158}&longitude=${2.160873}&radius=${1}&page=${1}&size=${10}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );

  //       if (!res.ok) throw new Error("Non autorizzato");

  //       const data = await res.json();

  //       setActivity(data);
  //     } catch (err) {
  //       console.error(err);
  //       setActivity(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchActivities();
  //   }, [location]);

  return (
    <ActivityContext.Provider
      value={{ activity, pointer, setPointer, loading }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
