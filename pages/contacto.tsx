import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { Formik, Form, Field } from "formik";
import Head from "next/head";
import Layout from "../components/Layout";
import { getTokenData } from "../lib/auth";
import { API_URL } from "../lib/const";

export default function ContactoPage({ user }: any) {
  return (
    <React.Fragment>
      <Head>
        <title>Contacto - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout user={user}>
        <div className="mx-auto p-5 my-10">
          <h1 className="text-center text-black font-roboto font-bold text-6xl">
            Contacto
          </h1>
          <h2 className="text-center mt-6 text-black font-roboto font-light text-xl">
            ¿Tienes alguna pregunta o sugerencia? Escribenos un mensaje!!
          </h2>

          <div className="flex justify-center flex-col lg:flex-row rounded-md shadow-md mx-auto max-w-5xl bg-white mt-10">
            <div className="bg-gradient-to-tr from-green-400 via-green-500 to-green-900 p-10 m-2 lg:w-1/2 rounded-md">
              <h1 className="text-3xl font-roboto text-white   font-bold">
                Informacion de contacto
              </h1>
              <p className="text-2xl font-light font-roboto text-white   mt-5">
                Rellena el formulario y nos pondremos en contacto en menos de 24
                horas
              </p>

              <div className="mt-14   space-y-10">
                <div className="flex items-center  ">
                  <BsFillTelephoneFill className="  text-white text-2xl" />
                  <span className="text-white   ml-2 font-roboto font-semibold text-xl">
                    + 34 000 00 00 00
                  </span>
                </div>

                <div className="flex items-end  ">
                  <MdEmail className="  text-white text-2xl" />
                  <span className="text-white   ml-2 font-roboto font-semibold text-xl">
                    correo@test.com
                  </span>
                </div>

                <div className="flex items-center  ">
                  <HiLocationMarker className="  text-white text-2xl" />
                  <span className="text-white   ml-2 font-roboto font-semibold text-xl">
                    Calle Laurel, 1
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white m-5 lg:w-1/2">
              <Formik
                initialValues={{ email: "", password: "" }}
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
                    className="grid grid-cols-2 grid-rows-3 gap-5 bg-white"
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
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
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
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

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
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="mb-6  ">
                      <label
                        htmlFor="telefono"
                        className="block mb-2 text-sm   font-medium text-gray-900"
                      >
                        Telefono
                      </label>
                      <Field
                        as="input"
                        type="tel"
                        name="telefono"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    <div className="col-span-2 mb-6  ">
                      <label
                        htmlFor="mennsaje"
                        className="block mb-2 text-sm   font-medium text-gray-900"
                      >
                        Mensaje
                      </label>
                      <Field
                        as="textarea"
                        name="mensaje"
                        className="border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-white col-span-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
                    >
                      Enviar Mensaje
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context: any) {
  const { user_token } = context.req.cookies;

  const tokenData = await getTokenData(user_token);

  const response = await fetch(API_URL + `user?correo=${tokenData?.correo}`);

  const user = await response.json();

  return {
    props: { user },
  };
}
