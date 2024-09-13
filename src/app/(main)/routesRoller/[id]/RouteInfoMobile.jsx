"use client";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import { RoutesContext } from "@/context/RoutesContext";
import Image from "next/image";
import { Bookmark, Send, Star, ArrowLeft } from "lucide-react";
import RouteMapGoogle from "@/components/RouteMapGoogle";
import Buttons from "@/components/Buttons";
import Link from "next/link";

const RouteInfoMobile = () => {
  const params = useParams();
  const { dataRoutes, isLoading } = useContext(RoutesContext);
  const id = params.id;

  const route = dataRoutes.find((route) => route.routeId === id);

  if (!route || isLoading) {
    return (
      <div className="w-full h-[500px] mx-auto max-w-screen-xl px-3 py-4 rounded-2xl flex justify-center items-center sm:hidden">
        <div class="spinner"></div>
      </div>
    );
  }

  return (
    <div className="m-auto flex flex-col gap-3 max-w-[1200px] text-white px-5 md:hidden">
      <div className="flex flex-col gap-5 relative">
        <Link href={"/routesRoller"} className="absolute top-3 left-3">
          <ArrowLeft className="bg-[#464954] size-8 flex justify-center items-center rounded-full cursor-pointer hover:scale-[1.15] border-[1px] border-[#58cbe8]" />
        </Link>
        <Image
          src={route.image}
          alt={route.name}
          width={650}
          height={400}
          className="rounded-2xl"
        />
      </div>
      <div className="flex flex-col gap-3 m-auto w-full">
        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-end gap-3">
            <div className="bg-[#464954] size-8 flex justify-center items-center rounded-md cursor-pointer hover:scale-[1.15] border-[1px] border-[#58cbe8]">
              <Bookmark />
            </div>
            <div className="bg-[#464954] size-8 flex justify-center items-center rounded-md cursor-pointer hover:scale-[1.15] border-[1px] border-[#58cbe8]">
              <Send />
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-between rounded-2xl border-[1px] border-[#58cbe8] p-6">
            <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">
              {route.name}
            </h2>
            <div className="flex gap-2 items-center">
              <Star className="text-[#58cbe8] fill-[#58cbe8]" />
              <p>(4.5)</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>Distancia: {route.approximateDistance} aprox</p>

              <div className="flex gap-2">
                {route.level.map((level, i) => {
                  return <Buttons key={i} text={level} level={level} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-[1px] border-[#58cbe8] p-6 flex flex-col gap-2">
          <p className="font-semibold">Descripción:</p>
          <p>{route.description}</p>
        </div>

        <RouteMapGoogle urlMap={route.map} />
      </div>
    </div>
  );
};

export default RouteInfoMobile;
