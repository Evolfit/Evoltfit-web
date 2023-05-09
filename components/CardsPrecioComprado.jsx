import React from "react";
import { useRouter } from "next/router";
import { CheckIcon } from "@heroicons/react/solid";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import supabase from "/config/supabaseClient";

const CardsPrecios = ({
  nombre = "",
  precio = 0,
  no_mes = 0,
  precio_id = "",
  signo = "$",
  frecuencia = "month",
  caracteristicas = [],
  popular = false,
}) => {

  const [sesion, setSesion] = useState(null);

  useEffect(() => {
    handleSesion()
  }, [])

  const handleSesion = async () => {

    const { data, error } = await supabase.auth.getSession()

    if(data.session){
      setSesion(data.session);
      //console.log(data);
    } 
    else {
      setSesion(null);
      //console.log("No hay Sesión " + error);
      //console.log(data);
    }
  }

  const router = useRouter();

  return (
    <div
      className={`bg-white border-blue-700 rounded-md shadow-xl cursor-pointer relative ${
        popular ? "border-2" : "border border-opacity-10"
      }`}
    >
      {popular ? (
        <span className="bg-blue-700 text-white px-6 py-1 rounded-full uppercase text-sm font-semibold whitespace-nowrap absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Más valor
        </span>
      ) : null}
      {/* Titulo del plan */}
      <div className="px-6 py-12 border-b-2 border-gray-200">
        <p className="font-source text-3xl font-semibold text-center mb-4">
          {nombre}
        </p>
        <div className="flex justify-center items-center">
          <div className="flex items-start">
            <p className="text-3xl lg:text-4xl font-medium">{signo}</p>
            <p className="text-6xl lg:text-7xl font-bold">{precio}</p>
          </div>
          <p className="text-xl lg:text-2xl text-gray-400">/{frecuencia}</p>
        </div>
      </div>
      {/* Caracteristicas del plan */}
      <div className="p-12 bg-gray-100">
        <ul className="space-y-3">
          {caracteristicas.map((feature, index) => (
            <li key={index} className="flex items-center space-x-4">
              <CheckIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
              <p className="font-heebo text-base lg:text-lg text-gray-600">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardsPrecios;
