"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import {
  FolderHeart,
  HeartHandshake,
  House,
  Menu,
  Route,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MenuNav = () => {
  const [visible, setVisible] = useState(false);

  const styleMenu = "flex gap-2 hover:text-black hover:underline cursor-pointer"

  return (
    <div>
      <Menu
        onClick={() => setVisible(true)}
        className="p-button-rounded p-button-text text-[#58cbe8] hover:bg-[#464954] size-8 flex justify-center items-center rounded-sm cursor-pointer hover:scale-[1.15]"
      />

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="left"
        className="bg-gradient-to-t from-slate-300 to-slate-500 custom-sidebar"
        header={() => (
          <div>
            <Image
              src={"/images/logo4.png"}
              alt="Los inmaduros roller Madrid"
              height={60}
              width={200}
            />
          </div>
        )}
      >
        <div className="flex items-center gap-5">
          <div className="bg-slate-600 size-20 rounded-full"></div>
          <div>
            <h1 className="font-bold">Hola,</h1>
            <h1>Adriana Suárez</h1>
          </div>
        </div>
        {/* <div className="w-full flex justify-center items-center">
        <Button label="login" className="px-8 py-2" />
        </div> */}

        <ul className="mt-10 flex flex-col gap-5">
          <Link href={"/"}>
            <li className={`${styleMenu}`}>
              <House/>
              Inicio
            </li>
          </Link>
          <Link href={"/routesRoller"}>
            <li className={`${styleMenu}`}>
              <Route />
              Rutas
            </li>
          </Link>
          <li className={`${styleMenu}`}>
            <FolderHeart />
            Tus favoritos
          </li>
          <li className={`${styleMenu}`}>
            <SquarePen /> Convocar ruta
          </li>
          <li className={`${styleMenu}`}>
            <HeartHandshake />
            Propón tu ruta
          </li>
        </ul>

        <div className="mt-[200px] w-full flex items-center justify-end gap-2">
          <Button
            label="Cerrar sesión"
            icon="pi pi-sign-out"
            iconPos="right"
            className="px-3 py-2"
          />
        </div>
      </Sidebar>
    </div>
  );
};

export default MenuNav;

