"use client";
import React, { useEffect, useState } from "react";
import { db, getCollection } from "../../../lib/fireBase.mjs";
import CardCalledRoute from "./CardCalledRoute";
import { collection, onSnapshot } from "firebase/firestore";

const ContainCardsRoutesCalled = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const routesRef = collection(db, "routesCalled");

    const unsubscribe = onSnapshot(routesRef, (snapshot) => {
      const eventsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsArray);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
