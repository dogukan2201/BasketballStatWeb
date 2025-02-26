import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchLeagues } from "../services/api";

const LeagueContext = createContext();

export const LeagueProvider = ({ children }) => {
  const [leagues, setLeagues] = useState(() => {
    const storedLeagues = localStorage.getItem("leagues");
    return storedLeagues ? JSON.parse(storedLeagues) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLeagues = async () => {
      if (leagues.length > 0) return;

      try {
        setLoading(true);
        const data = await fetchLeagues();
        if (data && Array.isArray(data.response)) {
          setLeagues(data.response);
          localStorage.setItem("leagues", JSON.stringify(data.response)); // Verileri sakla
        } else {
          throw new Error("Geçersiz API yanıtı");
        }
      } catch (error) {
        setError("Ligler yüklenirken bir hata oluştu: " + error.message);
        setLeagues([]);
      } finally {
        setLoading(false);
      }
    };

    getLeagues();
  }, [leagues]); // Eğer leagues boşsa API çağrısı yap

  return (
    <LeagueContext.Provider value={{ leagues, loading, error }}>
      {children}
    </LeagueContext.Provider>
  );
};

export const useLeagues = () => {
  const context = useContext(LeagueContext);
  if (!context) {
    throw new Error("useLeagues hook must be used within a LeagueProvider");
  }
  return context;
};
