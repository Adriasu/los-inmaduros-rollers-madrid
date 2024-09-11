"use client";
import React, { useContext } from "react";
import { RoutesContext } from "@/context/RoutesContext";
import CardRoute from "./CardRoute";
import { Masonry } from "react-plock";

const ContainCardsRoutes = () => {
  const { dataRoutes } = useContext(RoutesContext);

  return (
    <div className="">
         <Masonry
        items={dataRoutes}
        config={{
          columns: [1, 2, 3],
          gap: [24, 12, 20],
          media: [640, 1024, 1280],
        }}
        render={(item, index) => (
          <CardRoute key={index} route={item} />
        )}
      />
    </div>
  );
};

export default ContainCardsRoutes;
