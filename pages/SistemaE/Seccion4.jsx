import React from "react";
import styles from "../../styles/Home.module.css";

function Seccion4(props) {
  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui
    props.onChange(value);
  };

  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl md:text-3xl bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent mt-7 font-bold text-center">
          <h1>¿Cuál es tu disponibilidad de tiempo?</h1>
        </div>
      </div>
      <br />

      <ul className="grid grid-cols-1 gap-2 xl:grid xl:grid-cols-2 gap-x-5 xl:m-10 xl:max-w-4xl xl:mx-auto">
        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            name="tiempo"
            value="30min"
            onChange={handleChange}
            id="30"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="30"
          >
            Menos de 30 Minutos
          </label>
        </li>

        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            name="tiempo"
            value="1hr"
            onChange={handleChange}
            id="1hr"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="1hr"
          >
            Aproximadamente una hora
          </label>
        </li>

        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            name="tiempo"
            value="1hr 30"
            onChange={handleChange}
            id="130"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="130"
          >
            Aproximadamente una hora y media
          </label>
        </li>

        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            name="tiempo"
            value="2hr"
            onChange={handleChange}
            id="2"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="2"
          >
            Alrededor de 2 horas o más
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

export default Seccion4;
