import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from "react";

export default function ResenaForm({ ResenaData }: any) {
  const adminSchema = Yup.object().shape({
    mensaje: Yup.string()
      .min(15, "El mensaje tiene que contener mas de 15 letras")
      .max(150, "El mensaje no puede tener mas de 150 letras")
      .required("El mensaje no puede estar vacio"),
  });

  return (
    <div className="bg-white py-5 px-3 rounded-md m-2 shadow-md border-2">
      <Formik
        initialValues={{
          id: ResenaData.id,
          usuario: ResenaData.usuario.nombre,
          pincho: ResenaData.pincho.nombre,
          mensaje: ResenaData.mensaje,
          puntuacion: ResenaData.puntuacion,
        }}
        validationSchema={adminSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios({
            method: "POST",
            url: "/api/updateResena",
            data: {
              resena: values,
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
            <div className="w-full p-4 rounded-md shadow-md border-2 bg-white space-y-4">
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
                    htmlFor="usuarioResena"
                  >
                    Usuario
                  </label>
                  <Field
                    as="input"
                    id="usuarioResena"
                    name="usuario"
                    className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="flex space-x-2 bg-white">
                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="pinchoResena"
                  >
                    Pincho
                  </label>
                  <Field
                    as="input"
                    id="pinchoResena"
                    name="pincho"
                    className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled={true}
                  />
                </div>

                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="puntuacionResena"
                  >
                    Puntuacion
                  </label>
                  <Field
                    as="input"
                    id="puntuacionResena"
                    name="puntuacion"
                    className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled={true}
                  />
                </div>
              </div>

              <div className="bg-white">
                <label
                  className="font-roboto bg-white font-light text-lg text-black"
                  htmlFor="mensajeResena"
                >
                  Mensaje
                </label>
                <Field
                  as="textarea"
                  rows={3}
                  id="mensajeResena"
                  name="mensaje"
                  className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="mensaje"
                  className="text-red-500 bg-white font-roboto text-xs"
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
