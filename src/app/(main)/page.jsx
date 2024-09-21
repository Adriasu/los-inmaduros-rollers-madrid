import React from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";
import RoutesCalled from "./RoutesCalled";
import FormRouteCallMobile from "@/components/FormRouteCallMobile";


const page = async () => {
  return (
    <div>
      <Hero />
      <HeroMobile />
      <RoutesCalled/>
    </div>
  );
};

export default page;
