"use client";
import FormRouteCall from "@/components/FormRouteCall";
import React from "react";
import ContainCardsRoutesCalled from "./ContainCardsRoutesCalled";
import CardCalledRoute from "./CardCalledRoute";

const RoutesCalled = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-2/3 sm:mx-auto pt-5">
      <div className="flex items-center justify-between gap-5 text-white">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent">
          Próximas rutas
        </h1>
        <FormRouteCall />
      </div>
      <div>
        <ContainCardsRoutesCalled />
        <CardCalledRoute/>
      </div>
    </div>
  );
};

export default RoutesCalled;
