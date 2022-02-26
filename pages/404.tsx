import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <React.Fragment>
      <Head>
        <title> 404 - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 min-h-screen flex flex-col justify-center">
        <p className="text-black font-roboto font-black text-9xl text-center">
          404
        </p>
        <p className="text-black font-roboto text-2xl font-light text-center">
          Ups!, La página que buscas no existe.
        </p>
        <Link href={"/"} as={"/"}>
          <a className="text-white text-center max-w-xs mx-auto font-medium font-roboto bg-black py-3 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black my-5">
            Volver a inicio
          </a>
        </Link>
      </div>
    </React.Fragment>
  );
}
