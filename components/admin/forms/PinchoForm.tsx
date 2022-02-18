import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useState } from "@hookstate/core";
import axios from "axios";
import { API_URL, IMG_URL } from "../../../lib/const";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import React from "react";
import Cookies from "js-cookie";
import { getTokenData } from "../../../lib/auth";
import { useRouter } from "next/router";

export default function PinchoForm({ Pinchodata }: any) {
  const adminSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(4, "El nombre tiene que tener mas de 4 letras")
      .max(15, "El nombre no puede tener mas de 15 letras")
      .required("El nombre no puede estar vacio"),

    precio: Yup.number()
      .positive("El numero no puede ser negativo")
      .round("floor")
      .required("El campo numero no puede estar vacio"),

    ingredientes: Yup.string()
      .min(20, "Los ingredientes tienen que tener mas de 20 letras")
      .max(200, "Los ingredientes no pueden tener mas de 200 letras")
      .required("Los ingredientes no pueden estar vacios"),
  });

  const zonaImagen = useState("subir");

  const router = useRouter();

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
      const response = await axios({
        method: "POST",
        url: API_URL + `uploadImagesPincho?id=${id}`,
        data: form,
      });

      const data = await response.data;
    }
  }

  async function removeImg(img: any, e: any) {
    e.currentTarget.parentNode.style.display = "none";

    const response = await axios({
      method: "POST",
      url:
        API_URL +
        `removeImagesPincho?img_id=${img.id}&pincho_id=${Pinchodata.id}&filename=${img.filename}`,
    });

    const data = await response.data;
  }

  async function insertPincho(data: any) {
    const response = await axios({
      method: "POST",
      url: "/api/insertPincho",
      data: data,
    });

    return await response.data;
  }

  async function getLastPincho() {
    const bar = await axios({
      method: "GET",
      url: "/api/pinchos?limit=1&offset=0&key=&order=id&direction=DESC",
    });

    return bar.data.data.pinchos[0];
  }

  async function updatePincho(data: any) {
    const response = await axios({
      method: "POST",
      url: "/api/updatePincho",
      data: data,
    });

    return response.data;
  }

  return (
    <div className="bg-white py-5 px-3 rounded-md m-2 shadow-md border-2">
      <Formik
        initialValues={{
          id: Pinchodata?.id ?? "",
          nombre: Pinchodata?.nombre ?? "",
          puntuacion: Pinchodata?.puntuacion ?? 0,
          ingredientes: Pinchodata?.ingredientes ?? "",
          precio: Pinchodata?.precio ?? 0.0,
          img: Pinchodata?.img,
        }}
        validationSchema={adminSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (Pinchodata === undefined) {
            const response = await insertPincho(values);
            const lastPincho = await getLastPincho();
            const responseImg = await uploadImg(lastPincho.id);
          } else {
            const response = await updatePincho(values);
            const responseImg = await uploadImg(values.id);
          }

          router.reload();
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
              <div className="flex justify-center space-x-2 mt-4  ">
                <div
                  className={`${
                    zonaImagen.get() === "subir"
                      ? "border-2 border-green-600   rounded-full p-1 w-full"
                      : "border-2 border-gray-300   rounded-full p-1 cursor-pointer w-full"
                  }`}
                  onClick={(e) => zonaImagen.set("subir")}
                >
                  <p className="  font-roboto text-black text-center font-medium">
                    Subir Imagen ⬆️
                  </p>
                </div>
                {Pinchodata !== undefined ? (
                  <div
                    className={`${
                      zonaImagen.get() === "galeria"
                        ? "border-2 border-green-600   rounded-full p-1 w-full"
                        : "border-2 border-gray-300   rounded-full p-1 cursor-pointer w-full"
                    }`}
                    onClick={(e) => zonaImagen.set("galeria")}
                  >
                    <p className="  font-roboto text-black text-center font-medium">
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

                  <h1 className="font-roboto text-black text-sm ml-1   mt-3">
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
                    {Pinchodata.img.map((img: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col   space-y-2 border p-2 rounded hover:shadow-lg hover:border-0"
                      >
                        <Image
                          src={
                            IMG_URL + `img_pinchos/${values.id}/${img.filename}`
                          }
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
                    htmlFor="idPincho"
                  >
                    Id
                  </label>
                  <Field
                    as="input"
                    id="idPincho"
                    name="id"
                    disabled={true}
                    className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>

                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="nombrePincho"
                  >
                    Nombre
                  </label>
                  <Field
                    as="input"
                    id="nombrePincho"
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
              <div className="flex space-x-2 bg-white">
                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="puntuacionPincho"
                  >
                    Puntuacion
                  </label>
                  <Field
                    as="input"
                    id="puntuacionPincho"
                    name="puntuacion"
                    disabled={true}
                    className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>

                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="precioPincho"
                  >
                    Precio
                  </label>
                  <Field
                    as="input"
                    id="precioPincho"
                    name="precio"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="precio"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>
              </div>

              <div className="bg-white">
                <label
                  className="font-roboto bg-white font-light text-lg text-black"
                  htmlFor="ingredientesPincho"
                >
                  Ingredientes
                </label>
                <Field
                  as="textarea"
                  rows={3}
                  id="ingredientesPincho"
                  name="ingredientes"
                  className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="ingredientes"
                  className="text-red-500 bg-white font-roboto text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin   mx-auto text-lg" />
                ) : (
                  <span className=" ">
                    {Pinchodata === undefined ? "Crear" : "Actualizar"}
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
