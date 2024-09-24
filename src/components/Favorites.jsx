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

const Favorites = () => {
  const { user } = useUser(); // Obtener usuario autenticado
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    return <div>Cargando tus rutas favoritas...</div>;
  }

  console.log(favoriteRoutes);

  if (favoriteRoutes.length === 0) {
    return <div>No tienes rutas favoritas aún.</div>;
  }
  return (
    <div className="bg-white border border-black p-2 rounded-xl flex flex-col gap-2">
      {favoriteRoutes.map((route, i) => {
        return (
          <div className="flex gap-2" key={i}>
            <Image
              src={route.image}
              alt={route.name}
              width={200}
              height={200}
              className="rounded-lg w-[150px] h-[115px] object-fill"
            />
            <div>
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
            </div>

            <Link href={`/routesRoller/${route.id}`}>
              <Button label="Ver ruta" />
            </Link>
          </div>
        );
      })}

      {/* <h2 className="text-3xl font-bold text-center mb-6">
        Mis Rutas Favoritas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRoutes.map((route) => (
          <div key={route.id} className="border rounded-lg p-4 shadow-md">
            <Link href={`/routesRoller/${route.id}`}>
              <Image
                src={route.image}
                alt={route.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
            </Link>
            <h3 className="text-xl font-semibold mt-4">{route.name}</h3>
            <p>{route.description}</p>
            <div className="flex items-center mt-2">
              <span>Distancia: {route.approximateDistance}</span>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Favorites;
