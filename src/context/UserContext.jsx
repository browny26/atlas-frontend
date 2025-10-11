import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI, userAPI } from "../services/api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser();
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
      return;
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
    } catch (err) {
      console.error(err);
      setUser(null);
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
