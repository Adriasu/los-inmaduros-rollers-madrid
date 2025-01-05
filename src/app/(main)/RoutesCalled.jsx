"use client";
import FormRouteCall from "@/components/FormRouteCall";
import React from "react";
import ContainCardsRoutesCalled from "./ContainCardsRoutesCalled";
import FormRouteCallMobile from "@/components/FormRouteCallMobile";

const RoutesCalled = () => {
  return (
    <div className="flex justify-center items-center rounded-t-3xl max-w-[909px] sm:max-w-[90%] xl:max-w-[70%] sm:mx-auto pt-5">
      <div className="flex flex-col w-full gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-[85%] m-auto items-center justify-between gap-5 text-white sm:w-full">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">
            Próximas rutas
          </h1>
          <FormRouteCall location={"home"} />
          <FormRouteCallMobile location={"home"}/>
        </div>
        <div className="w-full">
          <ContainCardsRoutesCalled />
        </div>
      </div>
    </div>
  );
};

export default RoutesCalled;
