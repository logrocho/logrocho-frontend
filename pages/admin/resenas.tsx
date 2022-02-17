import axios from "axios";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "@hookstate/core";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import ResenaForm from "../../components/admin/forms/ResenaForm";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Page(): JSX.Element {
  const lastDirection = useState("");

  const form = useState<number>(0);

  const showForm = useState(false);

  const limit = useState(5);

  const key = useState("");

  const order = useState("id");

  const direction = useState("ASC");

  const offset = useState(0);

  const { data, error } = useSWR(
    `/api/resenas?limit=${limit.get()}&offset=${offset.get()}&key=${key.get()}&order=${order.get()}&direction=${direction.get()}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const { mutate } = useSWRConfig();

  function mostrarForm(indexForm: number) {
    showForm.set(!showForm.get());

    form.set(indexForm);
  }

  function cambiarOrden(columna: any) {
    if (order.get() === columna.target.id) {
      if (direction.get() === "ASC") {
        direction.set("DESC");
      } else {
        direction.set("ASC");
      }
    } else {
      order.set(columna.target.id);
      direction.set("ASC");
    }
  }

  function eliminarResena(resena: any) {
    mutate(
      `/api/resenas?limit=${limit.get()}&offset=${offset.get()}&key=${key.get()}&order=${order.get()}&direction=${direction.get()}`,
      { ...data },
      false
    );

    axios({
      method: "POST",
      url: "/api/deleteResena",
      data: {
        resena: resena,
      },
    });

    mutate(
      `/api/resenas?limit=${limit.get()}&offset=${offset.get()}&key=${key.get()}&order=${order.get()}&direction=${direction.get()}`
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>Panel admin - Reseñas - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="px-10 py-3 bg-white m-2 rounded-md shadow-md flex flex-row flex-wrap justify-between items-center">
        <h1 className="text-black font-caveat font-bold text-6xl bg-transparent">
          Logrocho
        </h1>

        <div className="flex flex-row flex-wrap bg-transparent items-center space-x-5">
          <Link href={"/admin/bares"} as={"/admin/bares"}>
            <a className="admin_nav">Bares</a>
          </Link>
          <Link href={"/admin/pinchos"} as={"/admin/pinchos"}>
            <a className="admin_nav">Pinchos</a>
          </Link>
          <Link href={"/admin/resenas"} as={"/admin/resenas"}>
            <a className="admin_nav_active">Reseñas</a>
          </Link>
          <Link href={"/admin/usuarios"} as={"/admin/usuarios"}>
            <a className="admin_nav">Usuarios</a>
          </Link>
        </div>

        <div className="shadow-md rounded-full">
          <Link href={"/home"} as={"/home"}>
            <a className="px-5 py-2 rounded-md bg-white border-4 font-roboto font-medium text-xl border-red-600 text-red-600">
              Volver
            </a>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-screen-2xl">
        <div className="bg-white m-2 p-2 shadow-md rounded-lg border-2">
          <div className="py-5 rounded-md shadow-md bg-white my-2 grid-cols border-2">
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
                onChange={(e) => key.set(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white flex justify-between border-2 shadow-md my-2 rounded-md">
            <button
              onClick={(e) => {
                lastDirection.set("anterior");
                offset.set((p) => p - limit.get());
              }}
              className={`${
                offset.get() === 0
                  ? "m-2 uppercase text-center font-roboto font-medium bg-slate-200 text-gray-300 px-6 py-3 rounded-md shadow-md"
                  : "m-2 uppercase text-center font-roboto font-medium bg-green-600 text-white px-6 py-3 rounded-md shadow-md"
              }`}
              disabled={offset.get() === 0}
            >
              Anterior
            </button>
            <div className="bg-transparent px-4">
              <label
                htmlFor="paginacion"
                className="font-roboto text-lg bg-transparent text-black mr-2 "
              >
                Numero de resultados:
              </label>
              <select
                className="shadow-md rounded-md m-2 px-6 py-3"
                name="paginacion"
                id="paginacion"
                onChange={(e) => {
                  limit.set(Number.parseInt(e.target.value));
                  offset.set(0);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={99999}>Todos</option>
              </select>
            </div>
            <button
              onClick={(e) => {
                lastDirection.set("siguiente");
                offset.set((p) => p + limit.get());
              }}
              className={`${
                offset.get() + limit.get() >= data?.data.count
                  ? "m-2 uppercase text-center font-roboto font-medium bg-slate-200 text-gray-300 px-6 py-3 rounded-md shadow-md"
                  : "m-2 uppercase text-center font-roboto font-medium bg-green-600 text-white px-6 py-3 rounded-md shadow-md"
              }`}
              disabled={offset.get() + limit.get() >= data?.data.count}
            >
              Siguiente
            </button>
          </div>
          <div className="rounded-lg shadow-md bg-white border-l-2 border-t-2 border-r-2">
            {error ? <div>Error al obtener los datos</div> : null}

            {!data ? <div>Cargando....</div> : null}

            <table className="table-auto w-full">
              <thead className="bg-gray-100">
                <tr className="border-b-2 ">
                  <th
                    id="id"
                    onClick={(e) => cambiarOrden(e)}
                    className="py-3 px-6  cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                  >
                    id
                    {order.get() === "id" ? "(" + direction.get() + ")" : ""}
                  </th>
                  <th
                    id="usuario"
                    onClick={(e) => cambiarOrden(e)}
                    className="py-3 px-6 cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                  >
                    usuario
                    {order.get() === "usuario"
                      ? "(" + direction.get() + ")"
                      : ""}
                  </th>
                  <th
                    id="pincho"
                    onClick={(e) => cambiarOrden(e)}
                    className="py-3 px-6 cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                  >
                    pincho
                    {order.get() === "pincho"
                      ? "(" + direction.get() + ")"
                      : ""}
                  </th>
                  <th
                    id="mensaje"
                    onClick={(e) => cambiarOrden(e)}
                    className="py-3 px-6 cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                  >
                    mensaje
                    {order.get() === "mensaje"
                      ? "(" + direction.get() + ")"
                      : ""}
                  </th>

                  <th
                    id="puntuacion"
                    onClick={(e) => cambiarOrden(e)}
                    className="py-3 px-6 cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                  >
                    puntuacion
                    {order.get() === "puntuacion"
                      ? "(" + direction.get() + ")"
                      : ""}
                  </th>

                  <th className="py-3 px-6 cursor-pointer text-xs font-medium text-center tracking-wider text-black uppercase bg-white">
                    Administrar
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.resenas.map((resena: any, index: number) => (
                  <React.Fragment key={index}>
                    <tr className="border-b-2">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">
                        {resena.id}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">
                        {resena.usuario.nombre}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">
                        {resena.pincho.nombre}
                      </td>
                      <td className="py-4 px-6 text-sm max-w-0 truncate font-medium text-gray-900 whitespace-nowrap bg-white">
                        {resena.mensaje}
                      </td>
                      <td className="py-4 px-6 text-sm max-w-0 truncate font-medium text-gray-900 whitespace-nowrap bg-white">
                        {resena.puntuacion}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-center whitespace-nowrap bg-white space-x-2">
                        <button
                          onClick={() => mostrarForm(index)}
                          className="text-green-600 font-roboto text-center uppercase font-medium py-1 px-4 bg-white shadow-md rounded-md border-2 border-green-600"
                        >
                          Ver ficha
                        </button>
                        <button
                          onClick={() => eliminarResena(resena)}
                          className="text-white font-roboto text-center uppercase font-medium py-1 px-4 bg-red-600 shadow-md rounded-md border-2 border-red-600 hover:bg-red-900 hover:border-red-900"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>

                    {showForm.get() && form.get() === index ? (
                      <tr>
                        <td colSpan={6} className="bg-green-50">
                          <ResenaForm ResenaData={resena} />
                        </td>
                      </tr>
                    ) : null}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
