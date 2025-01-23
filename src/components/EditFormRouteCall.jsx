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
import { getDocument, updateDocument } from "../../lib/fireBase.mjs";
import { useRouter } from "next/navigation";
import PaceDialogInfo from "./PaceDialogInfo";

const optionTemplate = (option) => {
  return (
    <div className="flex items-center">
      <Image src={option.img} alt={option.level} width={30} height={30} />
      <span className="ml-[10px]">{option.level}</span>
    </div>
  );
};

const EditFormRouteCall = ({ id, toast }) => {
  const [formData, setFormData] = useState(null);
  const [open, setOpen] = useState(false);
  const { dataRoutes } = useContext(RoutesContext);
  const { meetingPoints, paceRoute } = useContext(FormCallRouteContext);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await getDocument("routesCalled", id);
      if (eventData) {
        setFormData(eventData);
      }
    };
    fetchData();
  }, [id, open]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      nameRoute: "",
      newNameRoute: "",
      dateRoute: "",
      paceRoute: "",
      meetingPoint: "",
      meetingPointOther: "",
      timeMeetingPoint: null,
      otherPoint: "",
      meetingOtherPoint: "",
      meetingOtherPointOther: "",
      timeMeetingOtherPoint: null,
      comments: "",
    },
  });

  // Actualizar los valores del formulario cuando `formData` esté disponible
  useEffect(() => {
    if (open && formData) {
      const convertTimestampToDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return null;
        return new Date(
          timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
        );
      };
      reset({
        id: formData.id,
        nameRoute: formData.nameRoute,
        newNameRoute: formData.newNameRoute ?? "",
        dateRoute: convertTimestampToDate(formData.dateRoute),
        paceRoute: formData.paceRoute,
        meetingPoint: formData.meetingPoint,
        meetingPointOther: formData.meetingPointOther ?? "",
        timeMeetingPoint: convertTimestampToDate(formData.timeMeetingPoint),
        otherPoint: formData.otherPoint,
        meetingOtherPoint: formData.meetingOtherPoint ?? "",
        meetingOtherPointOther: formData.meetingOtherPointOther ?? "",
        timeMeetingOtherPoint: convertTimestampToDate(
          formData.timeMeetingOtherPoint
        ),
        comments: formData.comments,
      });
    }
  }, [formData, reset, open]);

  const watchShowWriteNewRoute = watch("nameRoute");
  const watchShowMeetingPoint = watch("meetingPoint");
  const watchShowMeetingOtherPoint = watch("meetingOtherPoint");
  const watchShowOtherPoint = watch("otherPoint");

  const onSubmit = async (data) => {
    try {
      await updateDocument("routesCalled", data, data.id);

      toast.current.show({
        severity: "success",
        summary: "Ruta editada",
        detail: `La ruta ha sido editada correctamente.`,
        life: 3000,
      });

      reset();
      setOpen(false);
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!formData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="hidden sm:flex">
      <button
        disabled={!formData}
        onClick={() => {
          setOpen(true);
        }}
      >
        <i className="pi pi-pencil bg-blue-700 text-white p-2 rounded-full cursor-pointer custom-target-icon"></i>
      </button>
      <Dialog
        header="Editar ruta"
        visible={open}
        style={{ width: "85%", maxWidth: "750px" }}
        onHide={() => {
          if (!open) return;
          setOpen(false);
        }}
      >
        <div className="bg-white flex justify-center p-3 sm:p-7">
          <div className="w-full lg:w-[60vw] xl:w-[40vw] border border-black p-5 rounded-2xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
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
                          options={[
                            { name: "Nueva", image: "" },
                            ...dataRoutes,
                          ]}
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
              <Button type="submit" label="Editar" />
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditFormRouteCall;
