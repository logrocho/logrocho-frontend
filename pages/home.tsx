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
import { API_URL } from "../lib/const";
import { getTokenData } from "../lib/auth";
import { AiOutlineArrowRight } from "react-icons/ai";

function Index({ user }): JSX.Element {
  return (
    <React.Fragment>
      <Head>
        <title>Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout user={user}>
        <div className="mx-auto container space-y-20 p-5 lg:p-10">
          <div className="flex flex-col items-center lg:flex-row my-5 gap-10 bg-gradient-to-tr from-pink-300 to-blue-700 p-10 rounded-md shadow-2xl">
            <div className="max-w-lg w-full shadow-2xl">
              <Image
                src={"/images/home/calle_laurel_1.png"}
                alt="calle_laurel_1.png"
                layout="responsive"
                width={2}
                height={1}
                objectFit="cover"
                className="rounded-md"
                priority={true}
              />
            </div>
            <div className="w-full self-center space-y-10">
              <div>
                <h1 className="text-white font-roboto font-bold text-4xl mb-4">
                  Tu lugar preferido
                </h1>
                <p className="font-roboto text-lg text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                  architecto quod aliquid sequi nam soluta, aperiam eius
                  voluptate necessitatibus cumque doloribus nostrum ex
                  dignissimos illo nobis laborum obcaecati rem id.
                </p>
              </div>
              <Link href={"/bares"} as={"/bares"}>
                <a
                  type="button"
                  className="hover:transition hover:ease-linear hover:duration-100 hover:transform hover:scale-105 text-white focus:ring-4 focus:ring-blue-300 cursor-pointer px-6 py-2 bg-black shadow-md rounded-[4px] border border-black font-roboto text-lg flex items-center w-fit"
                >
                  Descubre los bares
                  <AiOutlineArrowRight className="text-xl ml-4" />
                </a>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center lg:flex-row-reverse my-5 gap-10 bg-black p-10 rounded-md shadow-2xl">
            <div className="max-w-lg w-full">
              <Image
                src={"/images/home/calle_laurel_2.png"}
                alt="calle_laurel_2.png"
                layout="responsive"
                width={2}
                height={1}
                objectFit="cover"
                objectPosition={"top"}
                className="rounded-md"
                priority={true}
              />
            </div>
            <div className="w-full self-center space-y-10">
              <div>
                <h1 className="text-white font-roboto bg-clip-text text-transparent bg-gradient-to-t from-green-300 to-blue-600 font-bold text-4xl mb-4">
                  Un mundo de sensaciones
                </h1>
                <p className="font-roboto text-lg text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                  architecto quod aliquid sequi nam soluta, aperiam eius
                  voluptate necessitatibus cumque doloribus nostrum ex
                  dignissimos illo nobis laborum obcaecati rem id.
                </p>
              </div>
              <Link href={"/pinchos"} as={"/pinchos"}>
                <a
                  type="button"
                  className="hover:transition hover:ease-linear hover:duration-100 hover:transform hover:scale-105 text-black font-roboto px-6 py-2 bg-white focus:ring-4 focus:ring-blue-300 cursor-pointer rounded-[4px] border border-white text-lg flex items-center w-fit"
                >
                  Descubre los pinchos
                  <AiOutlineArrowRight className="text-xl ml-4" />
                </a>
              </Link>
            </div>
          </div>
          {/* TODO: add carrouseles con imagenes y con comentarios */}
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default Index;

export async function getServerSideProps(context: any) {
  const { user_token } = context.req.cookies;

  const tokenData = await getTokenData(user_token);

  const response = await fetch(API_URL + `user?correo=${tokenData?.correo}`);

  const user = await response.json();

  return {
    props: { user },
  };
}
