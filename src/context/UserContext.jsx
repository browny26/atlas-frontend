import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI, userAPI } from "../services/api";
import { savePendingItinerary } from "../services/pendingItinerary";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Stores the token and waits until the user is loaded, so callers can navigate to
   * protected pages right after it. Throws if the user cannot be loaded.
   */
  const login = async (token) => {
    localStorage.setItem("token", token);
    setLoading(true);
    const loaded = await fetchUser();
    if (!loaded) throw new Error("Could not load the user");
    await savePendingItinerary(loaded);
    return loaded;
  };

  // Funzione per logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      const res = await authAPI.status();

      if (res.status !== 200) throw new Error("Non autorizzato");

      const data = res.data;

      const userData = await userAPI.getUser(data.id);

      if (userData.status !== 200)
        throw new Error("Errore nel recupero dei dati utente");

      const dataUser = userData.data;
      setUser(dataUser);
      return dataUser;
    } catch (err) {
      console.error(err);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
