"use client";
import React, { useContext } from "react";
import { RoutesContext } from "@/context/RoutesContext";
import CardRoute from "./CardRoute";

const ContainCardsRoutes = () => {
  const { dataRoutes } = useContext(RoutesContext);

  return (
    <div className="flex flex-wrap m-w-[1200px] justify-center items-center gap-5 py-5">
      {dataRoutes.map((route, index) => {
        return <CardRoute key={index} route={route} />;
      })}
    </div>
  );
};

export default ContainCardsRoutes;
