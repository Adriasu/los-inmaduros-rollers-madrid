"use client";
import Buttons from "@/components/Buttons";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import React from "react";

const CardRoute = ({ route }) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/routesRoller/${route.routeId}`);
  };
  return (
    <div className="flex flex-col border border-slate-600 rounded-lg p-2 gap-2 bg-[#464954] shadow-[-2px_4px_43px_5px_#029EE963] hover:scale-[1.02] hover:border-white hover:border-[2px]">
      <Image
        src={route.image}
        alt={route.name}
        width={200}
        height={300}
        className="rounded-lg w-full"
      />

      <h2 className="text-[#58cbe8] text-xl sm:text-2xl font-bold">
        {route.name}
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-white">
          <MapPin />
          <p>Aprox {route.approximateDistance}</p>
        </div>
        <div className="flex gap-1 sm:gap-2">
          {route.level.map((level, i) => {
            return <Buttons key={i} text={level} level={level} />;
          })}
        </div>
      </div>

      <Button label="Ver ruta" onClick={handleClick} />
    </div>
  );
};

export default CardRoute;
