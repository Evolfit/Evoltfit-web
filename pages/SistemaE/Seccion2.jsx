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

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 gap-x-5 lg:m-10 lg:max-w-4xl lg:mx-auto">
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
            className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent lab"
            htmlFor="mas"
          >
            <div className = "mt-0.5 mr-5">
            <div className = "tooltip-local tooltip-content">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span className = "tooltiptext-local">Este es un objetivo común para aquellos que quieren aumentar su tamaño y fortaleza muscular.</span>
            </div>
            </div>
            Ganar Masa Muscular 
           
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
            className="flex p-5  bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-blue-600 peer-checked:ring-2 peer-checked:border-transparent"
            htmlFor="res"
          >
            <div className = "mt-0.5 mr-5 ">
            <div className = "tooltip-local tooltip-content">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span  className = "tooltiptext-local">El objetivo de mejorar la resistencia es aumentar la capacidad del cuerpo para soportar el esfuerzo físico prolongado.</span>
            </div>
            </div>

            Ganar Resistencia
           
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
            <div className = "mt-0.5 mr-5">
            <div className = "tooltip-local tooltip-content">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span className = "tooltiptext-local">Este es un objetivo común para aquellos que quieren ser más fuertes y más capaces de levantar pesas más pesadas.</span>
            </div>
            </div>
            Ganar Fuerza
            
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
            <div className = "mt-0.5 mr-5 ">
            <div className = "tooltip-local tooltip-content">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span  className = "tooltiptext-local">El objetivo de perder peso es reducir la cantidad de grasa corporal mediante la quema de calorías durante el ejercicio.</span>
            </div>
            </div>
            Perder Grasa
            
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
            <div className = "mt-0.5 mr-5">
            <div className = "tooltip-local tooltip-content">
            <ion-icon name="alert-circle-outline"></ion-icon>
            <span  className = "tooltiptext-local">Muchas personas hacen ejercicio con el objetivo de mejorar su salud en general, reducir el riesgo de enfermedades crónicas y sentirse más energéticas y vitales.</span>
            </div>
            </div>
            Mejorar la Salud en General
            
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
