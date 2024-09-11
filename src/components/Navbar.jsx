import { Menu } from "lucide-react";
import React from "react";
import { Button } from 'primereact/button';
import Image from "next/image";


const Navbar = () => {
  return (
    <div className="h-14 w-full bg-[#5ec8e6] flex items-center justify-between py-2 px-3">
      <Menu />
      <Image src={"/images/logo1.png"} alt="Los inmaduros roller Madrid" width={130} height={50} className="rounded"/>
      <Button label="login" severity="info" rounded className="px-3 py-1"/>
    </div>
  );
};

export default Navbar;


