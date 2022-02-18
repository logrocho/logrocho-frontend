import { useState } from "@hookstate/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { getTokenData } from "../lib/auth";
import { API_URL } from "../lib/const";

function DesktopNavBar({ user }: any) {
  const router = useRouter();

  return (
    <div className="bg-white border-2 space-x-6 shadow-md m-2 rounded-lg flex items-center justify-between p-5">
      <Link href={"/home"} as={"/home"}>
        <a className="text-4xl font-bold text-gray-800 font-caveat  ">
          Logrocho
        </a>
      </Link>

      {/* //TODO: Eliminar console.log */}
      {console.log(router)}

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
        <Link href={"/"}>
          <a className="  flex items-center">
            <p className="mx-2 font-roboto   text-sm capitalize font-medium text-gray-700">
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

function MobileNavBar() {
  const menuOpen = useState<boolean>(false);

  return (
    <div className="bg-white shadow-md m-2 rounded-lg flex flex-col p-5">
      <div className="bg-white flex items-center justify-between">
        <Link href={"/home"} as={"/home"}>
          <a className="text-2xl font-bold text-gray-800 my-1 max-w-xs font-caveat  ">
            Logrocho
          </a>
        </Link>

        <div className="flex md:hidden">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            aria-label="toggle menu"
          >
            <GiHamburgerMenu onClick={(e) => menuOpen.set(!menuOpen.get())} />
          </button>
        </div>
      </div>
      <div
        className={`${menuOpen.get() ? "  space-y-2" : "hidden"}`}
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

          <h3 className="mx-2 font-roboto   text-sm font-medium text-gray-700">
            Sergio Malagon
          </h3>
        </button>
      </div>
    </div>
  );
}

export default function NavBar({ user }: any) {
  return (
    <header className="sticky top-0 z-50">
      <nav className="hidden lg:block">
        <DesktopNavBar user={user} />
      </nav>

      <nav className="block lg:hidden">
        <MobileNavBar />
      </nav>
    </header>
  );
}
