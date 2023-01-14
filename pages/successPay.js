import Head from "next/head";
import Navbar from "./Componentes/Navbar";
import Footer from "./Componentes/Footer";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [sesion, setSesion] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [flag, setFlag] = useState(false);

  let nombrePaquete = "";
  let meses = 0;

  useEffect(() => {
    handleSesion();

    if (flag == true) {
      setFlag(false);

      nombrePaquete = localStorage.getItem("NombrePaquete");
      meses = localStorage.getItem("Meses");

      if (nombrePaquete) {
        console.log("El usuario conectado es:" + sesion.user.id);
        registrarPago();
        setTimeout(function () {
          router.push("/herramientas");
        }, 3000);
      } else {
        console.log("No hay nada en localStorage, no se registrará nada");
        setTimeout(function () {
          router.push("/");
        }, 1);
        setResultado(0);
      }
    }
    setFlag(true);
  }, [flag]);

  async function registrarPago() {
    const current = new Date();

    const fecha_com =
      current.getFullYear() +
      "-" +
      current.getMonth() +
      1 +
      "-" +
      current.getDate();

    const fecha_ter =
      current.getFullYear() +
      "-" +
      current.getMonth() +
      meses +
      "-" +
      current.getDate();

    let { data: sus_pagos, err } = await supabase
      .from("sus_pagos")
      .select("id_usuario")
      .eq("id_usuario", sesion.user.id);

    if (sus_pagos.length == 0) {
      const { error } = await supabase.from("sus_pagos").insert({
        fecha_compra: fecha_com,
        fecha_termino: fecha_ter,
        id_usuario: sesion.user.id,
        plan_name: nombrePaquete,
        no_meses: meses,
        activo: 1,
      });

      if (error) {
        console.log("ERROR: Hubo un error al registrar el plan.");
        console.log(error);
      } else {
        console.log("Plan registrado");
      }
    } else {
      let { data, error } = await supabase
        .from("sus_pagos")
        .update({
          fecha_compra: fecha_com,  
          fecha_termino: fecha_ter,
          plan_name:nombrePaquete,
          no_meses: meses,
          activo: 1 , })
        .eq("id_usuario", sesion.user.id);

        if (error) {
          console.log("ERROR: Surgió un error al actualizar el plan");
          console.log(error);
        } else {
          console.log("Plan actualizado");
        }
    }

    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
    setResultado(1);
  }

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

  return (
    <div className="bg-stone-100 w-full">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {resultado == 0 ? (
          <div className="bg-gray-100">
            <div className=" p-6  md:mx-auto">
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  No tienes permisos para acceder a esta página.
                </h3>
                <div className="py-10 grid place-items-center"></div>
              </div>
            </div>
          </div>
        ) : resultado == 1 ? (
          <div className="bg-gray-100">
            <div className=" p-6  md:mx-auto">
              <svg
                viewBox="0 0 24 24"
                className="text-green-600 w-16 h-16 mx-auto my-6"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  ¡Pago hecho!
                </h3>
                <p className="text-gray-600 my-2">
                  Gracias por confiar en EvoltFit, esperamos que te sea de
                  utilidad.
                </p>
                <p> ¡Te redirigiremos a la página de herramientas! </p>
                <div className="py-10 grid place-items-center"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100">
            <div className=" p-6  md:mx-auto">
              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  No tienes permisos para acceder a esta página.
                </h3>
                <div className="py-10 grid place-items-center"></div>
              </div>
            </div>
          </div>
        )}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
      <Footer></Footer>
    </div>
  );
}
