import axios from "axios";
import Cookies from "js-cookie";
import { InferGetStaticPropsType } from "next";
import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import { API_URL } from "../../lib/const";
import { BiLogOut } from "react-icons/bi";
import { useState } from "@hookstate/core";
import useSWR, { SWRConfig } from "swr";
import AdminTable from "../../components/AdminTable";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Page(): JSX.Element {
  const pageIndex = useState<number>(0);

  const tabla = useState<string>("bares");

  const { data, error } = useSWR(`/api/${tabla.get()}?page=${pageIndex.get()}`, fetcher);

  async function actualizarTabla(e: any) {
    tabla.set(e.target.name);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Panel admin - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen p-5 gap-5 max-w-screen-2xl mx-auto">
        <div className="w-full space-y-5 overflow-auto">
          <div className="py-5 rounded-md shadow-md bg-white grid-cols">
            <div className="flex items-center justify-center space-x-8 bg-transparent">
              <label htmlFor="filtroNombre" className="bg-transparent font-medium font-roboto text-xl">
                Filtrar por nombre
              </label>
              <input name="filtroNombre" type="text" className="border-2 border-gray-200 rounded-md" />
            </div>
          </div>

          <div className="overflow-auto shadow-md sm:rounded-lg bg-white">
            {!data ? (
              <div className="text-black font-roboto text-5xl p-10 text-center bg-white animate-pulse">
                <p>Cargando...</p>
              </div>
            ) : error ? (
              <div className="text-red font-roboto text-5xl p-10 text-center bg-white">
                <p>Error al cargar los datos</p>
              </div>
            ) : (
              <AdminTable valor={tabla.get()} data={data.data} />
            )}
          </div>
        </div>

        <nav className="p-10 overflow-x-hidden space-y-10 bg-white h-full rounded-md shadow-md flex flex-col justify-between items-center">
          <h1 className="text-black font-caveat font-bold text-6xl bg-white">Logrocho</h1>
          <div className="flex flex-col items-stretch space-y-10 bg-white">
            <button name="bares" className={`${tabla.get() === "bares" ? "admin_nav_btn_active" : "admin_nav_btn_inactive"}`} onClick={(e) => actualizarTabla(e)}>
              Bares
            </button>
            <button name="pinchos" className={`${tabla.get() === "pinchos" ? "admin_nav_btn_active" : "admin_nav_btn_inactive"}`} onClick={(e) => actualizarTabla(e)}>
              Pinchos
            </button>
            <button name="usuarios" className={`${tabla.get() === "usuarios" ? "admin_nav_btn_active" : "admin_nav_btn_inactive"}`}>
              usuarios
            </button>
            <button name="resenas" className={`${tabla.get() === "resenas" ? "admin_nav_btn_active" : "admin_nav_btn_inactive"}`}>
              pinchos
            </button>
          </div>

          <div className="shadow-md rounded-full">
            <button className="p-5 rounded-full bg-red-600 text-white text-3xl transform rotate-180">
              <BiLogOut className="bg-red-600" />
            </button>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
}
