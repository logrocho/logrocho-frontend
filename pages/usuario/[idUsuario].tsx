import Head from "next/head";
import React, { useEffect } from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import { getTokenData } from "../../lib/auth";
import { API_URL, IMG_URL } from "../../lib/const";
import { useState } from "@hookstate/core";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDropzone } from "react-dropzone";

export async function getServerSideProps(context) {
  const { idUsuario } = context.query;

  const { user_token } = context.req.cookies;

  const tokenData = await getTokenData(user_token);

  const responseUser = await fetch(
    API_URL + `user?correo=${tokenData?.correo}`
  );

  const user = await responseUser.json();

  if (!user.data) {
    return {
      redirect: {
        destination: "/home",
        permanent: true,
      },
    };
  }

  if (user.data.id === idUsuario || tokenData.rol === "admin") {
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

  const imgPerfil = useState<any>("");

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    multiple: false,
    maxFiles: 1,
    maxSize: 2000000,
    onDrop: (acceptedFiles, rejectedFiles) => {
      imgPerfil.set({ img: URL.createObjectURL(acceptedFiles[0]) });
    },
  });

  const userEditSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(1, "El nombre tiene que tener mas de 1 letra")
      .max(15, "El nombre no puede tener mas de 15 letras")
      .required("El nombre no puede estar vacio"),

    apellidos: Yup.string()
      .matches(/^[a-z ,.'-]+$/i, "Los apellidos no pueden estar vacios")
      .matches(/^\S/, "Los apellidos no pueden empezar espacios")
      .required("Los apellidos no pueden estar vacios"),
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
                    ? IMG_URL + `img_usuarios/${user.data.id}/${user.data.img}`
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
            <div className="text-center mt-3">
              <button type="button" onClick={(e) => editor.set(!editor.get())}>
                {editor.get() ? (
                  <IoIosArrowUp className="text-black text-4xl" />
                ) : (
                  <IoIosArrowDown className="text-black text-4xl" />
                )}
              </button>
            </div>
            {editor.get() ? (
              <div className="max-w-4xl mx-auto">
                <Formik
                  initialValues={{
                    id: user.data.id,
                    nombre: user.data.nombre,
                    apellidos: user.data.apellidos,
                    correo: user.data.correo,
                  }}
                  validationSchema={userEditSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    console.log(values);
                    await axios({
                      method: "POST",
                      url: "/api/updateUser",
                      data: values,
                    });
                    if (acceptedFiles[0]) {
                      const form = new FormData();
                      form.append(`file`, acceptedFiles[0]);
                      await axios({
                        method: "POST",
                        url: API_URL + `updateUserImg?id=${values.id}`,
                        data: form,
                      });
                    }

                    await router.reload();
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
                      className="p-10 bg-white border rounded-md shadow-md"
                    >
                      <div className="flex gap-x-10">
                        <div className="mb-3 w-full">
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

                        <div className="mb-3 w-full">
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
                      </div>
                      <div className="mb-3">
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
                          disabled={true}
                          className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                        <ErrorMessage
                          component="span"
                          name="correo"
                          className="text-red-500 bg-white font-roboto text-xs"
                        />
                      </div>

                      <div className="mb-3 flex flex-wrap gap-x-10">
                        <div
                          {...getRootProps({ className: "dropzone" })}
                          className="bg-white px-10 py-10 flex border-2 border-dashed rounded-md"
                        >
                          <input {...getInputProps({ name: "files[]" })} />
                          <p className="font-roboto align-middle self-center text-lg font-medium text-black text-center bg-white">
                            Suelta aqui la imagen, o haz click para
                            seleccionarla (Max. 2MB)
                          </p>
                        </div>
                        <div className="h-40 w-40">
                          <Image
                            src={
                              imgPerfil.get()
                                ? (imgPerfil.get().img as string)
                                : "https://via.placeholder.com/468?text=Imagen+no+disponible"
                            }
                            alt={user.data.img ?? "placeholder"}
                            layout="intrinsic"
                            width={200}
                            height={200}
                            objectFit="cover"
                            className="rounded-md"
                            priority={true}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white bg-green-700 cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
                      >
                        {isSubmitting ? (
                          <AiOutlineLoading3Quarters className="animate-spin   mx-auto text-lg" />
                        ) : (
                          <span className=" ">Actualizar Informacion</span>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            ) : null}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}
