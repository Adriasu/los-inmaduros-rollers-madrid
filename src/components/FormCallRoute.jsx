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
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";

const FormCallRoute = () => {
  const { dataRoutes } = useContext(RoutesContext);
  const { meetingPoints, paceRoute } = useContext(FormCallRouteContext);
  const [selectedPace, setSelectedPace] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedMeetingPoint, setSelectedMeetingPoint] = useState(null);
  const [time, setTime] = useState(null);
  const [timeOther, setTimeOther] = useState(null);
  const [selectedOtherRoute, setSelectedOtherRoute] = useState(null);
  const [selectedMeetingOtherPoint, setSelectedMeetingOtherPoint] =
    useState(null);
  const [comments, setComments] = useState("");
  const [visible, setVisible] = useState(false);

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
            <Dropdown
              {...register("nameRoute")}
              options={[{ name: "Nueva" }, ...dataRoutes]}
              optionLabel="name"
              placeholder="Selecciona ruta"
              className="w-full md:w-14rem"
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.value)}
            />
            {watchShowWriteNewRoute === "Nueva" && (
              <InputText
                {...register("newNameRoute")}
                placeholder="Nombre de ruta"
              />
            )}
          </div>

          <div className="card flex justify-content-center">
            <label htmlFor="dateRoute">Fecha</label>
            <Calendar {...register("dateRoute")} dateFormat="dd/mm/yy" />
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
              <InputText
                {...register("meetingPointOther")}
                placeholder="Inicio de ruta"
              />
            )}
            <div>
              <label htmlFor="startTime">Hora</label>
              <Calendar
                {...register("timeMeetingPoint")}
                value={time}
                onChange={(e) => setTime(e.value)}
                timeOnly
              />
            </div>
          </div>

          <div>
            <label htmlFor="anotherMeetingPoint">
              ¿Existe punto de encuentro secundario?
            </label>
            <Dropdown
              {...register("otherPoint")}
              options={[{ name: "Si" }, { name: "No" }]}
              optionLabel="name"
              className="w-full md:w-14rem"
              value={selectedOtherRoute}
              onChange={(e) => setSelectedOtherRoute(e.value)}
            />
            {watchShowOtherPoint === "Si" && (
              <div>
                <div>
                  <label htmlFor="meetingOtherPoint">Punto de encuentro</label>
                  <Dropdown
                    {...register("meetingOtherPoint")}
                    options={[...meetingPoints, { name: "Otro" }]}
                    optionLabel="name"
                    placeholder="Selecciona punto"
                    className="w-full md:w-14rem"
                    value={selectedMeetingOtherPoint}
                    onChange={(e) => setSelectedMeetingOtherPoint(e.value)}
                  />
                  {watchShowMeetingOtherPoint === "Otro" && (
                    <InputText
                      {...register("meetingOtherPointOther")}
                      placeholder="Inicio de ruta"
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="startTime">Hora</label>
                  <Calendar
                    value={timeOther}
                    onChange={(e) => setTimeOther(e.value)}
                    timeOnly
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="pace">Ritmo</label>
            <i
              className="pi pi-question-circle cursor-pointer"
              onClick={() => setVisible(true)}
            ></i>
            <Dialog
              header="🛑 UN SANO CONSEJO: LEER BIEN EL NIVEL ANTES DE PRESENTARSE A LA RUTA"
              visible={visible}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visible) return;
                setVisible(false);
              }}
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
                Para pasar de uno a otro hay que ir probando poco a poco <br />
                🪨🔜🐌🔜🐛🔜🦋🔜🚀🔜☠️🔜🐈🦄
              </p>
            </Dialog>
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

          <div>
            <label htmlFor="comments">Comentarios / Descripción</label>
            <InputTextarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={5}
              cols={30}
              placeholder="Deja tu comentario de la ruta o especificaciones"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCallRoute;

//pi-question-circle
