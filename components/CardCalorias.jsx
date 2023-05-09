import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "/config/supabaseClient";

const CardCalorias = ({ registro }) => {
  const router = useRouter();

  const [productosRutina, setProductosRutina] = useState([]);
  const [sumatoriaCalorias, setSumatoriaCalorias] = useState(null);
  const [sumatoriaProteinas, setSumatoriaProteinas] = useState(null);
  const [sumatoriaGrasas, setSumatoriaGrasas] = useState(null);
  var sumatoriaCal = 0;
  var sumatoriaPro = 0;
  var sumatoriaGra = 0;

  useEffect(() => {
    getProductosRegistro();
  }, []);

  async function getProductosRegistro() {
    const { data, error } = await supabase
      .from("calorias_registro_productos")
      .select(
        `
          id,
          producto_id (
            nombre
          ),
          calorias,
          proteinas,
          grasas
        `
      )
      .eq("registro", registro.id);

    if (error) {
      //console.log("ERROR: Hubo un error al recuperar los productos de la rutina.");
      //console.log(error);
      } else {
      ////console.log(data);
      setProductosRutina(data);

      ////console.log(data[0].producto_id.calorias);
      for (var i = 0; i <= data.length - 1; i++) {
        sumatoriaCal = sumatoriaCal + data[i].calorias;
        sumatoriaPro = sumatoriaPro + data[i].proteinas;
        sumatoriaGra = sumatoriaGra + data[i].grasas;
      }
      setSumatoriaCalorias(sumatoriaCal.toFixed(1));
      setSumatoriaProteinas(sumatoriaPro.toFixed(1));
      setSumatoriaGrasas(sumatoriaGra.toFixed(1));
    }
  }

  return (
    <div className="grid place-items-center">
      <div className="w-11/12 p-6 bg-white rounded-lg shadow-md my-2 flex border-blue-600 border-2">
        <div>
          <h5 className="text-sm mb-1 tracking-tighter text-zync-600 xl:mb-2 xl:text-base xl:tracking-tight ">
            Creación: {registro.fecha_creacion}
          </h5>

          <button
            onClick={() => {
              router.push({
                pathname: "/addCalorias",
                query: { registro: registro.id },
              });
            }}
          >
            <h5 className="text-lg text-blue-600 mb-1 font-semibold tracking-tighter xl:mb-2 xl:text-2xl xl:font-bold xl:tracking-tight ">
              {registro.nombre}
            </h5>
          </button>
          {productosRutina.length === 0 ? (
            <p className="text-sm">
              No hay productos añadidos a este registro.
            </p>
          ) : (
            productosRutina.map((producto) => (
              <div key={producto.id}>
                <p className="font-semibold text-sm xl:text-base">
                  {producto.producto_id.nombre}
                </p>
              </div>
            ))
          )}
          <button
            onClick={() => {
              router.push({
                pathname: "/addCalorias",
                query: { registro: registro.id },
              });
            }}
            className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Opciones
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex absolute ml-40 xl:ml-56 xl:left-64">
          {sumatoriaCalorias != 0 ? (
            <div className="text-sm mr-5 grid place-items-center">
              <div className="h-8 w-8 xl:h-10 xl:w-10">
                <img src="calorias.png"></img>
              </div>
              {/* <p className="text-gray-900 leading-none font-semibold">
              Calorías totales:
            </p> */}
              <p className="text-blue-500 mt-1">{sumatoriaCalorias}</p>
            </div>
          ) : (
            ""
          )}

          {sumatoriaProteinas != 0 ? (
            <div className="text-sm mr-5 grid place-items-center">
              <div className="h-8 w-8 xl:h-10 xl:w-10">
                <img src="proteins.png"></img>
              </div>
              {/* <p className="text-gray-900 leading-none font-semibold">
              Proteínas totales:
            </p> */}
              <p className="text-blue-500 mt-1">{sumatoriaProteinas}</p>
            </div>
          ) : (
            ""
          )}

          {sumatoriaCalorias != 0 ? (
            <div className="text-sm mr-5 grid place-items-center">
              <div className="h-8 w-8 xl:h-10 xl:w-10">
                <img src="grasas.png"></img>
              </div>
              {/* <p className="text-gray-900 leading-none font-semibold">
              Grasas totales:
            </p> */}
              <p className="text-blue-500 mt-1">{sumatoriaGrasas}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CardCalorias;
