import { Bookmark, Send, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const RouteInfo = () => {
  const route = {
    name: "Héroes",
    image:
      "https://res.cloudinary.com/dj4j3uoia/image/upload/v1725625559/heroes_v7ek75.webp",
    approximateDistance: "18 km",
    description:
      "Ruta muy disfrutable, con muchos kilómetros de suave bajada, hasta llegar a cuesta de la vega, donde la cosa se pone interesante.",
    map: "https://www.google.com/maps/d/u/3/embed?mid=1KPK-bbn08C-m3Mb62pWiDUomDCSl7mE&ehbc=2E312F&noprof=1",
    reviews: [],
    galery: [],
  };

  return (
    <div>
      <div>
        <Image src={route.image} alt={route.name} width={500} height={400} />
      </div>
      <div>
      <h2>{route.name}</h2>
      <Star/> 
      <Bookmark/>
      <Send/>

      </div>
    </div>
  );
};

export default RouteInfo;
