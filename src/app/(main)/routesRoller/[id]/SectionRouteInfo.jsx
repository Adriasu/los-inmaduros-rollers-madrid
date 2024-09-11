"use client";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import { RoutesContext } from "@/context/RoutesContext";
import Image from "next/image";
import { Bookmark, Send, Star } from "lucide-react";
import RouteMapGoogle from "@/components/RouteMapGoogle";
import RouteInfo from "./RouteInfo";

const SectionRouteInfo = () => {
    const params = useParams();
    const { dataRoutes } = useContext(RoutesContext);
    const id = params.id;
  
    console.log(id);
    
  
    const route = dataRoutes.find((r) => r.name === decodeURIComponent(id));
  return (
    <div>
      <RouteInfo route={route}/>
    </div>
  )
}

export default SectionRouteInfo
