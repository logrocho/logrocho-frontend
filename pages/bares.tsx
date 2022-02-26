import { useState } from "@hookstate/core";
import axios from "axios";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import BarComponent from "../components/BarComponent";
import Layout from "../components/Layout";
import { getTokenData } from "../lib/auth";
import { API_URL } from "../lib/const";

export default function Bares({ user }) {
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const key = useState("");

  const order = useState("id");

  const { data, error } = useSWR(
    `/api/bares?limit=999999&offset=0&key=${key.get()}&order=${order.get()}&direction=ASC`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <React.Fragment>
      <Head>
        <title>Bares - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <div className="container mx-auto">
          {error || data?.satus ? <p>Error al obtener los datos</p> : null}
          {!data ? <p>Obteniendo bares...</p> : null}
          <div className="flex flex-wrap justify-center">
            {data?.data.bares.map((bar, index) => (
              <BarComponent key={index} bar={bar} />
            ))}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export async function getServerSideProps(context: any) {
  const { user_token } = context.req.cookies;

  const tokenData = await getTokenData(user_token);

  const response = await fetch(API_URL + `user?correo=${tokenData?.correo}`);

  const user = await response.json();

  return {
    props: { user },
  };
}
