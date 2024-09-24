"use client";
import React, { useContext } from "react";
import { RoutesContext } from "@/context/RoutesContext";
import Image from "next/image";
import Favorites from "@/components/Favorites";

const HeroRoutes = () => {
  const { isLoading } = useContext(RoutesContext);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] mx-auto max-w-screen-xl px-3 py-4 sm:px-6 lg:px-8 rounded-2xl flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <section className="px-4 mt-3">
      <div className="mx-auto max-w-screen-xl px-3 py-4 sm:px-6 lg:px-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-600 shadow-[-2px_4px_43px_5px_#029EE963]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-[500px] lg:order-last lg:h-full">
            <Image
              src={"/images/heroRoutes.jpeg"}
              alt="Los inmaduros roller Madrid"
              width={560}
              height={416}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="lg:py-24">
            <h3 className="text-xl font-semibold sm:text-2xl text-white">
              {" "}
              ¡Descubre nuestro recorrido!
            </h3>
            <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-cyan-600 to-cyan-200 bg-clip-text text-transparent">
              Cada ruta, una nueva historia sobre ruedas
            </h2>

            <p className="mt-4 text-white">
              Explora nuestras rutas, donde la diversión, el desafío y la
              aventura se encuentran a cada giro. Ya sea que estés buscando una
              ruta tranquila o un reto emocionante, cada recorrido te invita a
              descubrir Madrid de una forma única.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRoutes;


