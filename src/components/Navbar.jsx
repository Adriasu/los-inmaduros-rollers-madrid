import { Menu } from "lucide-react";
import React from "react";
import { Button } from 'primereact/button';


const Navbar = () => {
  return (
    <div className="h-14 w-full bg-slate-600 flex items-center justify-between py-2 px-3">
      <Menu />
      <h2>LOGO</h2>
      <Button label="login" severity="info" rounded className="px-3 py-1"/>
    </div>
  );
};

export default Navbar;


