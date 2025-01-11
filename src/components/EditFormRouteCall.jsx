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
import { getDocument, setDocument } from "../../lib/fireBase.mjs";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import PaceDialogInfo from "./PaceDialogInfo";

const EditFormRouteCall = ({ id }) => {
  const [formData, setFormData] = useState(null);
  const toast = useRef(null);
  const [open, setOpen] = useState(false);
  const { dataRoutes } = useContext(RoutesContext);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await getDocument("routesCalled", id);
      if (eventData) {
        setFormData(eventData);
      }
    };
    fetchData();
  }, [id]);

  //console.log("formData", formData);

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
      reset({
        id: formData.id,
        nameRoute: formData.nameRoute.name,
        newNameRoute: formData.newNameRoute ?? "",
        dateRoute: formData.dateRoute,
        paceRoute: formData.paceRoute,
        meetingPoint: formData.meetingPoint.name,
        meetingPointOther: formData.meetingPointOther ?? "",
        timeMeetingPoint: formData.timeMeetingPoint,
        otherPoint: formData.otherPoint.name,
        meetingOtherPoint: formData.meetingOtherPoint.name ?? "",
        meetingOtherPointOther: formData.meetingOtherPointOther ?? "",
        timeMeetingOtherPoint: formData.timeMeetingOtherPoint,
        comments: formData.comments,
      });
    }
  }, [formData, reset, open]);

  const watchShowWriteNewRoute = watch("nameRoute");
  const watchShowMeetingPoint = watch("meetingPoint");
  const watchShowMeetingOtherPoint = watch("meetingOtherPoint");
  const watchShowOtherPoint = watch("otherPoint");

  const onSubmit = async (data) => {
    console.log("data", data);

    try {
      //   await updateDocument(...data, data.id);

      toast.current.show({
        severity: "success",
        summary: "Ruta creada",
        detail: `La ruta ha sido editada correctamente.`,
        life: 3000,
      });

      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!formData) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga hasta que los datos estén disponibles
  }

  return (
    <div className="absolute bottom-2 right-2 flex gap-2">
      <Toast ref={toast} />
      <button
        disabled={!formData}
        onClick={() => {
          setOpen(true);
        }}
      >
        <i className="pi pi-pencil bg-blue-700 text-white p-2 rounded-full cursor-pointer custom-target-icon hover:border border-white"></i>
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
                          value={field.value || ""}
                        />
                        {fieldState.error && (
                          <small className="p-error">
                            {fieldState.error.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                  {watchShowWriteNewRoute.name === "Nueva" && (
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
                          //value={field.value}
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
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditFormRouteCall;
