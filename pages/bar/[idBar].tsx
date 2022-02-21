import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { API_URL, IMG_URL } from "../../lib/const";
import bar from "../api/bar";
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

export async function getServerSideProps(context) {
  const { idBar } = context.query;

  const responseBar = await axios({
    method: "GET",
    baseURL: API_URL,
    url: `bar?id=${idBar}`,
  });

  const bar = responseBar.data;

  const { user_token } = context.req.cookies;

  const tokenData = await getTokenData(user_token);

  const responseUser = await fetch(
    API_URL + `user?correo=${tokenData?.correo}`
  );

  const user = await responseUser.json();

  return {
    props: { bar, user },
  };
}

export default function BarDetail({ bar, user }) {
  console.log(bar);
  return (
    <React.Fragment>
      <Head>
        <title>{bar.data.nombre} - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <div className="p-4 flex flex-col lg:justify-center">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4 items-center lg:flex-row lg:items-stretch lg:divide-x lg:divide-black">
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
                  {bar.data.img.map((img, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={
                          IMG_URL + `/img_bares/${bar.data.id}/${img.filename}`
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
                  ))}
                </Swiper>
                <div className="px-4 py-2 bg-white rounded-md shadow-md border-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-roboto">Nombre:</p>
                    <p className="text-gray-900 font-roboto font-light">
                      {bar.data.nombre}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-roboto">Nota Media:</p>
                    <p className="text-gray-900 font-roboto font-light">
                      {Math.round(bar.data.media_puntuacion * 100) / 100}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-roboto">Localizacion:</p>
                    <Link href={"/mapa"} as={"/mapa"}>
                      <a className="text-red-500 font-roboto font-light underline">
                        {bar.data.localizacion}
                      </a>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-900 font-roboto">Informacion:</p>
                    <p className="text-gray-900 font-roboto font-light">
                      {bar.data.informacion}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <p className="text-center font-roboto font-medium text-2xl">
                  Pinchos disponibles ⬇️
                </p>
                <div className="space-y-2 mt-3 lg:m-3">
                  {bar.data.pinchos.map((pincho, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-400 relative h-20 p-1 rounded-md flex items-center"
                    >
                      <Image
                        src={
                          IMG_URL +
                          `/img_pinchos/${pincho.id}/${pincho.img[0].filename}`
                        }
                        alt={pincho.img[0].filename}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="left"
                        priority={true}
                        className="rounded-md"
                      />

                      <div className="flex bg-white space-x-4 p-2 rounded-md border-2 shadow-xl z-10 ml-auto h-full">
                        <div className="self-center">
                          <p className="font-roboto text-lg">
                            🥜{pincho.nombre}
                          </p>
                          <p className="font-roboto text-base">
                            ⭐{pincho.puntuacion}
                          </p>
                        </div>
                        <Link
                          href={{
                            pathname: "/pincho/[idPincho]",
                            query: { idPincho: pincho.id },
                          }}
                        >
                          <a className="bg-black h-full w-12 flex justify-center rounded-md">
                            <AiOutlineArrowRight className="text-white text-lg self-center" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}
