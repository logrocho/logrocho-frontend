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

export default function Registro() {
  const router = useRouter();

  const registerSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(4, "El nombre tiene que tener mas de 4 letras")
      .max(15, "El nombre no puede tener mas de 15 letras")
      .required("El nombre no puede estar vacio"),

    apellidos: Yup.string()
      .min(10, "Los apellidos tienen que tener mas de 10 letras")
      .required("Los apellidos no pueden estar vacio"),

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
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("La contraseña no puede estar vacia"),
  });

  return (
    <React.Fragment>
      <Head>
        <title>Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href={"/"} as={"/"}>
        <a className="absolute top-3 left-3 text-black font-roboto font-semibold underline">
          Volver a inicio
        </a>
      </Link>

      <div className="h-screen overflow-auto bg-slate-50">
        <div className="max-w-lg mx-auto mt-20">
          <h1 className="text-black font-roboto font-black text-2xl mb-3 ml-6">
            Logrocho
          </h1>
          <Formik
            initialValues={{
              nombre: "",
              apellidos: "",
              correo: "",
              password: "",
              passwordConfirm: "",
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
                  Cookies.set("user_token", loginResponse.data, { expires: 1 });

                  router.push("/"); //TODO: Cambiar la redireccion al perfil del usuario
                }
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
                onSubmit={handleSubmit}
                className="px-6 py-5 bg-white border shadow-xl rounded-md m-2"
              >
                <p className="text-slate-700 bg-white font-medium font-roboto text-xl mb-6 ml-px">
                  Crear cuenta
                </p>

                <div className="mb-6 bg-transparent">
                  <label
                    htmlFor="nombre"
                    className="block mb-2 text-sm bg-transparent font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nombre
                  </label>
                  <Field
                    as="input"
                    type="text"
                    name="nombre"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="nombre"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>

                <div className="mb-6 bg-transparent">
                  <label
                    htmlFor="apellidos"
                    className="block mb-2 text-sm bg-transparent font-medium text-gray-900 dark:text-gray-300"
                  >
                    Apellidos
                  </label>
                  <Field
                    as="input"
                    type="text"
                    name="apellidos"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="apellidos"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>

                <div className="mb-6 bg-transparent">
                  <label
                    htmlFor="correo"
                    className="block mb-2 text-sm bg-transparent font-medium text-gray-900 dark:text-gray-300"
                  >
                    Correo
                  </label>
                  <Field
                    as="input"
                    type="email"
                    name="correo"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="correo"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>

                <div className="mb-6 bg-transparent">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm bg-transparent font-medium text-gray-900 dark:text-gray-300"
                  >
                    Contraseña
                  </label>
                  <Field
                    as="input"
                    type="password"
                    name="password"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="password"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>

                <div className="mb-6 bg-transparent">
                  <label
                    htmlFor="passwordConfirm"
                    className="block mb-2 text-sm bg-transparent font-medium text-gray-900 dark:text-gray-300"
                  >
                    Introduce la contraseña de nuevo
                  </label>
                  <Field
                    as="input"
                    type="password"
                    name="passwordConfirm"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="passwordConfirm"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>

                {/* //TODO: Si hay errores en el formulario el boton esta en gris */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin bg-transparent mx-auto text-lg" />
                  ) : (
                    <span className="bg-transparent">Crear cuenta</span>
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
