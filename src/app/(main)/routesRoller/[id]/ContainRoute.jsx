"use client";
import React, {useState, useEffect} from "react";
import RouteInfo from "./RouteInfo";
import RouteInfoMobile from "./RouteInfoMobile";
import Reviews from "./Reviews";
import ReviewsMobile from "./ReviewsMobile";
import { useParams } from "next/navigation";

const ContainRoute = () => {
  const params = useParams(); // Esto te dará acceso al id de la URL dinámica.
  const routeId = params?.id;

  if (!routeId) return <div>Cargando...</div>;
 
  return (
    <div>
      <RouteInfo />
      <RouteInfoMobile />
      <Reviews routeId={routeId}/>
      <ReviewsMobile />
    </div>
  );
};

export default ContainRoute;
