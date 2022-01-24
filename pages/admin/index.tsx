import axios from "axios";
import Cookies from "js-cookie";
import { InferGetStaticPropsType } from "next";
import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import { API_URL } from "../../lib/const";
import { BiLogOut } from "react-icons/bi";
import { useState } from "@hookstate/core";
import useSWR, { SWRConfig } from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Page(): JSX.Element {
  const pageIndex = useState<number>(0);

  const tabla = useState<string>("bares");

  const { data, error } = useSWR(
    `/api/${tabla.get()}?page=${pageIndex.get()}`,
    fetcher
  );

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
        <div className="w-full space-y-5">
          <div className="py-5 rounded-md shadow-md bg-white grid-cols">
            <div className="flex items-center justify-center space-x-8 bg-transparent">
              <label
                htmlFor="filtroNombre"
                className="bg-transparent font-medium font-roboto text-xl"
              >
                Filtrar por nombre
              </label>
              <input
                name="filtroNombre"
                type="text"
                className="border-2 border-gray-200 rounded-md"
              />
            </div>
          </div>

          <div className="overflow-hidden shadow-md sm:rounded-lg bg-white">
            {!data ? (
              <p className="text-black font-roboto text-5xl p-10 text-center bg-white animate-pulse">
                Cargando...
              </p>
            ) : error ? (
              <p className="text-red font-roboto text-5xl p-10 text-center bg-white">
                Error al cargar los datos
              </p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr className="border-b-2">
                    {Object.keys(data.data[0]).map(
                      (titulo: string, index: number) => (
                        <th
                          key={index}
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                        >
                          {titulo}
                        </th>
                      )
                    )}
                    <th scope="col" className="relative py-3 px-6 bg-white">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((data: any, index: number) => (
                    <tr key={index} className="border-b">
                      {Object.values(data).map((value: any, index: number) => (
                        <td
                          key={index}
                          className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white"
                        >
                          {value}
                        </td>
                      ))}
                      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap bg-white">
                        <button className="text-white font-roboto uppercase font-medium text-base py-1 px-4 bg-blue-600 shadow-md rounded-md hover:bg-blue-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <nav className="p-10 overflow-x-hidden space-y-10 bg-white h-full rounded-md shadow-md flex flex-col justify-between items-center">
          <h1 className="text-black font-caveat font-bold text-6xl bg-white">
            Logrocho
          </h1>
          <div className="flex flex-col items-stretch space-y-10 bg-white">
            <button
              name="bares"
              className={`${
                tabla.get() === "bares"
                  ? "admin_nav_btn_active"
                  : "admin_nav_btn_inactive"
              }`}
              onClick={(e) => actualizarTabla(e)}
            >
              Bares
            </button>
            <button
              name="pinchos"
              className={`${
                tabla.get() === "pinchos"
                  ? "admin_nav_btn_active"
                  : "admin_nav_btn_inactive"
              }`}
              onClick={(e) => actualizarTabla(e)}
            >
              Pinchos
            </button>
            <button
              name="usuarios"
              className={`${
                tabla.get() === "usuarios"
                  ? "admin_nav_btn_active"
                  : "admin_nav_btn_inactive"
              }`}
            >
              usuarios
            </button>
            <button
              name="resenas"
              className={`${
                tabla.get() === "resenas"
                  ? "admin_nav_btn_active"
                  : "admin_nav_btn_inactive"
              }`}
            >
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
