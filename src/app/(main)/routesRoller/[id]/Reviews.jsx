"use client";
import React, { useState, useEffect } from "react";
import { Rating } from "primereact/rating";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../../lib/fireBase.mjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Reviews = ({ routeId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewsList, setReviewsList] = useState([]);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const fetchRouteData = async () => {
      const routeDoc = await getDoc(doc(db, "routes", routeId));
      if (routeDoc.exists()) {
        const data = routeDoc.data();
        setReviewsList(data.reviews || []);
      }
    };

    fetchRouteData();
  }, [routeId]);

  // Función para enviar la reseña
  const handleSubmit = async () => {
    if (!user) return alert("Debes iniciar sesión para dejar una reseña");

    const newReview = {
      name: user.firstName,
      photoUrl: user.imageUrl,
      rating,
      comment: review,
    };

    // Actualizar las reseñas y calcular el nuevo promedio
    const routeRef = doc(db, "routes", routeId);
    const routeDoc = await getDoc(routeRef);
    const routeData = routeDoc.data();

    const updatedReviews = [...(routeData.reviews || []), newReview];
    const newRating = calculateNewAverageRating(updatedReviews);

    // Actualizar el documento de la ruta en Firebase
    await updateDoc(routeRef, {
      reviews: updatedReviews,
      rating: newRating, // Guardar el nuevo promedio
    });

    // Resetear el formulario y actualizar el estado
    setRating(0);
    setReview("");
    setReviewsList(updatedReviews);
  };

  // Calcular el promedio de calificaciones
  const calculateNewAverageRating = (reviews) => {
    const totalRatings = reviews.reduce((sum, review) => {
      const reviewRating =
        typeof review.rating === "number" ? review.rating : 0;
      return sum + reviewRating;
    }, 0);

    return reviews.length > 0 ? totalRatings / (reviews.length - 1) : 0;
  };

  return (
    <div className="m-auto hidden md:flex gap-6 max-w-[1200px] text-white justify-center mt-5">
      <div className="flex gap-10 w-full max-h-[500px] rounded-2xl bg-gradient-to-r from-slate-800 to-slate-600 shadow-[-2px_4px_43px_5px_#029EE963] mx-auto max-w-screen-xl px-6 py-4">
        {isSignedIn ? (
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
        ) : (
          <div className="w-[30%]">
            <Link href={"/sign-in"} >
              <Button label="Deja tu reseña" className="w-full" />
            </Link>
          </div>
        )}

        <div className="flex flex-col max-h-[468px] overflow-auto cart-scrollbar pr-2 p-1 gap-3 w-[70%]">
          {reviewsList.slice(1).map((rev, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-2xl border-[1px] border-[#58cbe8] p-6"
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={rev.photoUrl}
                  alt={rev.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="font-bold text-xl">{rev.name}</p>
              </div>
              <Rating value={rev.rating} disabled cancel={false} />
              <p>{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
