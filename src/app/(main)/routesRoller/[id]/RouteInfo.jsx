"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RoutesContext } from "@/context/RoutesContext";
import Image from "next/image";
import { ArrowLeft, Bookmark, Heart, Send, Star } from "lucide-react";
import RouteMapGoogle from "@/components/RouteMapGoogle";
import Buttons from "@/components/Buttons";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../../../../lib/fireBase.mjs";

const RouteInfo = () => {
  const params = useParams();
  const { dataRoutes, isLoading } = useContext(RoutesContext);
  const id = params.id;
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, isSignedIn } = useUser();

  const route = dataRoutes.find((route) => route.id === id);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        const userRef = doc(db, "dataUsers", user.id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsFavorite(userData.favorites?.includes(id));
        }
      }
    };
    checkFavoriteStatus();
  }, [user, id]);

  const handleFavoriteClick = async () => {
    if (!user)
      return alert("Debes iniciar sesión para guardar esta ruta en favoritos");

    const userRef = doc(db, "dataUsers", user.id);

    if (isFavorite) {
      // Eliminar de favoritos
      await updateDoc(userRef, {
        favorites: arrayRemove(id),
      });
      setIsFavorite(false);
    } else {
      // Agregar a favoritos
      await updateDoc(userRef, {
        favorites: arrayUnion(id),
      });
      setIsFavorite(true);
    }
  };

  const handleShareWhatsApp = () => {
    const message = `
    Conoce esta ruta: 

    - Nombre: ${route.name}
    - Distancia aprox: ${route.approximateDistance}
    - Descripción: ${route.description}
    - Recorrido: ${route.map}

    Puedes ver más detalles en: https://los-inmaduros-rollers-madrid.vercel.app/routesRoller/${route.id}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!route || isLoading) {
    return (
      <div className="hidden sm:w-full h-[500px] mx-auto max-w-screen-xl px-3 py-4 rounded-2xl sm:flex justify-center items-center">
        <div class="spinner"></div>
      </div>
    );
  }

  return (
    <div className="m-auto hidden md:flex gap-6 max-w-[1200px] text-white justify-center mt-3">
      <div className="flex flex-col gap-5 relative">
        <Link href={"/routesRoller"} className="absolute top-3 left-3">
          <ArrowLeft className="bg-[#464954] size-8 flex justify-center items-center rounded-full cursor-pointer hover:scale-[1.15] border-[1px] border-[#58cbe8]" />
        </Link>
        <Image
          src={route.image}
          alt={route.name}
          width={650}
          height={400}
          className="rounded-2xl"
        />
        <div className="flex w-full justify-end gap-3">
          {isSignedIn && (
            <div
              onClick={handleFavoriteClick}
              className={`bg-[#464954] size-8 flex justify-center items-center rounded-md cursor-pointer hover:scale-[1.15] border-[1px] border-[#58cbe8]`}
            >
              <Heart
                className={`${isFavorite ? " fill-[#58cbe8]" : "text-white"}`}
              />
            </div>
          )}
          <div
            onClick={handleShareWhatsApp}
            className="bg-[#464954] size-8 flex justify-center items-center rounded-md cursor-pointer hover:scale-[1.15] border-[1px] border-[#58cbe8]"
          >
            <Send />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 w-2/5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 justify-between rounded-2xl border-[1px] border-[#58cbe8] p-6">
            <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">
              {route.name}
            </h2>
            <div className="flex gap-2 items-center">
              <Star className="text-[#58cbe8] fill-[#58cbe8]" />
              {route.rating ? (
                <p>({route.rating.toFixed(1)})</p>
              ) : (
                <p>Sin valoraciones aún</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p>Distancia: {route.approximateDistance} aprox</p>

              <div className="flex gap-2">
                {route.level.map((level, i) => {
                  return <Buttons key={i} text={level} level={level} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-[1px] border-[#58cbe8] p-6 flex flex-col gap-2">
          <p className="font-semibold">Descripción:</p>
          <p>{route.description}</p>
        </div>

        <RouteMapGoogle urlMap={route.map} />
      </div>
    </div>
  );
};

export default RouteInfo;
