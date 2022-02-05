import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Select, {
  StylesConfig,
  components,
  MultiValueRemoveProps,
  MultiValueGenericProps,
  ContainerProps,
  ControlProps,
  IndicatorsContainerProps,
  GroupBase,
} from "react-select";
import makeAnimated from "react-select/animated";
import Async, { useAsync } from "react-select/async";
import AsyncSelect from "react-select/async";

import useSWR from "swr";
import { useState } from "@hookstate/core";
import axios from "axios";
import { GiKetchup } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import bares from "../../../pages/api/bares";
import { API_URL } from "../../../lib/const";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import React from "react";

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

  async function loadPinchos(inputValue: string) {
    const pinchos = await axios({
      method: "GET",
      url: `/api/pinchos?limit=9999999&offset=0&key=${inputValue}&order=id&direction=ASC`,
    }).then(function (response) {
      if (response.data.status) {
        return response.data;
      }
    });

    return pinchos.data;
  }

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
        <AiFillCloseCircle className="bg-transparent text-black" />
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
  });

  return (
    <div className="bg-white py-5 px-3 rounded-md m-2 shadow-md border-2">
      <Formik
        initialValues={{
          id: Bardata.id,
          nombre: Bardata.nombre,
          localizacion: Bardata.localizacion,
          informacion: Bardata.informacion,
          pinchos: Bardata.pinchos,
        }}
        validationSchema={adminSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("mensaje enviado", values);

          const response = await axios({
            method: "POST",
            url: "/api/updateBar",
            data: {
              bar: values,
            },
          })
            .then(function (response) {
              if (response.data.status) {
                return response.data;
              }
            })
            .catch(function (error) {
              if (!error.response.data.status) {
                return error.data;
              }
            });

          return response;
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
              </div>

              {zonaImagen.get() === "subir" ? (
                <React.Fragment>
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className="bg-white p-10 border-2 border-dashed shadow-md mt-10"
                  >
                    <input {...getInputProps()} />
                    <p className="font-roboto text-lg font-medium text-black text-center bg-white">
                      Suelta las imagenes aqui, o haz click para seleccionarlas
                    </p>
                  </div>

                  {console.log(acceptedFiles)}
                  <h1 className="font-roboto text-black text-sm ml-1 bg-transparent mt-3">
                    Ficheros acceptados
                  </h1>
                  <div className="space-y-3 overflow-auto border-2 rounded-md p-2 bg-white shadow-sm max-h-52 h-full">
                    {acceptedFiles.map((files, index) => (
                      <div
                        className="font-roboto font-medium text-green-600 bg-white border-2 border-green-600 p-1 rounded-md shadow-md"
                        key={index}
                      >
                        {files.name}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ) : null}

              {zonaImagen.get() === "galeria" ? <div>Zona Galeria</div> : null}

              {/* {Bardata.img.length > 0 ? (
                <Image
                  src={
                    "http://localhost/logrocho/logrocho-backend/img/imagen.png"
                  }
                  layout="intrinsic"
                  width={100}
                  height={100}
                />
              ) : null} */}

              {/* <p>{data.img}</p> */}
              {/* <div>
                <input
                  type="file"
                  onChange={(e) => console.log(e)}
                  className="absolute bg-white bottom-3 left-0 right-0 mx-auto file:bg-green-800 file:border-2 file:rounded-md file:px-6 file:py-2 file:border-none file:font-roboto file:text-white file:uppercase"
                />
              </div>s */}
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
                <AsyncSelect
                  name="pinchos"
                  id="pinchosBar"
                  isMulti={true}
                  isClearable={true}
                  isSearchable={true}
                  cacheOptions
                  onChange={(e) => (values.pinchos = e)}
                  menuPlacement="top"
                  defaultValue={values.pinchos}
                  loadOptions={loadPinchos}
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
                className={`${
                  isSubmitting
                    ? "text-white bg-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center shadow-green-400 shadow-md"
                    : "text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
                }`}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin bg-transparent mx-auto text-lg" />
                ) : (
                  <span className="bg-transparent">Actualizar</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
