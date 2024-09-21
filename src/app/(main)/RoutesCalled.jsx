"use client";
import FormRouteCall from "@/components/FormRouteCall";
import React from "react";
import ContainCardsRoutesCalled from "./ContainCardsRoutesCalled";
import CardCalledRoute from "./CardCalledRoute";
import FormRouteCallMobile from "@/components/FormRouteCallMobile";

const RoutesCalled = () => {
  return (
    <div className="flex justify-center items-center w-full sm:w-2/3 sm:mx-auto pt-5">
      <div className="flex flex-col w-full gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-white">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent">
            Próximas rutas
          </h1>
          <FormRouteCall />
          <FormRouteCallMobile/>
        </div>
        <div className="w-full">
          <ContainCardsRoutesCalled />
        </div>
      </div>
    </div>
  );
};

export default RoutesCalled;
