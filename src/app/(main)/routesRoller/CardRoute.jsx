"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React from "react";

const CardRoute = ({ route }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/routesRoller/${encodeURIComponent(route.name)}`);
  };
  return (
    <div className="flex flex-col w-[220px] border border-black rounded-lg p-2 gap-2">
      <Image src={route.image} alt={route.name} width={200} height={300} className="rounded-lg" />

      <h2 className="text-[#232330] text-2xl font-bold">{route.name}</h2>
      <div className="flex flex-col gap-2">
        <p><span className="font-semibold">Distancia aprox:</span> {route.approximateDistance}</p>
        <p><span className="font-semibold">Nivel:</span> {route.level}</p>
      </div>

      <Button label="Ver ruta" onClick={handleClick} />
    </div>
  );
};

export default CardRoute;
