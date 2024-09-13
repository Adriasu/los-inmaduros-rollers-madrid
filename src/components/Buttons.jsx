import React from "react";

const Buttons = ({level, text}) => {
  const buttonStyle = () => {
    switch (level) {
      case "Básico":
        return "px-1 py-1 bg-[#58cbe8] rounded-md text-[#232330]";
      case "Medio":
        return "px-1 py-1 bg-[#1983bd] rounded-md text-white";
      case "Avanzado":
        return "px-1 py-1 bg-[#232330] rounded-md text-white";
      default:
        return "";
    }
  };

  return <button className={`${buttonStyle()} cursor-auto`}>{text}</button>;
};

export default Buttons;
