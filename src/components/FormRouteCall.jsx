"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
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
import { useUser } from "@clerk/nextjs";
import { setDocument } from "../../lib/fireBase.mjs";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import PaceDialogInfo from "./PaceDialogInfo";

const FormRouteCall = ({ location, closeMenuBar }) => {
  const [open, setOpen] = useState(false);
  const { dataRoutes } = useContext(RoutesContext);
  const { meetingPoints, paceRoute } = useContext(FormCallRouteContext);
  const { isSignedIn, user, isLoaded } = useUser();
  const [userData, setUserData] = useState(null);
  const toast = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const data = {
        id: user.id,
        firstName: user.firstName,
        email: user.primaryEmailAddress?.emailAddress || "Sin correo",
        imageUser: user.imageUrl,
      };
      setUserData(data);
    }
  }, [isLoaded, isSignedIn, user]);

  const handleOpenModal = () => {
    if (isSignedIn) {
      setOpen(true);
    } else {
      router.push(`/sign-in`);
    }
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nameRoute: null,
      newNameRoute: "",
      dateRoute: null,
      paceRoute: [],
      meetingPoint: null,
      meetingPointOther: "",
      timeMeetingPoint: null,
      otherPoint: { name: "No" },
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

  const onSubmit = async (data) => {
    try {
      const postDataEvent = {
        nameRoute: data.nameRoute,
        newNameRoute: data.newNameRoute,
        dateRoute: data.dateRoute,
        paceRoute: data.paceRoute,
        meetingPoint: data.meetingPoint,
        meetingPointOther: data.meetingPointOther,
        timeMeetingPoint: data.timeMeetingPoint,
        otherPoint: data.otherPoint,
        meetingOtherPoint: data.meetingOtherPoint,
        meetingOtherPointOther: data.meetingOtherPointOther,
        timeMeetingOtherPoint: data.timeMeetingOtherPoint,
        comments: data.comments,
        firstName: userData.firstName,
        idUser: userData.id,
        imageUser: userData.imageUser,
        attendees: [
          {
            id: userData.id,
            name: userData.firstName,
            email: userData.email,
            photoUrl: userData.imageUser,
          },
        ],
      };

      const postId = Date.now().toString();

      await setDocument("routesCalled", postDataEvent, postId);

      toast.current.show({
        severity: "success",
        summary: "Ruta creada",
        detail: `La ruta ha sido creada correctamente.`,
        life: 3000,
      });

      reset();
      setOpen(false);
      location === "menuBar" ? closeMenuBar(false) : "";
      router.push(`/`);

      console.log("Evento creado con ID:", postId);
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  const optionTemplate = (option) => {
    return (
      <div className="flex items-center">
        <Image src={option.img} alt={option.level} width={30} height={30} />
        <span className="ml-[10px]">{option.level}</span>
      </div>
    );
  };

  return (
    <div className="hidden md:flex card justify-content-center">
      <Toast ref={toast} />
      {location === "home" ? (
        <Button
          label="Convoca tu ruta"
          icon="pi pi-external-link"
          onClick={handleOpenModal}
        />
      ) : (
        <div onClick={handleOpenModal}>Convocar ruta</div>
      )}

      <Dialog
        header="Convocar ruta"
        visible={open}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!open) return;
          setOpen(false);
        }}
      >
        <div className="bg-white flex justify-center p-3 sm:p-10">
          <div className="w-full lg:w-[60vw] xl:w-[40vw] border border-black p-5 rounded-2xl">
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nameRoute">Ruta</label>
                  <Controller
                    name="nameRoute"
                    control={control}
                    rules={{ required: "Selecciona una ruta" }}
                    render={({ field, fieldState }) => (
                      <>
                        <Dropdown
                          {...field}
                          options={[{ name: "Nueva" }, ...dataRoutes]}
                          optionLabel="name"
                          placeholder="Selecciona ruta"
                          className={`w-full md:w-14rem ${
                            fieldState.error ? "p-invalid" : ""
                          }`}
                        />
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                  {watchShowWriteNewRoute &&
                    watchShowWriteNewRoute.name === "Nueva" && (
                      <Controller
                        name="newNameRoute"
                        rules={{
                          required: "El nombre de la ruta es obligatorio",
                          minLength: {
                            value: 3,
                            message: "Debe tener al menos 3 caracteres",
                          },
                        }}
                        control={control}
                        render={({ field, fieldState }) => (
                          <>
                            <InputText
                              {...field}
                              placeholder="Nombre de ruta"
                              className={fieldState.error ? "p-invalid" : ""}
                            />
                            {fieldState.error && (
                              <small className="p-error">
                                {fieldState.error.message}
                              </small>
                            )}
                          </>
                        )}
                      />
                    )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="dateRoute">Fecha y hora de inicio</label>
                  <Controller
                    name="dateRoute"
                    control={control}
                    rules={{
                      required: "La fecha es obligatoria",
                      validate: (value) =>
                        value >= new Date() ||
                        "No puedes seleccionar una fecha pasada",
                    }}
                    render={({ field, fieldState }) => (
                      <>
                        <Calendar
                          {...field}
                          dateFormat="dd/mm/yy"
                          showTime
                          hourFormat="24"
                          className={fieldState.error ? "p-invalid" : ""}
                          minDate={new Date()} // Evita seleccionar fechas pasadas
                        />
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:items-center gap-2 sm:flex-row">
                <div className="flex items-center gap-2">
                  <label htmlFor="pace">Ritmo</label>
                  <PaceDialogInfo />
                </div>

                <Controller
                  name="paceRoute"
                  control={control}
                  rules={{
                    validate: (value) => {
                      if (value.length < 1) {
                        return "Debes seleccionar al menos 1 ritmo";
                      }
                      if (value.length > 3) {
                        return "Solo puedes seleccionar hasta 3 ritmos";
                      }
                      return true;
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col">
                      <MultiSelect
                        {...field}
                        options={paceRoute}
                        optionLabel="level"
                        itemTemplate={optionTemplate}
                        placeholder="Selecciona el ritmo (Max 3)"
                        display="chip"
                        className={`w-full md:w-14rem ${
                          fieldState.error ? "p-invalid" : ""
                        }`}
                        onChange={(e) => {
                          if (e.value.length <= 3) {
                            field.onChange(e.value);
                          }
                        }}
                      />
                      {fieldState.error && (
                        <small className="p-error">
                          {fieldState.error.message}
                        </small> // Mostrar error
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5 w-full">
                <div>
                  <label htmlFor="meetingPoint">Punto de encuentro</label>
                  <Controller
                    name="meetingPoint"
                    control={control}
                    rules={{ required: "Selecciona una punto de encuentro" }}
                    render={({ field, fieldState }) => (
                      <>
                        <Dropdown
                          {...field}
                          options={[...meetingPoints, { name: "Otro" }]}
                          optionLabel="name"
                          placeholder="Selecciona punto"
                          className={`w-full md:w-14rem ${
                            fieldState.error ? "p-invalid" : ""
                          }`}
                        />
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small> // Mostrar error
                        )}
                      </>
                    )}
                  />
                </div>
                {watchShowMeetingPoint &&
                  watchShowMeetingPoint.name === "Otro" && (
                    <div>
                      <label htmlFor="">Nuevo punto</label>
                      <Controller
                        name="meetingPointOther"
                        control={control}
                        rules={{
                          required:
                            "El nuevo punto de encuentro es obligatorio",
                          minLength: {
                            value: 3,
                            message: "Debe tener al menos 3 caracteres",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <>
                            <InputText
                              {...field}
                              placeholder="Inicio de ruta"
                              className={`w-full ${
                                fieldState.error ? "p-invalid" : ""
                              }`}
                            />
                            {fieldState.error && (
                              <small className="p-error">
                                {fieldState.error.message}
                              </small>
                            )}
                          </>
                        )}
                      />
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="otherPoint">
                  ¿Existe punto de encuentro secundario?
                </label>
                <Controller
                  name="otherPoint"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      {...field}
                      options={[{ name: "Si" }, { name: "No" }]}
                      optionLabel="name"
                      className="md:w-14rem"
                    />
                  )}
                />
              </div>

              {watchShowOtherPoint && watchShowOtherPoint.name === "Si" && (
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="meetingOtherPoint">
                      Punto de encuentro
                    </label>
                    <Controller
                      name="meetingOtherPoint"
                      control={control}
                      rules={{
                        required: "Selecciona una punto de encuentro",
                      }}
                      render={({ field, fieldState }) => (
                        <>
                          <Dropdown
                            {...field}
                            options={[...meetingPoints, { name: "Otro" }]}
                            optionLabel="name"
                            placeholder="Selecciona punto"
                            className={`w-full md:w-14rem ${
                              fieldState.error ? "p-invalid" : ""
                            }`}
                          />
                          {fieldState.error && (
                            <small className="p-error">
                              {fieldState.error.message}
                            </small>
                          )}
                        </>
                      )}
                    />
                    {watchShowMeetingOtherPoint &&
                      watchShowMeetingOtherPoint.name === "Otro" && (
                        <Controller
                          name="meetingOtherPointOther"
                          control={control}
                          rules={{
                            required:
                              "El nuevo punto de encuentro es obligatorio",
                            minLength: {
                              value: 3,
                              message: "Debe tener al menos 3 caracteres",
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <>
                              <InputText
                                {...field}
                                placeholder="Inicio de ruta"
                                className={`w-full md:w-14rem ${
                                  fieldState.error ? "p-invalid" : ""
                                }`}
                              />
                              {fieldState.error && (
                                <small className="p-error">
                                  {fieldState.error.message}
                                </small>
                              )}
                            </>
                          )}
                        />
                      )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="timeMeetingOtherPoint">Hora</label>
                    <Controller
                      name="timeMeetingOtherPoint"
                      control={control}
                      rules={{
                        required: "La hora es obligatoria",
                        validate: (value) => {
                          const startTime = watch("dateRoute"); // Obtén la hora de inicio del evento
                          if (!startTime) {
                            return "Primero selecciona la hora de inicio";
                          }

                          // Extraer solo la hora de la fecha completa (tanto para la hora inicial como para el segundo punto)
                          const startHours = new Date(startTime).getHours();
                          const startMinutes = new Date(startTime).getMinutes();
                          const selectedHours = new Date(value).getHours();
                          const selectedMinutes = new Date(value).getMinutes();

                          // Comparar solo horas y minutos
                          if (
                            selectedHours < startHours ||
                            (selectedHours === startHours &&
                              selectedMinutes <= startMinutes)
                          ) {
                            return "La hora debe ser posterior a la hora de inicio";
                          }

                          return true;
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <>
                          <Calendar
                            {...field}
                            timeOnly
                            onChange={(e) => field.onChange(e.value)}
                            value={field.value}
                          />
                          {fieldState.error && (
                            <small className="p-error">
                              {fieldState.error.message}
                            </small>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="comments">Comentarios / Descripción</label>
                <Controller
                  name="comments"
                  control={control}
                  rules={{
                    required:
                      "Los comentarios y especificaciones de la ruta son obligatorios",
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputTextarea
                        {...field}
                        rows={5}
                        cols={30}
                        placeholder="Deja tu comentario o especificaciones de la ruta."
                      />
                      {fieldState.error && (
                        <small className="p-error">
                          {fieldState.error.message}
                        </small>
                      )}
                    </>
                  )}
                />
              </div>

              <Button type="submit" label="Convocar" />
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default FormRouteCall;
