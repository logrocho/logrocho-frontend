import axios from "axios";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "@hookstate/core";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import { useRouter } from "next/router";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Page(): JSX.Element {
  const limit = useState(5);

  const order = useState("id");

  const direction = useState("ASC");

  const offset = useState(0);

  const colId = useState(true);

  const colCorreo = useState(true);

  const colNombre = useState(true);

  const colApellidos = useState(true);

  const colRol = useState(true);

  const colAdmin = useState(true);

  const { data, error } = useSWR(
    `/api/users?limit=${limit.get()}&offset=${offset.get()}&key=&order=${order.get()}&direction=${direction.get()}`,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const router = useRouter();

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

  async function eliminarUsuario(usuario: any) {
    await axios({
      method: "POST",
      url: "/api/deleteUsuario",
      data: {
        user: usuario,
      },
    });

    router.reload();
  }

  return (
    <React.Fragment>
      <Head>
        <title>Panel admin - Usuarios - Logrocho</title>
        <meta name="description" content="Logrocho by Sergio Malagon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="px-10 py-3 bg-white m-2 rounded-md shadow-md flex flex-row flex-wrap justify-between items-center">
        <h1 className="text-black font-caveat font-bold text-6xl  ">
          Logrocho
        </h1>

        <div className="flex flex-row flex-wrap   items-center space-x-5">
          <Link href={"/admin/bares"} as={"/admin/bares"}>
            <a className="admin_nav">Bares</a>
          </Link>
          <Link href={"/admin/pinchos"} as={"/admin/pinchos"}>
            <a className="admin_nav">Pinchos</a>
          </Link>
          <Link href={"/admin/resenas"} as={"/admin/resenas"}>
            <a className="admin_nav">Reseñas</a>
          </Link>
          <Link href={"/admin/usuarios"} as={"/admin/usuarios"}>
            <a className="admin_nav_active">Usuarios</a>
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
            <div className="flex justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-x-2">
                <label htmlFor="colId">ID</label>
                <input
                  type="checkbox"
                  name="colId"
                  id="colId"
                  checked={colId.get()}
                  onChange={(e) => colId.set(!colId.get())}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <label htmlFor="colCorreo">Correo</label>
                <input
                  type="checkbox"
                  name="colCorreo"
                  id="colCorreo"
                  checked={colCorreo.get()}
                  onChange={(e) => colCorreo.set(!colCorreo.get())}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <label htmlFor="colNombre">Nombre</label>
                <input
                  type="checkbox"
                  name="colNombre"
                  id="colNombre"
                  checked={colNombre.get()}
                  onChange={(e) => colNombre.set(!colNombre.get())}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <label htmlFor="colApellidos">Apellidos</label>
                <input
                  type="checkbox"
                  name="colApellidos"
                  id="colApellidos"
                  checked={colApellidos.get()}
                  onChange={(e) => colApellidos.set(!colApellidos.get())}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <label htmlFor="colRol">Rol</label>
                <input
                  type="checkbox"
                  name="colRol"
                  id="colRol"
                  checked={colRol.get()}
                  onChange={(e) => colRol.set(!colRol.get())}
                />
              </div>

              <div className="flex items-center gap-x-2">
                <label htmlFor="colAdmin">Administrar</label>
                <input
                  type="checkbox"
                  name="colAdmin"
                  id="colAdmin"
                  checked={colAdmin.get()}
                  onChange={(e) => colAdmin.set(!colAdmin.get())}
                />
              </div>
            </div>
          </div>

          <div className="bg-white flex justify-between border-2 shadow-md my-2 rounded-md">
            <button
              onClick={(e) => {
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
            <div className="  px-4">
              <label
                htmlFor="paginacion"
                className="font-roboto text-lg   text-black mr-2 "
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
                  {colId.get() ? (
                    <th
                      id="id"
                      onClick={(e) => cambiarOrden(e)}
                      className="py-3 px-6  cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                    >
                      id
                      {order.get() === "id" ? "(" + direction.get() + ")" : ""}
                    </th>
                  ) : null}
                  {colCorreo.get() ? (
                    <th
                      id="correo"
                      onClick={(e) => cambiarOrden(e)}
                      className="py-3 px-6 cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                    >
                      correo
                      {order.get() === "correo"
                        ? "(" + direction.get() + ")"
                        : ""}
                    </th>
                  ) : null}
                  {colNombre.get() ? (
                    <th
                      id="nombre"
                      onClick={(e) => cambiarOrden(e)}
                      className="py-3 px-6 cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                    >
                      nombre
                      {order.get() === "nombre"
                        ? "(" + direction.get() + ")"
                        : ""}
                    </th>
                  ) : null}
                  {colApellidos.get() ? (
                    <th
                      id="apellidos"
                      onClick={(e) => cambiarOrden(e)}
                      className="py-3 px-6 cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                    >
                      apellidos
                      {order.get() === "apellidos"
                        ? "(" + direction.get() + ")"
                        : ""}
                    </th>
                  ) : null}
                  {colRol.get() ? (
                    <th
                      id="rol"
                      onClick={(e) => cambiarOrden(e)}
                      className="py-3 px-6 cursor-pointer text-xs font-medium tracking-wider text-left text-black uppercase bg-white"
                    >
                      rol
                      {order.get() === "rol" ? "(" + direction.get() + ")" : ""}
                    </th>
                  ) : null}
                  {colAdmin.get() ? (
                    <th className="py-3 px-6 cursor-pointer text-xs font-medium text-center tracking-wider text-black uppercase bg-white">
                      Administrar
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {data?.data.users.map((user: any, index: number) => (
                  <React.Fragment key={index}>
                    <tr className="border-b-2">
                      {colId.get() ? (
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">
                          {user.id}
                        </td>
                      ) : null}
                      {colCorreo.get() ? (
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">
                          {user.correo}
                        </td>
                      ) : null}
                      {colNombre.get() ? (
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">
                          {user.nombre}
                        </td>
                      ) : null}
                      {colApellidos.get() ? (
                        <td className="py-4 px-6 text-sm max-w-0 truncate font-medium text-gray-900 whitespace-nowrap bg-white">
                          {user.apellidos}
                        </td>
                      ) : null}
                      {colRol.get() ? (
                        <td className="py-4 px-6 text-sm max-w-0 truncate font-medium text-gray-900 whitespace-nowrap bg-white">
                          {user.rol}
                        </td>
                      ) : null}
                      {colAdmin.get() ? (
                        <td className="py-4 flex justify-center px-6 text-sm font-medium text-center whitespace-nowrap bg-white space-x-2">
                          <button
                            onClick={() => eliminarUsuario(user)}
                            className="text-white font-roboto text-center uppercase font-medium py-1 px-4 bg-red-600 shadow-md rounded-md border-2 border-red-600 hover:bg-red-900 hover:border-red-900"
                          >
                            Eliminar
                          </button>
                        </td>
                      ) : null}
                    </tr>
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
