import React from "react";
import dynamic from "next/dynamic";

const HomeBanner = dynamic(() => import("./HomeBanner"), {
  loading: () => <p>loading...</p>,
});
const RoutesCalled = dynamic(() => import("./RoutesCalled"), {
  loading: () => <p>loading...</p>,
});

const page = async () => {
  return (
    <div>
      <HomeBanner />
      <h1>Routes Called</h1>
      <RoutesCalled />
    </div>
  );
};

export default page;
