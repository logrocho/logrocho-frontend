import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import { getTokenData } from "../lib/auth";
import { API_URL } from "../lib/const";

export default function Bares({ user }: any) {
  return (
    <React.Fragment>
      <Head>
        <title>Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}></Layout>
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
