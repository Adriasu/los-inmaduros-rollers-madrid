"use client";
import React, { useContext } from "react";
import { RoutesContext } from "@/context/RoutesContext";
import CardRoute from "./CardRoute";
import { Masonry } from "react-plock";

const ContainCardsRoutes = () => {
  const { dataRoutes } = useContext(RoutesContext);

  return (
    <div className="flex justify-center items-center w-full sm:w-2/3 sm:mx-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>barra de busqueda</div>
        <div className="w-full">
          <Masonry
            items={dataRoutes}
            config={{
              columns: [2, 2, 3],
              gap: [10, 12, 25],
              media: [640, 1024, 1280],
            }}
            render={(item, index) => <CardRoute key={index} route={item} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ContainCardsRoutes;
