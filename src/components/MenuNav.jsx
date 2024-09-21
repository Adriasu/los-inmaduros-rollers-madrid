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
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const MenuNav = () => {
  const [visible, setVisible] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const styleMenu =
    "flex gap-2 hover:text-black hover:underline cursor-pointer";

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
              src={"/images/Logo4.png"}
              alt="Los inmaduros roller Madrid"
              width={200}
              height={50}
            />
          </div>
        )}
      >
        {!isLoaded || !isSignedIn ? (
          <div className="w-full flex justify-center items-center p-3">
            <SignInButton>
              <Button
                label="login"
                className="px-8 py-2"
                onClick={() => setVisible(false)}
              />
            </SignInButton>
          </div>
        ) : (
          <div className="flex items-center gap-5 rounded-2xl border-[1px] border-[#58cbe8] p-3">
            <div>
              <Image
                src={user.imageUrl}
                alt={user.lastName}
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="font-bold">Hola,</h1>
              <h1>{user.fullName}</h1>
            </div>
          </div>
        )}

        <ul className="mt-10 flex flex-col gap-5 rounded-2xl border-[1px] border-[#58cbe8] p-3">
          <Link href={"/"} onClick={() => setVisible(false)}>
            <li className={`${styleMenu}`}>
              <House />
              Inicio
            </li>
          </Link>
          <Link href={"/routesRoller"} onClick={() => setVisible(false)}>
            <li className={`${styleMenu}`}>
              <Route />
              Rutas
            </li>
          </Link>
          <Link href={"/favoriteRoutes"} onClick={() => setVisible(false)}>
            <li className={`${styleMenu}`}>
              <FolderHeart />
              Tus favoritos
            </li>
          </Link>
          <li className={`${styleMenu}`}>
            <SquarePen /> Convocar ruta
          </li>
          <li className={`${styleMenu}`}>
            <HeartHandshake />
            Propón tu ruta
          </li>
        </ul>

        <div className="mt-[180px] w-full flex items-center justify-end gap-2">
          <SignOutButton>
            <Button
              label="Cerrar sesión"
              icon="pi pi-sign-out"
              iconPos="right"
              className="px-3 py-2"
            />
          </SignOutButton>
        </div>
      </Sidebar>
    </div>
  );
};

export default MenuNav;
