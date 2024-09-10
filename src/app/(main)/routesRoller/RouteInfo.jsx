import RouteMapGoogle from "@/components/RouteMapGoogle";
import { Bookmark, Send, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const RouteInfo = ({route}) => {
  return (
    <div className="hidden md:flex gap-6 max-w-[1200px] mt-5 border border-black">
      <div>
        <Image
          src={route.image}
          alt={route.name}
          width={600}
          height={400}
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col gap-10 w-2/5 border border-black">
        <div className="border border-gray-200">
            <div className="flex w-full justify-end">
              <Bookmark />
              <Send />
            </div>
          <div className="flex justify-between">
            <h2 className="text-2xl">{route.name}</h2>
          </div>
          <Star />
          <div>
            <p>{route.approximateDistance}</p>
            <p>{route.level}</p>
          </div>
        </div>
        <p>{route.description}</p>
        <RouteMapGoogle urlMap={route.map} />
      </div>
    </div>
  );
};

export default RouteInfo;
