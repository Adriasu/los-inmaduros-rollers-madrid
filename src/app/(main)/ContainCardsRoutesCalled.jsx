"use client";
import React, { useEffect, useState } from "react";
import { getCollection } from "../../../lib/fireBase.mjs";

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
    return <div>loading...</div>;
  }
  return <div></div>;
};

export default ContainCardsRoutesCalled;
