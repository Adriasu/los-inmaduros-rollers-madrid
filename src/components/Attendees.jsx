import React, { use, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/fireBase.mjs";
import Image from "next/image";

const Attendees = ({ eventId, open, setOpen }) => {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        if (eventId) {
          const eventRef = doc(db, "routesCalled", eventId);
          const eventSnap = await getDoc(eventRef);

          if (eventSnap.exists()) {
            const eventData = eventSnap.data();
            setAttendees(eventData.attendees || []);
          } else {
            console.log("El evento no existe.");
            setAttendees([]);
          }
        }
      } catch (error) {
        console.error("Error al obtener los asistentes:", error);
        setAttendees([]);
      }
    };

    if (open && eventId) {
      fetchAttendees();
    }
  }, [eventId, open]);

  return (
    <div>
      <div className="flex flex-col gap-2 border border-black p-2 rounded-xl bg-white min-w-[280px] max-h-[400px] max-w-[200px] container">
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-lg">Asistentes</h1>
          <button onClick={setOpen}>
            <i className="pi pi-times-circle" style={{ fontSize: "1rem" }}></i>
          </button>
        </div>
        {attendees.length === 0 ? (
          <h1>No hay asistentes aún.</h1>
        ) : (
          attendees.map((user, i) => {
            return (
              <div key={i} className="flex gap-2 items-center">
                <Image
                  src={user.photoUrl}
                  alt={user.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <p>{user.name}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Attendees;
