import React from "react";
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
import Head from "next/head";
import Precios from "./Componentes/CardsPrecios";
import { useRouter } from "next/router";
import { Link } from "react-scroll";
import { Fade, Flip, Rotate, Zoom, Bounce, Roll, Slide, LightSpeed } from "react-reveal";

const plans = [
  {
    nombre: "1 mes",
    precio: 149,
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
        <Link to = "seccionPaquetes" spy = {true} smooth = {true} offset = {50} duration = {800}>
        <button className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 mt-12 rounded-md hover:scale-110 transition-all font-catamaran top-36 py-3 px-6  xl:w-64 xl:py-4 xl:px-8   xl:rounded-lg xl:text-xl whitespace-nowrap bg-blue-600 text-white  xl:top-72">
          Pruébalos
        </button>
        </Link>
      </div>

      <br />
      <br />
      
      
      <div className = "grid place-items-center">
      <div className = "xl:flex xl:justify-between xl:w-3/4 xl:h-full xl:p-24 xl:bg-gray-100 xl:shadow-lg xl:shadow-zinc-300">
       
        <div className="w-64 p-8">
        <center>
        <Fade duration={700} top>
          <div className="h-16 w-16">
              <img src = "intuitivo.png"></img>
          </div>
          </Fade>
        </center>
        <Fade duration={700} bottom>
          <h1 className = "text-center mb-4 mt-4 text-2xl font-medium text-blue-600">Intuitivo</h1>
          </Fade>
          <div className = "text-center">
          <Slide duration={700} left>
          <h2 className = "font-catamaran">No necesitas ser un experto, en EvoltFit te guiaremos paso a paso para que tengas los resultados que quieres.</h2>
          </Slide>
          </div>
        </div>
        
        <div className="w-64 p-9">
        <center>
        <Fade duration={700} top>
          <div className="h-16 w-16">
              <img src = "centralizado.png"></img>
          </div>
          </Fade>
        </center>
        <Fade duration={700} bottom>
          <h1 className = "text-center mb-4 mt-4 text-2xl font-medium text-blue-600">Centralizado</h1>
          </Fade>
          <div className = "text-center">
          <Slide duration={700} bottom>
          <h2 className = "font-catamaran">Encuentra las herramientas más importantes que necesitaras en tu camino fitness en un solo lugar.</h2>
          </Slide>
          </div>
        </div>
        <div className="w-64 p-9">
        <center>
        <Fade duration={700} top>
          <div className="h-16 w-16">
              <img src = "barato.png"></img>
          </div>
          </Fade>
        </center>
        <Fade duration={700} bottom>
          <h1 className = "text-center mb-4 mt-4 text-2xl font-medium text-blue-600">Accesible</h1>
          </Fade>
          <div className = "text-center">
          <Slide duration={700} right>
          <h2 className = "font-catamaran text-base">Accede a una gran cantidad de herramientas y ejercicios sin la necesidad de pagar una alta tarifa.</h2>
          </Slide>
          </div>
        </div>
      </div>
      </div>
      

      <br />
      <br />
      <br />
      <br />
      <div id = "seccionPaquetes"></div>
      <Fade top>
      <h1 className = "text-center text-5xl text-zinc-700 font-catamaran">Descubre el plan perfecto para ti</h1>
      </Fade>
      <br />
      <br />
      <br />
      
      <Fade duration = {700} top>
      <div className="h-full px-6 py-12 lg:flex lg:justify-center lg:items-center">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-0">
          {plans.map((plan) => (
            <div
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
      </Fade>
      <h1 className = "text-center mt-1 text-sm text-gray-500">* Sujeto a una política de uso razonable</h1>
      <br />
      <br />
      <br />
      <br />
      <Fade top>
      <h1 className = "text-center text-5xl text-zinc-700 font-catamaran">¿Te gustaría probar EvoltFit?</h1>
      </Fade>
      <Slide bottom>
      <div className = "grid place-items-center">
        <button onClick={() => router.push("../registro")} className=" mt-12 rounded-md hover:scale-110 transition-all font-catamaran top-36 py-3 px-6  xl:w-64 xl:py-4 xl:px-8   xl:rounded-lg xl:text-xl whitespace-nowrap bg-blue-600 text-white">
          Registrate
        </button>
      </div>
      </Slide>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer></Footer>
    </div>
  );
}
