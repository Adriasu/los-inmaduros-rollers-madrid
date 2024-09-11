import { Menu } from "lucide-react";
import React from "react";
import { Button } from "primereact/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-14 w-full bg-[#050a30] flex items-center justify-between py-2 px-3">
      <Menu className="text-[#58cbe8]" />

      <Image
        src={"/images/logo4.png"}
        alt="Los inmaduros roller Madrid"
        width={200}
        height={50}
      />

      <Button label="login" severity="info" rounded className="px-3 py-1" />
    </div>
  );
};

export default Navbar;
