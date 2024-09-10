"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* {imageCarrusel.map((image) => {
          <SwiperSlide>
            <Image
              src="/images/4torres.jpeg"
              alt="4torres"
              width={300}
              height={300}
              className="object-cover w-[400px] h-[400px]"
            />
          </SwiperSlide>;
        })} */}
        <SwiperSlide>
          <Image
            src="/images/anillo.jpg"
            alt="anillo"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/arcade.webp"
            alt="arcade"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/calamar.jpg"
            alt="calamar"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/caracolera.jpeg"
            alt="caracolera"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/clasica.jpeg"
            alt="4torres"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/dora.jpg"
            alt="4torres"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/heroes.webp"
            alt="4torres"
            width={300}
            height={300}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/leyenda.jpg"
            alt="4torres"
            width={300}
            height={300}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Hero;

{
  /* <Image src="/images/4torres.jpeg" alt='4torres' width={300} height={300}/> */
}
