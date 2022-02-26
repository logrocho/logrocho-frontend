import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { getTokenData } from "../lib/auth";
import { API_URL } from "../lib/const";

export async function getServerSideProps(context: any) {
  const { user_token } = context.req.cookies;

  const tokenData = await getTokenData(user_token);

  const response = await fetch(API_URL + `user?correo=${tokenData?.correo}`);

  const user = await response.json();

  const req = await fetch(
    API_URL + "bares?limit=9999999&offset=0&key=&order=id&direction=ASC"
  );

  const bares = await req.json();
  
  return {
    props: { user, bares },
  };
}

export default function MapaPage({ user, bares }) {
  const Map = dynamic(() => import("../components/MapaComponent"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return (
    <React.Fragment>
      <Head>
        <title>Mapa - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <div className="py-12">
          <Map bares={bares} />
        </div>
      </Layout>
    </React.Fragment>
  );
}
