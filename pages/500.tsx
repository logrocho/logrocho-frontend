import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Custom500() {
  return (
    <React.Fragment>
      <Head>
        <title> 500 - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto p-5 mt-10">
        <p className="text-black font-roboto font-black text-9xl text-center">
          500
        </p>
        <p className="text-black font-roboto text-2xl font-light text-center">
          Ups!, El servidor ha dejado de funcionar. Vuelve a intentarlo en unos
          minutos
        </p>
      </div>
    </React.Fragment>
  );
}
