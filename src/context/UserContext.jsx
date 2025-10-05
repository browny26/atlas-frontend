import React, { createContext, useContext, useState, useEffect } from "react";

// Creo il context
const UserContext = createContext();

// Hook personalizzato per usarlo facilmente
export const useUser = () => useContext(UserContext);

// Provider che avvolge l'app e mantiene lo stato dell'utente
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user = { id, email, firstName, lastName }
  const [loading, setLoading] = useState(true);

  // Funzione per fare il login e salvare il token
  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser(); // recupera info utente dal backend
  };

  // Funzione per logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Funzione per recuperare l'utente dal backend
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/v1/api/auth/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Non autorizzato");

      const data = await res.json();

      const userData = await fetch(
        `http://localhost:8080/v1/api/user/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userData.ok) throw new Error("Errore nel recupero dei dati utente");

      const dataUser = await userData.json();
      setUser(dataUser); // salva i dati dell'utente
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Recupero l'utente al mount del provider
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
