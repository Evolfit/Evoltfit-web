import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

function Seccion6(props) {
  const { onCheckboxChange } = props;
  const [ch1, setCh1] = useState(false);
  const [ch2, setCh2] = useState(false);
  const [ch3, setCh3] = useState(false);
  const [ch4, setCh4] = useState(false);
  const [ch5, setCh5] = useState(false);
  const [ch6, setCh6] = useState(false);
  const [ch7, setCh7] = useState(false);
  const [ch8, setCh8] = useState(false);
  const [ch9, setCh9] = useState(false);
  const [ch10, setCh10] = useState(false);
  const [ch11, setCh11] = useState(false);
  const [ch12, setCh12] = useState(false);
  const [ch13, setCh13] = useState(false);
  const [Ninguno, setNinguno] = useState(false);
  
    function handleNoneClick() {
      setNinguno(!Ninguno);
      if (!Ninguno) {
        setCh1(false);
        setCh2(false);
        setCh3(false);
        setCh4(false);
        setCh5(false);
        setCh6(false);
        setCh7(false);
        setCh8(false);
        setCh9(false);
        setCh10(false);
        setCh11(false);
        setCh12(false);
        setCh13(false);
      }
    }
    function handleChClick(name) {
      setNinguno(false);
      if (name === "Bandaresistencia") setCh1(!ch1);
      if (name === "Bandasuspension") setCh2(!ch2);
      if (name === "Barra") setCh3(!ch3);
      if (name === "BarraZ") setCh4(!ch4);
      if (name === "Barras") setCh5(!ch5);
      if (name === "Mancuernas") setCh6(!ch6);
      if (name === "PesaRusa") setCh7(!ch7);
      if (name === "PlacaPeso") setCh8(!ch8);
      if (name === "MaquinasGYM") setCh9(!ch9);
      if (name === "BancoPlano") setCh10(!ch10);
      if (name === "BancoDeclinado") setCh11(!ch11);
      if (name === "BancoInclinado") setCh12(!ch12);
      if (name === "Cuerda") setCh13(!ch13);
    }
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
              checked={Ninguno} onClick={handleNoneClick}
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
              checked={ch1} onClick={() => handleChClick("Bandaresistencia")}
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
              checked={ch2} onClick={() => handleChClick("Bandasuspension")}
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
              checked={ch3} onClick={() => handleChClick("Barra")}
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
              checked={ch4} onClick={() => handleChClick("BarraZ")}
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
              checked={ch5} onClick={() => handleChClick("Barras")}
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
        <li className="w-full dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch8"
              type="checkbox"
              name="Mancuernas"
              checked={ch6} onClick={() => handleChClick("Mancuernas")}
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
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch9"
              type="checkbox"
              name="PesaRusa"
              checked={ch7} onClick={() => handleChClick("PesaRusa")}
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
      </ul>

      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch10"
              type="checkbox"
              name="PlacaPeso"
              checked={ch8} onClick={() => handleChClick("PlacaPeso")}
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
              name="MaquinasGYM"
              checked={ch9} onClick={() => handleChClick("MaquinasGYM")}
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
              checked={ch10} onClick={() => handleChClick("BancoPlano")}
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
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch13"
              type="checkbox"
              name="BancoDeclinado"
              checked={ch11} onClick={() => handleChClick("BancoDeclinado")}
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
      </ul>

      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center pl-3">
            <input
              id="ch14"
              type="checkbox"
              name=" BancoInclinado"
              checked={ch12} onClick={() => handleChClick("BancoInclinado")}
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
              checked={ch13} onClick={() => handleChClick("Cuerda")}
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
