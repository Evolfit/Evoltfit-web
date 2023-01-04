import React, { useState } from "react";
import styles from "../../styles/Home.module.css";

function Seccion5({ onSubmit }) {
  const [formValues, setFormValues] = useState({});

  //funcion para guardar los datos del formulario
  function handleChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }
  //regresar los valores
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formValues);
  }
  //enviar informacion automaticamente si los 3 campos estan llenos
  function enviarauto() {
    if (formValues.edad && formValues.altura && formValues.peso) {
      onSubmit(formValues);
    }
  }
  function omitir() {
    onSubmit({ edad: 0, altura: 0, peso: 0 }); // Enviamos un objeto con los campos del formulario en 0
  }
  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl text-zinc-700 mt-4 font-bold text-center">
          <h1>Cuéntanos más de ti</h1>
        </div>
      </div>
      <br />
      <br />

      <div>
        <form>
          <div className="grid place-items-center">
            <label className="font-catamaran text-lg">
              Edad:
              <input
                type="number"
                name="edad"
                onChange={handleChange}
                onBlur={enviarauto}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
          </div>
          <br />
          <div className="grid place-items-center">
            <label className="font-catamaran text-lg">
              Altura:
              <input
                type="number"
                name="altura"
                onChange={handleChange}
                onBlur={enviarauto}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
          </div>
          <br />
          <div className="grid place-items-center">
            <label className="font-catamaran text-lg">
              Peso:
              <input
                type="number"
                name="peso"
                onChange={handleChange}
                onBlur={enviarauto}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </label>
          </div>
          <div className = "absolute mt-12 xl:mt-2.5">
          <button
            type="button"
            onClick={omitir}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            Omitir
          </button>
          </div>
        </form>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Seccion5;
