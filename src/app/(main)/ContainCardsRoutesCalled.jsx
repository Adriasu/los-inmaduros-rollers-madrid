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
        const dateA = a.dateRoute.seconds;
        const timeMeetingPointA = a.timeMeetingPoint.seconds;
        const dateB = b.dateRoute.seconds;
        const timeMeetingPointB = b.timeMeetingPoint.seconds;

        const endTimeA = timeMeetingPointA + 2 * 60 * 60;
        const endTimeB = timeMeetingPointB + 2 * 60 * 60;

        if (endTimeA < nowInSeconds && endTimeB < nowInSeconds) {
          return dateA - dateB;
        }

        if (endTimeA < nowInSeconds) return 1;
        if (endTimeB < nowInSeconds) return -1;

        return dateA - dateB;
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
              columns: [2, 2, 3],
              gap: [10, 12, 25],
              media: [640, 1024, 1280],
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
