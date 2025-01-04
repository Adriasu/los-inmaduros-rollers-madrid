import React from "react";
import dynamic from "next/dynamic";

const HomeBanner = dynamic(() => import("./HomeBanner"), {
  loading: () => <p>loading...</p>,
});
const RoutesCalled = dynamic(() => import("./RoutesCalled"), {
  loading: () => <p>loading...</p>,
})

const page = async () => {
  return (
    <div>
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
