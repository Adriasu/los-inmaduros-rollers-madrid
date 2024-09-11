import React from "react";

const RouteMapGoogle = ({urlMap}) => {
  return (
    <iframe
      src={urlMap}
      height="320"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      className="rounded-2xl w-full"
    ></iframe>
  );
};

export default RouteMapGoogle;

