import Link from "next/link";
import { BsReddit, BsTwitter, BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="px-2 lg:px-10 py-7 text-white bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center gap-2 lg:gap-10 mb-10">
          <Link href={"/contacto"} as={"/contacto"}>
            <a className="rounded-md p-1 focus:ring-2 focus:ring-blue-400 text-base font-roboto text-white hover:text-gray-200 hover:underline">
              Contacto
            </a>
          </Link>
          <Link href={"/mapa"} as={"/mapa"}>
            <a className="rounded-md p-1 focus:ring-2 focus:ring-blue-400 text-base font-roboto text-white hover:text-gray-200 hover:underline">
              Mapa
            </a>
          </Link>
          <Link href={"/"} as={"/"}>
            <a className="rounded-md p-1 focus:ring-2 focus:ring-blue-400 text-base font-roboto text-white hover:text-gray-200 hover:underline">
              Uso de cookies
            </a>
          </Link>
          <Link href={"/"} as={"/"}>
            <a className="rounded-md p-1 focus:ring-2 focus:ring-blue-400 text-base font-roboto text-white hover:text-gray-200 hover:underline">
              Politica de Privacidad
            </a>
          </Link>
          <Link href={"/"} as={"/"}>
            <a className="rounded-md p-1 focus:ring-2 focus:ring-blue-400 text-base font-roboto text-white hover:text-gray-200 hover:underline">
              NFTs
            </a>
          </Link>
        </div>
        <div>
          <h1 className="text-center mt-3 mb-6 font-roboto text-2xl font-medium text-white max-w-xl mx-auto">
            Unete a una gran comunidad y no te pierdas ninguna noticia, evento y
            mucho mas!!!
          </h1>

          <div className="bg-white max-w-fit rounded-md flex space-x-2 p-2 mx-auto">
            <input
              type="email"
              name="email_newsletter"
              id="email_newsletter"
              className="text-gray-800 border-0 outline-0 px-1"
              placeholder="Introduce tu email"
            />
            <button
              type="button"
              className="bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-300 font-roboto text-white py-1 px-3 rounded-md border-2 border-green-600"
            >
              Suscribirme
            </button>
          </div>
        </div>
        <hr className="max-w-7xl mt-6 mx-auto h-px border-gray-700" />
        <div className="flex justify-end items-center mt-3">
          <p className="mr-6 font-roboto text-lg text-white">
            Encuentranos en:
          </p>
          <div className="flex space-x-6">
            <a href="#">
              <BsTwitter className="text-3xl" />
            </a>
            <a href="#">
              <BsYoutube className="text-3xl" />
            </a>
            <a href="#">
              <BsReddit className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
