import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

function Seccion51(props) {
  const { onCheckboxChange } = props;
 
  
    
  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl text-zinc-700 mt-4 font-bold text-center">
          <h1>¿Cuantos dias a la semana tienes disponibles?</h1>
        </div>
      </div>
      <br />
      <br />

      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch1"
              type="checkbox"
              name="Lunes"
              onChange={onCheckboxChange}
  
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch1"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Lunes
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch2"
              type="checkbox"
              name="Martes"
              
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch2"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Martes
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch3"
              type="checkbox"
              name="Miercoles"
              onChange={onCheckboxChange}
              
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch3"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Miercoles
            </label>
          </div>
        </li>
        <li className="w-full dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch4"
              type="checkbox"
              name="Jueves"
              
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch4"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Jueves
            </label>
          </div>
        </li>
      </ul>

      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch5"
              type="checkbox"
              name="Viernes"
            
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch5"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Viernes
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch6"
              type="checkbox"
              name="Sabado"
              
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch6"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Sabado
            </label>
          </div>
        </li>
        <li className="w-full dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch8"
              type="checkbox"
              name="Domingo"
              
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch8"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Domingo
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <label
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            ></label>
          </div>
        </li>
      </ul>

  

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Seccion51;
