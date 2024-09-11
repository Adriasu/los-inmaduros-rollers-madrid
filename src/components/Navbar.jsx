import { Menu } from "lucide-react";
import React from "react";
import { Button } from "primereact/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center sticky top-0 z-50">
      <div className=" my-3 h-14 w-[1200px] bg-[#232330] flex items-center justify-between py-2 px-3  opacity-90 rounded-3xl">
        <Menu className="text-[#58cbe8]" />

        <Image
          src={"/images/Logo4.png"}
          alt="Los inmaduros roller Madrid"
          width={200}
          height={50}
        />

        <Button label="login" severity="info" rounded className="px-3 py-1" />
      </div>
    </div>
  );
};

export default Navbar;
