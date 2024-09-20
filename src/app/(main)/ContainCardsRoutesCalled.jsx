"use client";
import React, { useEffect, useState } from "react";
import { getCollection } from "../../../lib/fireBase.mjs";
import CardCalledRoute from "./CardCalledRoute";

const ContainCardsRoutesCalled = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRoutes = async () => {
    try {
      const res = await getCollection("routesCalled");
      setEvents(res);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getRoutes();
  }, []);

  console.log(events);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center w-full sm:w-2/3 sm:mx-auto pt-5">
      <div className="w-full flex flex-wrap gap-3">
        {events.length > 0 ? (
          events.map((routeCall, index) => (
            <CardCalledRoute
              key={index}
              event={routeCall}
              loading={isLoading}
            />
          ))
        ) : (
          <div>No hay eventos disponibles</div>
        )}
      </div>
    </div>
  );
};

export default ContainCardsRoutesCalled;
