import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Select, {
  StylesConfig,
  components,
  MultiValueRemoveProps,
  MultiValueGenericProps,
  ContainerProps,
  ControlProps,
  IndicatorsContainerProps,
  GroupBase,
} from "react-select";
import makeAnimated from "react-select/animated";
import Async, { useAsync } from "react-select/async";
import AsyncSelect from "react-select/async";

import useSWR from "swr";
import { useState } from "@hookstate/core";
import axios from "axios";
import { GiKetchup } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";

export default function BarForm({ Bardata }: any) {
  const adminSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(4, "El nombre tiene que tener mas de 4 letras")
      .max(15, "El nombre no puede tener mas de 15 letras")
      .required("El nombre no puede estar vacio"),

    localizacion: Yup.string()
      .min(10, "La localizacion tiene que tener mas de 10 letras")
      .max(30, "La localizacion no puede tener mas de 30 letras")
      .required("La localizacion no puede estar vacia"),

    informacion: Yup.string()
      .min(20, "La informacion tiene que tener mas de 20 letras")
      .max(100, "La informacion no puede tener mas de 100 letras")
      .required("La informacion no puede estar vacia"),
  });

  const key = useState<string>("");

  async function loadPinchos(inputValue: string) {
    const pinchos = await axios({
      method: "GET",
      url: `/api/pinchos?limit=9999999&offset=0&key=${inputValue}&order=id&direction=ASC`,
    }).then(function (response) {
      if (response.data.status) {
        return response.data;
      }
    });

    return pinchos.data;
  }

  interface Pincho {
    id: string | number;
    nombre: string;
  }

  function MultiValueLabel(
    props: MultiValueGenericProps<{ id: string; nombre: string }, true>
  ) {
    return (
      <components.MultiValueLabel {...props}>
        <span className="text-green-600 font-roboto">{props.children}</span>
      </components.MultiValueLabel>
    );
  }

  function MultiValueRemove(
    props: MultiValueRemoveProps<{ id: string; nombre: string }, true>
  ) {
    return (
      <components.MultiValueRemove {...props}>
        <AiFillCloseCircle className="bg-transparent text-black" />
      </components.MultiValueRemove>
    );
  }

  function MultiValueContainer(
    props: MultiValueGenericProps<{ id: string; nombre: string }, true>
  ) {
    return <components.MultiValueContainer {...props} />;
  }

  return (
    <div className="bg-white py-5 px-3 rounded-md m-2 shadow-md border-2">
      <Formik
        initialValues={{
          id: Bardata.id,
          nombre: Bardata.nombre,
          localizacion: Bardata.localizacion,
          informacion: Bardata.informacion,
        }}
        validationSchema={adminSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("mensaje enviado");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            className="bg-white flex space-x-2 relative"
            onSubmit={handleSubmit}
          >
            <div className="w-1/2 p-1 rounded-md shadow-md border-2 relative bg-white">
              {Bardata.img.length > 0 ? (
                <Image
                  src={
                    "http://localhost/logrocho/logrocho-backend/img/imagen.png"
                  }
                  layout="intrinsic"
                  width={100}
                  height={100}
                />
              ) : null}

              {/* <p>{data.img}</p> */}
              <div>
                <input
                  type="file"
                  onChange={(e) => console.log(e)}
                  className="absolute bg-white bottom-3 left-0 right-0 mx-auto file:bg-green-800 file:border-2 file:rounded-md file:px-6 file:py-2 file:border-none file:font-roboto file:text-white file:uppercase"
                />
              </div>
            </div>

            <div className="w-1/2 p-4 rounded-md shadow-md border-2 bg-white space-y-4 overflow-auto">
              <div className="flex space-x-2 bg-white">
                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="idBar"
                  >
                    Id
                  </label>
                  <Field
                    as="input"
                    id="idBar"
                    name="id"
                    disabled={true}
                    className="border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>

                <div className="bg-white grow">
                  <label
                    className="font-roboto bg-white font-light text-lg text-black"
                    htmlFor="nombreBar"
                  >
                    Nombre
                  </label>
                  <Field
                    as="input"
                    id="nombreBar"
                    name="nombre"
                    className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                  <ErrorMessage
                    component="span"
                    name="nombre"
                    className="text-red-500 bg-white font-roboto text-xs"
                  />
                </div>
              </div>

              <div className="bg-white">
                <label
                  className="font-roboto bg-white font-light text-lg text-black"
                  htmlFor="localizacionBar"
                >
                  Localizacion
                </label>
                <Field
                  as="input"
                  id="localizacionBar"
                  name="localizacion"
                  className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="localizacion"
                  className="text-red-500 bg-white font-roboto text-xs"
                />
              </div>

              <div className="bg-white">
                <label
                  className="font-roboto bg-white font-light text-lg text-black"
                  htmlFor="informacionBar"
                >
                  Informacion
                </label>
                <Field
                  as="textarea"
                  rows={3}
                  id="informacionBar"
                  name="informacion"
                  className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
                <ErrorMessage
                  component="span"
                  name="informacion"
                  className="text-red-500 bg-white font-roboto text-xs"
                />
              </div>

              <div className="bg-white">
                <label
                  className="font-roboto bg-white font-light text-lg text-black"
                  htmlFor="pinchosBar"
                >
                  Pinchos
                </label>
                <AsyncSelect
                  id="pinchosBar"
                  isMulti={true}
                  isClearable={true}
                  isSearchable={true}
                  cacheOptions
                  menuPlacement="top"
                  loadOptions={loadPinchos}
                  getOptionValue={(option: any) => `${option["id"]}`}
                  getOptionLabel={(option: any) => `${option["nombre"]}`}
                  styles={{
                    multiValue: (base) => ({
                      ...base,
                      border: `1px solid green`,
                      borderRadius: 3,
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      backgroundColor: "transparent",
                    }),
                    control: (base) => ({
                      ...base,
                      backgroundColor: "white",
                      border: "1px solid lightgray",
                      borderRadius: 8,
                      padding: 2,
                    }),
                    input: (base) => ({
                      ...base,
                      backgroundColor: "white",
                    }),
                    container: (base) => ({
                      ...base,
                      backgroundColor: "white",
                    }),
                    indicatorsContainer: (base) => ({
                      ...base,
                      backgroundColor: "white",
                    }),
                  }}
                  components={{
                    MultiValueLabel: MultiValueLabel,
                    MultiValueRemove: MultiValueRemove,
                    MultiValueContainer: MultiValueContainer,
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
              >
                Actualizar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
