"use client";
import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log("Calificación:", rating);
    console.log("Reseña:", review);
    setRating(0);
    setReview("");
  };
  return (
    <div className="m-auto hidden md:flex gap-6 max-w-[1200px] text-white justify-center mt-5">
      <div className="flex gap-10 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-600 shadow-[-2px_4px_43px_5px_#029EE963] mx-auto max-w-screen-xl px-6 py-4">
        <div className="w-[30%]">
          <div className="my-4">
            <h3>Califica la ruta:</h3>
            <Rating
              value={rating}
              cancel={false}
              onChange={(e) => setRating(e.value)}
            />
          </div>

          <div className="my-4">
            <h3>Deja una reseña:</h3>
            <InputTextarea
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Escribe tu reseña aquí"
              className="w-full"
            />
          </div>

          <Button label="Enviar reseña" onClick={handleSubmit} />
        </div>
        <div className="flex flex-col gap-3 w-[70%]">
          <div className="flex flex-col gap-2 rounded-2xl border-[1px] border-[#58cbe8] p-6">
            <p className="font-bold text-xl">Adriana Suárez</p>
            <Rating value={5} disabled cancel={false} />
            <p>
              No es apta para niños pequeños, la subida mejor por la zona de las
              cascadas. La bajada se hace larga por la carretera y sin sombras.
              Las vistas durante la primera mitad del recorrido son increíbles.
              Merece mucho la pena el esfuerzo. Cuando acabas puedes refrescarte
              en el rio.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border-[1px] border-[#58cbe8] p-6">
            <p className="font-bold text-xl">Adriana Suárez</p>
            <Rating value={5} disabled cancel={false} />
            <p>
              No es apta para niños pequeños, la subida mejor por la zona de las
              cascadas. La bajada se hace larga por la carretera y sin sombras.
              Las vistas durante la primera mitad del recorrido son increíbles.
              Merece mucho la pena el esfuerzo. Cuando acabas puedes refrescarte
              en el rio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
