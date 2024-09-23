"use client";
import React, { createContext, useEffect, useState } from "react";

export const RoutesContext = createContext(null);

export default function RoutersContextProvider({ children }) {
  const [dataRoutes, setDataRoutes] = useState([]);
  const [filterDataRoutes, setFilterDataRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataRoutes = async () => {
    try {
      const response = await fetch(
        "https://los-inmaduros-rollers-madrid.vercel.app/api/routes"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDataRoutes(data);
      setFilterDataRoutes(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error al hacer el fetch:", error.message);
    }
  };

  useEffect(() => {
    fetchDataRoutes();
  }, []);

  return (
    <RoutesContext.Provider
      value={{ dataRoutes, isLoading, filterDataRoutes, setFilterDataRoutes }}
    >
      {children}
    </RoutesContext.Provider>
  );
}
