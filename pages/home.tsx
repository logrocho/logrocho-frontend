import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper";
import Layout from "../components/Layout";

function LoginButton() {
  return (
    <Link href={"/login"} as={"/login"}>
      <a className="p-2 bg-green-600 text-white font-roboto uppercase text-xl shadow-md rounded-md">
        Login
      </a>
    </Link>
  );
}

function LogoutButton() {
  return (
    <div>

      <button
        onClick={(e) => {
          Cookies.remove("user_token");
          window.location.reload();
        }}
        className="p-2 bg-green-600 text-white font-roboto uppercase text-xl shadow-md rounded-md"
      >
        Logout
      </button>

      <div className="mt-10">
        <h1 className="font-roboto text-center text-black font-bold text-xl">
          Pinchos preferidos
        </h1>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          spaceBetween={10}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="max-w-lg mx-auto rounded-md shadow-md border h-64"
        >
          <SwiperSlide>
            <Image
              src={"/images/pinchos/bocatita-calamares-calderas.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/images/pinchos/explosion-de-huevo-el-canalla.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/images/pinchos/mini-hamburguesa-bonsai.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/images/pinchos/morrito-frito-charly.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/images/pinchos/oido-cocina-kabanova.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="mt-10">
        <h1 className="font-roboto text-center text-black font-bold text-xl">
          Pinchos mejor valorados de la web
        </h1>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          spaceBetween={10}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="max-w-lg mx-auto rounded-md shadow-md border h-64"
        >
          <SwiperSlide>
            <Image
              src={"/images/pinchos/patitas-de-corderito-a-la-vizcaina-ebisu-tradicional.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/images/pinchos/piruleta-de-solomillo-iberico-con-salsa-de-boletus.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/images/pinchos/rollito-crujiente-tal-cual.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/images/pinchos/tigres-gargonich.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={"/images/pinchos/zapatilla-jamon-villa-rica.jpg"}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </SwiperSlide>
        </Swiper>
      </div>


    </div>
  );
}

function Index(): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>

      <div className="container mx-auto">
        <div className="mt-10 text-center">
          {Cookies.get("user_token") ? LogoutButton() : LoginButton()}
        </div>
      </div>
      </Layout>
    </React.Fragment>
  );
}

export default Index;
