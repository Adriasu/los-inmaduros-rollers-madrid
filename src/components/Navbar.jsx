"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import Image from "next/image";
import MenuNav from "./MenuNav";
import { useRouter } from "next/navigation";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import MenuList from "./MenuList";

const Navbar = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const showHideListTech = () => {
    isOpen === false ? setIsOpen(true) : setIsOpen(false);
  };

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

        <MenuList location={"navbar"} />

        <div className="flex gap-2 items-center">
          {!isLoaded || !isSignedIn ? (
            <div></div>
          ) : (
            <div className="hidden md:flex gap-2 text-white ">
              <h1 className="font-bold">Hola,</h1>
              <h1 className="font-semibold">{user.firstName}</h1>
            </div>
          )}
          <div className="flex items-center">
            <SignedOut>
              <SignInButton>
                <Button label="login" className="px-3 py-1" />
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "48px",
                      height: "48px",
                    },
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
