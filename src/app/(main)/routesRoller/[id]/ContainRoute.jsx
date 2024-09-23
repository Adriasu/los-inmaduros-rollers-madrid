import React from "react";
import RouteInfo from "./RouteInfo";
import RouteInfoMobile from "./RouteInfoMobile";
import Reviews from "./Reviews";
import ReviewsMobile from "./ReviewsMobile";

const ContainRoute = () => {
  return (
    <div>
      <RouteInfo />
      <RouteInfoMobile />
      <Reviews />
      <ReviewsMobile />
    </div>
  );
};

export default ContainRoute;
