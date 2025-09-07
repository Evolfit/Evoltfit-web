import React from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import Head from "next/head";
import PreciosCambio from "/components/CardsPrecioCambio";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";
import { useState, useEffect } from "react";
import Typed from "/components/Typed";

const plans = [
  {
    nombre: "1 mes",
    precio: 149,
    no_mes: 2,
    precio_id: "price_1MJc4MCFYlDxDHBcOayU4Cf8",
    frecuencia: "mes",
    popular: false,
    caracteristicas: [
      "Duración de 1 mes",
      "Perfecto para probar EFP",
      "Obten todos los beneficios",
      "Desbloquea funciones extras",
    ],
  },
  {
    nombre: "6 meses",
    precio: 126.65,
    no_mes: 7,
    precio_id: "price_1MNMx1CFYlDxDHBcU95LVJIv",
    frecuencia: "mes",
    popular: true,
    caracteristicas: [
      "Duración de 6 meses",
      "Ahorra el 15%",
      "Obten todos los beneficios",
      "Desbloquea funciones extras",
    ],
  },
  {
    nombre: "12 meses",
    precio: 104.3,
    no_mes: 13,
    precio_id: "price_1MNN07CFYlDxDHBcaBx7emqd",
    frecuencia: "mes",
    popular: false,
    caracteristicas: [
      "Duración de 12 meses",
      "Ahorra el 30%",
      "Obten todos los beneficios",
      "Desbloquea funciones extras",
    ],
  },
];

export default function Home() {

  const [sesion, setSesion] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [datosPlan, setDatosPlan] = useState();

  useEffect(() => {
    handleSesion();
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
  }, []);

  const getPlan = async (sesion_id) => {
          
    let { data: sus_pagos, error } = await supabase
      .from("sus_pagos")
      .select("activo, plan_name, fecha_termino")
      .eq("id_usuario", sesion_id);

      if(sus_pagos.length == 0){
        //console.log("Este usuario no tiene plan")
        setResultado(0)
        router.push("/precios")
      }else{
        //console.log("Este usuario si tiene un plan")
        ////console.log(sus_pagos)
        setDatosPlan(sus_pagos)
      }
  }

  const handleSesion = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      setSesion(data.session);
      getPlan(data.session.user.id)
      //console.log(data);
    } else {
      setSesion(null);
      //console.log("No hay Sesión " + error);
      ////console.log(data);
      router.push("/")
    }
  };

  const router = useRouter();

  return (
    <div className="bg-stone-100 w-full">
      <Head>
        <title>EvoltFit - Precios</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <br />
      <br />
      <br />
      
      <div className="relative">
          <img
            className="transparencia-banner opacity-80"
            src="bccambio.jpg"
          />
          <Typed
            strings={[
              "Cambio de plan"
            ]}
            typeSpeed={150}
            backSpeed={100}
            className="absolute top-32 text-2xl text-center font-bebas text-white tracking-wider left-1/2 -translate-x-1/2 -translate-y-1/2 xl:text-7xl xl:top-64 "
          />
        </div>

      <br/>
      <br/>
      <br/>
      {datosPlan ? (
        <div>
        <h1 className="text-center text-5xl text-zinc-700 font-catamaran mb-16">
        Tu plan actual es de {" "}
        <span className="text-blue-600">{datosPlan[0].plan_name}</span>
        </h1>

        <div className="h-full px-6 py-12 lg:flex lg:justify-center lg:items-center">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-0">
          {plans.map((plan) => (
            <div
              key={plan.nombre}
              className={`w-full max-w-md mx-auto ${
                plan.popular
                  ? "order-first lg:order-none lg:scale-110 lg:transform lg:z-10"
                  : "lg:transform lg:scale-90"
              }`}
            >
              <PreciosCambio {...plan} key={plan.nombre} />
            </div>
          ))}
        </div>
      </div>
      </div>
      ) : (
        <div className="my-12">
              <div className="loader mt-6"></div>
            </div>
      )}
      <h1 className="text-center mt-1 text-sm text-gray-500">
        * Sujeto a una política de uso razonable
      </h1>
      <br />
      <br />
      <br />
      <br />

      <Footer></Footer>
    </div>
  );
}
