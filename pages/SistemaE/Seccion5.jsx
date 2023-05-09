import React, { useState } from "react";
import styles from "../../styles/Home.module.css";

function Seccion5({ formData2, onSubmit }) {
  const [formValues, setFormValues] = useState({});
  let edadA = 0;
  // Acceder a la altura
  let alturaA = 0;
  // Acceder al peso
  let pesoA = 0;

  if (formData2 && formData2.edad) {
    edadA = formData2.edad;
  }
  if (formData2 && formData2.altura) {
    alturaA = formData2.altura;
  }
  if (formData2 && formData2.peso) {
    pesoA = formData2.peso;
  }

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
    <div className="flex flex-col items-center relative">
      <button
        type="button"
        onClick={omitir}
        className="absolute left-0 xl:bottom-14 bottom-12 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
      >
        Omitir
      </button>
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent mt-7 font-bold text-center">
          <h1>Cuéntanos más de ti</h1>
        </div>
      </div>
      <br />

      <div className="w-full lg:w-1/2">
        <form>
          <div className="mb-1 w-full">
            <label className="font-catamaran text-lg">
              Edad:
              <select
                name="edad"
                onChange={handleChange}
                onBlur={enviarauto}
                className="select w-full bg-white text-base font-normal rounded-xl shadow border border-gray-100 focus:border-blue-500 focus:border-2 text-black hover:bg-slate-50 shadow-gray-200"
              >
                <option value="">Seleccione su edadㅤ</option>
                <option value="Menor a 16 años">Menor a 16 años</option>
                {Array.from({ length: 45 }, (_, i) => i + 17).map((edad) => (
                  <option value={`${edad}`} key={edad}>{edad} años</option>
                ))}
                <option value="Mayor a 60 años">Mayor a 60 años</option>
                {/* Agregue más opciones de edad aquí */}
              </select>
            </label>
          </div>
          <br />
          <div className="mb-1 w-full">
            <label className="font-catamaran text-lg">
              Altura:
              <select
                name="altura"
                onChange={handleChange}
                onBlur={enviarauto}
                className="select w-full bg-white text-base font-normal rounded-xl shadow border border-gray-100 focus:border-blue-500 focus:border-2 text-black hover:bg-slate-50 shadow-gray-200"              >
                <option value="">Seleccione su estatura</option>
                <option value="140">Menos de 140 cm</option>
                {Array.from({ length: 79 }, (_, i) => i + 141).map((estatura) => (
                  <option value={`${estatura}`} key={estatura}>{estatura} cm</option>
                ))}
                <option value="200">220 cm o más</option>
              </select>
            </label>
          </div>
          <br />
          <div className="mb-1 w-full">
            <label className="font-catamaran text-lg">
              Peso:
              <select
                name="peso"
                onChange={handleChange}
                onBlur={enviarauto}
                className="select w-full bg-white text-base font-normal rounded-xl shadow border border-gray-100 focus:border-blue-500 focus:border-2 text-black hover:bg-slate-50 shadow-gray-200"              >
                <option value="">Seleccione su peso</option>
                {Array.from({ length: 151 }, (_, i) => i + 30).map((peso) => (
                  <option value={`${peso}`} key={peso}>{peso} kg</option>
                ))}
              </select>
            </label>
          </div>
          <div className="">
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
