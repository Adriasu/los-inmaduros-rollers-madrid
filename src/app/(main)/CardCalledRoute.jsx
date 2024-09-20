import Image from "next/image";
import React from "react";

const CardCalledRoute = ({ event }) => {
  console.log(event);

  const convertTimestampToDate = (seconds) => {
    const date = new Date(seconds * 1000); // Convertir a milisegundos
    const day = date.getDate().toString().padStart(2, "0"); // Asegurar 2 dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mes
    const year = date.getFullYear(); // Año

    return `${day}/${month}/${year}`; // Formato día/mes/año
  };

  if (!event) {
    return null;
  }
  const formattedDate =
    event.dateRoute && event.dateRoute.seconds
      ? convertTimestampToDate(event.dateRoute.seconds)
      : "Fecha no disponible";

  return (
    <div>
      {event.nameRoute.name === "Nueva" ? (
        <Image
          src={
            "https://res.cloudinary.com/dj4j3uoia/image/upload/v1726855799/otraRuta_az0ggq.jpg"
          }
          alt={event.nameRoute.name}
          width={100}
          height={100}
          className="w-[300px] "
        />
      ) : (
        <Image
          src={event.nameRoute.image}
          alt={event.nameRoute.name}
          width={100}
          height={100}
          className="w-[300px] "
        />
      )}

      <div>
        {event.nameRoute.name === "Nueva" ? (
          <h1>{event.newNameRoute}</h1>
        ) : (
          <h1>{event.nameRoute.name}</h1>
        )}
      </div>

      <div>
        <p>fecha: {formattedDate}</p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default CardCalledRoute;
