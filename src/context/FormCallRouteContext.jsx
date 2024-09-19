"use client";
import React, { createContext, useEffect, useState } from "react";

export const FormCallRouteContext = createContext(null);

export default function FormCallRouteContextProvider({ children }) {
  const meetingPoints = [
    {
      name: "Explanada",
      location: "https://maps.app.goo.gl/gCJfpLSoy3D454Y19",
    },
    {
      name: "Puerta de Alcalá",
      location: "https://maps.app.goo.gl/3kjrtMz9BtQ39BJYA",
    },
    {
      name: "Plaza de Cibeles",
      location: "https://maps.app.goo.gl/LuE7bF56QJgBtLbRA",
    },
  ];
  const paceRoute = [
    {
      level: "Roca",
      img: "/images/roca.png",
    },
    {
      level: "Caracol",
      img: "/images/caracol.png",
    },
    {
      level: "Gusano",
      img: "/images/gusano.png",
    },
    {
      level: "Mariposa",
      img: "/images/mariposa.png",
    },
    {
      level: "Experimentado",
      img: "/images/experimentado.png",
    },
    {
      level: "Locura total",
      img: "/images/locura.png",
    },
    {
      level: "Miaucornia",
      img: "/images/unicornio.png",
    },
  ];

  return (
    <FormCallRouteContext.Provider value={{ meetingPoints, paceRoute }}>
      {children}
    </FormCallRouteContext.Provider>
  );
}
