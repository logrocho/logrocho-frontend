import { useState } from "@hookstate/core";
import { Field, Form, Formik, validateYupSchema } from "formik";
import React from "react";
import * as Yup from "yup";

function BaresTabla({ data }: any) {
  const form = useState<number>(0);

  const showForm = useState<boolean>(false);

  function mostrarForm(indexForm: number) {
    showForm.set(true);

    form.set(indexForm);
  }

  const adminSchema = Yup.object().shape({
    email: Yup.string().required("El email es obligatorio").email(),

    password: Yup.string()
      .min(8, "La contraseña tiene que tener al menos 8 caracteres")
      .matches(/^[a-zA-Z0-9]{8,}$/, "La contraseña tiene que tener una minúscula, una mayúscula y un dígito")
      .required("La contraseña es obligatoria"),
  });

  return (
    <table className="w-full">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr className="border-b-2">
          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">id</th>
          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">nombre</th>
          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">localizacion</th>
          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">informacion</th>

          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">img</th>
          <th className="py-3 px-6 text-xs font-medium text-center tracking-wider text-black uppercase bg-white">Administrar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((bar: any, index: number) => (
          <React.Fragment key={index}>
            <tr className="border-b">
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">{bar.id}</td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">{bar.nombre}</td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">{bar.localizacion}</td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">{bar.informacion}</td>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">aqui va la imagen</td>
              <td className="py-4 px-6 text-sm font-medium text-center whitespace-nowrap bg-white space-x-2">
                <button
                  onClick={() => mostrarForm(index)}
                  type="button"
                  data-modal-toggle="admin-modal"
                  className="text-white font-roboto uppercase font-medium text-base py-1 px-4 bg-blue-600 shadow-md rounded-md hover:bg-blue-900"
                >
                  Actualizar
                </button>
                <button
                  onClick={() => mostrarForm(index)}
                  type="button"
                  data-modal-toggle="admin-modal"
                  className="text-white font-roboto uppercase font-medium text-base py-1 px-4 bg-red-600 shadow-md rounded-md hover:bg-red-900"
                >
                  Eliminar
                </button>
              </td>
            </tr>
            <tr className={`${showForm.get() && form.get() === index ? "block" : "hidden"}`}>
              <td colSpan={5} className="w-full">
                <div className="bg-white p-5 rounded-md m-2 shadow-md">
                  <Formik
                    validationSchema={adminSchema}
                    initialValues={{
                      id: bar.id,
                      nombre: bar.nombre,
                      localizacion: bar.localizacion,
                      informacion: bar.informacion,
                      img: bar.img,
                    }}
                    onSubmit={async (values) => {
                      console.log(values);
                    }}
                  >
                    <Form>
                      <div>
                        <label className="font-roboto font-light text-lg text-black" htmlFor="idBar">
                          Id
                        </label>
                        <Field
                          as="input"
                          id="idBar"
                          name="id"
                          disabled={true}
                          className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>

                      <div>
                        <label className="font-roboto font-light text-lg text-black" htmlFor="nombreBar">
                          Nombre
                        </label>
                        <Field
                          as="input"
                          id="nombreBar"
                          name="nombre"
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>

                      <div>
                        <label className="font-roboto font-light text-lg text-black" htmlFor="localizacionBar">
                          Localizacion
                        </label>
                        <Field
                          as="input"
                          id="localizacionBar"
                          name="localizacion"
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>

                      <div>
                        <label className="font-roboto font-light text-lg text-black" htmlFor="informacionBar">
                          Informacion
                        </label>
                        <Field
                          as="input"
                          id="informacionBar"
                          name="informacion"
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div>
                        {/* //TODO: Agregar campo de imagenes para poder actualizar la imagen del bar */}
                      {/* <div>
                        <label className="font-roboto font-light text-lg text-black" htmlFor="idBar">
                          Imagenes
                        </label>
                        <Field
                          as="input"
                          id="idBar"
                          name="id"
                          disabled={true}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                      </div> */}

                      <button type="submit">Submit</button>
                    </Form>
                  </Formik>
                </div>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

function PinchosTabla({ data }: any) {
  return (
    <table className="w-full">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr className="border-b-2">
          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">id</th>
          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">nombre</th>
          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">puntuacion</th>
          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">ingredientes</th>

          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase bg-white">img</th>

          <th scope="col" className="relative py-3 px-6 bg-white">
            <span className="sr-only">Editar</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((pincho: any, index: number) => (
          <tr key={index} className="border-b">
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">{pincho.id}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">{pincho.nombre}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">{pincho.puntuacion}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">{pincho.ingredientes}</td>
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap bg-white">aqui va la imagen</td>
            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap bg-white">
              <button
                onClick={(e) => window.alert("Boton pulsado")}
                type="button"
                data-modal-toggle="admin-modal"
                className="text-white font-roboto uppercase font-medium text-base py-1 px-4 bg-blue-600 shadow-md rounded-md hover:bg-blue-900"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AdminTable({ valor, data }: any) {
  if (valor === "bares") {
    return <BaresTabla data={data} />;
  } else if (valor === "pinchos") {
    return <PinchosTabla data={data} />;
  } else {
    return <div>Tabla no seleccionada</div>;
  }
}
