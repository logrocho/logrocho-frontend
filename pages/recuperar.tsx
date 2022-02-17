import { Formik, Form, Field } from "formik";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("El email es obligatorio").email(),
});
export default function Recuperar(): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Iniciar Sesion - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-12 min-h-screen flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-black font-roboto text-center font-bold text-3xl">
            Contraseña Olvidada
          </h1>
        </div>
        <div className="max-w-md mx-auto mt-8 w-full">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
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
                className="p-10 bg-white border shadow-xl rounded-md m-2"
              >
                <p className="text-gray-400 bg-white font-roboto text-base mb-4">
                  Introduce tu email y te enviaremos un enlace para cambiarla.
                </p>

                <div className="mb-6 bg-transparent">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black bg-white"
                  >
                    Email
                  </label>
                  <Field
                    as="input"
                    type="email"
                    name="email"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
                >
                  Recuperar Contraseña
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-4 bg-transparent text-center text-neutral-600 font-roboto">
            ¿Ya tienes una cuenta? {" "}
            <Link href={"/login"} as={"/login"}>
              <a className="font-roboto bg-transparent text-green-600">
                Ir a login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
