import Head from "next/head";
import React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import { getTokenData } from "../../lib/auth";
import { API_URL } from "../../lib/const";
import { useState } from "@hookstate/core";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export async function getServerSideProps(context) {
  const { idUsuario } = context.query;

  const { user_token } = context.req.cookies;

  const tokenData = await getTokenData(user_token);

  const responseUser = await fetch(
    API_URL + `user?correo=${tokenData?.correo}`
  );

  const user = await responseUser.json();

  if (user.data.id === idUsuario) {
    return {
      props: { user },
    };
  }

  return {
    redirect: {
      destination: "/home",
      permanent: true,
    },
  };
}

export default function Usuario({ user }) {
  const editor = useState(false);

  const router = useRouter();

  const userEditSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(1, "El nombre tiene que tener mas de 1 letra")
      .max(15, "El nombre no puede tener mas de 15 letras")
      .required("El nombre no puede estar vacio"),

    apellidos: Yup.string()
      .matches(/^[A-Za-z]+$/, "Los apellidos no pueden estar vacios")
      .required("Los apellidos no pueden estar vacios"),

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
        <title>
          {user.data.nombre} {user.data.apellidos} - Logrocho
        </title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{JSON.stringify(user)}</div>
      <Layout user={user}>
        <div className="max-w-5xl mx-auto py-12 px-2">
          <div className="bg-white py-12 rounded-md shadow-md border">
            <div className="relative h-40 w-40 mx-auto">
              <Image
                src={
                  user.data.img !== ""
                    ? user.data.img
                    : "https://via.placeholder.com/468?text=Imagen+no+disponible"
                }
                alt={user.data.img ?? "placeholder"}
                layout="responsive"
                width={1}
                height={1}
                objectFit="cover"
                className="rounded-full"
                priority={true}
              />
            </div>
            <p className="text-center font-roboto font-black capitalize mt-3">
              {user.data.nombre} {user.data.apellidos}
            </p>
            <p className="text-center font-roboto font-extralight text-sm">
              {user.data.correo}
            </p>
            <button
              type="button"
              className="bg-black text-white"
              onClick={(e) => editor.set(!editor.get())}
            >
              pojpjfpofew
            </button>
              <Formik
                initialValues={{
                  nombre: "",
                  apellidos: "",
                  correo: "",
                  CurrentPassword: "",
                  newPassword: "",
                }}
                validationSchema={userEditSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log(values);
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
                    className={`${
                      editor.get()
                        ? "h-60 p-10 bg-white border shadow-xl rounded-md mt-5"
                        : "h-0 p-10 bg-white border shadow-xl rounded-md mt-5"
                    }transition-all ease-linear duration-1000 max-w-4xl mx-auto`}
                  >
                    <div className="mb-6">
                      <label
                        htmlFor="nombre"
                        className="block mb-2 text-sm font-medium text-gray-900"
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

                    <div className="mb-6">
                      <label
                        htmlFor="apellidos"
                        className="block mb-2 text-sm font-medium text-gray-900"
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

                    <div className="mb-6">
                      <label
                        htmlFor="correo"
                        className="block mb-2 text-sm font-medium text-gray-900"
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

                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
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
      </Layout>
    </React.Fragment>
  );
}
