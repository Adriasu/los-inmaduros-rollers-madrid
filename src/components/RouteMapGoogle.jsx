"use client";
import React, { useEffect } from "react";

const RouteMapStrava = ({urlMap}) => {
  return (
    <iframe
      src={urlMap}
      width="640"
      height="480"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
    ></iframe>
  );
};

export default RouteMapStrava;
