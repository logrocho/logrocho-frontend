import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { API_URL, IMG_URL } from "../../lib/const";
import Image from "next/image";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import { getTokenData } from "../../lib/auth";
import Layout from "../../components/Layout";
import Link from "next/link";
import {
  AiFillStar,
  AiOutlineArrowRight,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import ResenaComponent from "../../components/ResenaComponent";
import { useState } from "@hookstate/core";
import ReactStars from "react-rating-stars-component";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export async function getServerSideProps(context) {
  const { idPincho } = context.query;

  const { user_token } = context.req.cookies;

  const responsePincho = await axios({
    method: "GET",
    baseURL: API_URL,
    url: `pincho?id=${idPincho}`,
    headers: {
      Authorization: `Bearer ${user_token ?? ""}`,
    },
  });

  const pincho = responsePincho.data;

  if (!pincho.data) {
    return {
      notFound: true,
    };
  }

  const tokenData = await getTokenData(user_token);

  const responseUser = await fetch(
    API_URL + `user?correo=${tokenData?.correo}`
  );

  const user = await responseUser.json();

  return {
    props: { pincho, user },
  };
}

export default function PinchoDetail({ pincho, user }) {
  const notaPinchoSlider = useState(0);

  const router = useRouter();

  function notaPincho(nuevaNota) {
    notaPinchoSlider.set(Number.parseInt(nuevaNota));
  }

  async function setNotaPincho() {
    if (pincho.data.puntuacion_usuario) {
      await axios({
        method: "POST",
        url: "/api/updateNotaPincho",
        data: {
          pincho: pincho.data.id,
          puntuacion: notaPinchoSlider.get(),
        },
      });
    } else {
      await axios({
        method: "POST",
        url: "/api/setNotaPincho",
        data: {
          pincho: pincho.data.id,
          puntuacion: notaPinchoSlider.get(),
        },
      });
    }

    router.reload();
  }

  const resenaEditor = useState(false);

  const comentarioSchema = Yup.object().shape({
    comentario: Yup.string()
      .matches(/^\S/, "El comentario no puede estar vacio")
      .min(5, "El comentario tiene que tener mas de 4 caracteres")
      .max(120, "El comentario no puede tener mas de 120 caracteres")
      .required("El comentario no puede estar vacio"),
  });

  return (
    <React.Fragment>
      <Head>
        <title>{pincho.data.nombre} - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <div className="p-4 flex flex-col lg:justify-center">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4 items-center lg:flex-row lg:items-stretch">
              <div className="w-full lg:w-1/2 space-y-4 m-3">
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  navigation={true}
                  pagination
                  spaceBetween={10}
                  slidesPerView={1}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  className="rounded-md"
                >
                  {pincho.data.img.length === 0 ? (
                    <SwiperSlide>
                      <Image
                        src={
                          "https://via.placeholder.com/468?text=Imagen+no+disponible"
                        }
                        alt={"placeholder"}
                        layout="responsive"
                        height={1}
                        width={2}
                        objectFit="cover"
                        className="rounded-md"
                        priority={true}
                      />
                    </SwiperSlide>
                  ) : (
                    pincho.data.img.map((img, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={
                            IMG_URL +
                            `/img_pinchos/${pincho.data.id}/${img.filename}`
                          }
                          alt={img.filename}
                          layout="responsive"
                          height={1}
                          width={2}
                          objectFit="cover"
                          className="rounded-md"
                          priority={true}
                        />
                      </SwiperSlide>
                    ))
                  )}
                </Swiper>
                <div className="px-4 py-2 bg-white rounded-md shadow-md border-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-roboto">Nombre:</p>
                    <p className="text-gray-900 font-roboto font-light">
                      {pincho.data.nombre}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-roboto">Puntuacion:</p>
                    <p className="text-gray-900 font-roboto font-light">
                      {Math.round(pincho.data.puntuacion * 100) / 100}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-roboto">Ingredientes:</p>
                    <p className="text-gray-900 font-roboto font-light">
                      {pincho.data.ingredientes}
                    </p>
                  </div>
                </div>
                {user.status ? (
                  <div className="p-5 rounded-md border-2 shadow-md space-y-2">
                    <p className="font-roboto text-lg">
                      Indica la nota (1 al 5)
                    </p>
                    <ReactStars
                      count={5}
                      value={Number.parseInt(
                        pincho.data.puntuacion_usuario ?? 0
                      )}
                      onChange={notaPincho}
                      size={30}
                      isHalf={false}
                      activeColor="#ffd700"
                    />
                    <button
                      onClick={(e) => setNotaPincho()}
                      disabled={!user.status || notaPinchoSlider.get() === 0}
                      className={`${
                        !user.status || notaPinchoSlider.get() === 0
                          ? "text-white bg-green-600 opacity-20 cursor-not-allowed rounded-md shadow-md w-full py-1"
                          : "text-white bg-green-600 rounded-md cursor-pointer shadow-md w-full py-1"
                      }`}
                    >
                      {user.status
                        ? "Introduce tu puntuacion"
                        : "Inicia sesion para valorar"}
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="w-full lg:w-1/2 m-3 space-y-4">
                <button
                  onClick={(e) => resenaEditor.set(!resenaEditor.get())}
                  disabled={!user.status}
                  className={`${
                    user.status
                      ? "text-center w-full font-roboto bg-green-600 text-white  rounded-md shadow-md h-10"
                      : "text-center w-full font-roboto bg-green-600 text-white  rounded-md shadow-md h-10 opacity-20"
                  }`}
                >
                  Da tu opinion 💭
                </button>
                {resenaEditor.get() ? (
                  <Formik
                    initialValues={{ comentario: "" }}
                    validationSchema={comentarioSchema}
                    onSubmit={async (values, actions) => {
                      await axios({
                        method: "POST",
                        url: "/api/insertResena",
                        data: {
                          usuario: user.data.id,
                          pincho: pincho.data.id,
                          mensaje: values.comentario,
                        },
                      });

                      router.reload();
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
                      <Form onSubmit={handleSubmit}>
                        <Field
                          as="textarea"
                          autofocus
                          rows={3}
                          name="comentario"
                          className="border resize-none border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          required
                        />
                        <ErrorMessage
                          component="span"
                          name="comentario"
                          className="text-red-500 bg-white font-roboto text-xs"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="text-white bg-black mt-2 cursor-pointer w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          {isSubmitting ? (
                            <AiOutlineLoading3Quarters className="animate-spin mx-auto text-lg" />
                          ) : (
                            <span className=" ">Comentar</span>
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                ) : null}
                {pincho.data.resenas.map((resena, index) => (
                  <ResenaComponent key={index} resena={resena} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}
