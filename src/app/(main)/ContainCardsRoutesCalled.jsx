"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../lib/fireBase.mjs";
import CardCalledRoute from "./CardCalledRoute";
import { collection, onSnapshot } from "firebase/firestore";
import { Paginator } from "primereact/paginator";
import CardCalledRouteNew from "./CardCalledRouteNew";
import Image from "next/image";

const ContainCardsRoutesCalled = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [expandedCard, setExpandedCard] = useState(false);

  const toggleExpandedCard = (id) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

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

  const paginatedPastEvents = pastEvents.slice(first, first + 8);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="w-full">
        {nextEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-10">
            {nextEvents.map((event, index) => {
              return (
                <CardCalledRouteNew
                  key={index}
                  event={event}
                  isPastEvent={false}
                  isExpanded={expandedCard === event.id}
                  toggleExpandedCard={toggleExpandedCard}
                />
              );
            })}
          </div>
        ) : (
          <Image  
          src={"https://res.cloudinary.com/dj4j3uoia/image/upload/v1736122928/noRutas_gra2xl.png"}
          alt={"No hay rutas disponibles"}
          width={500}
          height={500}
          className="m-auto rounded-xl object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl mb-5 sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">
            Rutas realizadas
          </h1>

          {paginatedPastEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-5">
              {paginatedPastEvents.map((event, index) => {
                return (
                  <CardCalledRouteNew
                  key={index}
                  event={event}
                  isPastEvent={true}
                  isExpanded={expandedCard === event.id}
                  toggleExpandedCard={toggleExpandedCard}
                />
                );
              })}
            </div>
          ) : (
            <div>No hay eventos pasados</div>
          )}
          <div>
            <Paginator
              first={first}
              rows={8}
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
