import PruebaFetch from "@/components/PruebaFetch";
import RouteMap from "@/components/RouteMap";
import RouteMapGoogle from "@/components/RouteMapGoogle";
import React from "react";

const page = () => {
  return (
    <div>
      <h2>RUTA</h2>
      <RouteMapGoogle/>
      <PruebaFetch/>
    </div>
  );
};

export default page;
