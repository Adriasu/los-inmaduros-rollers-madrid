"use client";
import React from "react";
import { Button } from "primereact/button";
import Image from "next/image";
import MenuNav from "./MenuNav";
import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="w-full flex justify-center sticky top-0 z-50 px-5">
      <div className="my-3 h-16 w-[1200px] flex items-center justify-between py-2 px-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[4.2px] border rounded-2xl border-solid border-[rgba(71,85,105,0.19)] bg-[#475569e3]">
        <MenuNav />

        <Image
          src={"/images/Logo4.png"}
          alt="Los inmaduros roller Madrid"
          width={200}
          height={40}
          onClick={handleClick}
          className="cursor-pointer"
        />

        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <Button label="login" className="px-3 py-1" />
      </div>
    </div>
  );
};

export default Navbar;
