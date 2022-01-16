import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function Index():JSX.Element {
  return (
    <div>
      <Head>
        <title>Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <div className="mt-10 text-center">
          <Link href={"/login"} as={"/login"}>
            <a className="p-2 bg-green-600 text-white font-roboto uppercase text-xl shadow-md rounded-md">
              Login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
