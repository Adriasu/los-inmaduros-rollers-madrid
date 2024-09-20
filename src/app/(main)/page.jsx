import React from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";
import RoutesCalled from "./RoutesCalled";


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
