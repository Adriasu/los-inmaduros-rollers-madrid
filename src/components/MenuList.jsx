import { FolderHeart, House, Mail, Route, SquarePen } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import FormRouteCall from "./FormRouteCall";
import FormRouteCallMobile from "./FormRouteCallMobile";
import Favorites from "./Favorites";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const MenuList = ({ location, setVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const showHideListFavorites = () => {
    if (isSignedIn) {
      isOpen === false ? setIsOpen(true) : setIsOpen(false);
    } else {
      router.push(`/sign-in`);
    }
  };
  const styleUl = () => {
    if (location === "navbar") {
      return "hidden md:flex gap-7 p-3 text-white font-semibold";
    } else {
      return "mt-10 flex flex-col gap-5 rounded-2xl border-[1px] border-[#58cbe8] p-3 md:hidden";
    }
  };

  const styleLi = () => {
    if (location === "navbar") {
      return "hover:bg-[#F7F5F31A] px-2 py-1 rounded-lg hover:text-[#58cbe8]";
    } else {
      return "hover:text-black";
    }
  };

  const closeMenuBar = (setVisible) => {
    if (location !== "navbar") {
      return setVisible(false);
    }
  };

  return (
    <ul className={`${styleUl()}  `}>
      <Link href={"/"} onClick={() => closeMenuBar(setVisible)}>
        <li
          className={`${styleLi()} flex gap-2 hover:underline cursor-pointer`}
        >
          {location !== "navbar" && <House />}
          Inicio
        </li>
      </Link>
      <Link href={"/routesRoller"} onClick={() => closeMenuBar(setVisible)}>
        <li
          className={`${styleLi()} flex gap-2 hover:underline cursor-pointer`}
        >
          {location !== "navbar" && <Route />}
          Rutas
        </li>
      </Link>

      <div>
        <li
          onClick={showHideListFavorites}
          className={`${styleLi()} flex gap-2 hover:underline cursor-pointer`}
        >
          {location !== "navbar" && <FolderHeart />}
          Tus favoritos
        </li>
        {isOpen && (
          <div className="absolute">
            <Favorites />
          </div>
        )}
      </div>

      <li className={`${styleLi()} flex gap-2 hover:underline cursor-pointer`}>
        {location !== "navbar" && <SquarePen />}
        <FormRouteCall location={"menuBar"} closeMenuBar={setVisible} />
        <FormRouteCallMobile location={"menuBar"} closeMenuBar={setVisible} />
      </li>
      <Link
        onClick={() => closeMenuBar(setVisible)}
        href={"mailto:losinmadurosrollermadrid@gmail.com"}
        title="Enviar correo"
      >
        <li
          className={`${styleLi()} flex gap-2 hover:underline cursor-pointer`}
        >
          {location !== "navbar" && <Mail />}
          Contacto
        </li>
      </Link>
    </ul>
  );
};

export default MenuList;
