import Image from "next/image";
import React from "react";

const CardRoute = ({ route }) => {
  return (
    <div>
      <div className="overflow-hidden h-[200px] flex justify-center items-center border border-black rounded-lg bg-slate-300">
        <Image src={route.image} alt={route.name} width={200} height={300} />
      </div>

    </div>
  );
};

export default CardRoute;
