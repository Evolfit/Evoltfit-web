import Head from "next/head";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [sesion, setSesion] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [flag, setFlag] = useState(false);
  const [fechaTermino, setFechaTermino] = useState(null);

  let nombrePaquete = "";
  let meses = 0;
  let mesesConvertidos = 0;

  useEffect(() => {
    handleSesion();

    if (flag == true) {
      setFlag(false);

      nombrePaquete = localStorage.getItem("NombrePaquete");
      meses = localStorage.getItem("Meses");
      mesesConvertidos = parseInt(meses - 1);

      if (nombrePaquete && meses) {
        ////console.log("El usuario conectado es:" + sesion.user.id);
        registrarCambio();
        setTimeout(function () {
          router.push("/herramientas");
        }, 3000);
      } else {
        //console.log("No hay nada en localStorage, no se registrará nada");
        setTimeout(function () {
          router.push("/");
        }, 1);
        setResultado(0);
      }
    }
    setFlag(true);
  }, [flag]);

  async function registrarCambio() {
    let { data: sus_pagos, error } = await supabase
      .from("sus_pagos")
      .select("fecha_termino")
      .eq("id_usuario", sesion.user.id);

    if (error) {
      //console.log("ERROR al obtener la fecha de termino");
      //console.log(error);
    } else {
      var fecharTerminacionPlanActual = sus_pagos[0].fecha_termino;
      ////console.log(fecharTerminacionPlanActual)
      var concatenarYear = parseInt(
          fecharTerminacionPlanActual[0] +
          fecharTerminacionPlanActual[1] +
          fecharTerminacionPlanActual[2] +
          fecharTerminacionPlanActual[3]
      );
      var concatenarMonth = parseInt(
        fecharTerminacionPlanActual[5] + fecharTerminacionPlanActual[6]
      );
      var concatenarDay = parseInt(
        fecharTerminacionPlanActual[8] + fecharTerminacionPlanActual[9]
      );

      var fecha_PlanActual = `${concatenarYear}-${concatenarMonth}-${concatenarDay}`;

      //console.log(fecha_PlanActual);

      var month_TerminoPlanNuevo = concatenarMonth + mesesConvertidos;

        if (month_TerminoPlanNuevo > 12 && nombrePaquete == "12 meses") {
          //console.log("Rebasa los 12 meses y es un paquete de 12 meses")
          var fecha_TerminacionNuevoPlan = `${concatenarYear + 1}-${concatenarMonth}-${concatenarDay}`;
          //console.log(fecha_TerminacionNuevoPlan)
        } else if(month_TerminoPlanNuevo > 12 && (nombrePaquete == "6 meses" || nombrePaquete == "1 mes")){
          //console.log("Rebasa los 12 meses pero es un paquete de 6 o 1 mes")
          month_TerminoPlanNuevo = month_TerminoPlanNuevo - 12
          var fecha_TerminacionNuevoPlan = `${concatenarYear + 1}-${month_TerminoPlanNuevo}-${concatenarDay}`;
          //console.log(fecha_TerminacionNuevoPlan)
        }else{
          //console.log("No rebasa los 12 meses")  
          var fecha_TerminacionNuevoPlan = `${concatenarYear}-${month_TerminoPlanNuevo}-${concatenarDay}`;
          //console.log(fecha_TerminacionNuevoPlan)
        }

        let { data, error } = await supabase
        .from("sus_pagos")
        .update({
          fecha_compra: fecha_PlanActual,
          fecha_termino: fecha_TerminacionNuevoPlan,
          plan_name:nombrePaquete,
          no_meses: meses,
          activo: 1 , })
        .eq("id_usuario", sesion.user.id);

        if (error) {
          //console.log("ERROR: Surgió un error al actualizar el plan");
          //console.log(error);
        } else {
          //console.log("Plan actualizado");
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
      ////console.log(data);
    } else {
      setSesion(null);
      router.push("/");
      ////console.log("No hay Sesión " + error);
      ////console.log(data);
    }
  };

  return (
    <div className="bg-stone-100 w-full">
      <Head>
        <title>EvoltFit</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
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
                  ¡Cambio hecho!
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
