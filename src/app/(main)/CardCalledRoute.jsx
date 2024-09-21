import { CalendarDays, Clock, Drum, Map, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tooltip } from "primereact/tooltip";

const CardCalledRoute = ({ event }) => {
  console.log(event);

  const convertTimestampToDate = (seconds) => {
    const date = new Date(seconds * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const convertTimestampToTime = (seconds) => {
    const date = new Date(seconds * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (!event) {
    return null;
  }

  const nowInSeconds = Math.floor(new Date().getTime() / 1000);

  const eventStart = event.dateRoute.seconds;
  const eventEnd = eventStart + 2 * 60 * 60;

  // Condición: evento pasado (más de dos horas)
  const isPastEvent = eventEnd < nowInSeconds;

  const formattedDate =
    event.dateRoute && event.dateRoute.seconds
      ? convertTimestampToDate(event.dateRoute.seconds)
      : "Fecha no disponible";

  const formattedTimeFirstPoint =
    event.dateRoute && event.dateRoute.seconds
      ? convertTimestampToTime(event.dateRoute.seconds)
      : "Hora no disponible";

  const formattedTimeSecondPoint =
    event.timeMeetingOtherPoint && event.timeMeetingOtherPoint.seconds
      ? convertTimestampToTime(event.timeMeetingOtherPoint.seconds)
      : "Hora no disponible";

  const formattedName = capitalizarPrimeraLetra(event.newNameRoute);

  const handleShareWhatsApp = () => {
    const paceLevels = event.paceRoute.map((pace) => pace.level).join(", ");
    const message = `¡Rut4!

      * Ruta: ${
        event.nameRoute.name === "Nueva"
          ? event.newNameRoute
          : event.nameRoute.name
      }
      * Ritmo:  ${paceLevels}
      * Fecha: ${formattedDate}
      * Punto de encuentro: ${
        event.meetingPoint.name === "Otro"
          ? event.meetingPointOther
          : event.meetingPoint.name
      }
      * Hora: ${formattedTimeFirstPoint}
      ${
        event.otherPoint.name === "Si"
          ? `* Segundo punto de encuentro: ${
              event.meetingOtherPoint.name === "Otro"
                ? event.event.meetingOtherPointOther
                : event.meetingOtherPoint.name
            }
      * Hora: ${formattedTimeSecondPoint}`
          : ""
      } 
      * Comentarios: ${event.comments}

      Puedes ver más detalles en: https://los-inmaduros-rollers-madrid.vercel.app/`; // Reemplaza con el enlace real

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`relative border border-black shadow-[0px_0px_40px_2px_#f6ad55] rounded-2xl p-2 max-h-[600px] flex flex-col gap-2 hover:scale-[1.02] hover:border-orange-400 hover:border-[2px] 
    ${
      isPastEvent
        ? "bg-slate-600 opacity-90"
        : "bg-gradient-to-r from-orange-300 to-cyan-600"
    }`}
    >
      {isPastEvent && (
        <Image
          src={"/images/finalizado.webp"}
          alt="Finalizado"
          width={500}
          height={500}
          className="absolute w-[280px] top-8"
        />
      )}

      <Tooltip target=".custom-target-icon" />
      <div className="flex flex-col gap-2 h-full overflow-hidden">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <i
              className="custom-target-icon pi pi-times-circle bg-red-600 text-white p-2 rounded-full cursor-pointer"
              style={{ fontSize: "1.2rem" }}
              data-pr-tooltip="Cancelar ruta"
              data-pr-position="top"
            ></i>
            <i
              className="custom-target-icon pi pi-file-edit bg-blue-700 text-white p-2 rounded-full cursor-pointer"
              style={{ fontSize: "1.2rem" }}
              data-pr-tooltip="Editar"
              data-pr-position="top"
            ></i>
          </div>

          <div className="flex gap-2">
            <i
              className="custom-target-icon pi pi-user-plus bg-orange-500 text-white p-2 rounded-full cursor-pointer"
              style={{ fontSize: "1.2rem" }}
              onClick={handleShareWhatsApp}
              data-pr-tooltip="Asistir"
              data-pr-position="top"
            ></i>
            <i
              className="custom-target-icon pi pi-whatsapp bg-green-500 text-white p-2 rounded-full cursor-pointer"
              style={{ fontSize: "1.2rem" }}
              onClick={handleShareWhatsApp}
              data-pr-tooltip="Compartir"
              data-pr-position="top"
            ></i>
          </div>
        </div>

        <div>
          {event.nameRoute.name === "Nueva" ? (
            <Image
              src={
                "https://res.cloudinary.com/dj4j3uoia/image/upload/v1726855799/otraRuta_az0ggq.jpg"
              }
              alt={event.nameRoute.name}
              width={1000}
              height={1000}
              className="rounded-2xl"
            />
          ) : (
            <Image
              src={event.nameRoute.image}
              alt={event.nameRoute.name}
              width={1000}
              height={1000}
              className="rounded-2xl"
            />
          )}
        </div>

        <div className="flex gap-2 justify-between w-full border border-gray-600 rounded-2xl p-2">
          <div className="flex items-center">
            {event.nameRoute.name === "Nueva" ? (
              <h1 className="font-bold">{formattedName}</h1>
            ) : (
              <h1 className="font-bold text-xl">{event.nameRoute.name}</h1>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <p className="font-semibold text-end">
              <span className="font-normal">by</span> {event.firstName}
            </p>
            <Image
              src={event.imageUser}
              alt={event.firstName}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="border border-gray-600 rounded-2xl p-2 flex flex-col gap-1">
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
    </div>
  );
};

export default CardCalledRoute;
