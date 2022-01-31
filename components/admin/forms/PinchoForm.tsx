import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function PinchoForm({ data }: any) {
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
    <div className="bg-white p-5 rounded-md m-2 shadow-md">
      <Formik
        initialValues={{
          id: data.id,
          nombre: data.nombre,
          puntuacion: data.puntuacion,
          ingredientes: data.ingredientes,
          img: data.img,
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
          <Form className="space-y-5 bg-white" onSubmit={handleSubmit}>
            <div className="bg-white">
              <label
                className="font-roboto bg-white font-light text-lg text-black"
                htmlFor="idPincho"
              >
                Id
              </label>
              <Field
                as="input"
                id="idPincho"
                name="id"
                disabled={true}
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="bg-white">
              <label
                className="font-roboto bg-white font-light text-lg text-black"
                htmlFor="nombrePincho"
              >
                Nombre
              </label>
              <Field
                as="input"
                type="text"
                id="nombrePincho"
                name="nombre"
                className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <div className="bg-white">
              <label
                className="font-roboto bg-white font-light text-lg text-black"
                htmlFor="puntuacionPincho"
              >
                Puntuacion
              </label>
              <Field
                as="input"
                type="number"
                id="puntuacionPincho"
                name="puntuacion"
                className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <div className="bg-white">
              <label
                className="font-roboto bg-white font-light text-lg text-black"
                htmlFor="ingredientesBar"
              >
                Ingredientes
              </label>
              <Field
                as="input"
                type="text"
                id="ingredientesBar"
                name="ingredientes"
                className="border border-gray-300 bg-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center shadow-green-400 shadow-md"
            >
              Actualizar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
