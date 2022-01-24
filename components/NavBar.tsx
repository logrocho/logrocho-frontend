import { useState } from "@hookstate/core";
import Head from "next/head";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

function DesktopNavBar() {
  return (
    <div className="bg-white shadow-md m-2 rounded-lg flex items-center justify-between p-5">
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

      <button
        type="button"
        className="flex items-center focus:outline-none"
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
  );
}

function MobileNavBar() {
  const menuOpen = useState<boolean>(true);

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

export default function NavBar() {
  return (
    <header>
      <nav className="hidden sm:block">
        <DesktopNavBar />
      </nav>

      <nav className="block sm:hidden">
        <MobileNavBar />
      </nav>
    </header>
  );
}
