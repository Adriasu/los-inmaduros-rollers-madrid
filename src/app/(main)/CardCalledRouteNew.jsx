import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
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
import { db } from "../../../lib/fireBase.mjs";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import Attendees from "@/components/Attendees";
import { useRouter } from "next/navigation";

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

const isToday = (eventDate) => {
  const today = new Date();
  const event = new Date(eventDate * 1000);
  return (
    today.getDate() === event.getDate() &&
    today.getMonth() === event.getMonth() &&
    today.getFullYear() === event.getFullYear()
  );
};

const CardCalledRouteNew = ({
  event,
  isPastEvent,
  isExpanded,
  toggleExpandedCard,
}) => {
  const { isSignedIn, user } = useUser();
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const showHideListAttendance = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };

  const attendees = () => {
    if (isSignedIn) {
      return event.attendees.some((att) => att.id === user.id);
    }
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

  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight);
        }
      });

      resizeObserver.observe(contentRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

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

  const handleShareWhatsApp = () => {
    const paceLevels = event.paceRoute.map((pace) => pace.level).join(", ");
    const message = `
      ¡Rut4! ${
        event.nameRoute.name === "Nueva"
          ? `"${event.newNameRoute}"`
          : `"${event.nameRoute.name}"`
      }

      - Ritmo:  ${paceLevels}
      - Fecha: ${formatDate(event.dateRoute.seconds)}
      - Punto de encuentro: ${
        event.meetingPoint.name === "Otro"
          ? event.meetingPointOther
          : event.meetingPoint.name
      }
      - Hora: ${formatHour(event.dateRoute.seconds)}
      ${
        event.otherPoint.name === "Si"
          ? `- Segundo punto de encuentro: ${
              event.meetingOtherPoint.name === "Otro"
                ? event.event.meetingOtherPointOther
                : event.meetingOtherPoint.name
            }
      - Hora: ${formatHour(event.timeMeetingOtherPoint.seconds)}`
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
      <div>
        <div
          className={`flex flex-col rounded-2xl insolate ${
            isPastEvent || event.isCanceled
              ? "bg-slate-600 opacity-90 border border-gray-800"
              : "bg-gradient-to-r from-cyan-100 to-cyan-50 hover:scale-[1.02] hover:border-[#06b3d1] hover:border-[2px]"
          } ${!isPastEvent && "shadow-[-2px_4px_43px_5px_#029EE963]"}`}
        >
          <div className="relative">
            {event.nameRoute.name === "Nueva" ? (
              event.nameRoute.image && event.nameRoute.image !== "" ? (
                <Image
                  src={event.nameRoute.image}
                  alt={event.nameRoute.name}
                  width={500}
                  height={500}
                  className={`sm:h-[220px] w-full rounded-2xl object-fill ${isPastEvent && "imgPastRoute"}`}
                />
              ) : (
                <Image
                  src={
                    "https://res.cloudinary.com/dj4j3uoia/image/upload/v1726855799/otraRuta_az0ggq.jpg"
                  }
                  alt={event.nameRoute.name}
                  width={500}
                  height={500}
                  className={`sm:h-[220px] w-full rounded-2xl object-fill ${isPastEvent && "imgPastRoute"}`}
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
                    className={`sm:h-[220px] w-full rounded-2xl object-fill ${isPastEvent && "imgPastRoute"}`}
                  />
                </div>
              </Link>
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
            {isToday(event.dateRoute.seconds) && (
              <div className="absolute top-2 left-2 bg-white p-1 rounded-full">
                <h1
                  className={` ${
                    event.isCanceled
                      ? "text-gray-500 text-sm font-black"
                      : "today"
                  }`}
                >
                  ¡HOY!
                </h1>
              </div>
            )}
            <div className="absolute top-2 right-2 flex gap-2 items-center">
              <div>
                <button
                  disabled={isPastEvent || event.isCanceled}
                  className=" text-white bg-gray-600 rounded-full p-1"
                  onClick={showHideListAttendance}
                >
                  ({event.attendees.length || 0})
                </button>
                <div className="absolute right-0 z-50">
                  {isOpen && (
                    <Attendees
                      eventId={event.id}
                      open={isOpen}
                      setOpen={showHideListAttendance}
                    />
                  )}
                </div>
              </div>
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
                    ${attendees() ? "pi pi-user-minus" : "pi pi-user-plus"}  
                ${
                  isPastEvent || event.isCanceled
                    ? "bg-slate-400"
                    : "bg-orange-500 cursor-pointer custom-target-icon hover:border border-white"
                }`}
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </button>
            </div>
          </div>

          <div className="relative flex flex-col gap-y-2 p-2">
            {isSignedIn && user.id === event.idUser && (
              <div className="absolute bottom-2 right-2 flex gap-2">
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
                  ></i>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              {event.nameRoute.name === "Nueva" ? (
                <h1 className="font-bold text-xl">
                  {capitalizarPrimeraLetra(event.newNameRoute)}
                </h1>
              ) : (
                <Link className="flex gap-1 items-center" href={`/routesRoller/${event.nameRoute.id}`}>
                  <h1 className="font-bold text-xl hover:text-blue-600">
                    {event.nameRoute.name}
                  </h1>
                  <p className="text-xs">ver ruta</p>
                </Link>
              )}

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
                ></i>
              </button>
            </div>

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
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <p>{formatHour(event.dateRoute.seconds)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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

            <div>
              <div
                ref={contentRef}
                style={{
                  height: isExpanded ? `${contentHeight}px` : "0px",
                  transition: "height 0.3s ease-in-out",
                }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  {event.otherPoint.name === "Si" && (
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold">Segundo punto de encuentro:</h1>
                      <div className="flex gap-2">
                        <MapPin size={20}/>
                        {event.meetingOtherPoint.name === "Otro" ? (
                          <p>{event.meetingOtherPointOther}</p>
                        ) : (
                          <p>{event.meetingOtherPoint.name}</p>
                        )}
                        {event.meetingOtherPoint.name !== "Otro" &&
                          (isPastEvent || event.isCanceled ? (
                            <Map size={20}/>
                          ) : (
                            <Link
                              target="_blank"
                              href={event.meetingOtherPoint.location}
                            >
                              <Map size={20} className="hover:text-blue-800" />
                            </Link>
                          ))}
                      </div>
                      <div className="flex gap-2">
                        <Clock size={20} />
                        <p>{formatHour(event.timeMeetingOtherPoint.seconds)}</p>
                      </div>
                    </div>
                  )}
                  <h1 className="font-bold">Comentarios</h1>
                  <p>{event.comments}</p>
                </div>
              </div>

              <button
                onClick={() => toggleExpandedCard(event.id)}
                className="flex items-center gap-1 text-gray-700 text-sm mx-auto mt-2 p-1 cursor-pointer hover:text-black hover:scale-105 transition-all duration-200"
              >
                {isExpanded ? "Ocultar detalles" : "Mostrar detalles"}
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCalledRouteNew;
