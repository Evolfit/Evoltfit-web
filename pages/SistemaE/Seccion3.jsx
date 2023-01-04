import styled from "daisyui/dist/styled";
import React from "react";
import styles from "../../styles/Home.module.css";

function Seccion3(props) {
  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui
    props.onChange(value);
  };

  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl text-zinc-700 mt-4 font-bold text-center">
          <h1>En este momento, ¿Con cuál opción te identificas más?</h1>
        </div>
      </div>
      <br />
      <br />
      <br />

      <ul className="grid grid-cols-1 gap-2 xl:grid xl:grid-cols-1 gap-x-5 xl:max-w-4xl xl:mx-auto">
        <li className="relative">
          <input
            type="radio"
            name="condicion"
            value="principiante"
            onChange={handleChange}
            className="sr-only peer"
            id="pri"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="pri"
          >
            Principiante: Actualmente no me ejercitó, llevo más de 6 meses sin
            realizar alguna actividad física constante. Tengo poco conocimiento
            respecto a ejercicios y entrenamiento.
          </label>
        </li>

        <li className="relative">
          <input
            type="radio"
            name="condicion"
            value="intermedio"
            onChange={handleChange}
            className="sr-only peer"
            id="inter"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="inter"
          >
            Intermedio: Actualmente realizo alguno que otro ejercicio, pero no
            de manera constante, tengo pocos o conocimientos medios respecto a
            rutinas o ejercicio.
          </label>
        </li>

        <li className="relative">
          <input
            type="radio"
            name="condicion"
            value="avanzado"
            onChange={handleChange}
            className="sr-only peer"
            id="av"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="av"
          >
            Avanzado: Realizo actividad física muy regular y por largos periodos
            de tiempo, tengo conocimiento básico o medio de mi alimentación y
            conocimientos necesarios para los ejercicios que hago.
          </label>
        </li>

        <li className="relative">
          <input
            type="radio"
            name="condicion"
            value="experimentado"
            onChange={handleChange}
            className="sr-only peer"
            id="ex"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="ex"
          >
            Experimentado: Hago ejercicio de manera constante, conozco varios
            tipos de ejercicios y rutinas. El ejercicio es algo dentro de mi
            vida cotidiana o en la mayoría de los días y tengo una buena
            alimentación de acuerdo con mi actividad.
          </label>
        </li>
      </ul>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Seccion3;
