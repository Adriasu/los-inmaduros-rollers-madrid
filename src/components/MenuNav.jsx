"use client";
import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "lucide-react";

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
      >
        <h3>Menú</h3>
        <ul>
          <li>Inicio</li>
          <li>Rutas</li>
          <li>Nosotros</li>
          <li>Contacto</li>
        </ul>
      </Sidebar>
    </div>
  );
};

export default MenuNav;
