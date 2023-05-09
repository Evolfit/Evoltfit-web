import React from "react";
import { useEffect, useState } from "react";
import supabase from "/config/supabaseClient";

const CardProducto = ({ registroProducto, sesion, getProductosRegistro }) => {
  const producto = registroProducto.producto_id;

  useEffect(() => {}, []);

  async function eliminarProducto() {
    const { error } = await supabase
      .from("calorias_registro_productos")
      .delete()
      .match({ id: registroProducto.id });

    if (error) {
      //console.log("ERROR: Error al eliminar el producto.");
      //console.log(error);
    } else {
      //console.log("Se eliminó el producto");
      getProductosRegistro();
    }

    //Para eliminar productos de la tabla totales
    let { data: res, err } = await supabase
      .from("calorias_productos_totales")
      .delete()
      .match({ producto_id: producto.id, usuario: sesion, calorias_registro_productos_id: registroProducto.id });

      if(err){
        //console.log("ERROR: Ocurrió un error eliminado el producto de la tabla totales")
        //console.log(err)
      }else{
        //console.log("Producto eliminiado de la tabla totales")
      }
  }

  return (
    <div className="w-11/12 p-6 bg-white rounded-lg shadow-md my-2 border-blue-600 border-2">
      {registroProducto === null ? (
        "Selecciona un producto"
      ) : (
        <div>
          <button onClick={() => {}}>
            <h5 className="mb-2 text-xl font-semibold tracking-tighter text-blue-600 xl:text-2xl xl:font-bold xl:tracking-tight ">
              {registroProducto.producto_id.nombre}
            </h5>
          </button>
          <div className="flex mb-2">
            <div className="mr-6">
              <p className="text-sm xl:text-base font-bold xl:font-semibold">Grupo:</p>
              <p className="mb-3 text-sm xl:font-normal text-gray-700">
                {registroProducto.producto_id.tipo}
              </p>
            </div>
            <div className="mr-6">
              <p className="text-sm xl:text-base font-bold xl:font-semibold">Medida seleccionada:</p>
              <p className="mb-3 text-sm xl:font-normal text-gray-700">
                {registroProducto.tipo_medicion}
              </p>
            </div>
            <div>
              <p className="text-sm xl:text-base font-bold xl:font-semibold">Cantidad seleccionada:</p>
              <p className="mb-3 text-sm xl:font-normal text-gray-700">
                {registroProducto.cantidad_elegida}
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="text-sm mr-5">
              <p className="text-gray-900 font-bold xl:font-semibold">
                Calorías:
              </p>
              <p className="text-gray-700 font-normal">{registroProducto.calorias}</p>
            </div>
            <div className="text-sm mr-5">
              <p className="text-gray-900 font-bold xl:font-semibold">
                Proteínas:
              </p>
              <p className="text-gray-700 font-normal">{registroProducto.proteinas}</p>
            </div>
            <div className="text-sm mr-5">
              <p className="text-gray-900 font-bold xl:font-semibold">
                Grasas:
              </p>
              <p className="text-gray-700 font-normal">{registroProducto.grasas}</p>
            </div>
          </div>
          <div className = "flex flex-row-reverse">
          <button
            onClick={eliminarProducto}
            className="items-center my-2 mx-1 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 hover:bg-red-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            Eliminar producto
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProducto;
