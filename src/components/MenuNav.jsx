"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import { SignOutButton, useUser } from "@clerk/nextjs";
import MenuList from "./MenuList";

const MenuNav = () => {
  const [visible, setVisible] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="flex, flex-col sm:hidden">
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
          <div></div>
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
              <h1>{user.firstName}</h1>
            </div>
          </div>
        )}

        <MenuList setVisible={setVisible} />

        {isSignedIn && (
          <div className="mt-[100px] w-full flex items-center justify-end gap-2">
            <SignOutButton>
              <Button
                label="Cerrar sesión"
                icon="pi pi-sign-out"
                iconPos="right"
                className="px-3 py-2"
              />
            </SignOutButton>
          </div>
        )}
      </Sidebar>
    </div>
  );
};

export default MenuNav;
