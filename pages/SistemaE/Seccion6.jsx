import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

function Seccion6(props) {
  const { onCheckboxChange } = props;

  return (
    <div>
      <div className="grid place-items-center">
        <div className="font-catamaran text-2xl text-zinc-700 mt-4 font-bold text-center">
          <h1>¿Qué herramientas tienes disponibles?</h1>
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
              name="Ninguno"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch1"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Ninguno
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch2"
              type="checkbox"
              name="Bandaresistencia"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch2"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Banda de Resistencia
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch3"
              type="checkbox"
              name="Bandasuspension"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch3"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Banda de suspensión
            </label>
          </div>
        </li>
        <li className="w-full dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch4"
              type="checkbox"
              name="Barra"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch4"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Barra
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
              name="BarraZ"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch5"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Barra Z
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch6"
              type="checkbox"
              name="Barras"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch6"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Barras dominadas, paralelas
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch7"
              type="checkbox"
              name="Mancuerna"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch7"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Mancuerna
            </label>
          </div>
        </li>
        <li className="w-full dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch8"
              type="checkbox"
              name="Mancuernas"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch8"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Mancuernas
            </label>
          </div>
        </li>
      </ul>

      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch9"
              type="checkbox"
              name="PesaRusa"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch9"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Pesa Rusa
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch10"
              type="checkbox"
              name="PlacaPeso"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch10"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Placa de Peso
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch11"
              type="checkbox"
              name="MáquinasGYM"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch11"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Máquinas en GYM
            </label>
          </div>
        </li>
        <li className="w-full dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch12"
              type="checkbox"
              name="BancoPlano"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch12"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Banco Plano
            </label>
          </div>
        </li>
      </ul>

      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch13"
              type="checkbox"
              name="BancoDeclinado"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch13"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Banco Declinado
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch14"
              type="checkbox"
              name=" BancoInclinado"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch14"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Banco Inclinado
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch15"
              type="checkbox"
              name="Cuerda"
              onChange={onCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="ch15"
              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Cuerda
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

export default Seccion6;
