"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RoutesContext } from "@/context/RoutesContext";

const FormCallRoute = () => {
  const { dataRoutes, isLoading } = useContext(RoutesContext);
  const meetingPoints = [
    {
      name: "Explanada",
      location: "https://maps.app.goo.gl/gCJfpLSoy3D454Y19",
    },
    {
      name: "Puerta de Alcalá",
      location: "https://maps.app.goo.gl/3kjrtMz9BtQ39BJYA",
    },
    {
      name: "Plaza de Cibeles",
      location: "https://maps.app.goo.gl/LuE7bF56QJgBtLbRA",
    },
  ];

  const { register, handleSubmit, watch } = useForm();

  const watchShowWriteNewRoute = watch("nameRoute");
  const watchShowMeetingPoint = watch("meetingPoint");
  const watchShowMeetingOtherPoint = watch("meetingOtherPoint");
  const watchShowOtherPoint = watch("otherPoint", true);
  return (
    <div>
      <form>
        <div>
          <label htmlFor="nameRoute">Ruta</label>
          <select {...register("nameRoute")} id="nameRoute">
            <option value="" hidden>
              Selecciona ruta
            </option>
            {dataRoutes.map((route, index) => {
              return (
                <option key={index} value={route.name}>
                  {route.name}
                </option>
              );
            })}
            <option value="nueva">Nueva</option>
          </select>
          {watchShowWriteNewRoute === "nueva" && (
            <input type="text" placeholder="Nombre de ruta" />
          )}
        </div>

        <div>
          <label htmlFor="date">Fecha</label>
          <input type="date" />
        </div>

        <div>
          <label htmlFor="meetingPoint">Punto de encuentro</label>
          <select {...register("meetingPoint")} id="meetingPoint">
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
          {watchShowMeetingPoint === "otro" && (
            <input type="text" placeholder="Lugar" />
          )}
        </div>

        <div>
          <label htmlFor="startTime">Hora</label>
          <input type="time" />
        </div>

        <div>
          <label htmlFor="anotherMeetingPoint">
            ¿Existe punto de encuentro secundario?
          </label>
          <input type="checkbox" {...register("otherPoint")} />
        </div>

        {watchShowOtherPoint && (
          <div>
            <div>
              <label htmlFor="meetingOtherPoint">Punto de encuentro</label>
              <select {...register("meetingOtherPoint")} id="meetingOtherPoint">
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
      </form>
    </div>
  );
};

export default FormCallRoute;
