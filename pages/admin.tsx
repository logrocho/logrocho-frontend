import axios from "axios";
import Cookies from "js-cookie";
import { InferGetStaticPropsType } from "next";
import React, { useEffect } from "react";
import { API_URL } from "../lib/const";
import { BiLogOut } from "react-icons/bi";
import { useState } from "@hookstate/core";

// TODO: Usar tailwindcss classname para controlar los estilos de css
function Admin(): JSX.Element {
  const tabla_data = useState("");

  async function loadTable(tabla: string) {}

  return (
    <React.Fragment>
      <div className="flex h-screen p-5 gap-5">
        <div className="w-full space-y-5">
          <div className="p-10  rounded-md shadow-md bg-white grid-cols">buscador y filtros</div>

          <div className="p-10  rounded-md shadow-md bg-white grid-cols">tabla</div>
        </div>

        <nav className="p-10 bg-white w-fit h-full ml-auto rounded-md shadow-md flex flex-col justify-between items-center">
          <h1 className="text-black font-caveat font-bold text-6xl bg-white">Logrocho</h1>
          <div className="flex flex-col items-stretch space-y-10 bg-white">
            <button name="bares" className="bg-green-600 text-white text-xl font-semibold font-roboto uppercase py-4 px-12 rounded-md shadow-md">
              Bares
            </button>
            <button name="pinchos" className=" border-4 border-green-600 text-green-600 bg-white text-xl font-semibold font-roboto uppercase py-4 px-12 rounded-md shadow-md">
              Pinchos
            </button>
            <button name="usuarios" className=" border-4 border-green-600 text-green-600 bg-white text-xl font-semibold font-roboto uppercase py-4 px-12 rounded-md shadow-md">
              usuarios
            </button>
            <button name="resenas" className=" border-4 border-green-600 text-green-600 bg-white text-xl font-semibold font-roboto uppercase py-4 px-12 rounded-md shadow-md">
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

export default Admin;
