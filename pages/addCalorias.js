import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, Fragment } from "react";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import CardProducto from "/components/CardProducto";
import SeleccionarProducto from "/components/SeleccionarProducto";
import supabase from "../config/supabaseClient";

export default function Home() {
  const router = useRouter();
  let registroIndex = router.query.registro;

  var today = new Date();

  // getDate() Regresa el día del mes (Desde 1 a 31)
  var day = today.getDate();
  // getMonth() Regresa el mes (Desde 0 a 11)
  var month = today.getMonth() + 1;
  // getFullYear() Regresa el año actual
  var year = today.getFullYear();

  var fecha_baseDatos = `${year}-${month}-${day}`
  var fecha_Visual = `${day}/${month}/${year}`;
  var fecha_Tol = `${year}/${month}/${day}`;

  const [sesion, setSesion] = useState(null);
  const [registro, setRegistro] = useState(null);
  const [formInput, setFormInput] = useState();
  const [productosRegistro, setProductosRegistro] = useState([]);
  const [toggleSeleccionar, setToggleSeleccionar] = useState(false);

  useEffect(() => {
    localStorage.removeItem("NombrePaquete");
    localStorage.removeItem("Meses");
    handleSesion();
  }, []);

  const handleSesion = async () => {
    if (!registroIndex) {
      router.push("/visualizadorCalorias");
    }

    const { data, error } = await supabase.auth.getSession();

    if (data.session) {
      setSesion(data.session);
      getRegistro();
    } else {
      setSesion(null);
      router.push("/login");
    }
  };

  async function getRegistro() {
    const { data, error } = await supabase
      .from("calorias_registro")
      .select("*")
      .eq("id", registroIndex);

    if (error) {
      //console.log("ERROR: No se encontró el registro de calorias.");
      //console.log(error);
    } else {
      setRegistro(data[0]);
      setFormInput({
        nombre: data[0].nombre,
      });

      getProductosRegistro();
    }
  }

  async function updateRegistro(nombre) {
    ////console.log(rutinaIndex)
    let temp;

    if (nombre == "") {
      temp = "Registro calorico sin nombre";
    } else {
      temp = nombre;
    }

    const { error } = await supabase
      .from("calorias_registro")
      .update({ nombre: temp })
      .eq("id", registroIndex);

    if (error) {
      //console.log("ERROR: No se pudo actualizar el registro.");
      //console.log(error);
    } else {
      //console.log("Registro actualizado");
      ////console.log(data[0])
    }
  }

  async function eliminarRegistro() {
    const { error } = await supabase
      .from("calorias_registro")
      .delete()
      .match({ id: registro.id, usuario: sesion.user.id });

    if (error) {
      //console.log("ERROR: Error al eliminar el registro calorico.");
      //console.log(error);
    } else {
      //console.log("Se eliminó " + registro.nombre);
      router.push("/visualizadorCalorias");
    }
  }

  async function getProductosRegistro() {
    const { data, error } = await supabase
      .from("calorias_registro_productos")
      .select(
        `
      id,
      producto_id (
        id,
        nombre,
        tipo
      ),
      calorias,
      proteinas, 
      grasas,
      tipo_medicion,
      cantidad_elegida
    `
      )
      .eq("registro", registroIndex);

    if (error) {
      //console.log("ERROR: Hubo un error al recuperar los productos.");
      //console.log(error);
    } else {
      ////console.log(data);
      setProductosRegistro(data);
    }
  }

  async function agregarProducto(
    idProducto,
    cantidadSeleccionada,
    tipoMedicion
  ) {
    if(cantidadSeleccionada == undefined || cantidadSeleccionada == ""){
      alert("Ingrese la cantidad")
    }else{if (tipoMedicion == false) {
      //console.log("El usuario seleccionó " + cantidadSeleccionada + " gramos");

      let { data: res, err } = await supabase
        .from("calorias_productos")
        .select("calorias_gramos, proteinas_gramos, grasas_gramos")
        .eq("id", idProducto);

      let conversionCaloriasGramos = (
        (cantidadSeleccionada * res[0].calorias_gramos) /
        100
      ).toFixed(2);
      let conversioProteinasGramos = (
        (cantidadSeleccionada * res[0].proteinas_gramos) /
        100
      ).toFixed(2);
      let conversionGrasasGramos = (
        (cantidadSeleccionada * res[0].grasas_gramos) /
        100
      ).toFixed(2);

      // //console.log(conversionCaloriasGramos)
      // //console.log(conversioProteinasGramos)
      // //console.log(conversionGrasasGramos)

      const { data, error } = await supabase
        .from("calorias_registro_productos")
        .insert({
          registro: registroIndex,
          producto_id: idProducto,
          calorias: conversionCaloriasGramos,
          proteinas: conversioProteinasGramos,
          grasas: conversionGrasasGramos,
          tipo_medicion: "Cada 100 gramos",
          cantidad_elegida: cantidadSeleccionada,
        }).select(`
        id,
        producto_id (
          id,
          nombre,
          tipo
        ),
        calorias,
        proteinas, 
        grasas,
        tipo_medicion,
        cantidad_elegida
      `);

      if (error) {
        //console.log(error);
        //console.log("ERROR: Hubo un error al agregar un nuevo producto.");
      } else {
        //console.log("Se agregó un nuevo producto.");
        //console.log(data[0]);
        //console.log(data[0].id);
        setProductosRegistro((current) => [...current, data[0]]);
      }

      const { data2, error2 } = await supabase
        .from("calorias_productos_totales")
        .insert({
          producto_id: idProducto,
          usuario: sesion.user.id,
          fecha_agregado: fecha_baseDatos,
          fecha_agregadoFormat: fecha_Tol,
          registro: registroIndex,
          calorias: conversionCaloriasGramos,
          proteinas: conversioProteinasGramos,
          grasas: conversionGrasasGramos,
          calorias_registro_productos_id: data[0].id,
        });

      if (error2) {
        //console.log(error2);
        //console.log("ERROR: Hubo un error al agregar un nuevo producto a la tabla total.");
      } else {
        //console.log("Se agregó el producto a la tabla de productos totales.");
      }

      setToggleSeleccionar(false);
    } else if (tipoMedicion) {
      //console.log("El usuario seleccionó " + cantidadSeleccionada + " piezas");
      let { data: res, err } = await supabase
        .from("calorias_productos")
        .select("calorias_pieza, proteinas_pieza, grasas_pieza")
        .eq("id", idProducto);

      let conversionCaloriasPieza = (
        res[0].calorias_pieza * cantidadSeleccionada
      ).toFixed(2);
      let conversioProteinasPieza = (
        res[0].proteinas_pieza * cantidadSeleccionada
      ).toFixed(2);
      let conversionGrasasPieza = (
        res[0].grasas_pieza * cantidadSeleccionada
      ).toFixed(2);

      // //console.log(conversionCaloriasPieza);
      // //console.log(conversioProteinasPieza);
      // //console.log(conversionGrasasPieza);

      const { data, error } = await supabase
        .from("calorias_registro_productos")
        .insert({
          registro: registroIndex,
          producto_id: idProducto,
          calorias: conversionCaloriasPieza,
          proteinas: conversioProteinasPieza,
          grasas: conversionGrasasPieza,
          tipo_medicion: "Por pieza / vaso",
          cantidad_elegida: cantidadSeleccionada,
        }).select(`
        id,
        producto_id (
          id,
          nombre,
          tipo
        ),
        calorias,
        proteinas, 
        grasas,
        tipo_medicion,
        cantidad_elegida
      `);

      if (error) {
        //console.log(error);
        //console.log("ERROR: Hubo un error al agregar un nuevo producto.");
      } else {
        //console.log("Se agregó un nuevo producto.");
        //console.log(data[0]);
        setProductosRegistro((current) => [...current, data[0]]);
      }

      const { data2, error2 } = await supabase
        .from("calorias_productos_totales")
        .insert({
          producto_id: idProducto,
          usuario: sesion.user.id,
          fecha_agregado: fecha_baseDatos,
          fecha_agregadoFormat: fecha_Tol,
          registro: registroIndex,
          calorias: conversionCaloriasPieza,
          proteinas: conversioProteinasPieza,
          grasas: conversionGrasasPieza,
          calorias_registro_productos_id: data[0].id,
        });

      if (error2) {
        //console.log(error2);
        //console.log("ERROR: Hubo un error al agregar un nuevo producto a la tabla total." );
      } else {
        //console.log("Se agregó el producto a la tabla de productos totales.");
      }

      setToggleSeleccionar(false);
    }}
    
  }

  const handleOnInputChange = useCallback(
    (event) => {
      const { value, name, id, checked } = event.target;

      setFormInput({
        ...formInput,
        [name]: value,
      });

      updateRegistro(value);
    },
    [formInput, setFormInput]
  );

  return (
    <div className="bg-stone-100 z-0">
      <Head>
        <title>EvoltFit - Registro de calorías</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="relative min-h-[75vh]">
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          {registro ? (
            <Fragment>
              <div
                className={
                  "mx-auto mt-2 w-11/12" + (toggleSeleccionar ? "blur-sm" : "")
                }
              >
                <div className="flex">
                  <div className="w-1/2 flex">
                    <button
                      className="btn btn-ghost m-0 px-2 text-xs xl:text-lg mb-2"
                      onClick={() => {
                        router.push("/visualizadorCalorias");
                      }}
                    >
                      <div className="text-base mt-1.5 xl:text-3xl xl:mt-auto ">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                      </div>
                      <span className="ml-2">{"Volver a registros"}</span>
                    </button>
                  </div>
                  <div className="w-1/2 p-2 flex flex-row-reverse">
                    <h1 className="font-semibold text-sm xl:text-xl">
                      Registro creado el: {registro.fecha_creacion}
                    </h1>
                  </div>
                </div>
                <br />
                <div className="px-6 w-full">
                  <input
                    name="nombre"
                    id="nombre"
                    type="text"
                    className="px-5 py-3 mt-2 w-full xl:w-52 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring my-2"
                    value={formInput.nombre || ""}
                    onChange={handleOnInputChange}
                  />
                  
                  <div className="flex xl:float-right mt-2">
                  {productosRegistro.length != 0 ? (
                    <button
                      onClick={() => setToggleSeleccionar(!toggleSeleccionar)}
                      className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm xl:text-base px-5 py-2.5 text-center mr-2 mb-2 "
                    >
                      Agregar producto
                    </button>
                  ) : (
                      ""
                    )}
                    
                    <button
                      onClick={eliminarRegistro}
                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm xl:text-base px-5 py-2.5 text-center mr-2 mb-2 "
                    >
                      Eliminar registro
                    </button>
                  </div>
                  <br />
                </div>
                {productosRegistro.length === 0 ? (
                  <div className="grid place-items-center">
                    <br />
                    <h2>No hay productos en el registro.</h2>
                    <h2 className = "mt-1.5 text-center">Usa<button
                      onClick={() => setToggleSeleccionar(!toggleSeleccionar)}
                      className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg text-sm xl:text-xs px-4 py-2 text-center mr-1 mb-2 ml-2"
                    >
                      Agregar producto
                    </button> para comenzar a agregarlos.</h2>
                  </div>
                ) : (
                  ""
                )}
                <div className="grid grid-cols-1 xl:grid-cols-2 place-items-center">
                  {productosRegistro.length === 0
                    ? ""
                    : productosRegistro.map((registro) => (
                        <CardProducto
                          key={registro.id}
                          registroProducto={registro}
                          sesion={sesion.user.id}
                          getProductosRegistro={getProductosRegistro}
                        />
                      ))}
                </div>
              </div>
              {toggleSeleccionar ? (
                <SeleccionarProducto
                  agregarProducto={agregarProducto}
                  setToggleSeleccionar={setToggleSeleccionar}
                />
              ) : (
                ""
              )}
            </Fragment>
          ) : (
            <div className="mt-12">
              <div className="loader mt-6"></div>
            </div>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
      <Footer />
    </div>
  );
}
