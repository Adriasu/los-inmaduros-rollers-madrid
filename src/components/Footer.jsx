"use client";
import Image from "next/image";
import React from "react";
import "primeicons/primeicons.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormRouteCall from "./FormRouteCall";
import FormRouteCallMobile from "./FormRouteCallMobile";

const Footer = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <footer className="flex w-full flex-col items-center bg-slate-950 text-white">
      <div className="flex w-full max-w-4xl flex-col justify-between gap-y-10 px-10 py-16 sm:flex-row sm:px-3">
        <div>
          <Image
            src={"/images/Logo4.png"}
            alt="Los inmaduros roller Madrid"
            width={200}
            height={40}
            onClick={handleClick}
            className="cursor-pointer w-auto h-auto"
          />
        </div>

        <div className="flex flex-col gap-3 border-t-[1px] border-[#58cbe8] sm:border-l-[1px] sm:border-[#58cbe8] p-3">
          <p>Sieguenos en</p>
          <div className="flex gap-5">
            <Link
              target="_blank"
              href={"https://www.instagram.com/los_inmadurosrollers/"}
              className="hover:scale-[1.05]"
            >
              <i className="pi pi-instagram" style={{ fontSize: "1.5rem" }}></i>
            </Link>
            <Link
              target="_blank"
              href={"https://chat.whatsapp.com/DZBoC7M8jtc0YMLpOGIwlo"}
              className="hover:scale-[1.05]"
            >
              <i className="pi pi-whatsapp" style={{ fontSize: "1.5rem" }}></i>
            </Link>
            <Link
              className="hover:scale-[1.05]"
              target="_blank"
              href={"https://t.me/PatinarEnMadrid"}
            >
              <i className="pi pi-telegram" style={{ fontSize: "1.5rem" }}></i>
            </Link>
            <Link
              className="hover:scale-[1.05]"
              target="_blank"
              href={"https://www.facebook.com/groups/227134327307651/"}
            >
              <i className="pi pi-facebook" style={{ fontSize: "1.5rem" }}></i>
            </Link>
          </div>
        </div>
        <ul className="flex flex-col gap-3 border-t-[1px] border-[#58cbe8] sm:border-l-[1px] sm:border-[#58cbe8] p-3">
          <Link href={"/routesRoller"}>
            <li className="hover:scale-[1.05]">Rutas</li>
          </Link>
          <li className="hover:scale-[1.05] cursor-pointer">
            <FormRouteCall location={"footer"} />
            <FormRouteCallMobile location={"footer"}/>
          </li>
          <Link
            href={"mailto:losinmadurosrollermadrid@gmail.com"}
            title="Enviar correo"
          >
            <li className="hover:scale-[1.05]">Contacto</li>
          </Link>
        </ul>
      </div>

      <div className="w-full bg-slate-900 flex justify-center items-center">
        <p className="p-2 text-center text-sm">
          Todos los derechos reservados - Los inmaduros roller Madrid - 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
