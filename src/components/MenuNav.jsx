"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "lucide-react";
import Image from "next/image";

const MenuNav = () => {
  const [visible, setVisible] = useState(false);

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
            <h1>Hola,</h1>
            <h1>Adriana Suárez</h1>
          </div>
        </div>

        <ul>
          <li>Rutas</li>
          <li></li>
          <li>Contacto</li>
        </ul>
      </Sidebar>
    </div>
  );
};

export default MenuNav;
