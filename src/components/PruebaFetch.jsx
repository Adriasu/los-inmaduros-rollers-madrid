"use client";
import React, { useState, useEffect } from "react";

const PruebaFetch = () => {
  const [dataRoutes, setDataRoutes] = useState([]);

  const fetchPrueba = async () => {
    try {
      const response = await fetch("https://los-inmaduros-rollers-madrid.vercel.app/api/routes");
  
      // Verifica si la respuesta es exitosa (status 200–299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      // Muestra un mensaje detallado en caso de error
      console.log('Error al hacer el fetch:', error.message);
    }
  };

  useEffect(() => {
    fetchPrueba();
  });



  return <div></div>;
};

export default PruebaFetch;
