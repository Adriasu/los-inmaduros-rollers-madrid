"use client";
import Image from "next/image";
import React from "react";

const Technologies = () => {
  const imagesTechnologies = [
    "/images/iconNext.png",
    "/images/iconVercel.png",
    "/images/iconTailwinCSS.png",
    "/images/iconClerk.png",
    "/images/iconFirebase.png",
    "/images/iconPrimeReact.png",
    "/images/iconSwiper.png",
  ];

  return (
    <div className="flex flex-wrap w-[1000px] gap-7 justify-center  bg-white p-4 rounded-2xl border-[3px] border-[#58cbe8]">
  
        {imagesTechnologies.map((image, index) => {
          return (
            <div className="border border-black rounded-xl" key={index}>
              <Image src={image} alt="Tecnologias" width={200} height={200} />
            </div>
          );
        })}
      
    </div>
  );
};

export default Technologies;
