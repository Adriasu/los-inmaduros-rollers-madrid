"use client";
import React, { useContext } from "react";
import { RoutesContext } from "@/context/RoutesContext";
import CardRoute from "./CardRoute";
import { Masonry } from "react-plock";
import { Search, SlidersHorizontal } from "lucide-react";

const ContainCardsRoutes = () => {
  const { dataRoutes } = useContext(RoutesContext);

  return (
    <div className="flex justify-center items-center w-full sm:w-2/3 sm:mx-auto pt-5">
      <div className="flex flex-col w-full gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-5 text-white">
          <div className="flex max-w-[300px] items-center h-10 rounded-[12px] py-2 px-4 bg-[#454752] focus-within:bg-[#5d606e]">
            <Search />
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="w-full px-3 py-2 text-sm bg-transparent border-none outline-none placeholder:text-[#999b9e] focus-within:placeholder:text-[#bfc1c5] caret-[#999b9e]"
            />
          </div >
          <div className="items-center h-10 rounded-[12px] py-2 px-4 bg-[#454752] cursor-pointer">
            <SlidersHorizontal/>
          </div>
        </div>
        <div className="w-full">
          <Masonry
            items={dataRoutes}
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
