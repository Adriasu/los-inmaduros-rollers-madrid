"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const HeroMobile = () => {
  const imagesHeroLanding = [
    "/images/carrusel1Mobile.png",
    "/images/carrusel2Mobile.jpg",
    "/images/carrusel22Mobile.jpg",
    "/images/carrusel3Mobile.jpg",
    "/images/carrusel4Mobile.jpg",
    "/images/carrusel5Mobile.jpeg",
  ];

  return (
    <div className="px-5 md:hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-2xl bg-gradient-to-r from-slate-800 to-slate-600 shadow-[-2px_4px_43px_5px_#029EE963] max-w-[1200px] h-auto mx-5 flex justify-center items-center"
      >
        {imagesHeroLanding.map((image, i) => {
          return (
            <SwiperSlide key={i} className="w-full rounded-2xl flex justify-center items-center">
              <Image
                src={image}
                alt="4torres"
                quality={100}
                width={1200}
                height={500}
                className="object-cover w-full h-full md:h-[500px] rounded-2xl"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroMobile;