import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { NextPage } from "next";
import React from "react";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "@hookstate/core";

function Login(): JSX.Element {
  const router = useRouter();

  const loginError = useState<Boolean>(false);

  return (
    <React.Fragment>
      <Head>
        <title>Iniciar Sesion - Logrocho</title>
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
          <div
            className={`${
              loginError.get()
                ? "px-10 py-5 border border-red-600 bg-red-300 rounded-md my-10 space-y-1"
                : "hidden"
            }`}
          >
            <p className="uppercase bg-transparent text-2xl text-red-600 font-roboto font-bold text-center">
              Error, usuario inexistente
            </p>
            <p className="bg-transparent text-xl text-red-600 font-roboto font-light text-center">
              Comprueba que los datos introducidos sean correctos
            </p>
          </div>

          <h1 className="text-black font-roboto font-black text-2xl mb-3 ml-6">
            Logrocho
          </h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            // validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await axios({
                method: "POST",

                url: "/api/login",

                data: {
                  correo: values.email,

                  password: values.password,
                },
              })
                .then(function (response) {
                  if (response.data) {
                    Cookies.set("user_token", response.data, { expires: 1 });

                    router.push("/admin");
                  }
                })
                .catch(function (error) {
                  if (!error.response.data.status) {
                    loginError.set(true);
                  }
                });
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
                className="px-6 py-10 bg-white border shadow-xl rounded-md m-2"
              >
                <p className="text-slate-700 bg-white font-medium font-roboto text-xl mb-6 ml-px">
                  Iniciar sesion en tu cuenta
                </p>

                <div className="mb-6 bg-transparent">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm bg-transparent font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <Field
                    as="input"
                    type="email"
                    name="email"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-6 bg-transparent">
                  <div className="flex flex-wrap items-baseline justify-between bg-transparent">
                    <label
                      htmlFor="password"
                      className="block mb-2 mr-2 bg-transparent text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Contraseña
                    </label>
                    <Link href={"/recover"} as={"/recover"}>
                      <a className="text-green-400 bg-transparent font-roboto font-semibold text-xs mr-2">
                        ¿Has olvidado la contraseña?
                      </a>
                    </Link>
                  </div>
                  <Field
                    as="input"
                    type="password"
                    name="password"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
                >
                  Iniciar Sesion
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
