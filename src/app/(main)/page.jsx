import React from "react";
import Hero from "./Hero";
import HeroMobile from "./HeroMobile";
import RoutesCalled from "./RoutesCalled";
import dynamic from "next/dynamic";

const HomeBanner = dynamic(() => import("./HomeBanner"), {
  loading: () => <p>loading...</p>,
});

const page = async () => {
  return (
    <div>
      {/* <Hero />
      <HeroMobile /> */}
      <div className=" px-[14px]">
        <HomeBanner />
      </div>
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 rounded-t-3xl sm:rounded-t-[64px] pb-5">
        <RoutesCalled />
      </div>
    </div>
  );
};

export default page;
