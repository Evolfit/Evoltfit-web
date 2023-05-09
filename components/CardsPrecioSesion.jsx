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
  frecuencia = "mes",
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
  
  async function checkout({ lineItems }, nombre, no_mes) {
    localStorage.setItem("NombrePaquete", nombre);
    localStorage.setItem("Meses", no_mes);

    let stripePromise = null;

    const getStripe = () => {
      if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
      }
      return stripePromise;
    };

    const stripe = await getStripe();

    await stripe.redirectToCheckout({
      mode: "payment",
      lineItems,
      successUrl: `https://evoltfit-app.vercel.app/successPay`,
      cancelUrl: `https://evoltfit-app.vercel.app/failurePay`,
    });
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
        {/* Boton del plan*/}

        <button
          onClick={() => {
            checkout(
              {
                lineItems: [
                  {
                    price: precio_id,
                    quantity: 1,
                  },
                ],
              },
              nombre,
              no_mes
            );
          }}
          className={`font-source mt-12 w-full py-4 px-8 rounded-lg text-lg whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-blue-700 focus:ring-opacity-50 transition-all ${
            popular
              ? "text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 transform"
              : "bg-white text-blue-700 hover:bg-gray-50"
          }`}
        >
          Obtenlo ya
        </button>
      </div>
    </div>
  );
};

export default CardsPrecios;
