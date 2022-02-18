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
      <div className="py-12 min-h-screen flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          {/* TODO: rehacer el mensaje de error */}
          <h1 className="text-black font-roboto text-center font-black text-5xl mb-2">
            Logrocho.com
          </h1>
          <h2 className="text-gray-900 font-roboto text-center font-light text-2xl">
            Inicia sesion en tu cuenta
          </h2>
        </div>
        <div className="max-w-md mx-auto mt-8 w-full">
          <Formik
            initialValues={{ email: "", password: "" }}
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
                className="p-10 bg-white border shadow-xl rounded-md m-2"
              >
                <p className="text-slate-700 bg-white font-medium font-roboto text-xl mb-6 ml-px">
                  Iniciar sesion en tu cuenta
                </p>

                <div className="mb-6  ">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm   font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <Field
                    as="input"
                    type="email"
                    name="email"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>

                <div className="mb-6  ">
                  <div className="flex flex-wrap items-baseline justify-between  ">
                    <label
                      htmlFor="password"
                      className="block mb-2 mr-2   text-sm font-medium text-gray-900"
                    >
                      Contraseña
                    </label>
                    <Link href={"/recuperar"} as={"/recuperar"}>
                      <a className="text-green-400   font-roboto font-semibold text-xs mr-2">
                        ¿Has olvidado la contraseña?
                      </a>
                    </Link>
                  </div>
                  <Field
                    as="input"
                    type="password"
                    name="password"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
