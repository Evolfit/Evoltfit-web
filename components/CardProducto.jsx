import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import supabase from "/config/supabaseClient";

const CardProducto = ({ registroProducto, getProductosRegistro }) => {
    const producto = registroProducto.producto_id;
   
    //console.log(rutinaEjercicio)
    
    async function updateEjercicio(name, value) {
        //console.log(rutinaIndex)
        const query = supabase.from('rutinas_ejercicio');

        if (name == 'sets'){
            query = query.update({ sets: value}).eq('id', rutinaEjercicio.id)
        }
        else if (name == 'reps'){
            query = query.update({ reps: value}).eq('id', rutinaEjercicio.id)
        }
        else if (name == 'orden'){
            query = query.update({ orden: value}).eq('id', rutinaEjercicio.id)
        }

        const { error } = await query
    
        if (error) {
          console.log('ERROR: No se pudo actualizar el ejercicio.')
          console.log(error)
        }
        else{
          console.log('Ejercicio Actualizado.')
          //console.log(data[0])
        }
    }

    async function eliminarProducto() {
        const { error } = await supabase
        .from('calorias_registro_productos')
        .delete()
        .match({id: registroProducto.id})
    
        if (error) {
            console.log('ERROR: Error al eliminar el producto.')
            console.log(error)
        }
        else{
            console.log('Se eliminó el producto')
            getProductosRegistro()
        }
    }


  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md my-2">
        {producto === null ? 
            "Selecciona un producto"
        : 
        <div>
            <button onClick={() => {}} >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{producto.nombre}</h5>
            </button>
            <p className="mb-3 font-normal text-gray-700">{producto.tipo}</p>
            <div className="flex">
                        <div className="text-sm mr-5">
                          <p className="text-gray-900 leading-none font-semibold">Calorías:</p>
                          <p className="text-gray-600">{producto.calorias}</p>
                        </div>
                        <div className="text-sm mr-5">
                          <p className="text-gray-900 leading-none font-semibold">Proteínas:</p>
                          <p className="text-gray-600">{producto.proteinas}</p>
                        </div>
                        <div className="text-sm mr-5">
                          <p className="text-gray-900 leading-none font-semibold">Grasas:</p>
                          <p className="text-gray-600">{producto.grasas}</p>
                        </div>
                    </div>
            <button onClick={eliminarProducto} className="inline-flex items-center my-2 mx-1 px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300">
                Eliminar
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>   
        </div>
        }
        
        </div>  
    );
};

export default CardProducto;
