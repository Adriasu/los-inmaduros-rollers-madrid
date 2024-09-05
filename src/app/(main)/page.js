import RouteMap from "@/components/RouteMap";
import React from "react";

const page = () => {
  return (
    <div>
      hola
      <RouteMap gpxData={"/routes/Ruta_Poblados_.gpx"}/>
    </div>
  );
};

export default page;
