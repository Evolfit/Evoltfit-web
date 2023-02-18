import styled from "daisyui/dist/styled";
import React from "react";
import styles from "../../styles/Home.module.css";

function Seccion2(props) {
  const handleChange = (event) => {
    //const name = event.target.name;
    const value = event.target.value;
    //si quiero el name lo mando aqui
    props.onChange(value);
  };

  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-3xl bg-gradient-to-r from-blue-600 via-blue-800 to-black bg-clip-text text-transparent mt-7 font-bold text-center">
          <h1>¿Cuál es tu objetivo principal?</h1>
        </div>
      </div>
      <br />

      <ul className="grid grid-cols-1 gap-2 xl:grid xl:grid-cols-2 gap-x-5 xl:m-10 xl:max-w-4xl xl:mx-auto">
        <li className = "relative">
          <input
            className="sr-only peer"
            type="radio"
            value="masamuscular"
            name="objetivo"
            onChange={handleChange}
            id="mas"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="mas"
          >
            Ganar Masa Muscular 
            <div className = "mt-0.5 absolute left-56 xl:left-96">
            <div className = "tooltip-local">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span  className = "tooltiptext-local">Texto de ejemplo</span>
            </div>
            </div>
          </label>
        </li>

        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            value="resistencia"
            name="objetivo"
            onChange={handleChange}
            id="res"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="res"
          >
            Ganar Resistencia
            <div className = "mt-0.5 absolute left-56 xl:left-96">
            <div className = "tooltip-local">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span  className = "tooltiptext-local">Texto de ejemplo</span>
            </div>
            </div>
          </label>
        </li>

        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            value="fuerza"
            name="objetivo"
            onChange={handleChange}
            id="fuer"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="fuer"
          >
            Ganar Fuerza
            <div className = "mt-0.5 absolute left-56 xl:left-96">
            <div className = "tooltip-local">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span  className = "tooltiptext-local">Texto de ejemplo</span>
            </div>
            </div>
          </label>
        </li>

        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            value="perdergrasa"
            name="objetivo"
            onChange={handleChange}
            id="grasa"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="grasa"
          >
            Perder Grasa
            <div className = "mt-0.5 absolute left-56 xl:left-96">
            <div className = "tooltip-local">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span  className = "tooltiptext-local">Texto de ejemplo</span>
            </div>
            </div>
          </label>
        </li>

        <li className="relative">
          <input
            className="sr-only peer"
            type="radio"
            value="salud"
            name="objetivo"
            onChange={handleChange}
            id="dep"
          />
          <label
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="dep"
          >
            Mejorar la Salud en General
            <div className = "mt-0.5 absolute left-56 xl:left-96">
            <div className = "tooltip-local">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span  className = "tooltiptext-local">Texto de ejemplo</span>
            </div>
            </div>
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

export default Seccion2;
