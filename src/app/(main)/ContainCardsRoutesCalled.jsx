"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../lib/fireBase.mjs";
import CardCalledRoute from "./CardCalledRoute";
import { collection, onSnapshot } from "firebase/firestore";
import { Masonry } from "react-plock";

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

      const nowInSeconds = Math.floor(new Date().getTime() / 1000);

      const sortedEvents = eventsArray.sort((a, b) => {
        const eventAStart = a.dateRoute.seconds;
        const eventBStart = b.dateRoute.seconds;

        const eventAEnd = eventAStart + 2 * 60 * 60;
        const eventBEnd = eventBStart + 2 * 60 * 60;

        if (eventAEnd < nowInSeconds && eventBEnd < nowInSeconds) {
          return eventAStart - eventBStart;
        }

        if (eventAEnd < nowInSeconds) return 1;
        if (eventBEnd < nowInSeconds) return -1;

        return eventAStart - eventBStart;
      });

      setEvents(sortedEvents);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="w-full">
        {events.length > 0 ? (
          <Masonry
            items={events}
            config={{
              columns: [1, 2, 3],
              gap: [20, 10, 25],
              media: [640, 1100, 1280],
            }}
            render={(item, index) => (
              <CardCalledRoute key={index} event={item} />
            )}
          />
        ) : (
          <div>No hay eventos disponibles</div>
        )}
      </div>
    </div>
  );
};

export default ContainCardsRoutesCalled;
