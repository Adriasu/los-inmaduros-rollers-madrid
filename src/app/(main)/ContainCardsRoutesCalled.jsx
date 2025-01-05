"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../lib/fireBase.mjs";
import CardCalledRoute from "./CardCalledRoute";
import { collection, onSnapshot } from "firebase/firestore";
import { Paginator } from "primereact/paginator";
import CardCalledRouteNew from "./CardCalledRouteNew";

const ContainCardsRoutesCalled = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [first, setFirst] = useState(0);

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  useEffect(() => {
    const routesRef = collection(db, "routesCalled");

    const unsubscribe = onSnapshot(routesRef, (snapshot) => {
      const eventsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const nowInSeconds = Math.floor(new Date().getTime() / 1000);

      const nextEventsArray = [];
      const pastEventsArray = [];

      eventsArray.forEach((event) => {
        const eventStart = event.dateRoute.seconds;
        const eventEnd = eventStart + 2 * 60 * 60;

        if (eventEnd >= nowInSeconds) {
          nextEventsArray.push(event);
        } else {
          pastEventsArray.push(event);
        }
      });

      nextEventsArray.sort((a, b) => a.dateRoute.seconds - b.dateRoute.seconds);
      pastEventsArray.sort((a, b) => b.dateRoute.seconds - a.dateRoute.seconds);

      setNextEvents(nextEventsArray);
      setPastEvents(pastEventsArray);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const paginatedPastEvents = pastEvents.slice(first, first + 6);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="w-full">
        {nextEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-10">
            {nextEvents.map((event, index) => {
              return <CardCalledRouteNew key={index} event={event} />;
            })}
          </div>
        ) : (
          <div className="text-white mb-10">No hay rutas disponibles</div>
        )}
        <div>
          <h1 className="text-2xl mb-5 sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">
            Rutas realizadas
          </h1>

          {paginatedPastEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-5">
              {paginatedPastEvents.map((event, index) => {
                return <CardCalledRoute key={index} event={event} />;
              })}
            </div>
          ) : (
            <div>No hay eventos pasados</div>
          )}
          <div>
            <Paginator
              first={first}
              rows={6}
              totalRecords={pastEvents.length}
              onPageChange={onPageChange}
              template={{
                layout:
                  "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
              }}
              className="bg-transparent border-none shadow-none p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainCardsRoutesCalled;
