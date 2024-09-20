import { CalendarDays, Clock, Drum, Map, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  const convertTimestampToTime = (seconds) => {
    const date = new Date(seconds * 1000); // Convertir a milisegundos
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convertir a formato 12 horas (0 debería ser 12)

    return `${hours}:${minutes} ${ampm}`;
  };

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (!event) {
    return null;
  }
  const formattedDate =
    event.dateRoute && event.dateRoute.seconds
      ? convertTimestampToDate(event.dateRoute.seconds)
      : "Fecha no disponible";

  const formattedTimeFirstPoint =
    event.timeMeetingPoint && event.timeMeetingPoint.seconds
      ? convertTimestampToTime(event.timeMeetingPoint.seconds)
      : "Hora no disponible";

  const formattedTimeSecondPoint =
    event.timeMeetingOtherPoint && event.timeMeetingOtherPoint.seconds
      ? convertTimestampToTime(event.timeMeetingOtherPoint.seconds)
      : "Hora no disponible";

  const formattedName = capitalizarPrimeraLetra(event.newNameRoute);

  return (
    <div className="border border-black">
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
      </div>

      <div>
        {event.nameRoute.name === "Nueva" ? (
          <h1>{formattedName}</h1>
        ) : (
          <h1>{event.nameRoute.name}</h1>
        )}
      </div>

      <div>
        <div className="flex gap-2">
          <CalendarDays />
          <p>{formattedDate}</p>
        </div>

        <div className="flex gap-2">
          <MapPin />
          {event.meetingPoint.name === "Otro" ? (
            <p>{event.meetingPointOther}</p>
          ) : (
            <p>{event.meetingPoint.name}</p>
          )}
          {event.meetingPoint.name !== "Otro" && (
            <Link target="_blank" href={event.meetingPoint.location}>
              <Map />
            </Link>
          )}
        </div>

        <div className="flex gap-2">
          <Clock />
          <p>{formattedTimeFirstPoint}</p>
        </div>

        {event.otherPoint.name === "Si" && (
          <div>
            <div className="flex gap-2">
              <MapPin />
              {event.meetingOtherPoint.name === "Otro" ? (
                <p>{event.meetingOtherPointOther}</p>
              ) : (
                <p>{event.meetingOtherPoint.name}</p>
              )}
              {event.meetingOtherPoint.name !== "Otro" && (
                <Link target="_blank" href={event.meetingOtherPoint.location}>
                  <Map />
                </Link>
              )}
            </div>

            <div className="flex gap-2">
              <Clock />
              <p>{formattedTimeSecondPoint}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Drum />
          <div className="flex flex-col">
            {event.paceRoute.map((pace, i) => {
              return (
                <div className="flex gap-2" key={i}>
                  <Image
                    src={pace.img}
                    alt={pace.level}
                    width={30}
                    height={30}
                  />
                  <p>{pace.level}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h1>Comentarios</h1>
          <p>{event.comments}</p>
        </div>
      </div>
    </div>
  );
};

export default CardCalledRoute;
