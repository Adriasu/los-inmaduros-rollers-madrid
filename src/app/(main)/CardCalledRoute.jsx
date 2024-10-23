import { CalendarDays, Clock, Drum, Map, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Tooltip } from "primereact/tooltip";
import { useUser } from "@clerk/nextjs";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/fireBase.mjs";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useRouter } from "next/navigation";
import Attendees from "@/components/Attendees";
import PaceDialogInfo from "@/components/PaceDialogInfo";

const CardCalledRoute = ({ event }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const showHideListAttendance = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };

  const confirmAttendance = async (eventId) => {
    const userInfo = {
      id: user.id,
      name: user.firstName,
      email: user.primaryEmailAddress?.emailAddress || "Sin correo",
      photoUrl: user.imageUrl,
    };

    const eventRef = doc(db, "routesCalled", eventId);

    try {
      const eventDoc = await getDoc(eventRef);
      const eventData = eventDoc.data();

      const isUserAttending = eventData.attendees.some(
        (att) => att.id === user.id
      );

      await updateDoc(eventRef, {
        attendees: isUserAttending
          ? arrayRemove(userInfo)
          : arrayUnion(userInfo),
      });
    } catch (error) {
      console.error("Error al confirmar asistencia: ", error);
    }
  };

  const accept = (eventId) => {
    cancelEvent(eventId);
    toast.current.show({
      severity: "info",
      summary: "Ruta cancelado",
      detail: "La ruta ha sido cancelado correctamente",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Cancelación Rechazada",
      detail: "No se ha cancelado el evento",
      life: 3000,
    });
  };

  const cancelEvent = async (eventId) => {
    try {
      const eventRef = doc(db, "routesCalled", eventId);
      await updateDoc(eventRef, {
        isCanceled: true,
      });
      console.log("Evento cancelado correctamente");
    } catch (error) {
      console.error("Error al cancelar el evento: ", error);
    }
  };

  const isToday = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate * 1000);
    return (
      today.getDate() === event.getDate() &&
      today.getMonth() === event.getMonth() &&
      today.getFullYear() === event.getFullYear()
    );
  };

  const isEventToday = event.dateRoute?.seconds
    ? isToday(event.dateRoute.seconds)
    : false;

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

  const attendees = () => {
    if (isSignedIn) {
      return event.attendees.some((att) => att.id === user.id);
    }
  };

  const isUserAttending = attendees();

  const nowInSeconds = Math.floor(new Date().getTime() / 1000);
  const eventStart = event.dateRoute.seconds;
  const eventEnd = eventStart + 2 * 60 * 60;
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
    const message = `
      ¡Rut4! ${
        event.nameRoute.name === "Nueva"
          ? `"${event.newNameRoute}"`
          : `"${event.nameRoute.name}"`
      }

      - Ritmo:  ${paceLevels}
      - Fecha: ${formattedDate}
      - Punto de encuentro: ${
        event.meetingPoint.name === "Otro"
          ? event.meetingPointOther
          : event.meetingPoint.name
      }
      - Hora: ${formattedTimeFirstPoint}
      ${
        event.otherPoint.name === "Si"
          ? `- Segundo punto de encuentro: ${
              event.meetingOtherPoint.name === "Otro"
                ? event.event.meetingOtherPointOther
                : event.meetingOtherPoint.name
            }
      - Hora: ${formattedTimeSecondPoint}`
          : ""
      } 
      - Comentarios: ${event.comments}

      Puedes ver más detalles en: https://los-inmaduros-rollers-madrid.vercel.app/`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="¿Estás seguro de que deseas cancelar esta ruta?, una vez cancelada no podrá volver a reactivarla"
        header="Confirmación de Cancelación"
        icon="pi pi-exclamation-triangle"
        accept={() => accept(event.id)}
        reject={reject}
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
      <div
        className={`shadow-[0px_0px_40px_2px_#f6ad55] rounded-2xl p-2 max-h-[800px] md:max-h-[600px] flex flex-col gap-2  
    ${
      isPastEvent || event.isCanceled
        ? "bg-slate-600 opacity-90"
        : "bg-gradient-to-r from-orange-300 to-cyan-600 hover:scale-[1.02] hover:border-orange-400 hover:border-[2px] border"
    }`}
      >
        <Tooltip target=".custom-target-icon" />
        <div className="flex flex-col gap-2 h-full">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center relative">
              <button
                disabled={isPastEvent || event.isCanceled}
                onClick={handleShareWhatsApp}
              >
                <i
                  className={`pi pi-whatsapp text-white p-2 rounded-full  
                ${
                  isPastEvent || event.isCanceled
                    ? "bg-slate-400"
                    : "bg-green-500 cursor-pointer custom-target-icon"
                }`}
                  style={{ fontSize: "1.2rem" }}
                  data-pr-tooltip="Compartir"
                  data-pr-position="top"
                ></i>
              </button>
              <button
                disabled={isPastEvent || event.isCanceled}
                onClick={() => {
                  if (isSignedIn) {
                    confirmAttendance(event.id);
                  } else {
                    router.push("/sign-in");
                  }
                }}
              >
                <i
                  className={`text-white p-2 rounded-full 
                    ${
                      isUserAttending ? "pi pi-user-minus" : "pi pi-user-plus"
                    }  
                ${
                  isPastEvent || event.isCanceled
                    ? "bg-slate-400"
                    : "bg-orange-500 cursor-pointer custom-target-icon"
                }`}
                  style={{ fontSize: "1.2rem" }}
                  data-pr-tooltip={isUserAttending ? "No asistiré" : "Asistir"}
                  data-pr-position="top"
                ></i>
              </button>
              <div>
                <button
                  disabled={isPastEvent || event.isCanceled}
                  className="font-bold"
                  onClick={showHideListAttendance}
                >
                  ({event.attendees.length || 0})
                </button>
                <div className="absolute left-1 z-50">
                  {isOpen && (
                    <Attendees
                      eventId={event.id}
                      open={isOpen}
                      setOpen={showHideListAttendance}
                    />
                  )}
                </div>
              </div>

              {isEventToday && (
                <h1
                  className={`${
                    event.isCanceled ? "text-gray-500 text-xl" : "today"
                  }`}
                >
                  ¡HOY!
                </h1>
              )}
            </div>

            {isSignedIn && user.id === event.idUser && (
              <div className="flex gap-2">
                <button
                  disabled={isPastEvent || event.isCanceled}
                  onClick={() => setVisible(true)}
                >
                  <i
                    className={`pi pi-times-circle text-white p-2 rounded-full  
                ${
                  isPastEvent || event.isCanceled
                    ? "bg-slate-400"
                    : "bg-red-600 cursor-pointer custom-target-icon"
                }`}
                    style={{ fontSize: "1.2rem" }}
                    data-pr-tooltip="Cancelar ruta"
                    data-pr-position="top"
                  ></i>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            {event.nameRoute.name === "Nueva" ? (
              event.newNameRoute === "Madrid Friday Night Skate" ? (
                <Image
                  src={"/images/friday.jpg"}
                  alt={event.nameRoute.name}
                  width={1000}
                  height={1000}
                  className="rounded-2xl"
                />
              ) : event.newNameRoute === "Madrid Roller Night" ? (
                <Image
                  src={"/images/rollerNight.jpg"}
                  alt={event.nameRoute.name}
                  width={1000}
                  height={1000}
                  className="rounded-2xl"
                />
              ) : (
                <Image
                  src={
                    "https://res.cloudinary.com/dj4j3uoia/image/upload/v1726855799/otraRuta_az0ggq.jpg"
                  }
                  alt={event.nameRoute.name}
                  width={1000}
                  height={1000}
                  className="rounded-2xl"
                />
              )
            ) : (
              <Link href={`/routesRoller/${event.nameRoute.id}`}>
                <div>
                  <Image
                    src={event.nameRoute.image}
                    alt={event.nameRoute.name}
                    width={1000}
                    height={1000}
                    className="rounded-2xl"
                  />
                </div>
              </Link>
            )}

            {/* {event.nameRoute.name === "Nueva" ? (
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
              <Link href={`/routesRoller/${event.nameRoute.id}`}>
                <div>
                  <Image
                    src={event.nameRoute.image}
                    alt={event.nameRoute.name}
                    width={1000}
                    height={1000}
                    className="rounded-2xl"
                  />
                </div>
              </Link>
            )} */}
            {isPastEvent && (
              <div>
                <Image
                  src={"/images/finalizado.webp"}
                  alt="Finalizado"
                  width={500}
                  height={500}
                  className="absolute w-[280px] top-0 left-0 right-0 bottom-0 m-auto"
                />
              </div>
            )}
            {event.isCanceled && (
              <div>
                <Image
                  src={"/images/cancelado.png"}
                  alt="Finalizado"
                  width={500}
                  height={500}
                  className="absolute w-[280px] top-0 left-0 right-0 bottom-0 m-auto"
                />
              </div>
            )}
          </div>

          <div
            className={`flex gap-2 justify-between w-full border rounded-2xl p-2 ${
              isPastEvent || event.isCanceled
                ? "border-black "
                : "border-gray-600 bg-gradient-to-r from-cyan-100 to-cyan-50"
            }`}
          >
            <div className="flex items-center">
              {event.nameRoute.name === "Nueva" ? (
                <h1 className="font-bold">{formattedName}</h1>
              ) : (
                <Link href={`/routesRoller/${event.nameRoute.id}`}>
                  <h1 className="font-bold text-xl hover:text-blue-600">
                    {event.nameRoute.name}
                  </h1>
                </Link>
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

          <div
            className={`border rounded-2xl p-2 flex flex-col overflow-auto ${
              isPastEvent || event.isCanceled
                ? "border-black"
                : "border-gray-600 bg-gradient-to-r from-cyan-100 to-cyan-50 "
            }`}
          >
            <div className="flex flex-col overflow-auto pr-2 cart-scrollbar gap-1">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <CalendarDays />
                  <p>{formattedDate}</p>
                </div>

                <div>
                  <div className="flex gap-2">
                    <Clock />
                    <p>{formattedTimeFirstPoint}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <MapPin />
                {event.meetingPoint.name === "Otro" ? (
                  <p>{event.meetingPointOther}</p>
                ) : (
                  <p>{event.meetingPoint.name}</p>
                )}
                {event.meetingPoint.name !== "Otro" &&
                  (isPastEvent || event.isCanceled ? (
                    <Map />
                  ) : (
                    <Link target="_blank" href={event.meetingPoint.location}>
                      <Map className="hover:text-blue-800" />
                    </Link>
                  ))}
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
                    {event.meetingOtherPoint.name !== "Otro" &&
                      (isPastEvent || event.isCanceled ? (
                        <Map />
                      ) : (
                        <Link
                          target="_blank"
                          href={event.meetingOtherPoint.location}
                        >
                          <Map />
                        </Link>
                      ))}
                  </div>

                  <div className="flex gap-2">
                    <Clock />
                    <p>{formattedTimeSecondPoint}</p>
                  </div>
                </div>
              )} 

              <div className="flex gap-2">
                <div className="flex flex-col items-center">
                  <Drum />
                  <PaceDialogInfo location={"card"} />
                </div>
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
                <h1 className="font-bold">Comentarios</h1>
                <p>{event.comments}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCalledRoute;
