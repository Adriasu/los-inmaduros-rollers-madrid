"use client";
import { useContext } from "react";
import { useParams } from "next/navigation";
import { RoutesContext } from "@/context/RoutesContext";
import RouteInfo from "../RouteInfo";

export default function DynamicRoutePage() {
  const params = useParams();
  const { dataRoutes } = useContext(RoutesContext);
  const id = params.id;

  if (!id) {
    return <div>Cargando...</div>;
  }

  const route = dataRoutes.find((r) => r.name === decodeURIComponent(id));

  if (!route) {
    return <div>Ruta no encontrada</div>;
  }

  return <RouteInfo route={route} />;
}