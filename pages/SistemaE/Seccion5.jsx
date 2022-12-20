import React, { useState } from 'react'
import styles from "../../styles/Home.module.css";

function Seccion5({ onSubmit }) {
  const [formValues, setFormValues] = useState({});

  //funcion para guardar los datos del formulario
  function handleChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
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
    <div className="s">
    <div className={styles.texto}>
    <h1>Cuentamos más de ti</h1>
    </div>
    <br /><br /><br />


    <div className={styles.inputs2}>
    <form>
      <label>
        Edad:
        <input type="number" name="edad" onChange={handleChange}  onBlur={enviarauto} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </label>
      <br />
      <label>
        Altura:
        <input type="number" name="altura" onChange={handleChange} onBlur={enviarauto} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </label>
      <br />
      <label>
        Peso:
        <input type="number" name="peso" onChange={handleChange} onBlur={enviarauto} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </label>
      <br />
      <button type="button" onClick={omitir} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Omitir</button>
    </form>
    

    </div>


    <br/><br/><br/><br/>
  </div>
  )
}

export default Seccion5