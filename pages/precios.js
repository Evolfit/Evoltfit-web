import React from "react";
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
import Head from "next/head";
import Precios from "./Componentes/CardsPrecios";
import PreciosSesion from "./Componentes/CardsPrecioSesion";
import PreciosComprado from "./Componentes/CardsPrecioComprado";
import { useRouter } from "next/router";
import { Link } from "react-scroll";
import supabase from "/config/supabaseClient";
import { useState, useEffect } from "react";

const plans = [
  {
    nombre: "1 mes",
    precio: 149,
    no_mes: 1,
    precio_id: "price_1MJc4MCFYlDxDHBcOayU4Cf8",
    frecuencia: "mes",
    popular: false,
    caracteristicas: [
      "Facturado cada 3 meses",
      "El paquete más económico",
      "Obten todos los beneficios",
      "Desbloquea funciones extras",
    ],
  },
  {
    nombre: "6 meses",
    precio: 126.65,
    no_mes: 6,
    precio_id: "price_1MNMx1CFYlDxDHBcU95LVJIv",
    frecuencia: "mes",
    popular: true,
    caracteristicas: [
      "Facturado cada 6 meses",
      "Ahorra el 15%",
      "Obten todos los beneficios",
      "Desbloquea funciones extras",
    ],
  },
  {
    nombre: "12 meses",
    precio: 104.3,
    no_mes: 12,
    precio_id: "price_1MNN07CFYlDxDHBcaBx7emqd",
    frecuencia: "mes",
    popular: false,
    caracteristicas: [
      "Facturado cada 12 meses",
      "Ahorra el 30%",
      "Obten todos los beneficios",
      "Desbloquea funciones extras",
    ],
  },
];

export default function Home() {

  const [sesion, setSesion] = useState(null);
  const [flag, setFlag] = useState(false);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    handleSesion();
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
    if (flag == true) {

      setFlag(false);

      if (sesion) {
        //console.log("El usuario conectado es:" + sesion.user.id);

        async function getPlan() {
          console.log("Entramos a getPlan");
          let { data: sus_pagos, error } = await supabase
            .from("sus_pagos")
            .select("activo")
            .eq("id_usuario", sesion.user.id);

            if(sus_pagos.length == 0){
              console.log("Este usuario no tiene plan")
              setResultado(0)
            }else{
              console.log("Este usuario si tiene un plan")
              console.log(sus_pagos[0].activo)
              setResultado(sus_pagos[0].activo)
            }
        }

        getPlan();
      } else {
        console.log("No hay una sesion iniciada");
      }
    }
    setFlag(true);
  }, [flag]);

  const handleSesion = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      setSesion(data.session);
      console.log(data);
    } else {
      setSesion(null);
      console.log("No hay Sesión " + error);
      console.log(data);
    }
  };

  const router = useRouter();

  return (
    <div className="bg-blue-50 w-full">
      <Head>
        <title>EvoltFit - Precios</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <div className="relative">
        <div></div>
        <img className="transparencia-banner opacity-80" src="bcprice.jpg" />
        <h1 className="absolute text-4xl italic font-bold text-center text-blue-700 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2  xl:absolute xl:text-5xl">
          EvoltFit Plus
        </h1>
        <h1 className="absolute top-32 text-lg text-center font-bebas text-white tracking-wider left-1/2 -translate-x-1/2 -translate-y-1/2 xl:text-4xl xl:top-64 ">
          Precios diseñados para tus objetivos
        </h1>
        <Link
          to="seccionPaquetes"
          spy={true}
          smooth={true}
          offset={50}
          duration={800}
        >
          <button className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 rounded-md hover:scale-110 transition-all font-catamaran top-36 py-3 px-6  xl:w-64 xl:py-4 xl:px-8   xl:rounded-lg xl:text-xl whitespace-nowrap bg-blue-600 text-white  xl:top-72">
            Pruébalos
          </button>
        </Link>
      </div>

      <br />
      <br />

      <div className="grid place-items-center">
        <div className="xl:flex xl:justify-between xl:w-3/4 xl:h-full xl:p-24 xl:bg-gray-100 xl:shadow-lg xl:shadow-zinc-300">
          <div className="w-64 p-8">
            <center>
              <div className="h-16 w-16">
                <img src="intuitivo.png"></img>
              </div>
            </center>

            <h1 className="text-center mb-4 mt-4 text-2xl font-medium text-blue-600">
              Intuitivo
            </h1>

            <div className="text-center">
              <h2 className="font-catamaran">
                No necesitas ser un experto, en EvoltFit te guiaremos paso a
                paso para que tengas los resultados que quieres.
              </h2>
            </div>
          </div>

          <div className="w-64 p-9">
            <center>
              <div className="h-16 w-16">
                <img src="centralizado.png"></img>
              </div>
            </center>

            <h1 className="text-center mb-4 mt-4 text-2xl font-medium text-blue-600">
              Centralizado
            </h1>

            <div className="text-center">
              <h2 className="font-catamaran">
                Encuentra las herramientas más importantes que necesitaras en tu
                camino fitness en un solo lugar.
              </h2>
            </div>
          </div>
          <div className="w-64 p-9">
            <center>
              <div className="h-16 w-16">
                <img src="barato.png"></img>
              </div>
            </center>

            <h1 className="text-center mb-4 mt-4 text-2xl font-medium text-blue-600">
              Accesible
            </h1>

            <div className="text-center">
              <h2 className="font-catamaran text-base">
                Accede a una gran cantidad de herramientas y ejercicios sin la
                necesidad de pagar una alta tarifa.
              </h2>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      
      <div id="seccionPaquetes"></div>
      {resultado == 0 ? (
        <div><h1 className="text-center text-5xl text-zinc-700 font-catamaran mb-16">
        Descubre el plan perfecto para ti
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
              <PreciosSesion {...plan} key={plan.nombre} />
            </div>
          ))}
        </div>
      </div>
      </div>
      ) : resultado == 1 ? (
        <div><h1 className="text-center text-5xl text-blue-600 font-catamaran mb-16 animate-pulse">
        Actualmente tu cuenta ya tiene registrado un plan. ¡Gracias por confiar  en nosotros!
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
              <PreciosComprado {...plan} key={plan.nombre} />
            </div>
          ))}
        </div>
      </div>
      </div>
      ) : (
        <div><h1 className="text-center text-5xl text-zinc-700 font-catamaran mb-16">
        Descubre el plan perfecto para ti
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
                <Precios {...plan} key={plan.nombre} />
              </div>
            ))}
          </div>
        </div>
        </div>
      )}
      
      <h1 className="text-center mt-1 text-sm text-gray-500">
        * Sujeto a una política de uso razonable
      </h1>
      <br />
      <br />
      <br />
      <br />

      <h1 className="text-center text-5xl text-zinc-700 font-catamaran">
        ¿Te gustaría probar EvoltFit?
      </h1>

      <br />

      <div className="grid place-items-center">
        <button onClick={() => router.push("../registro")} className="button">
          <span>Registrate</span>
        </button>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}
