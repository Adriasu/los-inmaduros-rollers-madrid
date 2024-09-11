"use client";
import { MapPin } from "lucide-react";
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
    <div className="flex flex-col border border-black rounded-lg p-2 gap-2">
      <Image
        src={route.image}
        alt={route.name}
        width={200}
        height={300}
        className="rounded-lg w-full"
      />

      <h2 className="text-[#76A8B5] text-xl sm:text-2xl font-bold">
        {route.name}
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <MapPin />
          <p>{route.approximateDistance}</p>
        </div>
        <p>
          <span className="font-semibold">Nivel:</span> {route.level}
        </p>
      </div>

      <Button label="Ver ruta" onClick={handleClick} />
    </div>
  );
};

export default CardRoute;
