"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RoutesContext } from "@/context/RoutesContext";
import { FormCallRouteContext } from "@/context/FormCallRouteContext";
import Image from "next/image";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";

const FormCallRoute = () => {
  const { dataRoutes } = useContext(RoutesContext);
  const { meetingPoints, paceRoute } = useContext(FormCallRouteContext);
  const [selectedPace, setSelectedPace] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedMeetingPoint, setSelectedMeetingPoint] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedOtherRoute, setSelectedOtherRoute] = useState(null);

  const optionTemplate = (option) => {
    return (
      <div className="flex items-center">
        <Image src={option.img} alt={option.level} width={30} height={30} />
        <span className="ml-[10px]">{option.level}</span>
      </div>
    );
  };

  const { register, handleSubmit, watch } = useForm();
  const watchShowWriteNewRoute = watch("nameRoute");
  const watchShowMeetingPoint = watch("meetingPoint");
  const watchShowMeetingOtherPoint = watch("meetingOtherPoint");
  const watchShowOtherPoint = watch("otherPoint");

  return (
    <div className="bg-white flex justify-center p-10">
      <div>
        <form className="flex flex-col gap-5">
          <div>
            <label htmlFor="nameRoute">Ruta</label>
            <div className="card flex justify-content-center">
              <Dropdown
                {...register("nameRoute")}
                options={[{ name: "Nueva" }, ...dataRoutes]}
                optionLabel="name"
                placeholder="Selecciona ruta"
                className="w-full md:w-14rem"
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.value)}
              />
            </div>

            {watchShowWriteNewRoute === "Nueva" && (
              <InputText placeholder="Nombre de ruta" />
            )}
          </div>

          <div className="card flex justify-content-center">
            <label htmlFor="dateRoute">Fecha</label>
            <Calendar dateFormat="dd/mm/yy" />
          </div>

          <div>
            <label htmlFor="meetingPoint">Punto de encuentro</label>

            <Dropdown
              {...register("meetingPoint")}
              options={[...meetingPoints, { name: "Otro" }]}
              optionLabel="name"
              placeholder="Selecciona punto"
              className="w-full md:w-14rem"
              value={selectedMeetingPoint}
              onChange={(e) => setSelectedMeetingPoint(e.value)}
            />
            {watchShowMeetingPoint === "Otro" && (
              <InputText placeholder="Inicio de ruta" />
            )}
          </div>

          <div>
            <label htmlFor="startTime">Hora</label>
            <Calendar
              value={time}
              onChange={(e) => setTime(e.value)}
              timeOnly
            />
          </div>

          <div>
            <label htmlFor="anotherMeetingPoint">
              ¿Existe punto de encuentro secundario?
            </label>
            <Dropdown
            {...register("otherPoint")}
            options={[{name: "Si"}, {name: "No"}]}
            optionLabel="name"
            className="w-full md:w-14rem"
            value={selectedOtherRoute}
            onChange={(e) => setSelectedOtherRoute(e.value)}
            />
          </div>

          {watchShowOtherPoint === "Si" && (
            <div>
              <div>
                <label htmlFor="meetingOtherPoint">Punto de encuentro</label>
                <select
                  {...register("meetingOtherPoint")}
                  id="meetingOtherPoint"
                >
                  {meetingPoints.map((point, index) => {
                    return (
                      <option key={index} value={point.name}>
                        {" "}
                        {point.name}
                      </option>
                    );
                  })}
                  <option value="otro">Otro</option>
                </select>
                {watchShowMeetingOtherPoint === "otro" && (
                  <input type="text" placeholder="Lugar" />
                )}
              </div>

              <div>
                <label htmlFor="startTime">Hora</label>
                <input type="time" />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="pace">Ritmo</label>
            <MultiSelect
              {...register("paceRoute")}
              value={selectedPace}
              options={paceRoute}
              onChange={(e) => setSelectedPace(e.value)}
              optionLabel="level"
              itemTemplate={optionTemplate}
              placeholder="Selecciona el ritmo"
              display="chip"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCallRoute;
