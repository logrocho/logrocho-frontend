import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import {
  components,
  MultiValueRemoveProps,
  MultiValueGenericProps,
  ContainerProps,
  ControlProps,
  IndicatorsContainerProps,
  GroupBase,
} from "react-select";
import Select from "react-select";
import { useState } from "@hookstate/core";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import React from "react";
import Cookies from "js-cookie";
import { getTokenData } from "../../../lib/auth";
import { API_URL } from "../../../lib/const";
import useSWR from "swr";
import pinchos from "../../../pages/api/pinchos";

export default function BarForm({ Bardata }: any) {
  const adminSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(4, "El nombre tiene que tener mas de 4 letras")
      .max(15, "El nombre no puede tener mas de 15 letras")
      .required("El nombre no puede estar vacio"),

    localizacion: Yup.string()
      .min(10, "La localizacion tiene que tener mas de 10 letras")
      .max(30, "La localizacion no puede tener mas de 30 letras")
      .required("La localizacion no puede estar vacia"),

    informacion: Yup.string()
      .min(20, "La informacion tiene que tener mas de 20 letras")
      .max(200, "La informacion no puede tener mas de 200 letras")
      .required("La informacion no puede estar vacia"),
  });

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    API_URL + "pinchos?limit=9999999&offset=0&key=&order=id&direction=ASC",
    fetcher
  );

  function MultiValueLabel(props: MultiValueGenericProps<any, true>) {
    return (
      <components.MultiValueLabel {...props}>
        <span className="text-green-600 font-roboto">{props.children}</span>
      </components.MultiValueLabel>
    );
  }

  function MultiValueRemove(props: MultiValueRemoveProps<any, true>) {
    return (
      <components.MultiValueRemove {...props}>
        <AiFillCloseCircle className="bg-transparent text-red-600" />
      </components.MultiValueRemove>
    );
  }

  function MultiValueContainer(props: MultiValueGenericProps<any, true>) {
    return <components.MultiValueContainer {...props} />;
  }

  const zonaImagen = useState("subir");

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    multiple: true,
    maxFiles: 7,
    maxSize: 4194304,
  });

  async function uploadImg(id: any) {
    const form = new FormData();

    acceptedFiles.forEach((element, index) => {
      form.append(`file${index}`, element);
    });

    const tokenData = await getTokenData(Cookies.get("user_token") as string);

    if (tokenData?.rol === "admin") {
      const response = await axios.post(
        API_URL + `uploadImagesBar?id=${id}`,
        form
      );

      const data = await response.data;
    }
  }

  async function removeImg(img: any, e: any) {
    e.currentTarget.parentNode.style.display = "none";

    const response = await axios({
      method: "POST",
      url:
        API_URL +
        `removeImagesBar?img_id=${img.id}&bar_id=${Bardata.id}&filename=${img.filename}`,
    });

    const data = await response.data;
  }

  async function insertBar(data: any) {
    const response = await axios({
      method: "POST",
      url: "/api/insertBar",
      data: data,
    });

    return await response.data;
  }

  async function getLastBar() {
    const bar = await axios({
      method: "GET",
      url: "/api/bares?limit=1&offset=0&key=&order=id&direction=DESC",
    });

    return bar.data.data.bares[0];
  }

  async function updateBar(data: any) {
    const response = await axios({
      method: "POST",
      url: "/api/updateBar",
      data: data,
    });

    return response.data;
  }

  return (
    <div className="bg-white py-5 px-3 rounded-md m-2 shadow-md border-2">
      <Formik
        initialValues={{
          id: Bardata?.id ?? "",
          nombre: Bardata?.nombre ?? "",
          localizacion: Bardata?.localizacion ?? "",
          informacion: Bardata?.informacion ?? "",
          pinchos: Bardata?.pinchos ?? [],
          img: Bardata?.img ?? [],
        }}
        validationSchema={adminSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (Bardata === undefined) {
            const responseBar = await insertBar(values);
            const lastBarInserted = await getLastBar();
            const responseImg = await uploadImg(lastBarInserted.id);
          } else {
            const response = await updateBar(values);
            const responseImg = await uploadImg(values.id);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            className="bg-white flex space-x-2 relative"
            onSubmit={handleSubmit}
          >
            <div className="w-1/2 p-2 rounded-md shadow-md border-2 bg-white flex flex-col">
              <div className="flex justify-center space-x-2 mt-4 bg-transparent">
                <div
                  className={`${
                    zonaImagen.get() === "subir"
                      ? "border-2 border-green-600 bg-transparent rounded-full p-1 w-full"
                      : "border-2 border-gray-300 bg-transparent rounded-full p-1 cursor-pointer w-full"
                  }`}
                  onClick={(e) => zonaImagen.set("subir")}
                >
                  <p className="bg-transparent font-roboto text-black text-center font-medium">
                    Subir Imagen ⬆️
                  </p>
                </div>

                {Bardata !== undefined ? (
                  <div
                    className={`${
                      zonaImagen.get() === "galeria"
                        ? "border-2 border-green-600 bg-transparent rounded-full p-1 w-full"
                        : "border-2 border-gray-300 bg-transparent rounded-full p-1 cursor-pointer w-full"
                    }`}
                    onClick={(e) => zonaImagen.set("galeria")}
                  >
                    <p className="bg-transparent font-roboto text-black text-center font-medium">
                      Galeria 🖼️
                    </p>
                  </div>
                ) : null}
              </div>

              {zonaImagen.get() === "subir" ? (
                <React.Fragment>
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className="bg-white p-10 border-2 border-dashed rounded-md mt-10"
                  >
                    <input {...getInputProps({ name: "files[]" })} />
                    <p className="font-roboto text-lg font-medium text-black text-center bg-white">
                      Suelta las imagenes aqui, o haz click para seleccionarlas
                      (Max. 4MB)
                    </p>
                  </div>

                  <h1 className="font-roboto text-black text-sm ml-1 bg-transparent mt-3">
                    Imagenes acceptadas
                  </h1>

                  <div className="space-y-3 overflow-auto border-2 rounded-md p-2 bg-white shadow-sm max-h-52 h-full">
                    {acceptedFiles.map((file, index) => (
                      <div
                        className="flex justify-between items-center px-3 font-roboto font-medium text-green-600 bg-white border-2 border-green-600 p-1 rounded-md shadow-md"
                        key={index}
                      >
                        {file.name}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ) : null}

              {zonaImagen.get() === "galeria" ? (
                <React.Fragment>
                  <div className="flex flex-wrap overflow-auto h-min gap-2 mt-3 bg-white">
                    {Bardata?.img.map((img: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col bg-transparent space-y-2 border p-2 rounded hover:shadow-lg hover:border-0"
                      >
                        <Image
                          src={`http://localhost/logrocho/logrocho-backend/img/img_bares/${values.id}/${img.filename}`}
                          alt={img}
                          key={index}
                          layout="intrinsic"
                          width={100}
                          height={100}
                          className="rounded-md"
                        />

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            removeImg(img, e);
                          }}
                          className="text-red-600 border font-roboto font-medium text-sm border-red-600 bg-white p-1 rounded-md hover:text-white hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ) : null}
            </div>

            <div className="w-1/2 p-4 rounded-md shadow-md border-2 bg-white space-y-4">
              <div className="flex space-x-2 bg-white">
                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="idBar"
                  >
                    Id
                  </label>
                  <Field
                    as="input"
                    id="idBar"
                    name="id"
                    disabled={true}
                    className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>

                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="nombreBar"
                  >
                    Nombre
                  </label>
                  <Field
                    as="input"
                    id="nombreBar"
                    name="nombre"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="nombre"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>
              </div>

              <div className="bg-white">
                <label
                  className="font-roboto bg-white font-light text-lg text-black"
                  htmlFor="localizacionBar"
                >
                  Localizacion
                </label>
                <Field
                  as="input"
                  id="localizacionBar"
                  name="localizacion"
                  className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="localizacion"
                  className="text-red-500 bg-white font-roboto text-xs"
                />
              </div>

              <div className="bg-white">
                <label
                  className="font-roboto bg-white font-light text-lg text-black"
                  htmlFor="informacionBar"
                >
                  Informacion
                </label>
                <Field
                  as="textarea"
                  rows={3}
                  id="informacionBar"
                  name="informacion"
                  className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="informacion"
                  className="text-red-500 bg-white font-roboto text-xs"
                />
              </div>

              <div className="bg-white">
                <label
                  className="font-roboto bg-white font-light text-lg text-black"
                  htmlFor="pinchosBar"
                >
                  Pinchos
                </label>
                <Select
                  name="pinchos"
                  id="pinchosBar"
                  isMulti={true}
                  isClearable={true}
                  isSearchable={true}
                  onChange={(e) => (values.pinchos = e)}
                  menuPlacement="top"
                  options={data?.data.pinchos}
                  defaultValue={values.pinchos}
                  getOptionValue={(option: any) => `${option["id"]}`}
                  getOptionLabel={(option: any) => `${option["nombre"]}`}
                  styles={{
                    multiValue: (base) => ({
                      ...base,
                      border: `1px solid green`,
                      borderRadius: 3,
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      backgroundColor: "transparent",
                    }),
                    control: (base) => ({
                      ...base,
                      backgroundColor: "white",
                      border: "1px solid lightgray",
                      borderRadius: 8,
                      padding: 2,
                    }),
                    input: (base) => ({
                      ...base,
                      backgroundColor: "white",
                    }),
                    container: (base) => ({
                      ...base,
                      backgroundColor: "white",
                    }),
                    indicatorsContainer: (base) => ({
                      ...base,
                      backgroundColor: "white",
                    }),
                  }}
                  components={{
                    MultiValueLabel: MultiValueLabel,
                    MultiValueRemove: MultiValueRemove,
                    MultiValueContainer: MultiValueContainer,
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin bg-transparent mx-auto text-lg" />
                ) : (
                  <span className="bg-transparent">
                    {Bardata === undefined ? "Crear" : "Actualizar"}
                  </span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
