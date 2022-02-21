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
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import ResenaComponent from "../../components/ResenaComponent";

export async function getServerSideProps(context) {
  const { idPincho } = context.query;

  const responsePincho = await axios({
    method: "GET",
    baseURL: API_URL,
    url: `pincho?id=${idPincho}`,
  });

  const pincho = responsePincho.data;

  if (!pincho.data) {
    return {
      notFound: true,
    }
  }

  const { user_token } = context.req.cookies;

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
  console.log(pincho);
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
                      {pincho.data.puntuacion}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-roboto">Ingredientes:</p>
                    <p className="text-gray-900 font-roboto font-light">
                      {pincho.data.ingredientes}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 m-3 space-y-4">
                {/* TODO: Mostrar form para escribir comentario */}
                <button className="text-center w-full font-roboto bg-green-600 text-white  rounded-md shadow-md h-10">
                  Da tu opinion 💭
                </button>
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
