import React, { use } from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";

const page = async () => {
  return (
    <div>
      <Hero />
      <HeroMobile />
    </div>
  );
};

export default page;
