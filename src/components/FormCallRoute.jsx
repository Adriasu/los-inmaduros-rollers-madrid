"use client";
import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { RoutesContext } from "@/context/RoutesContext";
import { FormCallRouteContext } from "@/context/FormCallRouteContext";
import Image from "next/image";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useAuth } from "@/context/AuthContext";

const FormCallRoute = () => {
  const { dataRoutes, isLoading } = useContext(RoutesContext);
  const { meetingPoints, paceRoute } = useContext(FormCallRouteContext);
  const [visible, setVisible] = React.useState(false);
  const { user } = useAuth;
  const [loading, setLoading] = useState(false);
  const [nameRoute, setNameRoute] = useState();
  const [newNameRoute, setNewNameRoute] = useState();
  const [dateRoute, setDateRoute] = useState();
  const [chosenRoutePace, setChosenRoutePace] = useState();
  const [meetingPoint, setMeetingPoint] = useState();
  const [meetingPointOther, setMeetingPointOther] = useState();
  const [timeMeetingPoint, setTimeMeetingPoint] = useState();
  const [otherPoint, setOtherPoint] = useState();
  const [meetingOtherPoint, setMeetingOtherPoint] = useState();
  const [meetingOtherPointOther, setMeetingOtherPointOther] = useState();
  const [timeMeetingOtherPoint, setTimeMeetingOtherPoint] = useState();
  const [comments, setComments] = useState();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      nameRoute: null,
      newNameRoute: "",
      dateRoute: null,
      paceRoute: [],
      meetingPoint: null,
      meetingPointOther: "",
      timeMeetingPoint: null,
      otherPoint: null,
      meetingOtherPoint: null,
      meetingOtherPointOther: "",
      timeMeetingOtherPoint: null,
      comments: "",
    },
  });
  const watchShowWriteNewRoute = watch("nameRoute");
  const watchShowMeetingPoint = watch("meetingPoint");
  const watchShowMeetingOtherPoint = watch("meetingOtherPoint");
  const watchShowOtherPoint = watch("otherPoint");

  const onSubmit = (data) => {
    console.log(data);
  };

  const optionTemplate = (option) => {
    return (
      <div className="flex items-center">
        <Image src={option.img} alt={option.level} width={30} height={30} />
        <span className="ml-[10px]">{option.level}</span>
      </div>
    );
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="bg-white flex justify-center p-3 sm:p-10">
      <div className="w-full lg:w-[60vw] xl:w-[40vw] border border-black p-5 rounded-2xl">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-bold text-lg">Convocar ruta</h1>

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="nameRoute">Ruta</label>
              <Dropdown
                {...register("nameRoute")}
                options={[{ name: "Nueva" }, ...dataRoutes]}
                optionLabel="name"
                placeholder="Selecciona ruta"
                className="w-full md:w-14rem"
                value={nameRoute}
                onChange={(e) => setNameRoute(e.value)}
              />
              {watchShowWriteNewRoute === "Nueva" && (
                <InputText
                  value={newNameRoute}
                  onChange={(e) => setNewNameRoute(e.value)}
                  placeholder="Nombre de ruta"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="dateRoute">Fecha</label>
              <Calendar
                value={dateRoute}
                onChange={(e) => setDateRoute(e.value)}
                dateFormat="dd/mm/yy"
              />
            </div>
          </div>

          <div className="flex flex-col sm:items-center gap-2 sm:flex-row">
            <div className="flex items-center gap-2">
              <label htmlFor="pace">Ritmo</label>
              <i
                className="pi pi-question-circle cursor-pointer"
                onClick={() => setVisible(true)}
              ></i>
            </div>
            <Dialog
              header="Ritmo de las rutas."
              visible={visible}
              className="w-full md:w-[60vw]"
              onHide={() => setVisible(false)}
            >
              <p className="m-0">
                🪨<span className="font-bold">Nivel Roca.</span> Aún no te ves
                seguro sobre los patines y evitas las cuestas a toda costa. No
                sabes frenar. <br />
                🐌 <span className="font-bold">Nivel Caracol.</span> Eres
                autónomo en rectas y cuesta arriba, pero necesitas ayuda todavía
                para frenar, aunque lo intentes solo. <br />
                🐛 <span className="font-bold">Nivel Gusano.</span> Eres
                autónomo 100% y te gusta ir a las caracoleras, pero te gusta
                salir por la calle, ritmo disfrutón. <br />
                🦋{" "}
                <span className="font-bold">
                  Nivel Mariposa (Avanzado o Pro).
                </span>{" "}
                Te gusta la calle, bajar cuestas infinitas sin frenar, pasar por
                túneles, ritmo avanzado. <br />
                🚀 <span className="font-bold">Nivel Experimentado. </span>{" "}
                rutas X, Galáctica, 7 picos... <br />
                ☠️ <span className="font-bold">Nivel Locura total.</span> Te
                pasas los semáforos, esquivas coches, descensos a toda hostia y
                alcohol en las venas. <br />
                🐈 🦄 <span className="font-bold">Nivel Miaucornia.</span>{" "}
                Siempre cerveza en mano, nadie te gana a patinar pedo. Coges la
                ruta a mitad de camino para evitar las cuestas. Llegas tarde y
                persigues la ruta. Te quejas del cansancio y pides un descanso
                para ir al chino. Bomba de humo. <br /> <br />
                Para pasar de uno a otro hay que ir probando poco a poco. <br />
                🪨🔜🐌🔜🐛🔜🦋🔜🚀🔜☠️🔜🐈🦄
              </p>
            </Dialog>

            <MultiSelect
              options={paceRoute}
              optionLabel="level"
              itemTemplate={optionTemplate}
              placeholder="Selecciona el ritmo"
              display="chip"
              className="w-full md:w-14rem"
              value={chosenRoutePace}
              onChange={(e) => setChosenRoutePace(e.value)}
            />
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="meetingPoint">Punto de encuentro</label>

              <Dropdown
                {...register("meetingPoint")}
                options={[...meetingPoints, { name: "Otro" }]}
                optionLabel="name"
                placeholder="Selecciona punto"
                className="w-full md:w-14rem"
                value={meetingPoint}
                onChange={(e) => setMeetingPoint(e.value)}
              />

              {watchShowMeetingPoint === "Otro" && (
                <InputText value={meetingPointOther} onChange={(e) => setMeetingPointOther(e.value)} placeholder="Inicio de ruta" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="timeMeetingPoint">Hora</label>

              <Calendar timeOnly onChange={(e) => field.onChange(e.value)} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="otherPoint">
              ¿Existe punto de encuentro secundario?
            </label>

            <Dropdown
              options={[{ name: "Si" }, { name: "No" }]}
              optionLabel="name"
              className="md:w-14rem"
            />
          </div>

          {watchShowOtherPoint && watchShowOtherPoint.name === "Si" && (
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="meetingOtherPoint">Punto de encuentro</label>

                <Dropdown
                  options={[...meetingPoints, { name: "Otro" }]}
                  optionLabel="name"
                  placeholder="Selecciona punto"
                  className="w-full md:w-14rem"
                />

                {watchShowMeetingOtherPoint &&
                  watchShowMeetingOtherPoint.name === "Otro" && (
                    <InputText placeholder="Inicio de ruta" />
                  )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="timeMeetingOtherPoint">Hora</label>

                <Calendar timeOnly onChange={(e) => field.onChange(e.value)} />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="comments">Comentarios / Descripción</label>

            <InputTextarea
              rows={5}
              cols={30}
              placeholder="Deja tu comentario o especificaciones de la ruta."
            />
          </div>

          <Button type="submit" label="Convocar" />
        </form>
      </div>
    </div>
  );
};

export default FormCallRoute;
