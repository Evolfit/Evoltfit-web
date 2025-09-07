import React from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import Head from "next/head";
import { useState, useEffect } from "react";
import supabase from "/config/supabaseClient";
import Link from "next/link";

export default function Home() {
  const [sesion, setSesion] = useState(null);
  
  useEffect(() => {
    handleSesion();
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
    localStorage.setItem('bandera', 'false');
    // if (flag == true) {
    //   setFlag(false);

    //   if (sesion) {
    //     //console.log("El usuario conectado es:" + sesion.user.id);
    //     async function getPlan() {
    //       //console.log("Entramos a getPlan");
    //       let { data: sus_pagos, error } = await supabase
    //         .from("sus_pagos")
    //         .select("activo")
    //         .eq("id_usuario", sesion.user.id);

    //       if (sus_pagos.length == 0) {
    //         //console.log("Este usuario no tiene plan");
    //         setResultado(0);
    //       } else {
    //         //console.log("Este usuario si tiene un plan");
    //         //console.log(sus_pagos[0].activo);
    //         setResultado(sus_pagos[0].activo);
    //       }
    //     }
    //     getPlan();
    //   } else {
    //     //console.log("No hay una sesion iniciada");
    //   }
    // }
    // setFlag(true);
  }, []);

  const handleSesion = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      setSesion(data.session);
      //console.log(data);
    } else {
      setSesion(null);
      //console.log("No hay Sesión " + error);
      //console.log(data);
    }
  };

  return (
    <div className="bg-stone-100 w-full">
      <Head>
        <title>EvoltFit - Herramientas</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <br />
        <br />
        <br />
        <br />
        {sesion ? (
          <section className="bg-stone-100">
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">
                Todo lo que necesitas en un solo lugar
              </h1>

              <p className="mt-4 text-center text-gray-500">
                Te ofrecemos un repertorio de herramientas que te serviran para
                hacer un seguimiento de tu progreso.
              </p>

              <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:mt-12 lg:gap-12 lg:grid-cols-4">

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="/sistemaexperto">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                        <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="rutina.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Crear rutina inteligente
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="/visualizadorCalorias">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                        <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="cal.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Contador de calorías
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="/rutinas">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="registro.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Registro de rutinas, series y repeticiones
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="/biblioteca">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="biblio.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Biblioteca de ejecicios
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="/visualizadorProgreso">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="progreso.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Visualizador de progreso
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../oneRepMax">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="metodo.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Máximo peso para una repetición
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="/metodoSobrecarga">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="metodo.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Sobrecarga progresiva
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="/metodoBilbo">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="metodo.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Método Bilbo
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-stone-100">
            {/*Renderizado si no hay sesion iniciada*/}
            <div className="container px-6 py-10 mx-auto">
              <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">
                Todo lo que necesitas en un solo lugar
              </h1>

              <p className="mt-4 text-center text-gray-500">
                Te ofrecemos un repertorio de herramientas que te serviran para
                hacer un seguimiento de tu progreso.
              </p>

              <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-4">
                
              <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../login">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="rutina.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Crear rutina inteligente
                      </h2>
                      <p className="mt-2 text-base tracking-wider text-red-400 text-center group-hover:text-red-300">
                        Es necesario iniciar sesión.
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../login">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="cal.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Contador de calorías
                      </h2>
                      <p className="mt-2 text-base tracking-wider text-red-400 text-center group-hover:text-red-300">
                        Es necesario iniciar sesión.
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../login">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="registro.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Registro de rutinas, series y repeticiones
                      </h2>
                      <p className="mt-2 text-base tracking-wider text-red-400 text-center group-hover:text-red-300">
                        Es necesario iniciar sesión.
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../biblioteca">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="biblio.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Biblioteca de ejercicios
                      </h2>
                      
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../login">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="progreso.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Visualizador de progreso
                      </h2>
                      <p className="mt-2 text-base tracking-wider text-red-400 text-center group-hover:text-red-300">
                        Es necesario iniciar sesión.
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../oneRepMax">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="metodo.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Máximo peso para una repetición
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../metodoSobrecarga">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="metodo.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Sobrecarga progresiva
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="group bg-white overflow-hidden rounded-lg cursor-pointer h-80 group shadow-md border duration-100 hover:scale-105 active:scale-95 hover:bg-blue-500 hover:shadow-slate-300 hover:border-blue-500">
                  <Link href="../metodoBilbo">
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4">
                      <center>
                      <div className="h-20 w-20 group-hover:invert group-hover:brightness-0">
                          <img src="metodo.png"></img>
                        </div>
                      </center>
                      <h2 className="text-blue-500 group-hover:text-white mt-12 text-2xl font-bold text-center">
                        Método Bilbo
                      </h2>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <br />
        <br />
        <br />
      </main>
      <Footer></Footer>
    </div>
  );
}
