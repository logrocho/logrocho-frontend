import React, { useEffect } from "react";
import Image from "next/image";
import { IMG_URL } from "../lib/const";
import { useState } from "@hookstate/core";
import axios from "axios";

export default function ResenaComponent({ resena }) {
  const isLiked = useState(resena.user_likes);

  const resenaPuntuacion = useState(resena.puntuacion);

  async function setLike() {
    await axios({
      method: "POST",
      url: "/api/setLikeResena",
      data: {
        id: resena.id,
      },
    });

    isLiked.set(true);
    resenaPuntuacion.set(Number.parseInt(resenaPuntuacion.get()) + 1);
  }

  async function removeLike() {
    await axios({
      method: "POST",
      url: "/api/removeLikeResena",
      data: {
        id: resena.id,
      },
    });

    isLiked.set(false);
    resenaPuntuacion.set(Number.parseInt(resenaPuntuacion.get()) - 1);
  }

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
          <div className="flex items-baseline gap-x-1">
            <p className="font-roboto">{resenaPuntuacion.get()}</p>
            {isLiked.get() ? (
              <button onClick={(e) => removeLike()}>❤️</button>
            ) : (
              <button onClick={(e) => setLike()}>🤍</button>
            )}
          </div>
        </div>
        <div className="p-2">
          <p className="font-roboto">{resena.mensaje}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
