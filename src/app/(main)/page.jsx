import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
     
        <h1 className="text-3xl">Title</h1>
        <Message
          severity="error"
          text="Invalid credentials"
          pt={{ root: { className: "p-1" } }}
        />
        <InputText
          id="username"
          placeholder="User"
          className="p-inputtext-sm"
        />
        <InputText
          id="password"
          type="password"
          placeholder="Password"
          className="p-inputtext-sm"
        />
        <Button type="submit" className="w-48 self-center justify-center">
          Login
        </Button>
     
    </div>
  );
};

export default page;
