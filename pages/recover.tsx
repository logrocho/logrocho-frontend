import { Formik, Form, Field } from "formik";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("El email es obligatorio").email(),
});
function Recover(): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Iniciar Sesion - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen overflow-auto bg-slate-50">
        <div className="max-w-lg mx-auto mt-20">
          <h1 className="text-black font-roboto font-black text-2xl mb-3 ml-6">
            Logrocho
          </h1>
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
                className="px-6 py-5 bg-white border shadow-xl rounded-md m-2"
              >
                <p className="text-black bg-white font-medium font-roboto text-xl mb-6 ml-px">
                  Recuperar cuenta
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
                <div className="mt-2 bg-white">
                  <Link href={"/login"} as={"/login"}>
                    <a className="font-roboto text-sm bg-transparent text-green-600">
                      Volver al login
                    </a>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Recover;
