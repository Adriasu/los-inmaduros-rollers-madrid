import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Drum,
  Map,
  MapPin,
} from "lucide-react";
import PaceDialogInfo from "@/components/PaceDialogInfo";

function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const formatDate = (seconds) => {
  const date = new Date(seconds * 1000);
  const formattedDate = date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

const formatHour = (seconds) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const CardCalledRouteNew = ({ event, isPastEvent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="rounded-2xl bg-gradient-to-r from-cyan-100 to-cyan-50">
      <div>
        {event.nameRoute.name === "Nueva" ? (
          event.nameRoute.image && event.nameRoute.image !== "" ? (
            <Image
              src={event.nameRoute.image}
              alt={event.nameRoute.name}
              width={500}
              height={500}
              className="h-[220px] w-full rounded-2xl object-fill"
            />
          ) : (
            <Image
              src={
                "https://res.cloudinary.com/dj4j3uoia/image/upload/v1726855799/otraRuta_az0ggq.jpg"
              }
              alt={event.nameRoute.name}
              width={500}
              height={500}
              className="h-[220px] w-full rounded-2xl object-fill"
            />
          )
        ) : (
          <Link href={`/routesRoller/${event.nameRoute.id}`}>
            <div>
              <Image
                src={event.nameRoute.image}
                alt={event.nameRoute.name}
                width={500}
                height={500}
                className="h-[220px] w-full rounded-2xl object-fill"
              />
            </div>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-y-2 p-2">
        {event.nameRoute.name === "Nueva" ? (
          <h1 className="font-bold text-xl">
            {capitalizarPrimeraLetra(event.newNameRoute)}
          </h1>
        ) : (
          <Link href={`/routesRoller/${event.nameRoute.id}`}>
            <h1 className="font-bold text-xl hover:text-blue-600">
              {event.nameRoute.name}
            </h1>
          </Link>
        )}
        <div className="flex items-center gap-2">
          <Image
            src={event.imageUser}
            alt={event.firstName}
            width={32}
            height={32}
            className="rounded-full h-8 w-8"
          />
          <p className="font-semibold text-end">
            <span className="font-normal">by</span> {event.firstName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={20} />
          <p>{formatDate(event.dateRoute.seconds)}</p>
        </div>

        <div>
          <div className="flex gap-2">
            <Clock size={20} />
            <p>{formatHour(event.dateRoute.seconds)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <MapPin size={20} />
          {event.meetingPoint.name === "Otro" ? (
            <p>{event.meetingPointOther}</p>
          ) : (
            <p>{event.meetingPoint.name}</p>
          )}
          {event.meetingPoint.name !== "Otro" &&
            (isPastEvent || event.isCanceled ? (
              <Map size={20} />
            ) : (
              <Link target="_blank" href={event.meetingPoint.location}>
                <Map size={20} className="hover:text-blue-800" />
              </Link>
            ))}
        </div>

        <div className="flex items-center gap-2">
          <Drum size={20} />
          {event.paceRoute.map((pace, i) => {
            return (
              <Image
                src={pace.img}
                alt={pace.level}
                width={30}
                height={30}
                key={i}
              />
            );
          })}
          <PaceDialogInfo location={"card"} />
        </div>

        <p className="flex items-center text-gray-700 text-sm m-auto p-1 cursor-pointer hover:text-black hover:scale-[1.1]">
          Ver detalles <ChevronDown />
        </p>
      </div>
    </div>
  );
};

export default CardCalledRouteNew;
