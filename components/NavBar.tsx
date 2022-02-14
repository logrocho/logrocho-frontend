import { useState } from "@hookstate/core";
import Head from "next/head";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { getTokenData } from "../lib/auth";
import { API_URL } from "../lib/const";

function DesktopNavBar({ user }: any) {
  return (
    <div className="bg-white border-2 shadow-md m-2 rounded-lg flex items-center justify-between p-5">
      <div className="bg-transparent flex items-center space-x-5">
        <Link href={"/home"} as={"/home"}>
          <a className="text-2xl font-bold text-gray-800 font-caveat bg-transparent">
            Logrocho
          </a>
        </Link>

        <div className="ml-2 space-x-5 bg-transparent">
          <Link href={"#"} as={"#"}>
            <a className="navBar_a_desktop">Bares</a>
          </Link>
          <Link href={"#"} as={"#"}>
            <a className="navBar_a_desktop">Pinchos</a>
          </Link>
        </div>
      </div>

      {user.status ? (
        <Link href={"/"}>
          <a className="bg-transparent flex items-center">
            <p className="mx-2 font-roboto bg-transparent text-sm capitalize font-medium text-gray-700 dark:text-gray-200 ">
              {user.data.nombre} {user.data.apellidos}
            </p>
            <div className="w-8 h-8 bg-black overflow-hidden border-2 border-gray-400 rounded-full">
              {
                //TODO: Obtener imagen del perfil
              }
            </div>
          </a>
        </Link>
      ) : (
        <div className="space-x-5">
          <Link href={"/registro"} as={"/registro"}>
            <a className="text-white bg-green-600 shadow-md rounded-md px-6 py-2 font-roboto font-bold border-2 border-green-600">
              Registrarse
            </a>
          </Link>

          <Link href={"/login"} as={"/login"}>
            <a className="text-green-600 bg-white shadow-md rounded-md px-6 py-2 font-roboto font-bold border-2 border-green-600">
              Iniciar Sesion
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

function MobileNavBar() {
  const menuOpen = useState<boolean>(false);

  return (
    <div className="bg-white shadow-md m-2 rounded-lg flex flex-col p-5">
      <div className="bg-white flex items-center justify-between">
        <Link href={"/home"} as={"/home"}>
          <a className="text-2xl font-bold text-gray-800 my-1 max-w-xs font-caveat bg-transparent">
            Logrocho
          </a>
        </Link>

        <div className="flex md:hidden">
          <button
            type="button"
            className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
            aria-label="toggle menu"
          >
            <GiHamburgerMenu onClick={(e) => menuOpen.set(!menuOpen.get())} />
          </button>
        </div>
      </div>
      <div
        className={`${menuOpen.get() ? "bg-transparent space-y-2" : "hidden"}`}
      >
        <Link href={"#"} as={"#"}>
          <a className="navBar_a_mobile">Bares</a>
        </Link>

        <Link href={"#"} as={"#"}>
          <a className="navBar_a_mobile">Pinchos</a>
        </Link>

        <button
          type="button"
          className="flex items-center w-full"
          aria-label="toggle profile dropdown"
        >
          <div className="w-8 h-8 bg-black overflow-hidden border-2 border-gray-400 rounded-full">
            {
              //TODO: Obtener imagen del perfil
            }
          </div>

          <h3 className="mx-2 font-roboto bg-transparent text-sm font-medium text-gray-700 dark:text-gray-200 ">
            Sergio Malagon
          </h3>
        </button>
      </div>
    </div>
  );
}

export default function NavBar({ user }: any) {
  return (
    <header>
      <nav className="hidden sm:block">
        <DesktopNavBar user={user} />
      </nav>

      <nav className="block sm:hidden">
        <MobileNavBar />
      </nav>
    </header>
  );
}
