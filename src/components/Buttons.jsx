import { Tag } from "primereact/tag";
import React from "react";

const Buttons = ({level, text}) => {
  const buttonStyle = () => {
    switch (level) {
      case "Básico":
        return "success";
      case "Medio":
        return "warning";
      case "Avanzado":
        return "danger";
      default:
        return "";
    }
  };

  return (
    <Tag severity={buttonStyle()} value={text} rounded></Tag>
  )
};

export default Buttons;
