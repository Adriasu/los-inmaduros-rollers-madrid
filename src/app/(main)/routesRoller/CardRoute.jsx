import Image from "next/image";
import { Button } from "primereact/button";
import React from "react";

const CardRoute = ({ route }) => {
  return (
    <div className="flex flex-col w-[220px] h-[350px] border border-black rounded-lg p-2">
      <div className="overflow-hidden h-[200px] flex justify-center items-center border border-black rounded-lg bg-slate-300">
        <Image src={route.image} alt={route.name} width={200} height={300} />
      </div>
      <h2>{route.name}</h2>
      <div>
        <p>Distancia aprox: {route.approximateDistance}</p>
      </div>
      <Button label="Ver ruta"/>

    </div>
  );
};

export default CardRoute;
