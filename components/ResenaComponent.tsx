import React from "react";
import Image from "next/image";
import { IMG_URL } from "../lib/const";

export default function ResenaComponent({ resena }) {
  return (
    <React.Fragment>
      <div className="bg-white p-5 rounded-md shadow-md border flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src={
                  resena.usuario.img
                    ? IMG_URL +
                      `img_usuarios/${resena.usuario.id}/${resena.usuario.img}`
                    : "https://via.placeholder.com/468?text=Imagen+no+disponible"
                }
                alt={resena.usuario.img}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                priority={true}
              />
            </div>
            <p className="font-roboto capitalize">
              {resena.usuario.nombre_apellidos}
            </p>
          </div>
          <p className="font-roboto">{resena.puntuacion}</p>
        </div>
        <div className="p-2">
          <p className="font-roboto">{resena.mensaje}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
