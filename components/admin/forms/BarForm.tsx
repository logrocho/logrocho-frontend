import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";

export default function BarForm({ data }: any) {
  const adminSchema = Yup.object().shape({
    email: Yup.string().required("El email es obligatorio").email(),

    password: Yup.string()
      .min(8, "La contraseña tiene que tener al menos 8 caracteres")
      .matches(
        /^[a-zA-Z0-9]{8,}$/,
        "La contraseña tiene que tener una minúscula, una mayúscula y un dígito"
      )
      .required("La contraseña es obligatoria"),
  });

  return (
    <div className="bg-white py-5 px-3 rounded-md m-2 shadow-md border-2">
      <Formik
        initialValues={{
          id: data.id,
          nombre: data.nombre,
          localizacion: data.localizacion,
          informacion: data.informacion,
        }}
        //validationSchema={adminSchema}
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
            <div className="w-1/2 p-1 rounded-md shadow-md border-2 relative bg-white h-[390px]">
              {data.img.length > 0 ? (
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

            <div className="w-1/2 p-4 rounded-md shadow-md border-2 bg-white space-y-4 overflow-auto  h-[390px]">
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
              </div>

              {/* //TODO: https://react-select.com/home <- utilizar esto para añadir los pinchos */}
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
