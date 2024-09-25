"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

const Technologies = () => {
  const [visible, setVisible] = useState(false);

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
    <div>
      <div className="cursor-pointer size-10" onClick={() => setVisible(true)}></div>
      <Dialog
        header={"Tecnologías"}
        visible={visible}
        className="w-full md:w-[70vw] container"
        onHide={() => setVisible(false)}
      >
        <div className="flex w-full">
          <div className="bg-[#121b2e] w-[50%] flex justify-center items-center rounded-2xl border-[3px] border-[#58cbe8]">
            <Image
              src={"/images/Logo4.png"}
              alt="Los inmaduros roller Madrid"
              width={300}
              height={100}
            />
          </div>

          <div className="flex flex-wrap gap-5 justify-center items-center">
            {imagesTechnologies.map((image, index) => {
              return (
                <div className="border border-gray-500 rounded-xl p-1" key={index}>
                  <Image
                    src={image}
                    alt="Tecnologias"
                    width={150}
                    height={150}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Technologies;
