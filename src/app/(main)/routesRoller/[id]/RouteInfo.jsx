"use client";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import { RoutesContext } from "@/context/RoutesContext";
import Image from "next/image";
import { Bookmark, Send, Star } from "lucide-react";
import RouteMapGoogle from "@/components/RouteMapGoogle";

const RouteInfo = () => {
  const params = useParams();
  const { dataRoutes } = useContext(RoutesContext);
  const id = params.id;

  const route = dataRoutes.find((route) => route.routeId === id);

  if (!route) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto hidden md:flex gap-6 max-w-[1200px] text-white mt-5">
      <div>
        <Image
          src={route.image}
          alt={route.name}
          width={650}
          height={400}
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col gap-10 w-2/5">
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-end gap-3">
            <div className="bg-[#464954] size-8 flex justify-center items-center rounded-md cursor-pointer hover:scale-[1.15] border-[1px] border-[#58cbe8]">
              <Bookmark />
            </div>
            <div className="bg-[#464954] size-8 flex justify-center items-center rounded-md cursor-pointer hover:scale-[1.15] border-[1px] border-[#58cbe8]">
              <Send />
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border-[1px] border-[#58cbe8] p-6">
            <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">
              {route.name}
            </h2>
            <Star />
            <div>
              <p>{route.approximateDistance}</p>
              <p>{route.level}</p>
            </div>
          </div>
        </div>
        <p className="rounded-2xl border-[1px] border-[#58cbe8] p-6">
          {route.description}
        </p>

        <RouteMapGoogle urlMap={route.map} />
      </div>
    </div>
  );
};

export default RouteInfo;
