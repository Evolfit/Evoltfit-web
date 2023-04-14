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
    <div className = "">
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent mt-7 font-bold text-center">
          <h1>En este momento, ¿Con cuál opción te identificas más?</h1>
        </div>
      </div>
      <br />
      <br />
     

      <ul className="grid grid-cols-1 gap-2 gap-x-5 lg:max-w-4xl lg:mx-auto">
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
            <h2>
            <span className="text-blue-600 font-semibold">Principiante: </span>
            Actualmente no me ejercito, llevo más de 6 meses sin
            realizar alguna actividad física constante. Tengo poco conocimiento
            respecto a ejercicios y entrenamiento.
            </h2>
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
            <h2>
            <span className="text-blue-600 font-semibold">Intermedio:  </span>
            Actualmente realizo alguno que otro ejercicio, pero no
            de manera constante, tengo pocos o conocimientos medios respecto a
            rutinas o ejercicio.
            </h2>
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
            <h2>
            <span className="text-blue-600 font-semibold">Avanzado: </span>
            Realizo actividad física muy regular y por largos periodos
            de tiempo, tengo conocimiento básico o medio de mi alimentación y
            conocimientos necesarios para los ejercicios que hago.
            </h2>
            
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
            <h2>
            <span className="text-blue-600 font-semibold">Experimentado: </span>
            Hago ejercicio de manera constante, conozco varios
            tipos de ejercicios y rutinas. El ejercicio es algo dentro de mi
            vida cotidiana o en la mayoría de los días y tengo una buena
            alimentación de acuerdo con mi actividad.
            </h2>
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
