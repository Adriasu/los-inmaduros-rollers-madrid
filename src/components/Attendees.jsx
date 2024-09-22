import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/fireBase.mjs";
import Image from "next/image";

const Attendees = ({ eventId, open }) => {
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
            setAttendees([]); // No hay datos, lista vacía
          }
        }
      } catch (error) {
        console.error("Error al obtener los asistentes:", error);
        setAttendees([]); // En caso de error, mostrar lista vacía
      }
    };

    // Llamamos a la función cuando el modal es visible y tiene un `eventId`
    if (open && eventId) {
      fetchAttendees();
    }
  }, [eventId, open]);

  return (
    <div>
      <div className="flex flex-col gap-2 border border-black p-2 rounded-xl">
        {attendees.map((user, i) => {
          return (
            <div key={i} className="flex gap-2">
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
        })}
      </div>
    </div>
  );
};

export default Attendees;
