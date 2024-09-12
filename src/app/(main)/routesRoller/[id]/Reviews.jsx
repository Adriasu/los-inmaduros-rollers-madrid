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
    <div>
      <div>
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

        <Button
          label="Enviar reseña"
          onClick={handleSubmit}
          className="mt-3 p-button-success"
        />
      </div>
    </div>
  );
};

export default Reviews;
