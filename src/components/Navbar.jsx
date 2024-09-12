import { Menu } from "lucide-react";
import React from "react";
import { Button } from "primereact/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full flex justify-center sticky top-0 z-50 px-5">
      <div className="my-3 h-14 w-[1200px] flex items-center justify-between py-2 px-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[4.2px] border rounded-2xl border-solid border-[rgba(71,85,105,0.19)] bg-[#475569e3]">
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


