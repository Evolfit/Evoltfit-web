import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import supabase from "/config/supabaseClient";
import CardCalorias from "../components/CardCalorias";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import AsignarMeta from "../components/AsignarMeta";

export default function VisualizadorCalorias() {
  const router = useRouter();

  var today = new Date();

  // getDate() Regresa el día del mes (Desde 1 a 31)
  var day = today.getDate();
  // getMonth() Regresa el mes (Desde 0 a 11)
  var month = today.getMonth() + 1;
  // getFullYear() Regresa el año actual
  var year = today.getFullYear();

  // Formatos de las fechas
  // console.log(`${year}-${month}-${day}`);
  // console.log(`${day}/${month}/${year}`)

  var fecha_baseDatos = `${year}-${month}-${day}`;
  var fecha_Visual = `${day}/${month}/${year}`;

  const [sesion, setSesion] = useState(null);
  const [registros, setRegistros] = useState(null);
  const [sumatoriaCalorias, setSumatoriaCalorias] = useState(null);
  const [toggleSeleccionar, setToggleSeleccionar] = useState(false);
  const [metaCalorias, setMetaCalorias] = useState(null);
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });

  var sumatoriaCal = 0;

  useEffect(() => {
    handleSesion();
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");

    const interval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTime({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);

  }, []);

  const nuevoRegistro = async () => {
    let query = supabase
      .from("calorias_registro")
      .select("nombre", { count: "exact", head: true })
      .eq("usuario", sesion.user.id);

    const count = await query;

    const { data, error } = await supabase
      .from("calorias_registro")
      .insert({
        usuario: sesion.user.id,
        nombre: "Registro calórico " + (count.count + 1),
        fecha_creacion: fecha_Visual,
        fecha_formato_orden: fecha_baseDatos,
      })
      .select();

    if (error) {
      //console.log(error);
      //console.log("ERROR: Hubo un error al crear un nuevo registro.");
    } else {
      //console.log(data);
      //console.log("Se creó una nueva rutina.")
      router.push({
        pathname: "/addCalorias",
        query: { rutina: data[0].id },
      });
    }
  };

  async function obtenerRegistros(session) {
    const { data, error } = await supabase
      .from("calorias_registro")
      .select("*")
      .eq("usuario", session.user.id)
      .order("fecha_formato_orden", { ascending: false });

    if (error) {
      //console.log("ERROR: Hubo un error al recuperar el registro.");
      //console.log(error);
    } else {
      //console.log(data);
      setRegistros(data);
    }

    let { data: res, err } = await supabase
      .from("calorias_productos_totales")
      .select("calorias")
      .match({ usuario: session.user.id, fecha_agregado: fecha_baseDatos });

    if (err) {
      //console.log("ERROR: Hubo un error al recuperar todos los productos del usuario.");
      //console.log(err);
    } else {
      //console.log(res);
      for (var i = 0; i <= res.length - 1; i++) {
        sumatoriaCal = sumatoriaCal + res[i].calorias;
      }
      setSumatoriaCalorias(sumatoriaCal.toFixed(1));
    }
  }

  async function obtenerMeta(session) {
    let { data: res, err } = await supabase
      .from("calorias_metas")
      .select("cals_meta")
      .eq("usuario", session.user.id);

    if (err) {
      //console.log("ERROR: Hubo un error obteniendo la meta del ususario");
      //console.log(err);
    } else {
      if (res.length == 0) {
        //console.log("El usuario no tiene una meta establecida");
        //console.log(res);
      } else {
        //console.log("Meta obtenida exitosamente");
        //console.log(res)
        setMetaCalorias(res[0].cals_meta);
      }
    }
  }

  const handleSesion = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      setSesion(data.session);
      obtenerRegistros(data.session);
      obtenerMeta(data.session);
      //console.log(data);
    } else {
      setSesion(null);
      router.push("/login");
    }
  };

  return (
    <div className="bg-stone-100 w-full">
      <Head>
        <title>EvoltFit - Registro de Calorías</title>
        <meta name="description" content="EvoltFit es una app web diseñada para acompañarte en tu camino fitness y ayudarte a registrar y mejorar tu progreso." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="relative min-h-[75vh]">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div
          className={
            "grid grid-cols-1 gap-1 xl:grid xl:grid-cols-2 xl:gap-1 xl:ml-10" +
            (toggleSeleccionar ? "blur-sm" : "")
          }
        >
          {registros ? (
            <div className="mt-6 flex flex-col order-2 xl:order-none">
              <div className="absolute left-8 bottom-26 xl:left-16 xl:top-44 h-7 w-7 tooltip-contenedor">
                  <div className="tooltip-localCalorias">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <span className="tooltiptext-localCalorias">
                      {'Presiona "Nuevo registro" para crear un registro con la fecha actual. Puedes usar el botón "Opciones" para eliminarlo o para agregar productos al registro.'}
                    </span>
                  </div>
                </div>
              <h2 className="text-xl xl:text-2xl text-center">
                {"Mis Registros"}
              </h2>

              <br />
              <div className="flex flex-col w-8/12 mx-auto">
                <button
                  type="submit"
                  onClick={nuevoRegistro}
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base xl:px-5 py-2.5 text-center mr-2 mb-2 "
                >
                  Nuevo registro
                </button>
              </div>
              <br />
              {registros.length === 0 ? (
                <h2 className="text-center">No hay registros que mostrar</h2>
              ) : (
                registros.map((registro) => (
                  <CardCalorias key={registro.id} registro={registro} />
                ))
              )}

              {/* PAGINACIÓN */}
              {/* <div className="flex flex-col items-center mb-2 mt-4">
                <div className="btn-group">
                  {(paginacion == 1) ? "" : <button className="bg-blue-600 text-xl lg:btn-lg" onClick={() => {setPaginacion(paginacion - 1)}}>«</button>}
                  {((paginacion - 2) <= 0) ? "" : <button className="" onClick={() => {setPaginacion(paginacion - 2)}}>{paginacion - 2}</button>}
                  {((paginacion - 1) <= 0) ? "" : <button className="" onClick={() => {setPaginacion(paginacion - 1)}}>{paginacion - 1}</button>}
                  <button className="btn lg:btn-lg btn-secondary">{paginacion}</button>
                  {(cantidad > (paginacion * 10))? <button className="" onClick={() => {setPaginacion(paginacion + 1)}}>{paginacion + 1}</button> : ""}
                  {(cantidad > ((paginacion+1) * 10))? <button className="" onClick={() => {setPaginacion(paginacion + 2)}}>{paginacion + 2}</button> : ""}
                  {(paginacion >= (cantidad/10))? "" : <button className="" onClick={() => {setPaginacion(paginacion + 1)}}>»</button>}
                </div>
              </div> */}
            </div>
          ) : (
            <div className="mt-12">
              <div className="loader mt-6"></div>
            </div>
          )}
          <div className="order-1 xl:order-none">
            <div className="bg-white ml-10 mr-10 grid place-items-center border-green-600 border-2 rounded-md shadow-2xl relative pt-12 pb-12 xl:pt-16 xl:pb-16">
              <div className="absolute left-5 top-5 h-7 w-7 tooltip-contenedorGrafica">
                <div className="tooltip-localCaloriasGrafica">
                  <ion-icon name="alert-circle-outline"></ion-icon>
                  <span className="tooltiptext-localCaloriasGrafica">
                    {'Con el botón "Asignar meta" puedes definir la meta de calorías que quieres seguir cada día. Solamente se suman los productos que se consuman en el día actual.'}
                  </span>
                </div>
              </div>
              <h5 className="text-lg font-semibold text-center tracking-tighter text-blue-600 mb-2 xl:text-2xl xl:font-bold xl:tracking-tight ">
                {'Calorías consumidas hoy'} <br /> {fecha_Visual}
              </h5>
              <div className="h-28 w-28 xl:h-36 xl:w-36">
                <CircularProgressbarWithChildren
                  value={sumatoriaCalorias}
                  maxValue={metaCalorias}
                >
                  {metaCalorias == 0 ? (
                     <img
                     style={{ width: 40, marginTop: -5 }}
                     src="calorias_icon_black.png"
                     alt="doge"
                    />
                  )  : (
                  
                  <img
                    style={{ width: 40, marginTop: -5 }}
                    src="calorias_icon_color.png"
                    alt="doge"
                  />
                  
                  )}
                  
                </CircularProgressbarWithChildren>
              </div>

              {metaCalorias ? (
                <h5 className="text-xl font-semibold tracking-tighter xl:text-2xl xl:font-bold xl:tracking-tight text-blue-600 mt-2">
                  {sumatoriaCalorias} / {metaCalorias}
                </h5>
              ) : (
                ""
              )}

              {sumatoriaCalorias > metaCalorias && metaCalorias > 0 ? (
                <div className="grid place-items-center">
                  <br />
                  <div
                    id="toast-danger"
                    className="flex items-center p-4 mb-4 w-10/12 xl:w-full max-w-xs bg-red-200 rounded-lg shadow"
                    role="alert"
                  >
                    <div className="ml-3 text-sm font-normal text-center">
                      {'Cuidado, tus calorías totales han sobrepasado tu meta del día.'}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

                  {metaCalorias == 0 ? (
                     <button
                     onClick={() => setToggleSeleccionar(!toggleSeleccionar)}
                     className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base px-5 py-2.5 text-center mt-5"
                   >
                     Asignar meta
                   </button>
                  )  : (
                  
                    <button
                    onClick={() => setToggleSeleccionar(!toggleSeleccionar)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base px-5 py-2.5 text-center mt-5"
                  >
                    Cambiar meta
                  </button>
                  
                  )}

              

              <div className = "mt-5">
              <h2 className = "text-center text-lg font-semibold tracking-tighter text-blue-600 mb-2 xl:text-xl xl:font-bold xl:tracking-tight">Tiempo restante para resetear las calorías</h2>
              <p className = "text-center text-lg font-semibold tracking-tighter text-zinc-800 mb-2 xl:text-lg xl:font-bold xl:tracking-tight">{time.hours} horas {time.minutes} minutos {time.seconds} segundos</p>
            </div>
            </div>
          </div>
          <br />
        </div>

        {toggleSeleccionar ? (
          <AsignarMeta setToggleSeleccionar={setToggleSeleccionar} />
        ) : (
          ""
        )}
        <br />
        <br />
        <br />

        <Footer></Footer>
      </main>
    </div>
  );
}
