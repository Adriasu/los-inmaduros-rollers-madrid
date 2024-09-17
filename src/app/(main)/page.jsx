import React, { use } from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";
import RoutesCalled from "./RoutesCalled";
import FormCallRoute from "@/components/FormCallRoute";

const page = async () => {
  return (
    <div>
      <Hero />
      <HeroMobile />
      <RoutesCalled/>
      <FormCallRoute/>
    </div>
  );
};

export default page;
