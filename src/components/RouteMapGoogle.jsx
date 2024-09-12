import React from "react";

const RouteMapGoogle = ({urlMap}) => {
  return (
    <iframe
      src={urlMap}
      height="320"
      allowFullScreen
      loading="lazy"
      className="rounded-2xl w-full border-[1px] border-[#58cbe8]"
    ></iframe>
  );
};

export default RouteMapGoogle;

