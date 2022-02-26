import { useState } from "@hookstate/core";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { getTokenData } from "../lib/auth";
import { API_URL, IMG_URL } from "../lib/const";
import Cookies from "js-cookie";

function DesktopNavBar({ user }: any) {
  const router = useRouter();

  function logout() {
    Cookies.remove("user_token");

    router.reload();
  }

  return (
    <div className="bg-white border-2 space-x-6 shadow-md m-2 rounded-lg flex items-center justify-between p-5">
      <Link href={"/home"} as={"/home"}>
        <a className="text-4xl font-bold text-gray-800 font-caveat  ">
          Logrocho
        </a>
      </Link>
      <div className="ml-2 space-x-5 grow  ">
        <Link href={"/bares"} as={"/bares"}>
          <a
            className={`${
              router.pathname === "/bares"
                ? "text-white bg-green-600 shadow-md rounded-md px-10 py-2 font-roboto font-bold border-2 border-green-600"
                : "text-green-600 bg-white shadow-md rounded-md px-10 py-2 font-roboto font-bold border-2 border-green-600"
            }`}
          >
            Bares
          </a>
        </Link>
        <Link href={"/pinchos"} as={"/pinchos"}>
          <a
            className={`${
              router.pathname === "/pinchos"
                ? "text-white bg-green-600 shadow-md rounded-md px-10 py-2 font-roboto font-bold border-2 border-green-600"
                : "text-green-600 bg-white shadow-md rounded-md px-10 py-2 font-roboto font-bold border-2 border-green-600"
            }`}
          >
            Pinchos
          </a>
        </Link>
      </div>

      {user.status ? (
        <React.Fragment>
          {user.data.rol === "admin" ? (
            <Link href={"/admin/bares"}>
              <a className="font-roboto font-medium bg-blue-600 text-white rounded-md py-1 px-4 scale-110">
                Admin
              </a>
            </Link>
          ) : null}
          <button
            onClick={(e) => logout()}
            className="font-roboto text-sm text-white bg-red-600 rounded-md py-1 px-4"
          >
            Cerrar Sesion
          </button>
          <Link
            href={{
              pathname: "/usuario/[idUsuario]",
              query: { idUsuario: user.data.id },
            }}
          >
            <a className="  flex items-center">
              <p className="mx-2 font-roboto   text-sm capitalize font-medium text-gray-700">
                {user.data.nombre} {user.data.apellidos}
              </p>
              <div className="w-8 h-8 bg-black overflow-hidden border-2 border-gray-400 rounded-full">
                <Image
                  src={
                    user.data.img !== ""
                      ? IMG_URL +
                        `img_usuarios/${user.data.id}/${user.data.img}`
                      : "https://via.placeholder.com/468?text=Imagen+no+disponible"
                  }
                  alt={user.data.img ?? "placeholder"}
                  layout="responsive"
                  width={1}
                  height={1}
                  objectFit="cover"
                  className="rounded-full"
                  priority={true}
                />
              </div>
            </a>
          </Link>
        </React.Fragment>
      ) : (
        <div className="space-x-5">
          <Link href={"/login"} as={"/login"}>
            <a className="text-green-600 bg-white shadow-md rounded-md px-6 py-2 font-roboto font-bold border-2 border-green-600">
              Iniciar Sesion
            </a>
          </Link>
          <Link href={"/registro"} as={"/registro"}>
            <a className="text-white bg-green-600 shadow-md rounded-md px-6 py-2 font-roboto font-bold border-2 border-green-600">
              Registrarse
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

function MobileNavBar({ user }) {
  const router = useRouter();
  const menuOpen = useState<boolean>(false);

  function logout() {
    Cookies.remove("user_token");

    router.reload();
  }

  return (
    <div className="bg-white shadow-md m-2 rounded-lg flex flex-col p-5">
      <div className="bg-white flex items-center justify-between">
        <Link href={"/home"} as={"/home"}>
          <a className="text-2xl font-bold text-gray-800 my-1 max-w-xs font-caveat  ">
            Logrocho
          </a>
        </Link>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="toggle menu"
          >
            <GiHamburgerMenu onClick={(e) => menuOpen.set(!menuOpen.get())} />
          </button>
        </div>
      </div>
      {menuOpen.get() ? (
        <React.Fragment>
          <div className="flex flex-col space-y-4 mt-2">
            <Link href={"/bares"} as={"/bares"}>
              <a
                className={`${
                  router.pathname === "/bares"
                    ? "text-white text-center bg-green-600 shadow-md rounded-md px-10 py-2 font-roboto font-bold border-2 border-green-600"
                    : "text-green-600 text-center bg-white shadow-md rounded-md px-10 py-2 font-roboto font-bold border-2 border-green-600"
                }`}
              >
                Bares
              </a>
            </Link>
            <Link href={"/pinchos"} as={"/pinchos"}>
              <a
                className={`${
                  router.pathname === "/pinchos"
                    ? "text-white bg-green-600 text-center shadow-md rounded-md px-10 py-2 font-roboto font-bold border-2 border-green-600"
                    : "text-green-600 bg-white text-center shadow-md rounded-md px-10 py-2 font-roboto font-bold border-2 border-green-600"
                }`}
              >
                Pinchos
              </a>
            </Link>
            <hr className="border border-gray-300" />
            {user.status ? (
              <React.Fragment>
                {user.data.rol === "admin" ? (
                  <Link href={"/admin/bares"}>
                    <a className="font-roboto text-center font-medium bg-blue-600 text-white rounded-md py-1">
                      Admin
                    </a>
                  </Link>
                ) : null}
                <button
                  onClick={(e) => logout()}
                  className="font-roboto text-sm text-white bg-red-600 rounded-md py-1 px-4"
                >
                  Cerrar Sesion
                </button>
                <Link
                  href={{
                    pathname: "/usuario/[idUsuario]",
                    query: { idUsuario: user.data.id },
                  }}
                >
                  <a className="flex items-center">
                    <p className="mx-2 font-roboto   text-sm capitalize font-medium text-gray-700">
                      {user.data.nombre} {user.data.apellidos}
                    </p>
                    <div className="w-8 h-8 bg-black overflow-hidden border-2 border-gray-400 rounded-full">
                      <Image
                        src={
                          user.data.img !== ""
                            ? IMG_URL +
                              `img_usuarios/${user.data.id}/${user.data.img}`
                            : "https://via.placeholder.com/468?text=Imagen+no+disponible"
                        }
                        alt={user.data.img ?? "placeholder"}
                        layout="responsive"
                        width={1}
                        height={1}
                        objectFit="cover"
                        className="rounded-full"
                        priority={true}
                      />
                    </div>
                  </a>
                </Link>
              </React.Fragment>
            ) : (
              <div className="space-y-5 flex flex-col">
                <Link href={"/login"} as={"/login"}>
                  <a className="text-green-600 bg-white shadow-md rounded-md px-6 py-2 font-roboto font-bold border-2 border-green-600">
                    Iniciar Sesion
                  </a>
                </Link>
                <Link href={"/registro"} as={"/registro"}>
                  <a className="text-white bg-green-600 shadow-md rounded-md px-6 py-2 font-roboto font-bold border-2 border-green-600">
                    Registrarse
                  </a>
                </Link>
              </div>
            )}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default function NavBar({ user }: any) {
  return (
    <header className="">
      <nav className="hidden lg:block">
        <DesktopNavBar user={user} />
      </nav>

      <nav className="block lg:hidden">
        <MobileNavBar user={user} />
      </nav>
    </header>
  );
}
