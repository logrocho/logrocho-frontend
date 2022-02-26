import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IMG_URL } from "../lib/const";
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";

export default function PinchoComponent({ pincho }) {
  return (
    <React.Fragment>
      <div className="px-7 py-4 w-96 rounded-md shadow-md border-2 bg-slate-50 m-10 space-y-3">
        <div className="shadow-md rounded-md">
          <Image
            src={`${
              pincho.img.length > 0
                ? IMG_URL +
                  `/img_pinchos/${pincho.id}/${pincho.img[0].filename}`
                : `https://via.placeholder.com/468?text=Imagen+no+disponible`
            }`}
            alt={`${
              pincho.img.length > 0 ? pincho.img[0].filename : "placeholder"
            }`}
            layout="responsive"
            width={1}
            height={1}
            objectFit="cover"
            className="rounded-md"
            priority={true}
          />
        </div>
        <div className="px-4 py-4 space-y-2 bg-white rounded-md shadow-md border-2">
          <div className="flex items-center">
            <p className="text-gray-900 font-roboto font-medium text-xl">
              {pincho.nombre}
            </p>
            <p className="flex items-center ml-auto font-roboto text-gray-900">
              ⭐ {pincho.puntuacion}
            </p>
          </div>
        </div>

        <Link
          href={{
            pathname: "/pincho/[idPincho]",
            query: { idPincho: pincho.id },
          }}
        >
          <a className="h-10 font-roboto bg-black text-white py-1 px-6 shadow-md rounded-md flex items-center justify-center">
            Ver mas info
            <AiOutlineArrowRight className="text-xl ml-4" />
          </a>
        </Link>
      </div>
    </React.Fragment>
  );
}
