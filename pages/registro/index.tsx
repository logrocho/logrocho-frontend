import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import router, { useRouter } from "next/router";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { setTimeout } from "timers";
import * as Yup from "yup";
import { BiDownArrow } from "react-icons/bi";
import { getTokenData } from "../../lib/auth";

export default function Registro() {
  const router = useRouter();

  const registerSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(1, "El nombre tiene que tener mas de 1 letra")
      .max(15, "El nombre no puede tener mas de 15 letras")
      .required("El nombre no puede estar vacio"),

    apellidos: Yup.string()
      .matches(/^[a-z ,.'-]+$/i, "Los apellidos no pueden estar vacios")
      .matches(/^\S/, "Los apellidos no pueden empezar espacios")
      .required("Los apellidos no pueden estar vacios"),

    correo: Yup.string()
      .email("La direccion de correo no es correcta")
      .required("La direccion de correo no puede estar vacia"),

    password: Yup.string()
      .min(8, "La contraseña tiene mas de 8 caracteres")
      .matches(
        /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/,
        "La contraseña tiene al menos 8 caracteres y debe incluir una minúscula,una mayúscula y un dígito"
      )
      .required("La contraseña no puede estar vacia"),
  });

  return (
    <React.Fragment>
      <Head>
        <title>Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-12 px-2 lg:px-10 min-h-screen flex items-center mx-auto max-w-7xl">
        <div className="self-center w-full space-y-3 lg:block hidden mr-10">
          <h1 className="text-black font-roboto font-black text-xl">
            Logrocho.com
          </h1>
          <h2 className="text-black font-roboto font-semibold text-5xl">
            Muestrale al mundo tus pinchos favoritos
          </h2>
          <p className="text-gray-600 font-roboto font-light">
            Create una cuenta completamente gratuita y empieza a compartir tus
            experiencias.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h1 className="text-3xl lg:hidden font-roboto text-black font-medium">
            Logrocho.com
          </h1>
          <Formik
            initialValues={{
              nombre: "",
              apellidos: "",
              correo: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              const response = await axios({
                method: "POST",
                url: "/api/insertUsuario",
                data: values,
              });

              const data = response.data;

              if (data.status) {
                const loginResponse = await axios({
                  method: "POST",
                  url: "/api/login",
                  data: {
                    correo: values.correo,

                    password: values.password,
                  },
                });

                if (loginResponse.data) {
                  Cookies.set("user_token", loginResponse.data, {
                    expires: 1,
                  });

                  const tokenData = await getTokenData(loginResponse.data);

                  await router.push(`/usuario/${tokenData.id}`);
                }
              }
            }}
          >
            {({
              values,
              errors,
              isValid,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="p-10 bg-white border shadow-xl rounded-md mt-5"
              >
                <div className="mb-6  ">
                  <label
                    htmlFor="nombre"
                    className="block mb-2 text-sm   font-medium text-gray-900"
                  >
                    Nombre
                  </label>
                  <Field
                    as="input"
                    type="text"
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

                <div className="mb-6  ">
                  <label
                    htmlFor="apellidos"
                    className="block mb-2 text-sm   font-medium text-gray-900"
                  >
                    Apellidos
                  </label>
                  <Field
                    as="input"
                    type="text"
                    name="apellidos"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="apellidos"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>

                <div className="mb-6  ">
                  <label
                    htmlFor="correo"
                    className="block mb-2 text-sm   font-medium text-gray-900"
                  >
                    Correo
                  </label>
                  <Field
                    as="input"
                    type="email"
                    name="correo"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="correo"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>

                <div className="mb-6  ">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm   font-medium text-gray-900"
                  >
                    Contraseña
                  </label>
                  <Field
                    as="input"
                    type="password"
                    name="password"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="password"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-green-700 cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin   mx-auto text-lg" />
                  ) : (
                    <span className=" ">Crear cuenta</span>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
}
