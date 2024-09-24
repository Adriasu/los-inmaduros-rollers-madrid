import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs"; // Clerk para autenticación
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../lib/fireBase.mjs";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Buttons from "./Buttons";
import { Button } from "primereact/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Favorites = ({ openClose, setIsOpen }) => {
  const { user } = useUser(); // Obtener usuario autenticado
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const handleClick = (route) => {
    router.push(`/routesRoller/${route.id}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const userRef = doc(db, "dataUsers", user.id);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const favorites = userDoc.data().favorites || [];

            if (favorites.length > 0) {
              // Consultar las rutas favoritas
              const routesRef = collection(db, "routes");
              const q = query(routesRef, where("id", "in", favorites));
              const querySnapshot = await getDocs(q);

              const favoriteRoutesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));

              setFavoriteRoutes(favoriteRoutesData);
            }
          }
        } catch (error) {
          console.error("Error al recuperar favoritos: ", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="bg-white border border-black py-2 px-4 rounded-xl flex flex-col gap-2 bg-gradient-to-r from-cyan-100 to-cyan-50 md:max-h-[600px]">
      <div className="flex w-full justify-end items-center">
        <i
          onClick={openClose}
          className="pi pi-times-circle text-black cursor-pointer"
          style={{ fontSize: "1.5rem" }}
        ></i>
      </div>
      <div className="flex flex-col gap-2 overflow-auto cart-scrollbar pr-2">
        {favoriteRoutes.length === 0 ? (
          <p className="text-black">No tienes rutas favoritas aún.</p>
        ) : (
          favoriteRoutes.map((route, i) => {
            return (
              <div
                className="flex gap-2 border border-gray-500 p-2 rounded-md items-center bg-slate-50"
                key={i}
              >
                <Image
                  src={route.image}
                  alt={route.name}
                  width={200}
                  height={200}
                  className="rounded-lg w-[150px] h-[115px] object-fill"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-[#58cbe8] text-lg">{route.name}</h1>
                  <div className="flex gap-2 text-black">
                    <MapPin />
                    <p>Aprox {route.approximateDistance}</p>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    {route.level.map((level, i) => {
                      return <Buttons key={i} text={level} level={level} />;
                    })}
                  </div>
                  <div onClick={() => handleClick(route)}>
                    <Button className="py-0" label="Ver ruta" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Favorites;
