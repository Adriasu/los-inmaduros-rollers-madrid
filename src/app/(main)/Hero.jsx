"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Technologies from "@/components/Technologies";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const showHideListTech = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };

  const imagesHeroLanding = [
    "/images/carrusel3.jpg",
    "/images/carrusel2.png",
    "/images/carrusel4.png",
    "/images/carrusel1.png",
    "/images/carrusel5.jpeg",
  ];

  return (
    <div className="hidden md:flex px-5">
      <div className="absolute">
        <Technologies />
      </div>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-2xl bg-gradient-to-r from-slate-800 to-slate-600 shadow-[0px_0px_50px_0px_#EB5D3CCF] max-w-[880px] md:h-auto mx-5 flex justify-center items-center"
      >
        {imagesHeroLanding.map((image, i) => {
          return (
            <SwiperSlide key={i} className="w-full rounded-2xl">
              <Image
                src={image}
                alt="4torres"
                quality={100}
                width={1200}
                height={500}
                className="object-contain w-full h-full md:h-[500px] rounded-2xl"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Hero;
