"use client";
import React, { useContext } from "react";
import { RoutesContext } from "@/context/RoutesContext";
import CardRoute from "./CardRoute";
import { Masonry } from "react-plock";

const ContainCardsRoutes = () => {
  const { dataRoutes } = useContext(RoutesContext);

  return (
    <div className="">
      {dataRoutes.map((route, index) => {
        return <CardRoute key={index} route={route} />;
      })}
    </div>
  );
};

export default ContainCardsRoutes;
