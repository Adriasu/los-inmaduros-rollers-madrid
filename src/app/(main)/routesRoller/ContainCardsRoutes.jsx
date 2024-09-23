"use client";
import React, { useContext } from "react";
import { RoutesContext } from "@/context/RoutesContext";
import CardRoute from "./CardRoute";
import { Masonry } from "react-plock";
import { Search, SlidersHorizontal } from "lucide-react";

const ContainCardsRoutes = () => {
  const { dataRoutes, isLoading, setFilterDataRoutes, filterDataRoutes } =
    useContext(RoutesContext);

  const routeFinder = (e) => {
    e.preventDefault();
    const letterInput = e.target.value.toLowerCase();
    //console.log(letra);

    const filterArray = dataRoutes.filter((route) => {
      const letterApi = route.name.toLowerCase();
      if (letterApi.indexOf(letterInput) !== -1) {
        return route;
      }
      return;
    });

    setFilterDataRoutes(filterArray);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 px-5 w-full sm:w-2/3 sm:mx-auto md:grid-cols-3 gap-4 animate-pulse pt-5">
        <div className="flex flex-col border border-slate-600 rounded-lg p-2 gap-2 bg-[#464954] animate-pulse">
          <div className="rounded-lg w-full h-64 bg-gray-500"></div>
          <div className="h-6 bg-gray-500 rounded w-1/2"></div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-4 bg-gray-500 rounded w-1/2"></div>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <div className="h-4 bg-gray-500 rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-500 rounded"></div>
        </div>

        <div className="flex flex-col border border-slate-600 rounded-lg p-2 gap-2 bg-[#464954] animate-pulse">
          <div className="rounded-lg w-full h-64 bg-gray-500"></div>
          <div className="h-6 bg-gray-500 rounded w-1/2"></div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-4 bg-gray-500 rounded w-1/2"></div>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <div className="h-4 bg-gray-500 rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-500 rounded"></div>
        </div>

        <div className="hidden md:flex flex-col border border-slate-600 rounded-lg p-2 gap-2 bg-[#464954] animate-pulse">
          <div className="rounded-lg w-full h-64 bg-gray-500"></div>
          <div className="h-6 bg-gray-500 rounded w-1/2"></div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="h-4 bg-gray-500 rounded w-1/2"></div>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <div className="h-4 bg-gray-500 rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-500 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full sm:w-2/3 sm:mx-auto pt-5">
      <div className="flex flex-col w-full gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-5 text-white">
          <div className="flex max-w-[300px] items-center h-10 rounded-[12px] py-2 px-4 bg-[#454752] focus-within:bg-[#5d606e]">
            <Search />
            <input
              onKeyUp={routeFinder}
              type="text"
              placeholder="Buscar por nombre"
              className="w-full px-3 py-2 text-sm bg-transparent border-none outline-none placeholder:text-[#999b9e] focus-within:placeholder:text-[#bfc1c5] caret-[#999b9e]"
            />
          </div>
          <div className="items-center h-10 rounded-[12px] py-2 px-4 bg-[#454752] cursor-pointer">
            <SlidersHorizontal />
          </div>
        </div>
        <div className="w-full">
          <Masonry
            items={filterDataRoutes}
            config={{
              columns: [2, 2, 3],
              gap: [10, 12, 25],
              media: [640, 1024, 1280],
            }}
            render={(item, index) => <CardRoute key={index} route={item} />}
          />
        </div>
      </div>
    </div>
  );
};

export default ContainCardsRoutes;
