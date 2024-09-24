"use client";
import React, { createContext, useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../lib/fireBase.mjs";

export const RoutesContext = createContext(null);

export default function RoutersContextProvider({ children }) {
  const [dataRoutes, setDataRoutes] = useState([]);
  const [filterDataRoutes, setFilterDataRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataRoutes = () => {
    const unsubscribe = onSnapshot(collection(db, "routes"), (snapshot) => {
      const routesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataRoutes(routesData);
      setFilterDataRoutes(routesData);
      setIsLoading(false);
    });

    return () => unsubscribe(); 
  };

  useEffect(() => {
    const unsubscribe = fetchDataRoutes();
    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <RoutesContext.Provider
      value={{ dataRoutes, isLoading, filterDataRoutes, setFilterDataRoutes }}
    >
      {children}
    </RoutesContext.Provider>
  );
}
