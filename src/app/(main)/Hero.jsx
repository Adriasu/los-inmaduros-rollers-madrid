"use client";
import React from "react";

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
  const imagesHeroLanding = [
    "/images/anillo.jpg",
    "/images/arcade.webp",
    "/images/calamar.jpg",
    "/images/caracolera.jpeg",
    "/images/clasica.jpeg",
  ];

  return (
    <div className="">
      <div className="">
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
          {imagesHeroLanding.map((image, i) => {
            return (
              <SwiperSlide key={i}>
                <Image
                  src={image}
                  alt="4torres"
                  width={300}
                  height={300}
                  className="object-contain w-full h-[500px]"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;

{
  /* <Image src="/images/4torres.jpeg" alt='4torres' width={300} height={300}/> */
}
